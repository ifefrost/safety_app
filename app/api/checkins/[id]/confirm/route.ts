import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const updated = await prisma.checkInSession.updateMany({
    where: { id: params.id, userId: user.id, status: "ACTIVE" },
    data: { status: "ENDED", endedAt: new Date() }
  });
  if (!updated.count) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
