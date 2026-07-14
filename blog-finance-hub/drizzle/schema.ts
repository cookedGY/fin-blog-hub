import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Project files table for storing uploaded documents
export const projectFiles = mysqlTable("projectFiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(), // S3 key
  fileUrl: text("fileUrl").notNull(), // S3 URL
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(), // in bytes
  projectCategory: varchar("projectCategory", { length: 100 }).notNull(), // e.g., "finance-models", "business-plans"
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProjectFile = typeof projectFiles.$inferSelect;
export type InsertProjectFile = typeof projectFiles.$inferInsert;
// Audit log table for security tracking
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // null for unauthenticated attempts
  openId: varchar("openId", { length: 64 }), // Manus OAuth ID
  action: varchar("action", { length: 100 }).notNull(), // e.g., "auth.login", "file.upload", "file.delete"
  actionType: mysqlEnum("actionType", ["auth", "file", "system"]).notNull(),
  status: mysqlEnum("status", ["success", "failure", "blocked"]).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  userAgent: text("userAgent"),
  details: text("details"), // JSON stringified details
  errorMessage: text("errorMessage"), // Error message if status is failure/blocked
  resourceId: varchar("resourceId", { length: 255 }), // file ID, etc.
  resourceType: varchar("resourceType", { length: 50 }), // "file", "user", etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

// Newsletter subscribers table
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  subscriptionSource: varchar("subscriptionSource", { length: 100 }), // "blog-post", "homepage", etc.
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  lastEmailSentAt: timestamp("lastEmailSentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Newsletter emails table for tracking sent emails
export const newsletterEmails = mysqlTable("newsletterEmails", {
  id: int("id").autoincrement().primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  postSlug: varchar("postSlug", { length: 255 }), // Associated blog post slug
  postTitle: varchar("postTitle", { length: 255 }),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  totalRecipients: int("totalRecipients").notNull(),
  successCount: int("successCount").default(0).notNull(),
  failureCount: int("failureCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterEmail = typeof newsletterEmails.$inferSelect;
export type InsertNewsletterEmail = typeof newsletterEmails.$inferInsert;

// Newsletter email logs for tracking individual sends
export const newsletterEmailLogs = mysqlTable("newsletterEmailLogs", {
  id: int("id").autoincrement().primaryKey(),
  emailId: int("emailId").notNull(),
  subscriberId: int("subscriberId").notNull(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["sent", "failed", "bounced"]).notNull(),
  errorMessage: text("errorMessage"),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterEmailLog = typeof newsletterEmailLogs.$inferSelect;
export type InsertNewsletterEmailLog = typeof newsletterEmailLogs.$inferInsert;
