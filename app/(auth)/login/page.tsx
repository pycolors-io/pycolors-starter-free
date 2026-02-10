'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Input,
  Alert,
  AlertTitle,
  AlertDescription,
  PasswordInput,
  Skeleton,
} from '@pycolors/ui';

import { AuthShell } from '@/components/auth/auth-shell';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // simulate loading → validates skeleton
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const canSubmit =
    email.trim().length > 3 && password.trim().length > 5;

  return (
    <AuthShell
      title="Sign in"
      description="Access your workspace."
      footer={
        <>
          Don’t have an account?{' '}
          <Link
            href="/register"
            className="underline underline-offset-4 font-medium"
          >
            Create one
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Authentication not wired</AlertTitle>
        <AlertDescription>
          This starter ships a complete authentication surface. Next
          step: connect your provider (Auth.js, Clerk, Supabase, or
          custom backend).
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>
      ) : (
        <form className="space-y-3">
          <Input
            label="Email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            helperText="Use your work email."
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            helperText="Minimum 6 characters."
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
            After wiring auth, redirect users to{' '}
            <code className="font-mono">/dashboard</code>.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
