"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button, Card, Input } from "@/components/ui";

export default function SignInPage() {
  const [email, setEmail] = useState("demo@safety.app");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, callbackUrl: "/dashboard" });
  };

  return (
    <Card className="mx-auto mt-12 max-w-md">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <p className="mt-1 text-sm text-slate-600">Use passwordless email or dev credentials.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <Input value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Card>
  );
}
