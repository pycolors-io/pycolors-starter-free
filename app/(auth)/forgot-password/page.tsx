'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Input,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from '@pycolors/ui';

import { AuthShell } from '@/components/auth/auth-shell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const trimmedEmail = email.trim();

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 320);
    return () => clearTimeout(t);
  }, []);

  const canSubmit = trimmedEmail.length > 3;

  return (
    <AuthShell
      title="Reset password"
      description="Request a reset link."
      footer={
        <>
          Remembered it?{' '}
          <Link
            href="/login"
            className="underline underline-offset-4 font-medium"
          >
            Back to sign in
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Email delivery (coming next)</AlertTitle>
        <AlertDescription>
          In v2, this calls an API and sends a secure reset link. For
          now, the starter exposes the UX surface.
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>
      ) : (
        <form className="space-y-3">
          <Input
            label="Email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            helperText="We’ll send a reset link to this address."
          />

          <div className="flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href="/login">Cancel</Link>
            </Button>

            <Button
              type="button"
              disabled={!canSubmit}
              className="gap-2"
            >
              Send reset link
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Once wired, show a success toast + keep the response
            generic to avoid account enumeration.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
