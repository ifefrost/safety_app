import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Safety App",
  description: "Personal safety companion"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/dashboard" className="font-semibold text-brand">
              Safety App
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/contacts">Contacts</Link>
              <Link href="/plans/new">New plan</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
