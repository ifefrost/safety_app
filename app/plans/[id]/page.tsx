"use client";

import { useRouter, useParams } from "next/navigation";
import { Button, Card, Input } from "@/components/ui";
import { useState } from "react";

export default function PlanDetailPage() {
  const [duration, setDuration] = useState(30);
  const [note, setNote] = useState("");
  const params = useParams<{ id: string }>();
  const router = useRouter();

  async function startCheckin() {
    const res = await fetch("/api/checkins/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ planId: params.id, durationMinutes: duration, note })
    });
    const data = await res.json();
    router.push(`/checkins/${data.id}`);
  }

  return (
    <Card className="max-w-xl space-y-3">
      <h1 className="text-xl font-semibold">Start check-in</h1>
      <p className="text-sm text-slate-600">Set a timer and optional note.</p>
      <label className="block text-sm">Minutes</label>
      <Input type="number" value={duration} onChange={(e: any) => setDuration(Number(e.target.value))} />
      <Input placeholder="Optional note" value={note} onChange={(e: any) => setNote(e.target.value)} />
      <Button onClick={startCheckin}>Start</Button>
    </Card>
  );
}
