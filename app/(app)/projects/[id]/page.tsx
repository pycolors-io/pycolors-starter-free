import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@pycolors/ui';

import { MOCK_PROJECTS } from '@/components/projects/project-types';

function StatusBadge({
  status,
}: {
  status: 'active' | 'trialing' | 'paused';
}) {
  const label =
    status === 'active'
      ? 'Active'
      : status === 'trialing'
        ? 'Trialing'
        : 'Paused';

  return <Badge>{label}</Badge>;
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = MOCK_PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-semibold leading-tight tracking-tight">
              {project.name}
            </h1>
            <StatusBadge status={project.status} />
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Project details (v1). ID:{' '}
            <span className="font-medium">{id}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">Back</Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button size="sm" disabled>
              Edit project
            </Button>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Coming next
            </span>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            This page validates deep-link navigation and the “details”
            surface.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border border-border/60 p-3">
              <div className="text-xs text-muted-foreground">
                Status
              </div>
              <div className="mt-1 text-sm font-medium">
                <StatusBadge status={project.status} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                v2: connect to subscription & usage rules.
              </div>
            </div>

            <div className="rounded-md border border-border/60 p-3">
              <div className="text-xs text-muted-foreground">
                Members
              </div>
              <div className="mt-1 text-sm font-medium">
                {project.members}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                v2: list members + roles + invites.
              </div>
            </div>

            <div className="rounded-md border border-border/60 p-3">
              <div className="text-xs text-muted-foreground">
                Updated
              </div>
              <div className="mt-1 text-sm font-medium">
                {project.updatedAt}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                v2: real timestamps from DB.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md border border-border/60 p-3 text-sm">
            <div className="font-medium">Next steps</div>
            <div className="mt-1 text-muted-foreground">
              Add: rename from details, members management, billing
              status, audit events.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
