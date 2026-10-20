import { describe, expect, it } from "vitest";
import { SignJWT, jwtVerify } from "jose";
import { sessionSigningKey } from "./_core/sessionKey";

describe("session signing configuration", () => {
  it.each(["", "short", "a".repeat(31)])("rejects insufficient key material", secret => {
    expect(() => sessionSigningKey(secret)).toThrow("JWT_SECRET");
  });

  it("accepts a configured key and rejects a token signed with another key", async () => {
    // Test fixtures only, never production credentials.
    const key = sessionSigningKey("test-only-signing-key-".repeat(2));
    const other = sessionSigningKey("another-test-only-key-".repeat(2));
    const token = await new SignJWT({ openId: "test" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1m")
      .sign(key);
    await expect(jwtVerify(token, key)).resolves.toHaveProperty("payload.openId", "test");
    await expect(jwtVerify(token, other)).rejects.toThrow();
  });
});
