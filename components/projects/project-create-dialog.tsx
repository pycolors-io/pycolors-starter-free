'use client';

import * as React from 'react';
import {
  Button,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@pycolors/ui';

export function ProjectCreateDialog({
  onCreate,
}: {
  onCreate: (name: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  function reset() {
    setName('');
  }

  function handleCreate() {
    const v = name.trim();
    if (!v) return;
    onCreate(v);
    setOpen(false);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">New project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Create a new project in your workspace. You can rename it
            later.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Project name</div>
          <Input
            placeholder="e.g. Marketing Website"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            v1: local-only. Later this will call the API.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
