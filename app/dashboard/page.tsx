import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { Badge, Button, Card } from "@/components/ui";
import SosFab from "@/components/SosFab";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const [plans, activeCheckins] = await Promise.all([
    prisma.safetyPlan.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    prisma.checkInSession.findMany({ where: { userId: user.id, status: "ACTIVE" }, include: { plan: true } })
  ]);

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">Welcome, {user.name ?? user.email}</h1>
        <p className="text-sm text-slate-600">Timezone: {user.timezone}</p>
        <div className="mt-4 flex gap-2">
          <Link href="/plans/new">
            <Button>Create plan</Button>
          </Link>
          {plans[0] && (
            <Link href={`/plans/${plans[0].id}`}>
              <Button className="bg-slate-900">Start check-in</Button>
            </Link>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">Active sessions</h2>
        <div className="mt-2 space-y-2">
          {activeCheckins.length ? (
            activeCheckins.map((session) => (
              <Link key={session.id} href={`/checkins/${session.id}`} className="block rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span>{session.plan.title}</span>
                  <Badge>Active</Badge>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">No active check-ins.</p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">Safety plans</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {plans.map((plan) => (
            <Link key={plan.id} href={`/plans/${plan.id}`} className="rounded-md border p-3 hover:bg-slate-50">
              <div className="font-medium">{plan.title}</div>
              <div className="text-sm text-slate-600">{plan.description ?? "No description"}</div>
            </Link>
          ))}
        </div>
      </Card>
      <SosFab />
    </div>
  );
}
