import { prisma } from "@/lib/db/prisma";
import { sendNotification } from "@/lib/services/notifications";

export async function expireCheckins(now = new Date()) {
  const sessions = await prisma.checkInSession.findMany({
    where: { status: "ACTIVE", expiresAt: { lte: now }, notifiedAt: null },
    include: { plan: { include: { contacts: { include: { contact: true } } } }, user: true }
  });

  for (const session of sessions) {
    await prisma.$transaction(async (tx) => {
      const fresh = await tx.checkInSession.findUnique({ where: { id: session.id } });
      if (!fresh || fresh.notifiedAt || fresh.status !== "ACTIVE") return;

      await tx.checkInSession.update({
        where: { id: session.id },
        data: { status: "EXPIRED", notifiedAt: now }
      });

      const location = await tx.locationPoint.findFirst({
        where: { userId: session.userId },
        orderBy: { recordedAt: "desc" }
      });

      for (const c of session.plan.contacts) {
        if (c.contact.email) {
          await sendNotification({
            userId: session.userId,
            channel: "EMAIL",
            recipient: c.contact.email,
            subject: `Safety alert for ${session.user.name ?? session.user.email}`,
            payload: {
              plan: session.plan.title,
              note: session.note,
              expiresAt: session.expiresAt.toISOString(),
              location
            }
          });
        }
      }
    });
  }

  return sessions.length;
}
