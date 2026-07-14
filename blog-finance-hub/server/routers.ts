import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createProjectFile, getProjectFilesByUserId, deleteProjectFile, getAllPublicProjectFiles, getPublicProjectFilesByCategory } from "./db";
import { storagePut } from "./storage";
import { logAuditEvent, getAuditLogs, getFailedAuthAttempts, getBlockedRequests } from "./audit";
import { newsletterRouter } from "./newsletter";
import { sendContactEmail } from "./email";

// Allowed MIME types for file uploads
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
  'application/zip',
  'application/x-zip-compressed',
];

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    upload: protectedProcedure
      .input(z.object({
        filename: z.string().min(1).max(255),
        fileData: z.string(),
        mimeType: z.string(),
        fileSize: z.number().positive().max(MAX_FILE_SIZE),
        projectCategory: z.string().min(1),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Validate MIME type
        if (!ALLOWED_MIME_TYPES.includes(input.mimeType)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'File type not allowed. Allowed types: PDF, Word, Excel, CSV, ZIP, TXT',
          });
        }

        // Validate file size
        if (input.fileSize > MAX_FILE_SIZE) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'File size exceeds maximum allowed size of 50MB',
          });
        }

        // Validate filename to prevent directory traversal
        if (input.filename.includes('..') || input.filename.includes('/') || input.filename.includes('\\')) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid filename',
          });
        }

        const buffer = Buffer.from(input.fileData, 'base64');
        const fileKey = `projects/${ctx.user.id}/${Date.now()}-${input.filename}`;
        
        try {
          const { url } = await storagePut(fileKey, buffer, input.mimeType);
          
          const file = await createProjectFile({
            userId: ctx.user.id,
            filename: input.filename,
            fileKey,
            fileUrl: url,
            mimeType: input.mimeType,
            fileSize: input.fileSize,
            projectCategory: input.projectCategory,
            description: input.description,
          });
          
          // Log successful file upload
          await logAuditEvent(ctx.req, {
            userId: ctx.user.id,
            openId: ctx.user.openId,
            action: "file.upload",
            actionType: "file",
            status: "success",
            resourceType: "file",
            details: {
              filename: input.filename,
              fileSize: input.fileSize,
              mimeType: input.mimeType,
              category: input.projectCategory,
              fileKey: fileKey,
            },
          });

          
          return { success: true, url };
        } catch (error) {
          // Log failed file upload
          await logAuditEvent(ctx.req, {
            userId: ctx.user.id,
            openId: ctx.user.openId,
            action: "file.upload",
            actionType: "file",
            status: "failure",
            resourceType: "file",
            errorMessage: error instanceof Error ? error.message : String(error),
            details: {
              filename: input.filename,
              category: input.projectCategory,
            },
          });
          throw error;
        }
      }),
    
    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await getProjectFilesByUserId(ctx.user.id);
      }),
    
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        try {
          await deleteProjectFile(input.fileId, ctx.user.id);
          
          // Log successful file deletion
          await logAuditEvent(ctx.req, {
            userId: ctx.user.id,
            openId: ctx.user.openId,
            action: "file.delete",
            actionType: "file",
            status: "success",
            resourceId: String(input.fileId),
            resourceType: "file",
          });
          
          return { success: true };
        } catch (error) {
          // Log failed file deletion
          await logAuditEvent(ctx.req, {
            userId: ctx.user.id,
            openId: ctx.user.openId,
            action: "file.delete",
            actionType: "file",
            status: "failure",
            resourceId: String(input.fileId),
            resourceType: "file",
            errorMessage: error instanceof Error ? error.message : String(error),
          });
          throw error;
        }
      }),

    // Public portfolio procedures
    listPublic: publicProcedure
      .query(async () => {
        return await getAllPublicProjectFiles();
      }),

    listPublicByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await getPublicProjectFilesByCategory(input.category);
      }),
  }),

  // Contact form — sends email to dekena.wade@gmail.com
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required").max(100),
        email: z.string().email("Invalid email address"),
        subject: z.string().min(1, "Subject is required").max(200),
        message: z.string().min(10, "Message must be at least 10 characters").max(5000),
      }))
      .mutation(async ({ input }) => {
        await sendContactEmail({
          fromName: input.name,
          fromEmail: input.email,
          subject: input.subject,
          message: input.message,
        });
        return { success: true };
      }),
  }),

  // Newsletter procedures
  newsletter: newsletterRouter,

  // Audit log procedures (admin only)
  audit: router({
    getLogs: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
        action: z.string().optional(),
        status: z.enum(['success', 'failure', 'blocked']).optional(),
      }))
      .query(async ({ ctx, input }) => {
        // Only allow admin users to view audit logs
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only administrators can view audit logs',
          });
        }

        return await getAuditLogs({
          limit: input.limit,
          offset: input.offset,
          action: input.action,
          status: input.status,
        });
      }),

    getFailedLogins: protectedProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only administrators can view audit logs',
          });
        }

        return await getFailedAuthAttempts(input.limit);
      }),

    getBlockedRequests: protectedProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only administrators can view audit logs',
          });
        }

        return await getBlockedRequests(input.limit);
      }),
  }),
});

export type AppRouter = typeof appRouter;
