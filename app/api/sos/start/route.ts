import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { sosSchema } from "@/lib/validation/schemas";
import { sendNotification } from "@/lib/services/notifications";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const parsed = sosSchema.parse(await req.json());
  const session = await prisma.sosSession.create({ data: { userId: user.id, message: parsed.message } });

  const plans = await prisma.safetyPlan.findMany({
    where: { userId: user.id },
    include: { contacts: { include: { contact: true } } },
    take: 1
  });
  for (const c of plans.flatMap((p) => p.contacts)) {
    if (c.contact.email) {
      await sendNotification({
        userId: user.id,
        channel: "EMAIL",
        recipient: c.contact.email,
        subject: `SOS from ${user.name ?? user.email}`,
        payload: { sessionId: session.id, message: parsed.message }
      });
    }
  }

  return NextResponse.json(session, { status: 201 });
}
