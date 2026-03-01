import { prisma } from "@/lib/db/prisma";

export async function assertPlanOwner(planId: string, userId: string) {
  const plan = await prisma.safetyPlan.findFirst({ where: { id: planId, userId } });
  if (!plan) throw new Error("Forbidden");
  return plan;
}

export async function canViewAlert(token: string) {
  const connection = await prisma.contactConnection.findFirst({
    where: { token, status: "CONFIRMED" },
    include: { contact: true }
  });

  if (!connection) return null;

  const [checkIn, sos] = await Promise.all([
    prisma.checkInSession.findFirst({
      where: { userId: connection.contact.ownerId, status: "EXPIRED" },
      orderBy: { createdAt: "desc" }
    }),
    prisma.sosSession.findFirst({
      where: { userId: connection.contact.ownerId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" }
    })
  ]);

  if (!checkIn && !sos) return null;
  return { ownerId: connection.contact.ownerId, checkIn, sos };
}
