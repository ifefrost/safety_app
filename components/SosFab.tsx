"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export default function SosFab() {
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function trigger() {
    setBusy(true);
    const res = await fetch("/api/sos/start", { method: "POST", body: JSON.stringify({ message: "SOS triggered" }) });
    const data = await res.json();
    router.push(`/sos/${data.id}`);
  }

  return (
    <div className="fixed bottom-6 right-6">
      {!confirm ? (
        <Button className="rounded-full bg-red-600 px-6 py-3" onClick={() => setConfirm(true)}>
          SOS
        </Button>
      ) : (
        <div className="rounded-xl border bg-white p-3 shadow-lg">
          <p className="mb-2 text-sm">Confirm SOS?</p>
          <div className="flex gap-2">
            <Button className="bg-red-600" onClick={trigger} disabled={busy}>
              {busy ? "Sending..." : "Yes, send"}
            </Button>
            <Button className="bg-slate-300 text-slate-800" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
