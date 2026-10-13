"use client";

import * as React from "react";
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
} from "@pycolors/ui";

export function ProjectCreateDialog({
  onCreate,
  disabled = false,
}: {
  onCreate: (name: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const nameId = React.useId();

  function reset() {
    setName("");
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
        <Button type="button" size="sm" disabled={disabled}>
          New project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Create a new project in your workspace. You can rename it later.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCreate();
          }}
          className="mt-4 space-y-2"
        >
          <label htmlFor={nameId} className="text-sm font-medium">
            Project name
          </label>
          <Input
            id={nameId}
            placeholder="e.g. Marketing Website"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            Saved in this browser only. No account or backend is connected.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
