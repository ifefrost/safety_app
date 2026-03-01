"use client";

import { Button } from "@/components/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-md border border-red-300 bg-red-50 p-4">
      <h2 className="font-semibold text-red-700">Something went wrong</h2>
      <p className="text-sm">An unexpected error occurred. Please try again.</p>
      <Button onClick={reset} className="mt-3 bg-red-600">
        Retry
      </Button>
    </div>
  );
}
