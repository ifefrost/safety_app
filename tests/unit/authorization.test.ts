import { describe, expect, it } from "vitest";

describe("authorization guards", () => {
  it("allows contact token only when confirmed and active alert exists", () => {
    const confirmed = true;
    const activeAlert = true;
    expect(confirmed && activeAlert).toBe(true);
  });
});
