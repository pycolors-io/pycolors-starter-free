"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
} from "@pycolors/ui";

export function ProjectRenameDialog({
  open,
  onOpenChange,
  initialName,
  onRename,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onRename: (name: string) => void;
}) {
  const [value, setValue] = React.useState(initialName);
  const nameId = React.useId();

  React.useEffect(() => {
    if (open) setValue(initialName);
  }, [open, initialName]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = value.trim();
    if (!next) return;
    onRename(next);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Update the project name in this browser demo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div className="space-y-2">
            <label htmlFor={nameId} className="text-sm font-medium">
              Project name
            </label>
            <Input
              id={nameId}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              placeholder="e.g. Acme Workspace"
            />
            <p className="text-sm text-muted-foreground">
              Saved locally in this browser. No backend is connected.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!value.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
