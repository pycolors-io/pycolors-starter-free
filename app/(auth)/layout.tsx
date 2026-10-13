import { ThemeToggle } from "@/components/theme-toggle";
import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <header className="flex items-center gap-4 px-4 py-5 sm:px-6">
        <div className="min-w-0 flex-1 text-center">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight transition hover:opacity-80"
          >
            PyColors SaaS
          </Link>

          <p className="mt-1 text-xs text-muted-foreground">
            Production-ready starter for modern SaaS
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
