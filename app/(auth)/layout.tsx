import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <div className="absolute left-0 right-0 top-5 text-center">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:opacity-80 transition"
        >
          PyColors SaaS
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">
          Production-ready starter for modern SaaS
        </p>
      </div>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
