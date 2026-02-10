'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Button,
  Input,
  PasswordInput,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from '@pycolors/ui';

import { AuthShell } from '@/components/auth/auth-shell';

export default function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const passwordsMatch =
    confirm.length === 0 ? true : password === confirm;

  const canSubmit =
    trimmedName.length > 2 &&
    trimmedEmail.length > 3 &&
    password.trim().length >= 8 &&
    confirm.trim().length >= 8 &&
    password === confirm;

  return (
    <AuthShell
      title="Create account"
      description="Start your workspace."
      footer={
        <>
          Already have an account?{' '}
          <Link
            href="/login"
            className="underline underline-offset-4 font-medium"
          >
            Sign in
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Workspace onboarding (coming next)</AlertTitle>
        <AlertDescription>
          In v2, after signup you’ll pick an organization name and
          invite members.
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-44 ml-auto" />
        </div>
      ) : (
        <form className="space-y-3">
          <Input
            label="Full name"
            placeholder="Patrice Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            helperText="Used for team display and invitations."
          />

          <Input
            label="Work email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            helperText="Used for login, billing, and team access."
          />

          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            helperText="Minimum 8 characters."
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            helperText={
              passwordsMatch
                ? 'Must match the password above.'
                : 'Passwords do not match.'
            }
            error={
              !passwordsMatch ? 'Passwords do not match.' : undefined
            }
          />

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              By creating an account, <br />
              you agree to Terms (link later).
            </div>

            <Button
              type="button"
              disabled={!canSubmit}
              className="gap-2"
            >
              Create account
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            After wiring auth, redirect users to{' '}
            <code className="font-mono">/dashboard</code> or
            onboarding.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
