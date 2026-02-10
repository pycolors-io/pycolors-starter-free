import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  FolderKanban,
  Users,
} from 'lucide-react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@pycolors/ui';

function StatCard({
  label,
  value,
  hint,
  href,
  hrefLabel = 'View',
  footer,
}: {
  label: string;
  value: string | number;
  hint: string;
  href?: string;
  hrefLabel?: string;
  footer?: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardDescription className="flex items-center gap-2">
              <span>{label}</span>
            </CardDescription>

            <CardTitle className="text-3xl">{value}</CardTitle>
          </div>

          {href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              aria-label={`${hrefLabel}: ${label}`}
            >
              {hrefLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-4 space-y-2">
        <div className="text-sm text-muted-foreground">{hint}</div>

        {footer ? (
          <div className="text-xs text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  subtitle,
  href,
  hrefLabel = 'Open',
  icon,
}: {
  title: string;
  subtitle: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-border/60 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          {icon ? (
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {icon}
            </span>
          ) : null}

          <div className="min-w-0">
            <div className="text-sm font-medium">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {subtitle}
            </div>
          </div>
        </div>

        {href ? (
          <Link
            href={href}
            className="shrink-0 text-sm underline underline-offset-4"
          >
            {hrefLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const projectsCount = 3;
  const membersCount = 16;
  const plan = 'Pro';

  // v1: keep deterministic (no fetch) — page should feel instant
  const isReady = true;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold leading-tight tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your product overview (v1).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">View projects</Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button size="sm" disabled>
              New report
            </Button>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Coming next
            </span>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle>Starter SaaS v1</CardTitle>
              <CardDescription>
                Next 15 + Tailwind v4 + tokens + app layout + core
                pages.
              </CardDescription>
            </div>

            <Badge className="inline-flex items-center gap-2">
              {isReady ? (
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Activity className="h-4 w-4" aria-hidden="true" />
              )}
              {isReady ? 'Ready' : 'Loading'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total projects"
          value={projectsCount}
          hint="Across your organization"
          href="/projects"
          hrefLabel="Projects"
          footer="CRUD v1: table + row actions + dialogs (local-only)."
        />

        <StatCard
          label="Members"
          value={membersCount}
          hint="Active across projects"
          href="/admin"
          hrefLabel="Admin"
          footer="B2B readiness: members + invitations (mock)."
        />

        <StatCard
          label="Plan"
          value={plan}
          hint="Subscription status"
          href="/billing"
          hrefLabel="Billing"
          footer="Stripe portal coming next (server route + redirect)."
        />
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Primary */}
        <Card className="p-4 lg:col-span-2">
          <CardHeader className="p-0">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Minimal but actionable (links validate navigation).
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 p-0 pt-4">
            <ActivityItem
              icon={
                <FolderKanban
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              }
              title="Deploy completed"
              subtitle="Acme Workspace · 11:42"
              href="/projects"
              hrefLabel="Projects"
            />
            <ActivityItem
              icon={<Users className="h-4 w-4" aria-hidden="true" />}
              title="Member invited"
              subtitle="Internal Tools · 10:18"
              href="/admin"
              hrefLabel="Admin"
            />
            <ActivityItem
              icon={
                <CreditCard className="h-4 w-4" aria-hidden="true" />
              }
              title="Subscription renewed"
              subtitle="Yesterday"
              href="/billing"
              hrefLabel="Billing"
            />
          </CardContent>
        </Card>

        {/* Secondary */}
        <div className="space-y-6">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>
                Common paths users expect.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-2 p-0 pt-4">
              <Button asChild variant="outline">
                <Link href="/settings">Update profile</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/billing">Manage billing</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin">Invite members</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Next step</CardTitle>
              <CardDescription>
                Keep shipping vertical slices: Projects → Admin →
                Billing → Auth.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 p-0 pt-4">
              <Button asChild variant="outline">
                <Link href="/projects">Projects CRUD</Link>
              </Button>
              <Button asChild>
                <Link href="/admin">Members management</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
