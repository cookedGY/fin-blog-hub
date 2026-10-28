import { afterEach, beforeEach, describe, expect, it } from "vitest";
import express from "express";
import { createRequire } from "node:module";
import { createServer, type Server } from "node:http";
import { type AddressInfo } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { StudioStore } from "./studio/store";
import { createStudioRoutes } from "./studio/routes";
import { emptyArticle } from "../shared/studio";

let store: StudioStore, server: Server, base: string, directory: string;
const content = {
  ...emptyArticle,
  title: "A sourced example",
  body: "This is a fictional test article. ".repeat(8),
  stage: "review",
  tags: ["demo"],
  sources: [{ title: "Reference", url: "https://example.com/reference" }],
  notes: [{ text: "Private note not for publication" }],
};
async function request(
  path: string,
  method = "GET",
  body?: unknown,
  cookie = "",
  extra: Record<string, string> = {}
) {
  const r = await fetch(base + "/api/studio/" + path, {
    method,
    headers: {
      Origin: base,
      "Content-Type": "application/json",
      Cookie: cookie,
      ...extra,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return {
    status: r.status,
    data: await r.json(),
    cookie: r.headers.get("set-cookie")?.split(";")[0] || "",
    headers: r.headers,
  };
}
async function demo() {
  const r = await request("demo/session", "POST", {});
  return { cookie: r.cookie, id: r.data.sampleId };
}
beforeEach(async () => {
  directory = mkdtempSync(join(tmpdir(), "studio-test-"));
  store = new StudioStore(join(directory, "test.sqlite"));
  const app = express();
  app.use(
    "/api/studio",
    createStudioRoutes({
      store,
      secure: false,
      ownerId: () => "owner-identity",
      authenticate: async req =>
        req.get("x-test-identity")
          ? { openId: req.get("x-test-identity")! }
          : null,
    })
  );
  server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  base = "http://127.0.0.1:" + (server.address() as AddressInfo).port;
});
afterEach(async () => {
  server.closeAllConnections();
  await new Promise<void>(resolve => server.close(() => resolve()));
  store.db.close();
  rmSync(directory, { recursive: true, force: true });
});

describe("Studio authorization, persistence and publishing boundary", () => {
  it("requires exact owner identity, not admin-looking client input or demo cookies", async () => {
    expect((await request("owner/articles")).status).toBe(401);
    expect(
      (
        await request("owner/articles", "GET", undefined, "", {
          "x-test-identity": "someone-else",
        })
      ).status
    ).toBe(403);
    expect(
      (
        await request("owner/articles", "GET", undefined, "", {
          "x-test-identity": "owner-identity",
        })
      ).status
    ).toBe(200);
    const a = await demo();
    expect(
      (await request("owner/articles", "GET", undefined, a.cookie)).status
    ).toBe(401);
  });
  it("isolates visitor sessions on every record route and expires them", async () => {
    const a = await demo(),
      b = await demo();
    for (const suffix of ["", "/revisions"])
      expect(
        (
          await request(
            `demo/articles/${a.id}${suffix}`,
            "GET",
            undefined,
            b.cookie
          )
        ).status
      ).toBe(404);
    expect(
      (
        await request(
          `demo/articles/${a.id}`,
          "PUT",
          { expectedVersion: 4, content },
          b.cookie
        )
      ).status
    ).toBe(404);
    expect(
      (
        await request(
          `demo/articles/${a.id}/publish`,
          "POST",
          { expectedVersion: 4, confirm: true },
          b.cookie
        )
      ).status
    ).toBe(404);
    store.db
      .prepare("UPDATE studio_workspaces SET expires_at=0 WHERE kind='demo'")
      .run();
    expect(
      (await request("demo/articles", "GET", undefined, a.cookie)).status
    ).toBe(401);
  });
  it("rejects cross-origin writes and malicious URLs; sets restrictive session cookies", async () => {
    expect(
      (
        await request("demo/session", "POST", {}, "", {
          Origin: "https://other.example",
        })
      ).status
    ).toBe(403);
    const session = await request("demo/session", "POST", {});
    expect(session.headers.get("set-cookie")).toContain("HttpOnly");
    expect(session.headers.get("set-cookie")).toContain("SameSite=Strict");
    const article = await request(
      `demo/articles/${session.data.sampleId}`,
      "GET",
      undefined,
      session.cookie
    );
    const invalid = {
      ...content,
      sources: [{ title: "bad", url: "javascript:alert(1)" }],
    };
    expect(
      (
        await request(
          `demo/articles/${session.data.sampleId}`,
          "PUT",
          { expectedVersion: article.data.version, content: invalid },
          session.cookie
        )
      ).status
    ).toBe(422);
    expect(
      (
        await request(
          `demo/articles/${session.data.sampleId}`,
          "PUT",
          {
            expectedVersion: article.data.version,
            content,
            workspaceId: "owner",
          },
          session.cookie
        )
      ).status
    ).toBe(422);
  });
  it("persists aggregate edits and recovers source/note revisions without erasing history", async () => {
    const a = await demo(),
      original = await request(
        `demo/articles/${a.id}`,
        "GET",
        undefined,
        a.cookie
      );
    const saved = await request(
      `demo/articles/${a.id}`,
      "PUT",
      { expectedVersion: original.data.version, content },
      a.cookie
    );
    expect(saved.status).toBe(200);
    store.db.close();
    store.db = new (createRequire(import.meta.url)("node:sqlite").DatabaseSync)(
      join(directory, "test.sqlite")
    );
    store.db.exec("PRAGMA foreign_keys=ON");
    const read = await request(
      `demo/articles/${a.id}`,
      "GET",
      undefined,
      a.cookie
    );
    expect(read.data.notes[0].text).toBe(content.notes[0].text);
    expect(read.data.sources[0].url).toBe(content.sources[0].url);
    const restored = await request(
      `demo/articles/${a.id}/restore`,
      "POST",
      { expectedVersion: read.data.version, version: 1 },
      a.cookie
    );
    expect(restored.data.version).toBe(read.data.version + 1);
    expect(restored.data.title).toBe("");
    expect(restored.data.notes).toEqual([]);
    const history = await request(
      `demo/articles/${a.id}/revisions`,
      "GET",
      undefined,
      a.cookie
    );
    expect(
      history.data.some((r: any) => r.content.title === content.title)
    ).toBe(true);
  });
  it("accepts only one competing save and rejects stale restores and publications", async () => {
    const a = await demo(),
      read = await request(`demo/articles/${a.id}`, "GET", undefined, a.cookie);
    const results = await Promise.all(
      ["First writer", "Second writer"].map(title =>
        request(
          `demo/articles/${a.id}`,
          "PUT",
          {
            expectedVersion: read.data.version,
            content: { ...content, title },
          },
          a.cookie
        )
      )
    );
    expect(results.map(r => r.status).sort()).toEqual([200, 409]);
    expect(
      (
        await request(
          `demo/articles/${a.id}/restore`,
          "POST",
          { expectedVersion: read.data.version, version: 1 },
          a.cookie
        )
      ).status
    ).toBe(409);
    expect(
      (
        await request(
          `demo/articles/${a.id}/publish`,
          "POST",
          { expectedVersion: read.data.version, confirm: true },
          a.cookie
        )
      ).status
    ).toBe(409);
  });
  it("validates publication server-side and never leaks draft/source/note data into the published snapshot", async () => {
    const a = await demo(),
      read = await request(`demo/articles/${a.id}`, "GET", undefined, a.cookie);
    expect(
      (
        await request(
          `demo/articles/${a.id}/publish`,
          "POST",
          { expectedVersion: read.data.version, confirm: true },
          a.cookie
        )
      ).status
    ).toBe(422);
    const saved = await request(
      `demo/articles/${a.id}`,
      "PUT",
      { expectedVersion: read.data.version, content },
      a.cookie
    );
    expect(
      (
        await request(
          `demo/articles/${a.id}/publish`,
          "POST",
          { expectedVersion: saved.data.version, confirm: false },
          a.cookie
        )
      ).status
    ).toBe(422);
    const published = await request(
      `demo/articles/${a.id}/publish`,
      "POST",
      { expectedVersion: saved.data.version, confirm: true },
      a.cookie
    );
    const again = await request(
      `demo/articles/${a.id}/publish`,
      "POST",
      { expectedVersion: saved.data.version, confirm: true },
      a.cookie
    );
    expect(again.data.id).toBe(published.data.id);
    await request(
      `demo/articles/${a.id}`,
      "PUT",
      {
        expectedVersion: saved.data.version,
        content: { ...content, body: "PRIVATE NEW DRAFT" },
      },
      a.cookie
    );
    const snapshot = await request(
      `demo/published/${published.data.id}`,
      "GET",
      undefined,
      a.cookie
    );
    expect(snapshot.data.body).toBe(content.body);
    expect(snapshot.data.notes).toBeUndefined();
    expect(snapshot.data.sources).toBeUndefined();
    expect(snapshot.headers.get("cache-control")).toBe("no-store");
    const b = await demo();
    expect(
      (
        await request(
          `demo/published/${published.data.id}`,
          "GET",
          undefined,
          b.cookie
        )
      ).status
    ).toBe(404);
  });
  it("searches within a workspace, filters tags, and paginates without leaking another workspace", async () => {
    const a = await demo(),
      b = await demo();
    for (let n = 0; n < 6; n++) {
      const created = await request("demo/articles", "POST", {}, a.cookie);
      await request(
        `demo/articles/${created.data.id}`,
        "PUT",
        {
          expectedVersion: created.data.version,
          content: { ...content, title: `Needle ${n}` },
        },
        a.cookie
      );
    }
    const first = await request(
      "demo/articles?q=Needle&tag=demo&page=1",
      "GET",
      undefined,
      a.cookie
    );
    expect(first.data.total).toBe(6);
    expect(first.data.items).toHaveLength(5);
    const second = await request(
      "demo/articles?q=Needle&tag=demo&page=2",
      "GET",
      undefined,
      a.cookie
    );
    expect(second.data.items).toHaveLength(1);
    expect(
      (await request("demo/articles?q=Needle", "GET", undefined, b.cookie)).data
        .total
    ).toBe(0);
    expect(
      (await request("demo/articles?q=%25", "GET", undefined, a.cookie)).data
        .total
    ).toBe(0);
  });
});
