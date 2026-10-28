import express, { type Request } from "express";
import rateLimit from "express-rate-limit";
import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { studioContent } from "../../shared/studio";
import { StudioError, StudioStore } from "./store";

const cookieName = "decodes_studio_demo";
const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");
const uuid = z.uuid();
const expectedVersion = z.number().int().positive();
type Identity = { openId: string } | null;
type Dependencies = {
  store: StudioStore;
  authenticate: (req: Request) => Promise<Identity>;
  ownerId: () => string;
  secure: boolean;
};
export function createStudioRoutes(deps: Dependencies) {
  const router = express.Router();
  router.use((_req, res, next) => {
    res.set("Cache-Control", "no-store");
    res.set("X-Robots-Tag", "noindex, nofollow");
    next();
  });
  router.use((req, _res, next) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      const origin = req.get("Origin");
      try {
        if (
          !origin ||
          new URL(origin).host !== req.get("host") ||
          !["http:", "https:"].includes(new URL(origin).protocol) ||
          req.get("Sec-Fetch-Site") === "cross-site"
        )
          throw new Error();
      } catch {
        return next(
          new StudioError(
            403,
            "Studio writes require a same-origin browser request."
          )
        );
      }
    }
    next();
  });
  router.use(express.json({ limit: "256kb" }));
  router.use(
    rateLimit({
      windowMs: 60_000,
      limit: 180,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  router.post(
    "/demo/session",
    rateLimit({
      windowMs: 900_000,
      limit: 20,
      standardHeaders: true,
      legacyHeaders: false,
    }),
    (_req, res, next) => {
      try {
        deps.store.cleanup();
        const token = randomBytes(32).toString("hex"),
          workspace = `demo:${tokenHash(token)}`;
        deps.store.workspace(
          workspace,
          "demo",
          Date.now() + 24 * 60 * 60 * 1000
        );
        const sample = deps.store.seed(workspace);
        res.cookie(cookieName, token, {
          httpOnly: true,
          sameSite: "strict",
          secure: deps.secure,
          path: "/api/studio",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ sampleId: sample.id, expiresInHours: 24 });
      } catch (e) {
        next(e);
      }
    }
  );
  const scoped = express.Router({ mergeParams: true });
  scoped.use(async (req, res, next) => {
    try {
      deps.store.cleanup();
      const mode = (req.params as { mode?: string }).mode;
      if (mode === "demo") {
        const raw = (req.headers.cookie ?? "")
          .split(";")
          .map(p => p.trim())
          .find(p => p.startsWith(`${cookieName}=`))
          ?.slice(cookieName.length + 1);
        if (!raw || !/^[a-f0-9]{64}$/.test(raw))
          throw new StudioError(
            401,
            "Start a private demo session to continue."
          );
        const workspace = `demo:${tokenHash(raw)}`;
        if (!deps.store.hasWorkspace(workspace))
          throw new StudioError(
            401,
            "Your demo session expired. Export before leaving; start a new demo to continue."
          );
        res.locals.workspace = workspace;
      } else if (mode === "owner") {
        const owner = deps.ownerId();
        if (!owner)
          throw new StudioError(
            503,
            "Owner sign-in is not configured for this server. The demo remains separate."
          );
        const user = await deps.authenticate(req).catch(() => null);
        if (!user)
          throw new StudioError(
            401,
            "Sign in with the existing site account to access owner drafts."
          );
        if (user.openId !== owner)
          throw new StudioError(
            403,
            "Only the configured owner can access this workspace."
          );
        res.locals.workspace = `owner:${tokenHash(owner)}`;
        deps.store.workspace(res.locals.workspace, "owner");
      } else throw new StudioError(404, "Unknown Studio workspace.");
      next();
    } catch (e) {
      next(e);
    }
  });
  const handle =
    (fn: (req: express.Request, res: express.Response) => void) =>
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        fn(req, res);
      } catch (e) {
        next(e);
      }
    };
  scoped.get(
    "/articles",
    handle((req, res) => {
      const input = z
        .object({
          q: z.string().max(200).default(""),
          tag: z.string().max(40).default(""),
          page: z.coerce.number().int().min(1).max(1000).default(1),
          published: z.enum(["true", "false"]).default("false"),
        })
        .parse(req.query);
      res.json(
        deps.store.archive(
          res.locals.workspace,
          input.q,
          input.tag,
          input.page,
          input.published === "true"
        )
      );
    })
  );
  scoped.post(
    "/articles",
    handle((_req, res) =>
      res.status(201).json(deps.store.create(res.locals.workspace))
    )
  );
  scoped.get(
    "/articles/:id",
    handle((req, res) =>
      res.json(deps.store.get(res.locals.workspace, uuid.parse(req.params.id)))
    )
  );
  scoped.put(
    "/articles/:id",
    handle((req, res) => {
      const value = z
        .object({ expectedVersion, content: studioContent })
        .strict()
        .parse(req.body);
      res.json(
        deps.store.save(
          res.locals.workspace,
          uuid.parse(req.params.id),
          value.expectedVersion,
          value.content
        )
      );
    })
  );
  scoped.get(
    "/articles/:id/revisions",
    handle((req, res) =>
      res.json(
        deps.store.revisions(res.locals.workspace, uuid.parse(req.params.id))
      )
    )
  );
  scoped.post(
    "/articles/:id/restore",
    handle((req, res) => {
      const value = z
        .object({ expectedVersion, version: expectedVersion })
        .strict()
        .parse(req.body);
      res.json(
        deps.store.restore(
          res.locals.workspace,
          uuid.parse(req.params.id),
          value.version,
          value.expectedVersion
        )
      );
    })
  );
  scoped.post(
    "/articles/:id/publish",
    handle((req, res) => {
      const value = z
        .object({ expectedVersion, confirm: z.literal(true) })
        .strict()
        .parse(req.body);
      res.json(
        deps.store.publish(
          res.locals.workspace,
          uuid.parse(req.params.id),
          value.expectedVersion
        )
      );
    })
  );
  scoped.get(
    "/published/:id",
    handle((req, res) =>
      res.json(
        deps.store.publication(res.locals.workspace, uuid.parse(req.params.id))
      )
    )
  );
  router.use("/:mode", scoped);
  router.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      if (err instanceof StudioError)
        return res
          .status(err.status)
          .json({ error: err.message, details: err.details });
      if (err instanceof z.ZodError)
        return res
          .status(422)
          .json({
            error: "Check the article fields.",
            details: {
              issues: err.issues.map(i => `${i.path.join(".")}: ${i.message}`),
            },
          });
      if (
        err &&
        typeof err === "object" &&
        "type" in err &&
        err.type === "entity.too.large"
      )
        return res.status(413).json({ error: "Draft request exceeds 256 KB." });
      res
        .status(500)
        .json({
          error:
            "Studio could not save or load this request. Your unsaved text is still in the editor; try again or download it.",
        });
    }
  );
  return router;
}
