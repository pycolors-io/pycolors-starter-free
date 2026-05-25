'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Skeleton,
} from '@pycolors/ui';

import { AuthShell } from '@/components/auth/auth-shell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 320);

    return () => clearTimeout(timeout);
  }, []);

  const trimmedEmail = email.trim();
  const canSubmit = trimmedEmail.length > 3;

  return (
    <AuthShell
      title="Reset password"
      description="Request a secure reset link."
      footer={
        <>
          Remembered it?{' '}
          <Link
            href="/login"
            className="font-medium underline underline-offset-4"
          >
            Back to sign in
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Password recovery ready</AlertTitle>

        <AlertDescription>
          Prepared for secure reset links and email delivery.
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
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            helperText="Use the email associated with your workspace."
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
            Keep reset responses generic to protect account privacy.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
