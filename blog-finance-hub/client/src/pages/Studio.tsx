import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLoginUrl } from "@/const";
import {
  studioContent,
  publicationIssues,
  stages,
  type StudioArticle,
  type StudioContent,
} from "@shared/studio";
import "@/styles/studio.css";

type Mode = "demo" | "owner";
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: { issues?: string[] }
  ) {
    super(message);
  }
}
async function api<T>(
  path: string,
  method = "GET",
  body?: unknown
): Promise<T> {
  const response = await fetch(`/api/studio/${path}`, {
    method,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(
      503,
      "The Studio service is unavailable here. No draft has been saved."
    );
  }
  if (!response.ok)
    throw new ApiError(
      response.status,
      data.error || "Studio request failed.",
      data.details
    );
  return data as T;
}
function contentOf(article: StudioArticle): StudioContent {
  return {
    title: article.title,
    body: article.body,
    stage: article.stage,
    tags: article.tags,
    sources: article.sources,
    notes: article.notes,
  };
}
function downloadDraft(value: StudioContent) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "studio-unsaved-draft.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function ArticleText({ title, body }: { title: string; body: string }) {
  return (
    <article className="studio-paper studio-preview">
      <p className="studio-kicker">
        Studio article · separate from the live blog
      </p>
      <h1>{title || "Untitled draft"}</h1>
      {body
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </article>
  );
}

type Revision = {
  version: number;
  content: StudioContent;
  reason: string;
  createdAt: string;
};
function Editor({
  initial,
  mode,
  onDirty,
  onClose,
}: {
  initial: StudioArticle;
  mode: Mode;
  onDirty: (dirty: boolean) => void;
  onClose: () => void;
}) {
  const [content, setContent] = useState<StudioContent>(contentOf(initial));
  const [tagText, setTagText] = useState(initial.tags.join(", "));
  const [article, setArticle] = useState(initial),
    [status, setStatus] = useState<
      "saved" | "unsaved" | "saving" | "failed" | "conflict"
    >("saved");
  const [notice, setNotice] = useState(""),
    [view, setView] = useState<"edit" | "preview" | "history">("edit");
  const [confirmPublish, setConfirmPublish] = useState(false),
    [busy, setBusy] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([]),
    [revision, setRevision] = useState<Revision | null>(null);
  const current = useRef(content),
    saved = useRef(JSON.stringify(content)),
    version = useRef(initial.version),
    sending = useRef(false),
    alive = useRef(true);
  current.current = content;
  const dirty = JSON.stringify(content) !== saved.current;
  const root = `${mode}/articles/${initial.id}`;
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    onDirty(dirty || status === "saving");
  }, [dirty, status, onDirty]);
  useEffect(() => {
    const unload = (e: BeforeUnloadEvent) => {
      if (
        JSON.stringify(current.current) !== saved.current ||
        sending.current
      ) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    const leave = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href]");
      if (
        link &&
        (JSON.stringify(current.current) !== saved.current ||
          sending.current) &&
        !window.confirm(
          "This draft has unsaved changes. Download a copy or wait for Saved before leaving. Leave anyway?"
        )
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", unload);
    document.addEventListener("click", leave, true);
    return () => {
      window.removeEventListener("beforeunload", unload);
      document.removeEventListener("click", leave, true);
    };
  }, []);
  const persist = useCallback(async () => {
    if (sending.current) return false;
    const snapshot = current.current;
    if (JSON.stringify(snapshot) === saved.current) return true;
    const parsed = studioContent.safeParse(snapshot);
    if (!parsed.success) {
      setStatus("failed");
      setNotice(
        parsed.error.issues
          .map(i => `${i.path.join(".")}: ${i.message}`)
          .join(" ")
      );
      return false;
    }
    sending.current = true;
    setStatus("saving");
    setNotice("");
    try {
      const result = await api<StudioArticle>(root, "PUT", {
        expectedVersion: version.current,
        content: parsed.data,
      });
      if (!alive.current) return false;
      version.current = result.version;
      saved.current = JSON.stringify(snapshot);
      setArticle(result);
      setStatus(
        JSON.stringify(current.current) === saved.current ? "saved" : "unsaved"
      );
      return JSON.stringify(current.current) === saved.current;
    } catch (e) {
      if (alive.current) {
        setStatus(
          e instanceof ApiError && e.status === 409 ? "conflict" : "failed"
        );
        setNotice(e instanceof Error ? e.message : "Could not save.");
      }
      return false;
    } finally {
      sending.current = false;
    }
  }, [root]);
  useEffect(() => {
    if (
      !dirty ||
      status === "conflict" ||
      status === "failed" ||
      status === "saving"
    )
      return;
    const timer = setTimeout(() => void persist(), 900);
    return () => clearTimeout(timer);
  }, [content, dirty, status, persist]);
  function update(next: StudioContent) {
    setContent(next);
    if (status !== "conflict")
      setStatus(
        sending.current
          ? "saving"
          : JSON.stringify(next) === saved.current
            ? "saved"
            : "unsaved"
      );
    setConfirmPublish(false);
  }
  async function loadLatest() {
    if (
      !window.confirm(
        "Replace the editor with the server version? Download your unsaved copy first if you want to keep it."
      )
    )
      return;
    setBusy(true);
    try {
      const latest = await api<StudioArticle>(root);
      version.current = latest.version;
      saved.current = JSON.stringify(contentOf(latest));
      setContent(contentOf(latest));
      setTagText(latest.tags.join(", "));
      setArticle(latest);
      setStatus("saved");
      setNotice("Loaded the latest server version.");
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function history() {
    setView("history");
    setNotice("Loading revisions…");
    try {
      const list = await api<Revision[]>(`${root}/revisions`);
      setRevisions(list);
      setRevision(list.find(r => r.version !== version.current) ?? list[0]);
      setNotice("");
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  async function restore() {
    if (!revision || dirty || sending.current) return;
    if (
      !window.confirm(
        `Restore version ${revision.version} as a new revision? The existing history will be preserved.`
      )
    )
      return;
    setBusy(true);
    try {
      const latest = await api<StudioArticle>(`${root}/restore`, "POST", {
        version: revision.version,
        expectedVersion: version.current,
      });
      version.current = latest.version;
      saved.current = JSON.stringify(contentOf(latest));
      setContent(contentOf(latest));
      setTagText(latest.tags.join(", "));
      setArticle(latest);
      setStatus("saved");
      setView("edit");
      setNotice("Restored as a new saved revision.");
    } catch (e) {
      setStatus(
        e instanceof ApiError && e.status === 409 ? "conflict" : "failed"
      );
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function publish() {
    setBusy(true);
    try {
      const result = await api<{ id: string }>(`${root}/publish`, "POST", {
        expectedVersion: version.current,
        confirm: true,
      });
      setArticle(a => ({
        ...a,
        publication: { id: result.id, version: version.current },
      }));
      setConfirmPublish(false);
      setNotice(
        "Published a separate Studio snapshot. The live website was not changed."
      );
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) setStatus("conflict");
      setNotice(
        (e as Error).message +
          (e instanceof ApiError && e.details?.issues
            ? " " + e.details.issues.join(" ")
            : "")
      );
    } finally {
      setBusy(false);
    }
  }
  const issues = publicationIssues(content);
  const published = !dirty && article.publication?.version === version.current;
  return (
    <>
      <div className="studio-edit-toolbar">
        <button
          onClick={onClose}
          disabled={dirty || status === "saving" || busy}
        >
          <ArrowLeft size={15} aria-hidden="true" /> Archive
        </button>
        <span className="studio-save" role="status" aria-live="polite">
          {status === "saved"
            ? `Saved · version ${article.version}`
            : status === "unsaved"
              ? "Unsaved changes · autosave pending"
              : status === "saving"
                ? "Saving…"
                : status === "conflict"
                  ? "Save conflict · your edit is preserved"
                  : "Failed to save · your edit is preserved"}
        </span>
        <span className="studio-status">
          {published
            ? "Published in Studio"
            : article.publication
              ? "Draft changes · older snapshot published"
              : "Draft · not published"}
        </span>
      </div>
      <div className="studio-editor-nav" aria-label="Article workspace views">
        <button aria-pressed={view === "edit"} onClick={() => setView("edit")}>
          Write & research
        </button>
        <button
          aria-pressed={view === "preview"}
          onClick={() => setView("preview")}
        >
          Preview & publish
        </button>
        <button
          aria-pressed={view === "history"}
          onClick={() => void history()}
        >
          Revision history
        </button>
        <button
          disabled={
            status === "saving" || busy || status === "conflict" || !dirty
          }
          onClick={() => void persist()}
        >
          Save now
        </button>
        <button onClick={() => downloadDraft(content)}>Download draft</button>
      </div>
      {(status === "failed" || status === "conflict") && (
        <div className="studio-warning" role="alert">
          <strong>
            {status === "conflict"
              ? "A newer version exists on the server."
              : "Your latest edit is not saved."}
          </strong>
          <p>{notice}</p>
          <p>
            The editor still holds your text. Download it before replacing or
            leaving.
          </p>
          {status === "failed" && (
            <button onClick={() => void persist()}>Retry save</button>
          )}
          <button disabled={busy} onClick={() => void loadLatest()}>
            Load server version
          </button>
        </div>
      )}
      <p className="studio-notice" role="status">
        {notice}
      </p>
      {view === "edit" ? (
        <div className="studio-writing-grid">
          <section className="studio-paper" aria-label="Article editor">
            <button
              className="studio-research-jump"
              onClick={() =>
                document.getElementById("studio-research")?.focus()
              }
            >
              Sources & notes ↓
            </button>
            <label className="studio-field">
              Working title
              <input
                value={content.title}
                maxLength={160}
                onChange={e => update({ ...content, title: e.target.value })}
                placeholder="What question are you exploring?"
              />
            </label>
            <div className="studio-stage-row">
              <label className="studio-field">
                Workflow stage
                <select
                  value={content.stage}
                  onChange={e =>
                    update({
                      ...content,
                      stage: e.target.value as StudioContent["stage"],
                    })
                  }
                >
                  {stages.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="studio-field">
                Tags · comma separated
                <input
                  value={tagText}
                  onChange={e => {
                    setTagText(e.target.value);
                    update({
                      ...content,
                      tags: e.target.value
                        .split(",")
                        .map(t => t.trim())
                        .filter(Boolean),
                    });
                  }}
                  placeholder="research, culture"
                />
              </label>
            </div>
            <label className="studio-field studio-body-label">
              Article text
              <textarea
                id="studio-article-text"
                rows={20}
                value={content.body}
                maxLength={80000}
                onChange={e => update({ ...content, body: e.target.value })}
                placeholder="Start with an idea. Write in plain text; separate paragraphs with a blank line."
              />
            </label>
            <p className="studio-hint">
              Plain text is rendered as paragraphs. HTML is never executed. Save
              before opening another article.
            </p>
          </section>
          <aside
            id="studio-research"
            tabIndex={-1}
            className="studio-research"
            aria-label="Research beside the draft"
          >
            <p className="studio-kicker">Evidence stays close</p>
            <h2>Sources & notes</h2>
            <button
              className="studio-research-jump"
              onClick={() =>
                document.getElementById("studio-article-text")?.focus()
              }
            >
              Back to article ↑
            </button>
            <p>
              Links and private working notes stay with the draft. They are not
              included in the published snapshot in this first version.
            </p>
            <h3>Sources</h3>
            {content.sources.length === 0 && (
              <p className="studio-empty">
                No sources attached. Add the reference you want to verify.
              </p>
            )}
            {content.sources.map((s, i) => (
              <fieldset key={i}>
                <legend>Source {i + 1}</legend>
                <label className="studio-field">
                  Source title
                  <input
                    value={s.title}
                    maxLength={200}
                    onChange={e =>
                      update({
                        ...content,
                        sources: content.sources.map((v, n) =>
                          n === i ? { ...v, title: e.target.value } : v
                        ),
                      })
                    }
                  />
                </label>
                <label className="studio-field">
                  HTTPS source URL
                  <input
                    type="url"
                    value={s.url}
                    onChange={e =>
                      update({
                        ...content,
                        sources: content.sources.map((v, n) =>
                          n === i ? { ...v, url: e.target.value } : v
                        ),
                      })
                    }
                  />
                </label>
                {s.url.startsWith("https://") && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    Open reference ↗
                  </a>
                )}
                <button
                  onClick={() =>
                    update({
                      ...content,
                      sources: content.sources.filter((_, n) => n !== i),
                    })
                  }
                >
                  Remove source {i + 1}
                </button>
              </fieldset>
            ))}
            <button
              disabled={content.sources.length >= 20}
              onClick={() =>
                update({
                  ...content,
                  sources: [...content.sources, { title: "", url: "" }],
                })
              }
            >
              <Plus size={14} aria-hidden="true" /> Add source
            </button>
            <h3>Research notes</h3>
            {content.notes.length === 0 && (
              <p className="studio-empty">
                No notes yet. Keep questions and source context here.
              </p>
            )}
            {content.notes.map((n, i) => (
              <div className="studio-note" key={i}>
                <label className="studio-field">
                  Note {i + 1}
                  <textarea
                    rows={4}
                    value={n.text}
                    maxLength={8000}
                    onChange={e =>
                      update({
                        ...content,
                        notes: content.notes.map((v, j) =>
                          j === i ? { text: e.target.value } : v
                        ),
                      })
                    }
                  />
                </label>
                <button
                  onClick={() =>
                    update({
                      ...content,
                      notes: content.notes.filter((_, j) => j !== i),
                    })
                  }
                >
                  Remove note {i + 1}
                </button>
              </div>
            ))}
            <button
              disabled={content.notes.length >= 30}
              onClick={() =>
                update({ ...content, notes: [...content.notes, { text: "" }] })
              }
            >
              <Plus size={14} aria-hidden="true" /> Add note
            </button>
          </aside>
        </div>
      ) : view === "preview" ? (
        <>
          <ArticleText title={content.title} body={content.body} />
          <section className="studio-publish">
            <h2>Publish intentionally</h2>
            <p>
              This creates an immutable snapshot inside this{" "}
              {mode === "demo"
                ? "isolated demo session"
                : "owner Studio sandbox"}
              . It does not publish to decodes.space’s live article collection
              or GitHub. Sources and private notes remain in the workspace.
            </p>
            {dirty && (
              <p>
                Wait for Saved before publishing. This preview includes unsaved
                edits.
              </p>
            )}
            {issues.length > 0 ? (
              <ul aria-label="Publication validation">
                {issues.map(i => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : (
              <p>
                <Check size={15} aria-hidden="true" /> Publication fields pass
                validation.
              </p>
            )}
            {confirmPublish ? (
              <div
                className="studio-confirm"
                role="group"
                aria-label="Confirm sandbox publication"
              >
                <p>
                  Publish saved version {article.version} only to this Studio
                  workspace?
                </p>
                <button
                  disabled={busy || dirty || issues.length > 0}
                  onClick={() => void publish()}
                >
                  Confirm sandbox publication
                </button>
                <button onClick={() => setConfirmPublish(false)}>Cancel</button>
              </div>
            ) : (
              <button
                disabled={
                  dirty || status !== "saved" || issues.length > 0 || busy
                }
                onClick={() => setConfirmPublish(true)}
              >
                Publish to Studio sandbox
              </button>
            )}
            {article.publication && (
              <Link
                className="studio-published-link"
                href={`/studio/${mode}/published/${article.publication.id}`}
              >
                Read saved published snapshot ↗
              </Link>
            )}
          </section>
        </>
      ) : (
        <section className="studio-history">
          <h2>Recoverable revisions</h2>
          <p>
            Compare a snapshot with the current saved version. Restore makes a
            new revision; it does not erase history or change an already
            published snapshot. Showing up to 100 latest revisions.
          </p>
          {revisions.length ? (
            <label className="studio-field">
              Version to compare
              <select
                value={revision?.version ?? ""}
                onChange={e =>
                  setRevision(
                    revisions.find(r => r.version === Number(e.target.value)) ??
                      null
                  )
                }
              >
                {revisions.map(r => (
                  <option key={r.version} value={r.version}>
                    Version {r.version} · {r.reason}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p>No revisions loaded yet.</p>
          )}
          {revision && (
            <>
              <div className="studio-version-grid">
                <div>
                  <h3>Version {revision.version}</h3>
                  <p>{revision.createdAt}</p>
                  <h4>{revision.content.title || "Untitled"}</h4>
                  <pre>{revision.content.body || "(No article text)"}</pre>
                  <p>
                    {revision.content.sources.length} sources ·{" "}
                    {revision.content.notes.length} notes
                  </p>
                </div>
                <div>
                  <h3>Current saved version {article.version}</h3>
                  <h4>{article.title || "Untitled"}</h4>
                  <pre>{article.body || "(No article text)"}</pre>
                  <p>
                    {article.sources.length} sources · {article.notes.length}{" "}
                    notes
                  </p>
                </div>
              </div>
              <button
                disabled={
                  dirty || status === "saving" || status === "conflict" || busy
                }
                onClick={() => void restore()}
              >
                Restore version {revision.version} as a new revision
              </button>
              {dirty && (
                <p>Save or download your current edit before restoring.</p>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}

type Archive = {
  items: {
    id: string;
    title: string;
    stage: string;
    version: number;
    updatedAt: string;
  }[];
  total: number;
  page: number;
  pageSize: number;
};
function Workspace() {
  const [mode, setMode] = useState<Mode>("demo"),
    [connected, setConnected] = useState(false),
    [article, setArticle] = useState<StudioArticle | null>(null);
  const [archive, setArchive] = useState<Archive | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [dirty, setDirty] = useState(false);
  const [q, setQ] = useState(""),
    [tag, setTag] = useState(""),
    [published, setPublished] = useState(false),
    [page, setPage] = useState(1),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!connected) return;
    let cancelled = false;
    setArchive(null);
    setError("");
    const timer = setTimeout(() => {
      api<Archive>(
        `${mode}/articles?q=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}&page=${page}&published=${published}`
      )
        .then(a => {
          if (!cancelled) setArchive(a);
        })
        .catch(e => {
          if (!cancelled) setError(e.message);
        });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [connected, mode, q, tag, page, published, refresh]);
  async function connect(next: Mode, fresh = false) {
    setBusy(true);
    setError("");
    try {
      if (fresh) {
        const session = await api<{ sampleId: string }>(
          "demo/session",
          "POST",
          {}
        );
        const a = await api<StudioArticle>(`demo/articles/${session.sampleId}`);
        setArticle(a);
      } else {
        await api<Archive>(`${next}/articles`);
        setArticle(null);
      }
      setMode(next);
      setConnected(true);
      setRefresh(n => n + 1);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function open(id?: string) {
    setBusy(true);
    setError("");
    try {
      setArticle(
        id
          ? await api<StudioArticle>(`${mode}/articles/${id}`)
          : await api<StudioArticle>(`${mode}/articles`, "POST", {})
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header className="studio-heading">
        <p className="studio-kicker">
          <BookOpen size={16} aria-hidden="true" /> The writing process, made
          visible
        </p>
        <h1>
          Decode’s <em>Studio.</em>
        </h1>
        <p>
          From a question worth asking to a draft worth sharing.
          <br />
          Keep the evidence beside the words—and publication intentional.
        </p>
        <ol className="studio-journey">
          {["Idea", "Research", "Draft", "Review", "Published snapshot"].map(
            (s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            )
          )}
        </ol>
      </header>
      <div className="studio-isolation">
        <ShieldCheck size={18} aria-hidden="true" />
        <p>
          {connected
            ? `${mode === "demo" ? "Visitor demo · fictional sample · isolated cookie session expires after 24 hours" : "Authenticated owner workspace · persistent private drafts"}. Studio publication is separate from the live blog.`
            : "Try a fictional article in a private demo workspace. Visitor edits cannot access owner drafts or the live blog."}
        </p>
      </div>
      {error && (
        <div className="studio-warning" role="alert">
          {error}
        </div>
      )}
      {!connected ? (
        <section className="studio-welcome">
          <h2>A working notebook, not another dashboard.</h2>
          <p>
            Start a demo to edit a fictional article, attach evidence, recover
            versions, and publish a sandbox snapshot. Do not enter confidential
            information in the visitor demo.
          </p>
          <div>
            <button disabled={busy} onClick={() => void connect("demo", true)}>
              Start a new visitor demo
            </button>
            <button disabled={busy} onClick={() => void connect("demo")}>
              Resume this browser’s demo
            </button>
            <button disabled={busy} onClick={() => void connect("owner")}>
              Open owner workspace
            </button>
          </div>
          <p>
            Owner mode uses the existing site sign-in and exact configured owner
            identity. It never grants access based on a visitor’s browser
            selection.
          </p>
          {import.meta.env.VITE_OAUTH_PORTAL_URL && (
            <a href={getLoginUrl()}>Sign in with the site account ↗</a>
          )}
          <p>
            Reloaded the page? Resume your demo above. Cookies are HttpOnly;
            changing browsers will not move the workspace. Demo records expire.
          </p>
        </section>
      ) : article ? (
        <Editor
          key={`${mode}:${article.id}`}
          initial={article}
          mode={mode}
          onDirty={setDirty}
          onClose={() => {
            if (!dirty) {
              setArticle(null);
              setRefresh(n => n + 1);
            }
          }}
        />
      ) : (
        <section className="studio-archive">
          <div className="studio-archive-title">
            <div>
              <p className="studio-kicker">
                {mode === "demo" ? "Your isolated demo" : "Owner workspace"}
              </p>
              <h2>The writing archive</h2>
            </div>
            <button disabled={busy} onClick={() => void open()}>
              <Plus size={16} aria-hidden="true" /> Create article
            </button>
          </div>
          <div className="studio-archive-filters">
            <label className="studio-field">
              Search articles
              <input
                type="search"
                value={q}
                onChange={e => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title or article text"
              />
            </label>
            <label className="studio-field">
              Exact tag
              <input
                value={tag}
                onChange={e => {
                  setTag(e.target.value);
                  setPage(1);
                }}
                placeholder="e.g. demo"
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={published}
                onChange={e => {
                  setPublished(e.target.checked);
                  setPage(1);
                }}
              />{" "}
              Has a published snapshot
            </label>
          </div>
          {!archive ? (
            <p role="status">
              {error ? "Archive could not load." : "Loading your archive…"}
            </p>
          ) : (
            <>
              {archive.items.length === 0 ? (
                <div className="studio-empty">
                  <h3>No matching articles</h3>
                  <p>
                    Change your search or create a new idea. No content is
                    inferred from an empty result.
                  </p>
                </div>
              ) : (
                archive.items.map(a => (
                  <button
                    className="studio-archive-row"
                    key={a.id}
                    disabled={busy}
                    onClick={() => void open(a.id)}
                  >
                    <span>
                      <strong>{a.title || "Untitled idea"}</strong>
                      <small>
                        Version {a.version} · {a.updatedAt}
                      </small>
                    </span>
                    <span>{a.stage} →</span>
                  </button>
                ))
              )}
              <div className="studio-pagination">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(n => n - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {page} · {archive.total} articles
                </span>
                <button
                  disabled={page * archive.pageSize >= archive.total}
                  onClick={() => setPage(n => n + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => {
              setConnected(false);
              setError("");
            }}
          >
            Choose workspace
          </button>
        </section>
      )}
      <details className="studio-build-notes">
        <summary>What’s built, how it’s checked, and what’s limited</summary>
        <p>
          A server-backed editor, related source/note records, optimistic
          version checks, revision recovery, and separately published snapshots.
          The sample history is fictional and seeded when your demo begins. No
          real author research or outcome is claimed.
        </p>
        <p>
          SQLite persistence belongs to the running Node server. The existing
          static Vercel site is not a durable Studio host; no deployment
          integration has been connected. Owner authentication requires the
          existing provider and database configuration. The visitor demo does
          not require those credentials. There is no rich text execution,
          collaboration, image upload, background research, or live-blog
          publishing in this slice.
        </p>
        <p>
          The repository guide documents API tests, browser checks, a data-model
          diagram, decisions, and a hands-on test script for De. Personal
          observations are left unclaimed until De tries it.
        </p>
      </details>
    </>
  );
}
function PublishedSnapshot() {
  const [, params] = useRoute("/studio/:mode/published/:id");
  const [snapshot, setSnapshot] = useState<{
      title: string;
      body: string;
      version: number;
    } | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    setSnapshot(null);
    setError("");
    api<{ title: string; body: string; version: number }>(
      `${params?.mode}/published/${params?.id}`
    )
      .then(s => {
        if (!cancelled) setSnapshot(s);
      })
      .catch(e => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [params?.mode, params?.id]);
  return (
    <>
      <Link href="/studio" className="studio-back">
        ← Back to Studio
      </Link>
      <div className="studio-isolation">
        <ShieldCheck size={18} aria-hidden="true" />
        <p>
          Published Studio snapshot · workspace access required · not the live
          blog. Later draft edits do not change this snapshot.
        </p>
      </div>
      {error ? (
        <p role="alert">{error}</p>
      ) : snapshot ? (
        <>
          <p className="studio-kicker">
            Saved publication · version {snapshot.version}
          </p>
          <ArticleText title={snapshot.title} body={snapshot.body} />
        </>
      ) : (
        <p role="status">Loading the published snapshot…</p>
      )}
    </>
  );
}
export default function Studio() {
  const [published] = useRoute("/studio/:mode/published/:id");
  return (
    <div className="studio-page">
      <Helmet>
        <title>Decode’s Studio | Research & Publishing Sandbox</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="studio-main">
        {published ? <PublishedSnapshot /> : <Workspace />}
      </main>
      <Footer />
    </div>
  );
}
