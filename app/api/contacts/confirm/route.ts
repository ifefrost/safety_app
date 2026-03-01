import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const updated = await prisma.contactConnection.updateMany({
    where: { token, status: "PENDING" },
    data: { status: "CONFIRMED", confirmedAt: new Date() }
  });
  if (!updated.count) return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
