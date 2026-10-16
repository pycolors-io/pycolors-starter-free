"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, LayoutGrid, ShieldCheck, Users } from "lucide-react";

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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui";

import { PageShell } from "@/components/app/page-shell";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { ProjectTable } from "@/components/projects/project-table";
import { ProjectCreateDialog } from "@/components/projects/project-create-dialog";
import { useProjects } from "@/components/projects/project-provider";

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
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const {
    projects,
    isLoading,
    storageError,
    createProject,
    renameProject,
    deleteProject,
    resetProjects,
  } = useProjects();
  const [resetOpen, setResetOpen] = React.useState(false);

  return (
    <PageShell
      title="Projects"
      description="Create, organize and revisit projects in your browser."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back</Link>
          </Button>

          <Dialog open={resetOpen} onOpenChange={setResetOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                Reset demo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset demo projects?</DialogTitle>
                <DialogDescription>
                  This replaces your local projects with the original examples.
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    resetProjects();
                    setResetOpen(false);
                  }}
                >
                  Reset demo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ProjectCreateDialog onCreate={createProject} disabled={isLoading} />
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>Try your first project</AlertTitle>
          <AlertDescription>
            Create a project, open its details, then rename or delete it.
            Changes are saved in this browser only. This demo has no account,
            database, or synchronization between devices. Use sample data, not
            sensitive information.
          </AlertDescription>
        </Alert>
      }
    >
      <div className="space-y-6">
        {storageError ? (
          <Alert>
            <AlertTitle>Local storage notice</AlertTitle>
            <AlertDescription>{storageError}</AlertDescription>
          </Alert>
        ) : null}
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
              Your projects, their status and the next action — in one place.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-4">
            <ProjectTable
              projects={projects}
              isLoading={isLoading}
              onRename={renameProject}
              onDelete={deleteProject}
            />
          </CardContent>

          <div className="mt-3 text-xs text-muted-foreground">
            Reload to return to your saved projects, or reset the demo to start
            again.
          </div>
        </Card>

        <UpgradeGate
          title="Ready for real users and shared data?"
          description="Starter Pro includes Auth.js authentication, protected routes, Prisma with PostgreSQL, and Stripe billing foundations. Connect your own project workflows to these foundations."
          hint="Buying Starter Pro provides starter source code. It does not connect or migrate this browser demo automatically."
          features={[
            "Auth.js authentication",
            "Protected routes",
            "Prisma & PostgreSQL",
            "Stripe billing foundations",
          ]}
          ctaLabel="Explore Starter Pro"
          upgradeHref="https://pycolors.io/starters/pro"
          previewHeightClassName="min-h-[320px]"
        >
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Project insights</CardTitle>

              <CardDescription>
                Usage, access, and product signals connected to your workspace
                entities.
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
