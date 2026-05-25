'use client';

import * as React from 'react';
import Link from 'next/link';
import { LayoutGrid, Plus } from 'lucide-react';

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
import { ProjectTable } from '@/components/projects/project-table';
import {
  MOCK_PROJECTS,
  type Project,
} from '@/components/projects/project-types';

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
            This surface demonstrates a credible SaaS entity flow:
            list management, row actions, rename/delete dialogs,
            loading states, and a clean path toward real data wiring.
          </AlertDescription>
        </Alert>
      }
    >
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
            Manage project records with reusable table, dialog,
            action, loading, and empty-state patterns.
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
          Designed to support project creation, permissions,
          organization workflows, and billing-aware product logic.
        </div>
      </Card>
    </PageShell>
  );
}
