import type { ReactNode } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pycolors/ui';

export function AuthShell({
  title,
  description,
  footer,
  children,
}: Readonly<{
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="p-4">
        <CardHeader className="p-0 text-center">
          <CardTitle className="text-xl">{title}</CardTitle>

          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-4 p-0 pt-4">
          {children}

          <div className="rounded-md border border-border/60 bg-muted/30 p-3 text-sm">
            <div className="font-medium">OAuth</div>
            <div className="mt-1 text-muted-foreground">
              Ready for Google, GitHub, or enterprise SSO providers.
            </div>
          </div>

          {footer ? (
            <div className="pt-1 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          ) : null}

          <div className="pt-1 text-center text-xs text-muted-foreground">
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
