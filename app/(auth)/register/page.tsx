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

export default function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 350);

    return () => clearTimeout(timeout);
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
      description="Create your workspace and start building."
      footer={
        <>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium underline underline-offset-4"
          >
            Sign in
          </Link>
          .
        </>
      }
    >
      <Alert>
        <AlertTitle>Workspace-ready signup flow</AlertTitle>

        <AlertDescription>
          Ready for authentication and workspace onboarding flows.
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

          <Skeleton className="ml-auto h-10 w-44" />
        </div>
      ) : (
        <form className="space-y-3">
          <Input
            label="Full name"
            placeholder="Patrice Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            helperText="Used for profile display, team visibility, and invitations."
          />

          <Input
            label="Work email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            helperText="Used for login, billing, and workspace access."
          />

          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            helperText="Use at least 8 characters for a secure account."
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
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

          <div className="flex items-center justify-between gap-4">
            <div className="text-xs leading-5 text-muted-foreground">
              By creating an account, you agree to the product terms
              and workspace policies.
            </div>

            <Button
              type="button"
              disabled={!canSubmit}
              className="shrink-0 gap-2"
            >
              Create account
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            After signup succeeds, continue to onboarding or open the
            workspace dashboard.
          </div>
        </form>
      )}
    </AuthShell>
  );
}
