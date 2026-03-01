"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";

export default function CheckinPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!expiresAt) return;
      setRemaining(Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    setExpiresAt(new Date(Date.now() + 30 * 60_000));
  }, []);

  async function confirmSafe() {
    await fetch(`/api/checkins/${params.id}/confirm`, { method: "POST" });
    router.push("/dashboard");
  }

  async function extend(minutes: number) {
    const res = await fetch(`/api/checkins/${params.id}/extend`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ minutes })
    });
    if (res.ok) setExpiresAt(new Date((expiresAt ?? new Date()).getTime() + minutes * 60_000));
  }

  async function shareLocation() {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await fetch("/api/location/heartbeat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy })
        });
      },
      () => {
        alert("Location permission denied. You can still continue check-in without location sharing.");
      }
    );
  }

  return (
    <Card className="max-w-xl space-y-3">
      <h1 className="text-xl font-semibold">Active check-in</h1>
      <p className="text-3xl font-bold">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={confirmSafe}>I'm safe</Button>
        <Button className="bg-slate-800" onClick={() => extend(15)}>
          Extend +15m
        </Button>
        <Button className="bg-slate-300 text-slate-800" onClick={shareLocation}>
          Share location now
        </Button>
      </div>
    </Card>
  );
}
