import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { planSchema } from "@/lib/validation/schemas";

export async function GET() {
  const user = await getCurrentUser();
  const plans = await prisma.safetyPlan.findMany({ where: { userId: user.id }, include: { contacts: true } });
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const parsed = planSchema.parse(await req.json());
  const plan = await prisma.safetyPlan.create({
    data: {
      userId: user.id,
      title: parsed.title,
      description: parsed.description,
      tags: parsed.tags,
      safeWords: parsed.safeWords,
      instructions: parsed.instructions,
      contacts: { create: parsed.contactIds.map((contactId) => ({ contactId })) }
    }
  });
  return NextResponse.json(plan, { status: 201 });
}
