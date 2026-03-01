import { Card } from "@/components/ui";
import { canViewAlert } from "@/lib/services/authorization";
import { prisma } from "@/lib/db/prisma";

export default async function ContactViewPage({ params }: { params: { token: string } }) {
  const access = await canViewAlert(params.token);
  if (!access) return <Card>No active alert or invalid token.</Card>;

  const user = await prisma.user.findUnique({ where: { id: access.ownerId } });
  const location = await prisma.locationPoint.findFirst({
    where: { userId: access.ownerId },
    orderBy: { recordedAt: "desc" }
  });

  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-semibold">{user?.name ?? user?.email} alert status</h1>
      <p>Active incident: {access.sos ? "SOS" : "Expired check-in"}</p>
      {location ? (
        <a className="text-brand underline" href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}`}>
          Last known location ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
        </a>
      ) : (
        <p>No location shared yet.</p>
      )}
    </Card>
  );
}
