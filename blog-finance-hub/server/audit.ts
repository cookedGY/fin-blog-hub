import { getDb } from "./db";
import { auditLogs } from "../drizzle/schema";
import type { InsertAuditLog, AuditLog } from "../drizzle/schema";
import type { Request } from "express";
import { eq, and, desc } from "drizzle-orm";

/**
 * Extract client IP address from request, accounting for proxies
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

/**
 * Log an audit event
 */
export async function logAuditEvent(
  req: Request,
  options: {
    userId?: number;
    openId?: string;
    action: string;
    actionType: "auth" | "file" | "system";
    status: "success" | "failure" | "blocked";
    resourceId?: string;
    resourceType?: string;
    details?: Record<string, unknown>;
    errorMessage?: string;
  }
): Promise<void> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[AUDIT] Database not available");
      return;
    }

    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || null;

    const auditLog: InsertAuditLog = {
      userId: options.userId,
      openId: options.openId,
      action: options.action,
      actionType: options.actionType,
      status: options.status,
      ipAddress,
      userAgent: userAgent ? String(userAgent) : null,
      resourceId: options.resourceId,
      resourceType: options.resourceType,
      details: options.details ? JSON.stringify(options.details) : null,
      errorMessage: options.errorMessage,
    };

    await db.insert(auditLogs).values(auditLog);

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[AUDIT] ${options.action} - ${options.status}`, {
        userId: options.userId,
        ipAddress,
        resourceId: options.resourceId,
      });
    }
  } catch (error) {
    // Don't throw - logging failures shouldn't break the app
    console.error("[AUDIT ERROR] Failed to log audit event:", error);
  }
}

/**
 * Get audit logs with optional filtering
 */
export async function getAuditLogs(options?: {
  userId?: number;
  action?: string;
  status?: "success" | "failure" | "blocked";
  limit?: number;
  offset?: number;
}): Promise<AuditLog[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[AUDIT] Database not available");
      return [];
    }

    const conditions: any[] = [];

    if (options?.userId) {
      conditions.push(eq(auditLogs.userId, options.userId));
    }
    if (options?.action) {
      conditions.push(eq(auditLogs.action, options.action));
    }
    if (options?.status) {
      conditions.push(eq(auditLogs.status, options.status));
    }

    let baseQuery = db.select().from(auditLogs);

    if (conditions.length > 0) {
      baseQuery = baseQuery.where(and(...conditions)) as any;
    }

    // Order by most recent first
    let query = baseQuery.orderBy(desc(auditLogs.createdAt)) as any;

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const results = await query;
    return results;
  } catch (error) {
    console.error("[AUDIT ERROR] Failed to retrieve audit logs:", error);
    return [];
  }
}

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(userId: number, limit = 50): Promise<AuditLog[]> {
  return getAuditLogs({ userId, limit });
}

/**
 * Get failed authentication attempts
 */
export async function getFailedAuthAttempts(limit = 100): Promise<AuditLog[]> {
  return getAuditLogs({
    action: "auth.login",
    status: "failure",
    limit,
  });
}

/**
 * Get file operations
 */
export async function getFileOperationLogs(
  userId?: number,
  limit = 100
): Promise<AuditLog[]> {
  return getAuditLogs({
    userId,
    action: "file.upload",
    limit,
  });
}

/**
 * Get blocked requests
 */
export async function getBlockedRequests(limit = 100): Promise<AuditLog[]> {
  return getAuditLogs({
    status: "blocked",
    limit,
  });
}
