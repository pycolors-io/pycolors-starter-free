'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  PasswordInput,
  Skeleton,
} from '@pycolors/ui';

import { AuthShell } from '@/components/auth/auth-shell';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 350);

    return () => clearTimeout(timeout);
  }, []);

  const canSubmit =
    email.trim().length > 3 && password.trim().length > 5;

  return (
    <AuthShell
      title="Sign in"
      description="Access your workspace and continue building."
      footer={
        <>
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="font-medium underline underline-offset-4"
          >
            Create one
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Authentication-ready surface</AlertTitle>

        <AlertDescription>
          This authentication flow is prepared for providers such as
          Auth.js, Clerk, Supabase, Cognito, or custom backend
          integrations.
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />

          <Skeleton className="ml-auto h-10 w-32" />
        </div>
      ) : (
        <form className="space-y-3">
          <Input
            label="Email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            helperText="Use the email associated with your workspace."
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            helperText="Prepared for secure authentication flows and validation."
          />

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm underline underline-offset-4"
            >
              Forgot password?
            </Link>

            <Button
              type="button"
              disabled={!canSubmit}
              className="gap-2"
            >
              Sign in
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            After authentication succeeds, redirect users to their
            workspace dashboard and initialize the active session.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
