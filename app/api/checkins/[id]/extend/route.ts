import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { extendCheckinSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const parsed = extendCheckinSchema.parse(await req.json());

  const session = await prisma.checkInSession.findFirst({ where: { id: params.id, userId: user.id, status: "ACTIVE" } });
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.checkInSession.update({
    where: { id: params.id },
    data: { expiresAt: new Date(session.expiresAt.getTime() + parsed.minutes * 60_000) }
  });

  return NextResponse.json(updated);
}
