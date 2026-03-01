"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Input } from "@/components/ui";

type Contact = { id: string; name: string; email?: string; relationship?: string; connection?: { token: string; status: string } };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    const res = await fetch("/api/contacts");
    setContacts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addContact(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email })
    });
    setName("");
    setEmail("");
    await load();
  }

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-xl font-semibold">Trusted contacts</h1>
        <form onSubmit={addContact} className="mt-3 grid gap-2 md:grid-cols-3">
          <Input placeholder="Name" value={name} onChange={(e: any) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Button type="submit">Add contact</Button>
        </form>
      </Card>
      <Card>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact.id} className="rounded-md border p-3">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-slate-600">{contact.email}</p>
              <p className="text-xs text-slate-500">Invite token: {contact.connection?.token}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
