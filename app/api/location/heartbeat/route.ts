import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { locationSchema } from "@/lib/validation/schemas";

const RETENTION_LIMIT = 100;

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const parsed = locationSchema.parse(await req.json());
  await prisma.locationPoint.create({ data: { userId: user.id, ...parsed } });

  const stale = await prisma.locationPoint.findMany({
    where: { userId: user.id },
    orderBy: { recordedAt: "desc" },
    skip: RETENTION_LIMIT,
    select: { id: true }
  });

  if (stale.length > 0) {
    await prisma.locationPoint.deleteMany({ where: { id: { in: stale.map((x) => x.id) } } });
  }
  return NextResponse.json({ ok: true });
}
