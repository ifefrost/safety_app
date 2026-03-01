import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const { contactId } = await req.json();
  const connection = await prisma.contactConnection.findFirst({
    where: { contactId, contact: { ownerId: user.id } }
  });
  if (!connection) return NextResponse.json({ error: "Contact not found" }, { status: 404 });

  return NextResponse.json({
    inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${connection.token}`
  });
}
