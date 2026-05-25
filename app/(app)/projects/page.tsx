'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Activity,
  LayoutGrid,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react';

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
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';
import { UpgradeGate } from '@/components/app/upgrade-gate';
import { ProjectTable } from '@/components/projects/project-table';
import {
  MOCK_PROJECTS,
  type Project,
} from '@/components/projects/project-types';

function AnalyticsMetric({
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

export default function ProjectsPage() {
  const [projects, setProjects] =
    React.useState<Project[]>(MOCK_PROJECTS);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, []);

  function onRename(id: string, name: string) {
    const next = name.trim();
    if (!next) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name: next } : project,
      ),
    );
  }

  function onDelete(id: string) {
    setProjects((prev) =>
      prev.filter((project) => project.id !== id),
    );
  }

  return (
    <PageShell
      title="Projects"
      description="A structured entity workspace for modern SaaS products."
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((value) => !value)}
          >
            Toggle loading
          </Button>

          <Button type="button" size="sm" disabled>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Button>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>Production-shaped entity workflow</AlertTitle>
          <AlertDescription>
            A credible SaaS entity surface with reusable table
            patterns, row actions, dialogs, loading states, and
            upgrade-ready extension paths.
          </AlertDescription>
        </Alert>
      }
    >
      <div className="space-y-6">
        <Card className="p-4">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              Project directory
            </CardTitle>

            <CardDescription>
              Manage project records with reusable table, action,
              dialog, loading, and empty-state patterns.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-4">
            <ProjectTable
              projects={projects}
              isLoading={isLoading}
              onRename={onRename}
              onDelete={onDelete}
            />
          </CardContent>

          <div className="mt-3 text-xs text-muted-foreground">
            Designed to support organization workflows, permissions,
            subscriptions, and scalable product architectures.
          </div>
        </Card>

        <UpgradeGate
          title="Protected project workflows"
          description="Unlock production-ready project architecture with protected access, plan gating, and organization-ready foundations."
          features={[
            'Protected app architecture',
            'Plan gating & feature access',
            'Organization-ready foundations',
            'Production-ready SaaS structure',
          ]}
          previewHeightClassName="min-h-[320px]"
        >
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Project insights</CardTitle>

              <CardDescription>
                Usage, access, and product signals connected to your
                workspace entities.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 p-0 pt-4 md:grid-cols-3">
              <AnalyticsMetric
                label="Usage events"
                value="18.2k"
                description="Tracked interactions over the last 30 days."
                icon={Activity}
              />

              <AnalyticsMetric
                label="Active members"
                value="124"
                description="Users interacting with this workspace."
                icon={Users}
              />

              <AnalyticsMetric
                label="Protected rules"
                value="8"
                description="Plan and access rules enabled for this project."
                icon={ShieldCheck}
              />
            </CardContent>
          </Card>
        </UpgradeGate>
      </div>
    </PageShell>
  );
}
