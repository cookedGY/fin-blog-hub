import { describe, expect, it, vi } from "vitest";

vi.mock("./storage", () => ({ storagePut: vi.fn() }));
import { storagePut } from "./storage";
import { appRouter } from "./routers";

const caller = appRouter.createCaller({
  user: {
    id: 1, openId: "test", name: "Test", email: null, loginMethod: null,
    role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date(),
  },
  req: {} as any,
  res: {} as any,
});

describe("upload payload validation", () => {
  it.each([
    { fileData: Buffer.from("payload").toString("base64"), fileSize: 1 },
    { fileData: "%%%not-base64%%%", fileSize: 7 },
    { fileData: "", fileSize: 1 },
    { fileData: Buffer.from("payload").toString("base64") + "!", fileSize: 7 },
  ])("rejects malformed or misreported payload before storage", async input => {
    vi.mocked(storagePut).mockClear();
    await expect(caller.files.upload({
      filename: "test.txt", mimeType: "text/plain", projectCategory: "finance",
      ...input,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(storagePut).not.toHaveBeenCalled();
  });
});
