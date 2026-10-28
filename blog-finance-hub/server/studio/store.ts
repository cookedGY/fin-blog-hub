import type { DatabaseSync as SQLiteDatabase } from "node:sqlite";
import { createRequire } from "node:module";
// Native require keeps Node 24's built-in SQLite external to the older Vitest/Vite resolver.
const { DatabaseSync } = createRequire(import.meta.url)(
  "node:sqlite"
) as typeof import("node:sqlite");
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import {
  emptyArticle,
  studioContent,
  publicationIssues,
  type StudioArticle,
  type StudioContent,
} from "../../shared/studio";

export class StudioError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}
type Row = Record<string, any>;
export class StudioStore {
  db: SQLiteDatabase;
  constructor(path: string) {
    if (path !== ":memory:")
      mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path);
    this.db
      .exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS studio_workspaces(id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('demo','owner')), expires_at INTEGER);
      CREATE TABLE IF NOT EXISTS studio_articles(id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES studio_workspaces(id) ON DELETE CASCADE, title TEXT NOT NULL, body TEXT NOT NULL, stage TEXT NOT NULL, version INTEGER NOT NULL, updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS studio_sources(id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES studio_articles(id) ON DELETE CASCADE, title TEXT NOT NULL, url TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS studio_notes(id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES studio_articles(id) ON DELETE CASCADE, text TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS studio_tags(article_id TEXT NOT NULL REFERENCES studio_articles(id) ON DELETE CASCADE, tag TEXT NOT NULL, PRIMARY KEY(article_id, tag));
      CREATE TABLE IF NOT EXISTS studio_revisions(id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES studio_articles(id) ON DELETE CASCADE, version INTEGER NOT NULL, payload TEXT NOT NULL, reason TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(article_id,version));
      CREATE TABLE IF NOT EXISTS studio_publications(id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES studio_articles(id) ON DELETE CASCADE, workspace_id TEXT NOT NULL REFERENCES studio_workspaces(id) ON DELETE CASCADE, version INTEGER NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, tags TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(article_id,version));
      CREATE INDEX IF NOT EXISTS studio_archive ON studio_articles(workspace_id,updated_at);`);
  }
  transaction<T>(fn: () => T): T {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = fn();
      this.db.exec("COMMIT");
      return result;
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
  }
  workspace(id: string, kind: "demo" | "owner", expires?: number) {
    this.db
      .prepare("INSERT OR IGNORE INTO studio_workspaces VALUES (?,?,?)")
      .run(id, kind, expires ?? null);
  }
  cleanup() {
    this.db
      .prepare(
        "DELETE FROM studio_workspaces WHERE expires_at IS NOT NULL AND expires_at < ?"
      )
      .run(Date.now());
  }
  hasWorkspace(id: string) {
    return !!this.db
      .prepare("SELECT id FROM studio_workspaces WHERE id=?")
      .get(id);
  }
  get(workspace: string, id: string): StudioArticle {
    const row = this.db
      .prepare("SELECT * FROM studio_articles WHERE id=? AND workspace_id=?")
      .get(id, workspace) as Row | undefined;
    if (!row)
      throw new StudioError(404, "Article not found in this workspace.");
    const publication = this.db
      .prepare(
        "SELECT id,version FROM studio_publications WHERE article_id=? ORDER BY version DESC LIMIT 1"
      )
      .get(id) as { id: string; version: number } | undefined;
    return {
      id: row.id,
      title: row.title,
      body: row.body,
      stage: row.stage,
      version: row.version,
      updatedAt: row.updated_at,
      sources: this.db
        .prepare(
          "SELECT title,url FROM studio_sources WHERE article_id=? ORDER BY rowid"
        )
        .all(id) as StudioContent["sources"],
      notes: this.db
        .prepare(
          "SELECT text FROM studio_notes WHERE article_id=? ORDER BY rowid"
        )
        .all(id) as StudioContent["notes"],
      tags: this.db
        .prepare(
          "SELECT tag FROM studio_tags WHERE article_id=? ORDER BY rowid"
        )
        .all(id)
        .map(r => String(r.tag)),
      publication: publication ?? null,
    };
  }
  related(id: string, value: StudioContent) {
    for (const table of ["studio_sources", "studio_notes", "studio_tags"])
      this.db.prepare(`DELETE FROM ${table} WHERE article_id=?`).run(id);
    for (const source of value.sources)
      this.db
        .prepare("INSERT INTO studio_sources VALUES (?,?,?,?)")
        .run(randomUUID(), id, source.title, source.url);
    for (const note of value.notes)
      this.db
        .prepare("INSERT INTO studio_notes VALUES (?,?,?)")
        .run(randomUUID(), id, note.text);
    for (const tag of Array.from(new Set(value.tags)))
      this.db.prepare("INSERT INTO studio_tags VALUES (?,?)").run(id, tag);
  }
  snapshot(
    id: string,
    version: number,
    value: StudioContent,
    reason: string,
    now: string
  ) {
    this.db
      .prepare("INSERT INTO studio_revisions VALUES (?,?,?,?,?,?)")
      .run(randomUUID(), id, version, JSON.stringify(value), reason, now);
  }
  create(workspace: string) {
    return this.transaction(() => {
      const count = this.db
        .prepare(
          "SELECT count(*) AS n FROM studio_articles WHERE workspace_id=?"
        )
        .get(workspace) as Row;
      if (count.n >= 20)
        throw new StudioError(
          429,
          "This workspace is limited to 20 articles in this first version."
        );
      const id = randomUUID(),
        now = new Date().toISOString();
      this.db
        .prepare("INSERT INTO studio_articles VALUES (?,?,?,?,?,?,?)")
        .run(id, workspace, "", "", "idea", 1, now);
      this.snapshot(id, 1, emptyArticle, "Created article", now);
      return this.get(workspace, id);
    });
  }
  save(
    workspace: string,
    id: string,
    expected: number,
    input: unknown,
    reason = "Saved edit"
  ) {
    const content = studioContent.parse(input);
    return this.transaction(() => {
      const current = this.get(workspace, id);
      if (current.version !== expected)
        throw new StudioError(
          409,
          "A newer version exists. Your edit was not saved.",
          { currentVersion: current.version }
        );
      const next = current.version + 1,
        now = new Date().toISOString();
      this.db
        .prepare(
          "UPDATE studio_articles SET title=?,body=?,stage=?,version=?,updated_at=? WHERE id=? AND workspace_id=? AND version=?"
        )
        .run(
          content.title,
          content.body,
          content.stage,
          next,
          now,
          id,
          workspace,
          expected
        );
      this.related(id, content);
      this.snapshot(id, next, content, reason, now);
      return this.get(workspace, id);
    });
  }
  revisions(workspace: string, id: string) {
    this.get(workspace, id);
    return this.db
      .prepare(
        "SELECT version,payload,reason,created_at AS createdAt FROM studio_revisions WHERE article_id=? ORDER BY version DESC LIMIT 100"
      )
      .all(id)
      .map((r: Row) => ({
        version: r.version as number,
        content: studioContent.parse(JSON.parse(r.payload)),
        reason: r.reason as string,
        createdAt: r.createdAt as string,
      }));
  }
  restore(workspace: string, id: string, version: number, expected: number) {
    this.get(workspace, id);
    const row = this.db
      .prepare(
        "SELECT payload FROM studio_revisions WHERE article_id=? AND version=?"
      )
      .get(id, version) as Row | undefined;
    if (!row) throw new StudioError(404, "Revision not found.");
    return this.save(
      workspace,
      id,
      expected,
      JSON.parse(row.payload),
      `Restored version ${version}`
    );
  }
  publish(workspace: string, id: string, expected: number) {
    return this.transaction(() => {
      const article = this.get(workspace, id);
      if (article.version !== expected)
        throw new StudioError(
          409,
          "A newer draft exists. Preview it before publishing."
        );
      const issues = publicationIssues(article);
      if (issues.length)
        throw new StudioError(422, "Publication validation failed.", {
          issues,
        });
      const prior = this.db
        .prepare(
          "SELECT id FROM studio_publications WHERE article_id=? AND version=?"
        )
        .get(id, expected) as Row | undefined;
      if (prior) return { id: prior.id as string };
      const publicationId = randomUUID();
      // Separate immutable snapshot: never joins live draft text for reading.
      this.db
        .prepare("INSERT INTO studio_publications VALUES (?,?,?,?,?,?,?,?)")
        .run(
          publicationId,
          id,
          workspace,
          expected,
          article.title,
          article.body,
          JSON.stringify(article.tags),
          new Date().toISOString()
        );
      return { id: publicationId };
    });
  }
  publication(workspace: string, id: string) {
    const row = this.db
      .prepare(
        "SELECT id,title,body,version,tags,created_at AS createdAt FROM studio_publications WHERE id=? AND workspace_id=?"
      )
      .get(id, workspace) as Row | undefined;
    if (!row)
      throw new StudioError(
        404,
        "Published snapshot not found in this workspace."
      );
    return { ...row, tags: JSON.parse(row.tags) };
  }
  archive(
    workspace: string,
    q: string,
    tag: string,
    page: number,
    publishedOnly: boolean
  ) {
    const like = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
    const where = `workspace_id=? AND (title LIKE ? ESCAPE '\\' OR body LIKE ? ESCAPE '\\') AND (?='' OR EXISTS (SELECT 1 FROM studio_tags t WHERE t.article_id=studio_articles.id AND t.tag=?)) AND (?=0 OR EXISTS(SELECT 1 FROM studio_publications p WHERE p.article_id=studio_articles.id))`;
    const params = [workspace, like, like, tag, tag, publishedOnly ? 1 : 0];
    const total = this.db
      .prepare(`SELECT COUNT(*) AS total FROM studio_articles WHERE ${where}`)
      .get(...params) as Row;
    const items = this.db
      .prepare(
        `SELECT id,title,stage,version,updated_at AS updatedAt FROM studio_articles WHERE ${where} ORDER BY updated_at DESC,id LIMIT 5 OFFSET ?`
      )
      .all(...params, (page - 1) * 5);
    return { items, total: Number(total.total), page, pageSize: 5 };
  }
  seed(workspace: string) {
    let article = this.create(workspace);
    const idea = {
      ...emptyArticle,
      title: "A quieter way to research an article",
      tags: ["demo", "writing"],
    };
    article = this.save(
      workspace,
      article.id,
      article.version,
      idea,
      "Fictional demo: idea"
    );
    const research: StudioContent = {
      ...idea,
      stage: "research",
      sources: [
        {
          title: "MDN: HTML article element (reference documentation)",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
        },
      ],
      notes: [
        {
          text: "Fictional research note: keep source links beside the draft. This sample is a workflow demonstration, not user research or a reported finding.",
        },
      ],
    };
    article = this.save(
      workspace,
      article.id,
      article.version,
      research,
      "Fictional demo: research"
    );
    return this.save(
      workspace,
      article.id,
      article.version,
      {
        ...research,
        stage: "draft",
        body: "This is a fictional sample article for trying the Studio. It does not describe research conducted by De or claim an outcome.\n\nA writing workspace can keep a draft and its source references close together. In this demo, try adding a note, editing this paragraph, and checking the save status.\n\nWhen the draft is ready, move it to Review, preview it, and publish a snapshot inside your isolated workspace. The live DeCodes blog is not changed.",
      },
      "Fictional demo: draft"
    );
  }
}
