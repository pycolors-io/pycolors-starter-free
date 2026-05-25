'use client';

import * as React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  PasswordInput,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

type SettingsTab = 'profile' | 'organization' | 'security' | 'danger';

export default function SettingsPage() {
  const [tab, setTab] = React.useState<SettingsTab>('profile');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, []);

  const profile = { name: 'Patrice', email: 'patrice@pycolors.io' };
  const organization = {
    name: 'PyColors SaaS',
    slug: 'pycolors-saas',
  };

  return (
    <PageShell
      title="Settings"
      description="Account, workspace, security, and destructive action patterns."
      actions={
        <Button size="sm" type="button" disabled>
          Save changes
        </Button>
      }
      meta={
        <Alert>
          <AlertTitle>Production-ready settings surface</AlertTitle>
          <AlertDescription>
            A structured settings experience with tabs, forms, helper
            text, loading states, and safe destructive patterns for
            modern SaaS products.
          </AlertDescription>
        </Alert>
      }
    >
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage profile, organization, security, and account-level
            controls from a single workspace surface.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as SettingsTab)}
          >
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="organization">
                Organization
              </TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="danger">Danger zone</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Personal identity fields prepared for
                      authenticated user data.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-0 pt-4">
                    {isLoading ? (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-9 w-40" />
                      </div>
                    ) : (
                      <>
                        <Input
                          label="Full name"
                          defaultValue={profile.name}
                          disabled
                          helperText="Connect this field to your user profile update flow."
                        />

                        <Input
                          label="Email"
                          defaultValue={profile.email}
                          disabled
                          helperText="Prepared for verification and email change workflows."
                        />

                        <Button type="button" size="sm" disabled>
                          Update profile
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Product preferences for localization,
                      notifications, and workspace experience.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="Preferences are ready to extend"
                      description="Add timezone, notification, theme, and locale controls when your product needs them."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Configure preferences
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organization">
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Organization</CardTitle>
                    <CardDescription>
                      Workspace identity fields prepared for
                      team-based SaaS products.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-0 pt-4">
                    {isLoading ? (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-9 w-48" />
                      </div>
                    ) : (
                      <>
                        <Input
                          label="Organization name"
                          defaultValue={organization.name}
                          disabled
                          helperText="Connect this field to your organization update flow."
                        />

                        <Input
                          label="Workspace slug"
                          defaultValue={organization.slug}
                          disabled
                          helperText="Used for workspace URLs, invites, and product routing."
                        />

                        <Button type="button" size="sm" disabled>
                          Update organization
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Billing profile</CardTitle>
                    <CardDescription>
                      Company identity surface for B2B invoicing and
                      subscription operations.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="Billing profile ready"
                      description="Extend with company name, VAT number, billing address, and invoice email."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Manage billing profile
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Secure credential update surface prepared for
                      re-authentication and validation rules.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-0 pt-4">
                    {isLoading ? (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-9 w-44" />
                      </div>
                    ) : (
                      <>
                        <PasswordInput
                          label="Current password"
                          placeholder="********"
                          disabled
                          helperText="Prepared for re-authentication before sensitive changes."
                        />

                        <PasswordInput
                          label="New password"
                          placeholder="********"
                          disabled
                          helperText="Ready for validation rules, strength checks, and secure submission."
                        />

                        <Button type="button" size="sm" disabled>
                          Update password
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>
                      Device and token management for secure account
                      control.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="Session management ready"
                      description="Extend with active sessions, device history, token rotation, and revoke actions."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Manage sessions
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="danger">
              <div className="mt-4 grid gap-4">
                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Danger zone</CardTitle>
                    <CardDescription>
                      Destructive actions are isolated, explicit, and
                      designed for confirmation-first workflows.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-0 pt-4">
                    <div className="rounded-md border border-border/60 p-3">
                      <div className="text-sm font-medium">
                        Delete account
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Prepared for confirmation dialogs, typed
                        verification, and irreversible account
                        removal.
                      </div>

                      <div className="mt-3">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled
                        >
                          Delete account
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border border-border/60 p-3">
                      <div className="text-sm font-medium">
                        Delete organization
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Prepared for owner-only permissions, typed
                        confirmation, and irreversible workspace
                        removal.
                      </div>

                      <div className="mt-3">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled
                        >
                          Delete organization
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageShell>
  );
}
