"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input } from "@/components/ui";

type Contact = { id: string; name: string };

export default function NewPlanPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/contacts").then((r) => r.json()).then(setContacts);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/plans", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, description, contactIds: selected, tags: ["commute"] })
    });
    const data = await res.json();
    router.push(`/plans/${data.id}`);
  }

  return (
    <Card className="max-w-2xl">
      <h1 className="text-xl font-semibold">Create safety plan</h1>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <Input placeholder="Plan title" value={title} onChange={(e: any) => setTitle(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e: any) => setDescription(e.target.value)} />
        <div>
          <p className="mb-2 text-sm font-medium">Default contacts</p>
          <div className="space-y-1">
            {contacts.map((contact) => (
              <label key={contact.id} className="block text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(contact.id)}
                  onChange={(e) =>
                    setSelected((curr) =>
                      e.target.checked ? [...curr, contact.id] : curr.filter((id) => id !== contact.id)
                    )
                  }
                  className="mr-2"
                />
                {contact.name}
              </label>
            ))}
          </div>
        </div>
        <Button type="submit">Save plan</Button>
      </form>
    </Card>
  );
}
