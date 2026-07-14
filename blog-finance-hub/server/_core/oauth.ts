import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response, RequestHandler } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { logAuditEvent } from "../audit";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express, authLimiter?: RequestHandler) {
  app.get("/api/oauth/callback", authLimiter || ((req, res, next) => next()), async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        await logAuditEvent(req, {
          action: "auth.login",
          actionType: "auth",
          status: "failure",
          errorMessage: "openId missing from user info",
        });
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Log successful login
      await logAuditEvent(req, {
        openId: userInfo.openId,
        action: "auth.login",
        actionType: "auth",
        status: "success",
        details: {
          loginMethod: userInfo.loginMethod ?? userInfo.platform,
          name: userInfo.name,
        },
      });

      res.redirect(302, "/");
    } catch (error) {
      await logAuditEvent(req, {
        action: "auth.login",
        actionType: "auth",
        status: "failure",
        errorMessage: error instanceof Error ? error.message : String(error),
      });
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
