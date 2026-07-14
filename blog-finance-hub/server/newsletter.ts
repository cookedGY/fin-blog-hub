import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createNewsletterSubscriber,
  getNewsletterSubscriberByEmail,
  getAllActiveNewsletterSubscribers,
  getNewsletterSubscribers,
  unsubscribeNewsletterSubscriber,
  resubscribeNewsletterSubscriber,
  getNewsletterEmailLogs,
} from "./db";

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        subscriptionSource: z.string().optional(),
        postSlug: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if subscriber already exists
      const existing = await getNewsletterSubscriberByEmail(input.email);
      if (existing) {
        if (existing.isActive) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already subscribed to our newsletter",
          });
        } else {
          // Resubscribe if previously unsubscribed
          await resubscribeNewsletterSubscriber(input.email);
          return { success: true, message: "Welcome back!" };
        }
      }

      // Create new subscriber
      await createNewsletterSubscriber({
        email: input.email,
        name: input.name || null,
        subscriptionSource: input.subscriptionSource || null,
        isActive: true,
        subscribedAt: new Date(),
      });

      return { success: true, message: "Successfully subscribed!" };
    }),

  unsubscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      await unsubscribeNewsletterSubscriber(input.email);
      return { success: true, message: "You have been unsubscribed" };
    }),

  // Admin procedures
  getSubscribers: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can view subscribers",
        });
      }
      return await getNewsletterSubscribers(input.limit, input.offset);
    }),

  getActiveSubscribers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only administrators can view subscribers",
      });
    }
    return await getAllActiveNewsletterSubscribers();
  }),

  getEmailLogs: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can view email logs",
        });
      }
      return await getNewsletterEmailLogs(input.limit, input.offset);
    }),
});
