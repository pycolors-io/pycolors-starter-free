"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  CalendarClock,
  Pencil,
  ShieldCheck,
  Users,
} from "lucide-react";

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
  Skeleton,
} from "@/components/ui";

import { useProjects } from "./project-provider";
import { ProjectRenameDialog } from "./project-rename-dialog";
import ProjectNotFound from "@/app/(app)/projects/[id]/not-found";

type ProjectStatus = "active" | "trialing" | "paused";

function StatusBadge({
  status,
}: Readonly<{
  status: ProjectStatus;
}>) {
  const labelByStatus: Record<ProjectStatus, string> = {
    active: "Active",
    trialing: "Trialing",
    paused: "Paused",
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

export function ProjectDetails({ id }: { id: string }) {
  const { projects, isLoading, storageError, renameProject } = useProjects();
  const [renameOpen, setRenameOpen] = React.useState(false);
  const project = projects.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div role="status" aria-label="Loading project">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  if (!project) return <ProjectNotFound />;

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
            Project workspace overview ·{" "}
            <span className="font-medium text-foreground">{project.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/projects">Back</Link>
          </Button>

          <Button type="button" size="sm" onClick={() => setRenameOpen(true)}>
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit project
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTitle>Local demo project</AlertTitle>

        <AlertDescription>
          This project is saved in this browser only. Member counts and status
          are illustrative; no authentication, collaboration, or backend is
          connected.
        </AlertDescription>
      </Alert>

      {storageError ? (
        <Alert>
          <AlertTitle>Local storage notice</AlertTitle>
          <AlertDescription>{storageError}</AlertDescription>
        </Alert>
      ) : null}
      <ProjectRenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={project.name}
        onRename={(name) => renameProject(id, name)}
      />
      <Card className="p-4">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle>Overview</CardTitle>

              <CardDescription className="mt-1">
                Structured project details with reusable metrics, status
                surfaces, and workspace management patterns.
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
            <div className="text-sm font-medium">Production extension path</div>

            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Starter Pro provides Auth.js, protected routes, Prisma with
              PostgreSQL, and Stripe billing foundations. You implement your
              project data model and workflows; these local demo records are not
              migrated automatically.{" "}
              <Link
                href="https://pycolors.io/starters/pro"
                className="underline underline-offset-4"
              >
                Explore Starter Pro
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
