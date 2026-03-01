"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";

export default function SosPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  async function endSos() {
    await fetch(`/api/sos/${params.id}/end`, { method: "POST" });
    router.push("/dashboard");
  }

  return (
    <Card className="max-w-xl space-y-3 border-red-300">
      <h1 className="text-xl font-semibold text-red-700">SOS active</h1>
      <p className="text-sm text-slate-600">Your trusted contacts were alerted. Share location continuously while active.</p>
      <div className="flex flex-wrap gap-2">
        <a className="rounded-md bg-red-600 px-4 py-2 text-white" href="tel:911">
          Call emergency
        </a>
        <Button onClick={endSos} className="bg-slate-900">
          End SOS
        </Button>
      </div>
    </Card>
  );
}
