import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { startCheckinSchema } from "@/lib/validation/schemas";
import { assertPlanOwner } from "@/lib/services/authorization";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const parsed = startCheckinSchema.parse(await req.json());
  await assertPlanOwner(parsed.planId, user.id);

  const expiresAt = new Date(Date.now() + parsed.durationMinutes * 60_000);
  const session = await prisma.checkInSession.create({
    data: { userId: user.id, planId: parsed.planId, expiresAt, note: parsed.note }
  });
  return NextResponse.json(session, { status: 201 });
}
