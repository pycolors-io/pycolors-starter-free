import type { ReactNode } from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@pycolors/ui';

export function AuthShell({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="p-0 text-center">
          <CardTitle className="text-xl">{title}</CardTitle>

          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-4">
          {children}

          <div className="rounded-md border border-border/60 bg-muted/30 p-3 text-sm">
            <div className="font-medium">OAuth</div>
            <div className="mt-1 text-muted-foreground">
              Google / GitHub sign-in coming soon.
            </div>
          </div>

          {footer ? (
            <div className="pt-1 text-sm text-muted-foreground text-center">
              {footer}
            </div>
          ) : null}

          <div className="pt-1 text-xs text-muted-foreground text-center">
            <Link
              href="/dashboard"
              className="underline underline-offset-4"
            >
              Back to dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
