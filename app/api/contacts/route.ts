import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/validation/schemas";

export async function GET() {
  const user = await getCurrentUser();
  const contacts = await prisma.contact.findMany({ where: { ownerId: user.id }, include: { connection: true } });
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const parsed = contactSchema.parse(await req.json());
  const contact = await prisma.contact.create({
    data: {
      ownerId: user.id,
      name: parsed.name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      relationship: parsed.relationship,
      connection: { create: { token: crypto.randomUUID() } }
    }
  });
  return NextResponse.json(contact, { status: 201 });
}
