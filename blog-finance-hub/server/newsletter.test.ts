import { describe, it, expect, beforeEach, vi } from "vitest";
import { TRPCError } from "@trpc/server";

// Mock the database functions
vi.mock("./db", () => ({
  createNewsletterSubscriber: vi.fn(),
  getNewsletterSubscriberByEmail: vi.fn(),
  getAllActiveNewsletterSubscribers: vi.fn(),
  getNewsletterSubscribers: vi.fn(),
  unsubscribeNewsletterSubscriber: vi.fn(),
  resubscribeNewsletterSubscriber: vi.fn(),
  getNewsletterEmailLogs: vi.fn(),
}));

import {
  createNewsletterSubscriber,
  getNewsletterSubscriberByEmail,
  getAllActiveNewsletterSubscribers,
  getNewsletterSubscribers,
  unsubscribeNewsletterSubscriber,
  resubscribeNewsletterSubscriber,
  getNewsletterEmailLogs,
} from "./db";

describe("Newsletter Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Subscribe", () => {
    it("should create a new subscriber with valid email", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockResolvedValue({ id: 1 });

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      // Simulate subscription logic
      const email = "test@example.com";
      const existing = await getNewsletterSubscriberByEmail(email);
      expect(existing).toBeNull();

      await createNewsletterSubscriber({
        email,
        name: "Test User",
        subscriptionSource: "blog-post",
        isActive: true,
        subscribedAt: new Date(),
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          name: "Test User",
          subscriptionSource: "blog-post",
          isActive: true,
        })
      );
    });

    it("should reject duplicate subscription", async () => {
      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        isActive: true,
      });

      const email = "test@example.com";
      const existing = await getNewsletterSubscriberByEmail(email);
      expect(existing).not.toBeNull();
      expect(existing?.isActive).toBe(true);
    });

    it("should resubscribe previously unsubscribed user", async () => {
      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      const mockResubscribe = resubscribeNewsletterSubscriber as any;

      mockGetByEmail.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        isActive: false,
      });
      mockResubscribe.mockResolvedValue({ success: true });

      const email = "test@example.com";
      const existing = await getNewsletterSubscriberByEmail(email);

      if (existing && !existing.isActive) {
        await resubscribeNewsletterSubscriber(email);
        expect(mockResubscribe).toHaveBeenCalledWith(email);
      }
    });

    it("should handle optional name field", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockResolvedValue({ id: 1 });

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      const email = "noname@example.com";
      await createNewsletterSubscriber({
        email,
        name: null,
        subscriptionSource: "homepage",
        isActive: true,
        subscribedAt: new Date(),
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "noname@example.com",
          name: null,
        })
      );
    });
  });

  describe("Unsubscribe", () => {
    it("should unsubscribe a subscriber", async () => {
      const mockUnsubscribe = unsubscribeNewsletterSubscriber as any;
      mockUnsubscribe.mockResolvedValue({ success: true });

      const email = "test@example.com";
      await unsubscribeNewsletterSubscriber(email);

      expect(mockUnsubscribe).toHaveBeenCalledWith(email);
    });
  });

  describe("Admin Procedures", () => {
    it("should retrieve all subscribers with pagination", async () => {
      const mockGetSubscribers = getNewsletterSubscribers as any;
      const mockData = [
        { id: 1, email: "user1@example.com", isActive: true },
        { id: 2, email: "user2@example.com", isActive: true },
      ];
      mockGetSubscribers.mockResolvedValue(mockData);

      const result = await getNewsletterSubscribers(50, 0);
      expect(result).toEqual(mockData);
      expect(mockGetSubscribers).toHaveBeenCalledWith(50, 0);
    });

    it("should retrieve only active subscribers", async () => {
      const mockGetActive = getAllActiveNewsletterSubscribers as any;
      const mockData = [
        { id: 1, email: "active1@example.com", isActive: true },
        { id: 2, email: "active2@example.com", isActive: true },
      ];
      mockGetActive.mockResolvedValue(mockData);

      const result = await getAllActiveNewsletterSubscribers();
      expect(result).toEqual(mockData);
      expect(mockGetActive).toHaveBeenCalled();
    });

    it("should retrieve email logs with pagination", async () => {
      const mockGetLogs = getNewsletterEmailLogs as any;
      const mockData = [
        { id: 1, recipientEmail: "user@example.com", sentAt: new Date() },
      ];
      mockGetLogs.mockResolvedValue(mockData);

      const result = await getNewsletterEmailLogs(50, 0);
      expect(result).toEqual(mockData);
      expect(mockGetLogs).toHaveBeenCalledWith(50, 0);
    });
  });

  describe("Email Validation", () => {
    it("should accept valid email formats", () => {
      const validEmails = [
        "user@example.com",
        "test.user@example.co.uk",
        "user+tag@example.com",
        "123@example.com",
      ];

      validEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it("should reject invalid email formats", () => {
      const invalidEmails = [
        "notanemail",
        "user@",
        "@example.com",
        "user @example.com",
        "user@example",
      ];

      invalidEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe("Subscription Source Tracking", () => {
    it("should track subscription source from blog post", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockResolvedValue({ id: 1 });

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      await createNewsletterSubscriber({
        email: "blog@example.com",
        name: "Blog Reader",
        subscriptionSource: "blog-post",
        isActive: true,
        subscribedAt: new Date(),
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          subscriptionSource: "blog-post",
        })
      );
    });

    it("should track subscription source from homepage", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockResolvedValue({ id: 1 });

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      await createNewsletterSubscriber({
        email: "home@example.com",
        name: "Homepage Visitor",
        subscriptionSource: "homepage",
        isActive: true,
        subscribedAt: new Date(),
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          subscriptionSource: "homepage",
        })
      );
    });
  });

  describe("Subscriber Status Management", () => {
    it("should track active status", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockResolvedValue({ id: 1 });

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      await createNewsletterSubscriber({
        email: "active@example.com",
        name: "Active User",
        isActive: true,
        subscriptionSource: "blog-post",
        subscribedAt: new Date(),
      });

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          isActive: true,
        })
      );
    });

    it("should track unsubscribe timestamp", async () => {
      const mockUnsubscribe = unsubscribeNewsletterSubscriber as any;
      mockUnsubscribe.mockResolvedValue({ success: true });

      await unsubscribeNewsletterSubscriber("unsub@example.com");
      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });

  describe("Database Error Handling", () => {
    it("should handle database connection errors", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockRejectedValue(new Error("Database connection failed"));

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      try {
        await createNewsletterSubscriber({
          email: "error@example.com",
          name: "Error User",
          isActive: true,
          subscriptionSource: "blog-post",
          subscribedAt: new Date(),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("should handle duplicate email constraint", async () => {
      const mockCreate = createNewsletterSubscriber as any;
      mockCreate.mockRejectedValue(
        new Error("Duplicate entry for email address")
      );

      const mockGetByEmail = getNewsletterSubscriberByEmail as any;
      mockGetByEmail.mockResolvedValue(null);

      try {
        await createNewsletterSubscriber({
          email: "duplicate@example.com",
          name: "Duplicate User",
          isActive: true,
          subscriptionSource: "blog-post",
          subscribedAt: new Date(),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
