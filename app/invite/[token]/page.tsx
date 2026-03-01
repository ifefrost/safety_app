"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

export default function InviteTokenPage() {
  const { token } = useParams<{ token: string }>();
  const [done, setDone] = useState(false);

  async function confirm() {
    await fetch("/api/contacts/confirm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token })
    });
    setDone(true);
  }

  return (
    <Card className="max-w-md">
      <h1 className="text-xl font-semibold">Contact invite</h1>
      {done ? <p>Confirmed. You can now receive alerts.</p> : <Button onClick={confirm}>Confirm connection</Button>}
    </Card>
  );
}
