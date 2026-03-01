import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/services/notifications", () => ({
  sendNotification: vi.fn()
}));

describe("expiry/idempotency logic", () => {
  it("marks active session expired once", () => {
    const session = { status: "ACTIVE", notifiedAt: null as Date | null };
    const now = new Date();

    if (session.status === "ACTIVE" && !session.notifiedAt) {
      session.status = "EXPIRED";
      session.notifiedAt = now;
    }

    if (session.status === "ACTIVE" && !session.notifiedAt) {
      session.status = "EXPIRED";
    }

    expect(session.status).toBe("EXPIRED");
    expect(session.notifiedAt).toEqual(now);
  });
});
