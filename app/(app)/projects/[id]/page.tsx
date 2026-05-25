import type * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Activity,
  CalendarClock,
  Pencil,
  ShieldCheck,
  Users,
} from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pycolors/ui';

import { MOCK_PROJECTS } from '@/components/projects/project-types';

type ProjectStatus = 'active' | 'trialing' | 'paused';

function StatusBadge({
  status,
}: Readonly<{
  status: ProjectStatus;
}>) {
  const labelByStatus: Record<ProjectStatus, string> = {
    active: 'Active',
    trialing: 'Trialing',
    paused: 'Paused',
  };

  return <Badge>{labelByStatus[status]}</Badge>;
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: Readonly<{
  title: string;
  value: React.ReactNode;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <div className="rounded-md border border-border/60 bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{title}</div>

          <div className="text-sm font-medium">{value}</div>

          <div className="text-sm leading-6 text-muted-foreground">
            {description}
          </div>
        </div>

        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default async function ProjectDetailsPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const project = MOCK_PROJECTS.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-lg font-semibold tracking-tight">
              {project.name}
            </h1>

            <StatusBadge status={project.status} />
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Project workspace overview ·{' '}
            <span className="font-medium text-foreground">
              {project.id}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">Back</Link>
          </Button>

          <Button type="button" size="sm" disabled>
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit project
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTitle>Production-ready project surface</AlertTitle>

        <AlertDescription>
          A scalable workspace detail page prepared for permissions,
          activity history, billing state, collaboration, and backend
          synchronization.
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle>Overview</CardTitle>

              <CardDescription className="mt-1">
                Structured project details with reusable metrics,
                status surfaces, and workspace management patterns.
              </CardDescription>
            </div>

            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Status"
              value={<StatusBadge status={project.status} />}
              description="Prepared for subscription state, usage limits, and access control."
              icon={Activity}
            />

            <MetricCard
              title="Members"
              value={project.members}
              description="Designed for roles, invitations, and workspace collaboration."
              icon={Users}
            />

            <MetricCard
              title="Updated"
              value={project.updatedAt}
              description="Ready for database-backed timestamps and activity events."
              icon={CalendarClock}
            />
          </div>

          <div className="mt-5 rounded-md border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-medium">
              Production extension path
            </div>

            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Extend this workspace with project settings, member
              management, permissions, billing visibility, audit
              events, notifications, and organization-aware access
              control as your product evolves.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
