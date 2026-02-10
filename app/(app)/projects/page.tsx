'use client';

import * as React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
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
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  function onRename(id: string, name: string) {
    const next = name.trim();
    if (!next) return;

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: next } : p)),
    );
  }

  function onDelete(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <PageShell
      title="Projects"
      description="Your core SaaS entity. Table + row actions + dialogs (v1)."
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((v) => !v)}
          >
            Toggle loading
          </Button>

          <div className="flex items-center gap-2">
            <Button size="sm" type="button" disabled>
              New project
            </Button>
            <span className="text-xs text-muted-foreground">
              Coming next
            </span>
          </div>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>CRUD surface (v1)</AlertTitle>
          <AlertDescription>
            This page proves the “core entity” workflow: list, row
            actions, rename/delete dialogs, and loading/empty states.
            Next: create project (Dialog + local state, then API).
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
            Projects list
          </CardTitle>
          <CardDescription>
            Patterns: list, row actions, rename/delete dialogs,
            loading/empty states.
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
          Coming next: create project (Dialog + local state, then
          API).
        </div>
      </Card>
    </PageShell>
  );
}
