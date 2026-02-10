import Link from 'next/link';
import {
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  TableLoading,
} from '@pycolors/ui';

import { Project } from './project-types';
import { ProjectRowActions } from './project-row-actions';

function StatusBadge({ status }: { status: Project['status'] }) {
  const label =
    status === 'active'
      ? 'Active'
      : status === 'trialing'
        ? 'Trialing'
        : 'Paused';
  return <Badge>{label}</Badge>;
}

export function ProjectTable({
  projects,
  isLoading,
  onRename,
  onDelete,
}: {
  projects: Project[];
  isLoading: boolean;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableLoading colSpan={5} />
        ) : projects.length === 0 ? (
          <TableEmpty
            colSpan={5}
            title="No projects"
            description="Create your first project to start shipping value."
          />
        ) : (
          projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/projects/${p.id}`}
                  className="hover:underline underline-offset-4"
                >
                  {p.name}
                </Link>
              </TableCell>

              <TableCell>
                <StatusBadge status={p.status} />
              </TableCell>

              <TableCell>{p.members}</TableCell>

              <TableCell className="text-muted-foreground">
                {p.updatedAt}
              </TableCell>

              <TableCell className="text-right">
                <ProjectRowActions
                  project={p}
                  onRename={onRename}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
