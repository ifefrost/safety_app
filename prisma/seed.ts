import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@safety.app" },
    update: {},
    create: {
      email: "demo@safety.app",
      name: "Demo User",
      timezone: "America/New_York"
    }
  });

  const contact = await prisma.contact.create({
    data: {
      ownerId: user.id,
      name: "Alex Trust",
      email: "alex@example.com",
      relationship: "Friend",
      connection: { create: { token: "demo-token", status: "CONFIRMED", confirmedAt: new Date() } }
    }
  });

  await prisma.safetyPlan.create({
    data: {
      userId: user.id,
      title: "Walk home",
      description: "Night commute",
      tags: ["commute"],
      safeWords: ["green"],
      contacts: { create: [{ contactId: contact.id }] }
    }
  });
}

main().finally(async () => prisma.$disconnect());
