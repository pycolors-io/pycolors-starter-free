'use client';

import Link from 'next/link';

import { cn } from '@pycolors/ui';

const AUTH_LINKS = [
  { label: 'Login', href: '/login', ariaLabel: 'Open login page' },
  {
    label: 'Register',
    href: '/register',
    ariaLabel: 'Open register page',
  },
  {
    label: 'Reset',
    href: '/forgot-password',
    ariaLabel: 'Open password reset page',
  },
] satisfies ReadonlyArray<{
  label: string;
  href: string;
  ariaLabel: string;
}>;

const FOOTER_LINKS = [
  {
    label: 'Docs',
    href: 'https://pycolors.io/docs/starter',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/pycolors-io/pycolors-starter-free',
  },
] satisfies ReadonlyArray<{
  label: string;
  href: string;
}>;

type AppSidebarFooterProps = Readonly<{
  onNavigate?: () => void;
  className?: string;
}>;

export function AppSidebarFooter({
  onNavigate,
  className,
}: AppSidebarFooterProps) {
  return (
    <div className={cn('mt-auto space-y-4 pt-6', className)}>
      <div className="space-y-2 border-t border-border/60 pt-4">
        <div className="text-xs font-medium text-muted-foreground">
          Demo auth
        </div>

        <div className="flex flex-wrap gap-2">
          {AUTH_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              onClick={onNavigate}
              className="rounded-md border border-border/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        {FOOTER_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
