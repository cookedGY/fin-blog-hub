import { describe, it, expect, vi } from "vitest";

// Mock resend module so we don't make real API calls in tests
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: "mock-email-id" }, error: null }),
      },
    })),
  };
});

describe("Resend email credentials", () => {
  it("should have RESEND_API_KEY configured in the environment", () => {
    expect(process.env.RESEND_API_KEY).toBeTruthy();
    expect(process.env.RESEND_API_KEY!.length).toBeGreaterThan(10);
  });

  it("should expose resendApiKey via ENV", async () => {
    const { ENV } = await import("./_core/env");
    expect(ENV.resendApiKey).toBeTruthy();
  });
});

describe("sendContactEmail (Resend)", () => {
  it("should send a contact email without throwing", async () => {
    const { sendContactEmail } = await import("./email");

    await expect(
      sendContactEmail({
        fromName: "Test User",
        fromEmail: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message.",
      })
    ).resolves.not.toThrow();
  });

  it("should throw when RESEND_API_KEY is missing", async () => {
    const originalKey = process.env.RESEND_API_KEY;
    process.env.RESEND_API_KEY = "";

    // Dynamically re-import to pick up cleared env
    vi.resetModules();
    const { sendContactEmail } = await import("./email");

    await expect(
      sendContactEmail({
        fromName: "Test User",
        fromEmail: "test@example.com",
        subject: "Test",
        message: "Test",
      })
    ).rejects.toThrow("RESEND_API_KEY is not configured");

    process.env.RESEND_API_KEY = originalKey;
    vi.resetModules();
  });
});
