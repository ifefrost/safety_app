import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white p-4 shadow-sm", className)} {...props} />;
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-md border border-slate-300 px-3 py-2 text-sm", className)} {...props} />;
}

export function Badge({ children }: PropsWithChildren) {
  return <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">{children}</span>;
}
