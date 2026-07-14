import { and, eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projectFiles, InsertProjectFile, newsletterSubscribers, InsertNewsletterSubscriber, newsletterEmails, InsertNewsletterEmail } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Project file queries
export async function createProjectFile(file: InsertProjectFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(projectFiles).values(file);
  return result;
}

export async function getProjectFilesByUserId(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(projectFiles).where(eq(projectFiles.userId, userId));
}

export async function deleteProjectFile(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(projectFiles)
    .where(
      and(
        eq(projectFiles.id, fileId),
        eq(projectFiles.userId, userId)
      )
    );
}

export async function getAllPublicProjectFiles() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(projectFiles).orderBy(projectFiles.createdAt);
}

export async function getPublicProjectFilesByCategory(category: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(projectFiles)
    .where(eq(projectFiles.projectCategory, category))
    .orderBy(projectFiles.createdAt);
}

// Newsletter subscriber queries
export async function createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(newsletterSubscribers).values(subscriber);
  return result;
}

export async function getNewsletterSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllActiveNewsletterSubscribers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.isActive, true))
    .orderBy(desc(newsletterSubscribers.subscribedAt));
}

export async function getNewsletterSubscribers(limit: number = 100, offset: number = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.subscribedAt))
    .limit(limit)
    .offset(offset);
}

export async function unsubscribeNewsletterSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(newsletterSubscribers)
    .set({ isActive: false, unsubscribedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}

export async function resubscribeNewsletterSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(newsletterSubscribers)
    .set({ isActive: true, unsubscribedAt: null })
    .where(eq(newsletterSubscribers.email, email));
}

// Newsletter email log queries
export async function createNewsletterEmailLog(emailLog: InsertNewsletterEmail) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(newsletterEmails).values(emailLog);
  return result;
}

export async function getNewsletterEmailLogs(limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(newsletterEmails)
    .orderBy(desc(newsletterEmails.sentAt))
    .limit(limit)
    .offset(offset);
}
