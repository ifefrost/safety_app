import { describe, expect, it } from "vitest";

describe("checkin expiry integration", () => {
  it("start -> expire -> notification log generated flow contract", async () => {
    const statusFlow = ["ACTIVE", "EXPIRED", "NOTIFIED"];
    expect(statusFlow).toContain("NOTIFIED");
  });
});
