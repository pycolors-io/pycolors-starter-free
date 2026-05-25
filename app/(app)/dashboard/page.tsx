import type * as React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  FolderKanban,
  ShieldCheck,
  Users,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from '@pycolors/ui';

import { UpgradeGate } from '@/components/app/upgrade-gate';

type TrendIntent = 'good' | 'neutral' | 'bad';

function StatCard({
  label,
  value,
  hint,
  href,
  hrefLabel = 'View',
  footer,
  trend,
}: Readonly<{
  label: string;
  value: string | number;
  hint: string;
  href?: string;
  hrefLabel?: string;
  footer?: React.ReactNode;
  trend?: Readonly<{
    label: string;
    intent?: TrendIntent;
  }>;
}>) {
  const trendClassByIntent: Record<TrendIntent, string> = {
    good: 'text-emerald-600',
    neutral: 'text-muted-foreground',
    bad: 'text-rose-600',
  };

  const trendClass = trend
    ? trendClassByIntent[trend.intent ?? 'neutral']
    : undefined;

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardDescription className="flex items-center gap-2">
              <span>{label}</span>

              {trend ? (
                <span className={cn('text-xs', trendClass)}>
                  {trend.label}
                </span>
              ) : null}
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

      <CardContent className="space-y-2 p-0 pt-4">
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
}: Readonly<{
  title: string;
  subtitle: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
}>) {
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

function InsightMetric({
  label,
  value,
  description,
  icon: Icon,
}: Readonly<{
  label: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <div className="rounded-md border border-border/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{label}</div>

          <div className="text-2xl font-semibold tracking-tight">
            {value}
          </div>

          <div className="text-sm text-muted-foreground">
            {description}
          </div>
        </div>

        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const isReady = true;

  const projectsCount = 3;
  const membersCount = 16;
  const plan = 'Free';

  const mrr = 1240;
  const activeUsers = 312;
  const churn = '2.1%';
  const uptime = '99.95%';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold leading-tight tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            A focused product overview for tracking users, projects,
            billing signals, and operational health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">View projects</Link>
          </Button>

          <Button size="sm" disabled>
            New report
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle>Production-ready SaaS foundation</CardTitle>

              <CardDescription>
                Next.js, Tailwind, design tokens, app layout, core
                product surfaces, and upgrade-ready workflows.
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={`$${mrr.toLocaleString()}`}
          hint="Monthly recurring revenue"
          trend={{ label: '▲ 12% MoM', intent: 'good' }}
          href="/billing"
          hrefLabel="Billing"
          footer="Prepared for Stripe-backed subscription metrics."
        />

        <StatCard
          label="Active users"
          value={activeUsers}
          hint="Last 7 days"
          trend={{ label: '▲ 8%', intent: 'good' }}
          href="/admin"
          hrefLabel="Admin"
          footer="Prepared for event-backed product analytics."
        />

        <StatCard
          label="Churn"
          value={churn}
          hint="Last 30 days"
          trend={{ label: '▲ 0.4%', intent: 'bad' }}
          href="/billing"
          hrefLabel="Billing"
          footer="Prepared for subscription lifecycle tracking."
        />

        <StatCard
          label="Uptime"
          value={uptime}
          hint="Rolling 30 days"
          trend={{ label: 'Stable', intent: 'neutral' }}
          href="/projects"
          hrefLabel="Projects"
          footer="Prepared for monitoring and incident workflows."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total projects"
          value={projectsCount}
          hint="Across your organization"
          href="/projects"
          hrefLabel="Projects"
          trend={{ label: 'Stable', intent: 'neutral' }}
          footer="Entity management with tables, actions, dialogs, and detail navigation."
        />

        <StatCard
          label="Members"
          value={membersCount}
          hint="Active across projects"
          href="/admin"
          hrefLabel="Admin"
          trend={{ label: '▲ 2 invited', intent: 'good' }}
          footer="Team-ready surface for members, roles, and invitations."
        />

        <StatCard
          label="Plan"
          value={plan}
          hint="Starter Free"
          href="/billing"
          hrefLabel="Billing"
          trend={{ label: 'Upgradeable', intent: 'neutral' }}
          footer="Upgrade path prepared for auth, billing, and protected access."
        />
      </div>

      <UpgradeGate
        title="Production SaaS architecture"
        description="Unlock the business layer needed to move from a polished starter to a production-ready SaaS foundation."
        features={[
          'Email & password authentication',
          'Google & GitHub OAuth',
          'Protected routes & session handling',
          'Stripe Checkout & billing portal',
        ]}
        previewHeightClassName="min-h-[320px]"
      >
        <Card className="p-4">
          <CardHeader className="p-0">
            <CardTitle>Business layer overview</CardTitle>

            <CardDescription>
              Authentication, billing, subscriptions, and access
              control connected across the product.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 p-0 pt-4 md:grid-cols-3">
            <InsightMetric
              label="Protected routes"
              value="12"
              description="Authenticated app surfaces."
              icon={ShieldCheck}
            />

            <InsightMetric
              label="Subscriptions"
              value="182"
              description="Active billing relationships."
              icon={CreditCard}
            />

            <InsightMetric
              label="Team access"
              value="16"
              description="Members with scoped permissions."
              icon={Users}
            />
          </CardContent>
        </Card>
      </UpgradeGate>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <CardHeader className="p-0">
            <CardTitle>Recent activity</CardTitle>

            <CardDescription>
              Product activity designed to validate navigation and
              common SaaS workflows.
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

        <div className="space-y-6">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Quick actions</CardTitle>

              <CardDescription>
                Common product paths for account, billing, and team
                operations.
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
              <CardTitle>Product path</CardTitle>

              <CardDescription>
                Extend the starter through focused vertical slices:
                projects, members, billing, and authentication.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 p-0 pt-4">
              <Button asChild variant="outline">
                <Link href="/projects">Open projects</Link>
              </Button>

              <Button asChild>
                <Link href="/admin">Manage members</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
