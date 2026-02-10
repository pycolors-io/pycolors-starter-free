'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@pycolors/ui';
import { Project } from './project-types';
import { ProjectRenameDialog } from './project-rename-dialog';
import { ProjectConfirmDeleteDialog } from './project-confirm-delete-dialog';

export function ProjectRowActions({
  project,
  onRename,
  onDelete,
}: {
  project: Project;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/projects/${project.id}`}>Open</Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setRenameOpen(true);
            }}
          >
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectRenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        initialName={project.name}
        onRename={(name) => onRename(project.id, name)}
      />

      <ProjectConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        projectName={project.name}
        onConfirm={() => onDelete(project.id)}
      />
    </>
  );
}
