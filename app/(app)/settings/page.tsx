'use client';

import * as React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  PasswordInput,
  Alert,
  AlertTitle,
  AlertDescription,
  EmptyState,
  Skeleton,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

type SettingsTab = 'profile' | 'organization' | 'security' | 'danger';

export default function SettingsPage() {
  const [tab, setTab] = React.useState<SettingsTab>('profile');

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const profile = { name: 'Patrice', email: 'patrice@pycolors.io' };
  const org = { name: 'PyColors SaaS', slug: 'pycolors-saas' };

  return (
    <PageShell
      title="Settings"
      description="Account & organization settings (v1)."
      actions={
        <div className="flex items-center gap-2">
          <Button size="sm" type="button" disabled>
            Save changes
          </Button>
          <span className="text-xs text-muted-foreground">
            Coming next
          </span>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>Starter mode</AlertTitle>
          <AlertDescription>
            Settings are intentionally disabled in v1. The goal is to
            ship a credible UX surface (tabs, forms, helpers, and a
            clear danger zone) before wiring APIs.
          </AlertDescription>
        </Alert>
      }
    >
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Account</CardTitle>
          <CardDescription>
            This page makes the starter feel like a real SaaS:
            predictable navigation, structured forms, and safe
            destructive patterns.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as SettingsTab)}
          >
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile" className="gap-2">
                Profile
              </TabsTrigger>
              <TabsTrigger value="organization" className="gap-2">
                Organization
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                Security
              </TabsTrigger>
              <TabsTrigger value="danger" className="gap-2">
                Danger zone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Identity fields (disabled in v1).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4 space-y-4">
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
                          helperText="Coming next: PATCH /me"
                        />

                        <Input
                          label="Email"
                          defaultValue={profile.email}
                          disabled
                          helperText="Coming next: email verification flow."
                        />

                        <div className="flex items-center gap-2">
                          <Button type="button" size="sm" disabled>
                            Update profile
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Coming next
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Timezone, locale, theme (v2).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="Preferences not wired yet"
                      description="Add timezone, notifications, and UI preferences in v2."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Coming next
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
                      Workspace settings (disabled in v1).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4 space-y-4">
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
                          defaultValue={org.name}
                          disabled
                          helperText="Coming next: PATCH /org"
                        />

                        <Input
                          label="Workspace slug"
                          defaultValue={org.slug}
                          disabled
                          helperText="Used in URLs and invites."
                        />

                        <div className="flex items-center gap-2">
                          <Button type="button" size="sm" disabled>
                            Update organization
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Coming next
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Billing profile</CardTitle>
                    <CardDescription>
                      Invoice identity (B2B-ready).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="Billing profile not set"
                      description="Coming next: company name, VAT, address, invoice email."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Coming next
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
                      Password update flow (disabled in v1).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4 space-y-4">
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
                          helperText="Coming next: re-auth + change password."
                        />

                        <PasswordInput
                          label="New password"
                          placeholder="********"
                          disabled
                          helperText="Coming next: validation rules + strength meter."
                        />

                        <div className="flex items-center gap-2">
                          <Button type="button" size="sm" disabled>
                            Update password
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            Coming next
                          </span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardHeader className="p-0">
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>
                      Revoke devices and rotate tokens (v2).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4">
                    <EmptyState
                      title="No session management yet"
                      description="Coming next: sessions list + revoke + token rotation."
                      action={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled
                        >
                          Coming next
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
                      Destructive actions are explicit and separated.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-4 space-y-4">
                    <div className="rounded-md border border-border/60 p-3">
                      <div className="text-sm font-medium">
                        Delete account
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Coming next: confirmation dialog + typed
                        confirmation.
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled
                        >
                          Delete account
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          Coming next
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md border border-border/60 p-3">
                      <div className="text-sm font-medium">
                        Delete organization
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Coming next: owner-only action + irreversible
                        confirmation.
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled
                        >
                          Delete organization
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          Coming next
                        </span>
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
