"use client";

import * as React from "react";
import { Alert, Badge, Button } from "@pycolors/ui";
import type { ChatAttachment, ChatAttachmentsControl } from "./types";

const statusLabels = {
  selected: "Selected",
  reading: "Reading…",
  ready: "Ready",
  error: "Read failed",
  cancelled: "Reading cancelled",
};
function sizeLabel(bytes: number) {
  return bytes < 1024 ? `${bytes} B` : `${Math.ceil(bytes / 1024)} KiB`;
}

export function ChatAttachments({
  control,
  disabled,
  onPrefill,
}: {
  control: ChatAttachmentsControl;
  disabled: boolean;
  onPrefill: () => void;
}) {
  const id = React.useId();
  const input = React.useRef<HTMLInputElement>(null);
  const attach = React.useRef<HTMLButtonElement>(null);
  const removed = React.useRef<{
    id: string;
    button: HTMLButtonElement;
  } | null>(null);
  const itemIds = control.items.map((item) => item.id).join("\n");
  React.useLayoutEffect(() => {
    const pending = removed.current;
    if (pending && !control.items.some((item) => item.id === pending.id)) {
      removed.current = null;
      if (
        document.activeElement === document.body ||
        document.activeElement === pending.button
      )
        attach.current?.focus({ preventScroll: true });
    }
  }, [itemIds, control.items]);
  return (
    <div
      role="group"
      aria-labelledby={`${id}-title`}
      data-slot="chat-attachments"
      className="space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p id={`${id}-title`} className="text-sm font-medium">
            Reference file
          </p>
          <p
            id={`${id}-limits`}
            className="text-xs leading-5 text-muted-foreground"
          >
            {control.policy.formatsLabel} · {control.policy.maxFiles} file
            {control.policy.maxFiles === 1 ? "" : "s"} maximum ·{" "}
            {sizeLabel(control.policy.maxBytes)} per file
          </p>
        </div>
        <Button
          ref={attach}
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={disabled}
          aria-describedby={`${id}-limits ${id}-privacy${control.errorMessage ? ` ${id}-error` : ""}`}
          onClick={() => input.current?.click()}
        >
          Attach reference file
        </Button>
        <input
          ref={input}
          type="file"
          tabIndex={-1}
          aria-label="Choose reference file"
          className="hidden"
          accept={control.policy.accept}
          multiple={control.policy.maxFiles > 1}
          disabled={disabled}
          onChange={(event) => {
            const files = Array.from(event.currentTarget.files ?? []);
            event.currentTarget.value = "";
            if (files.length) control.onSelect(files);
          }}
        />
      </div>
      <p
        id={`${id}-privacy`}
        className="text-xs leading-5 text-muted-foreground"
      >
        {control.policy.description}
      </p>
      {control.errorMessage ? (
        <Alert id={`${id}-error`} variant="destructive">
          {control.errorMessage}
        </Alert>
      ) : null}
      <div className="space-y-3">
        {control.items.map((item) => (
          <AttachmentRow
            key={item.id}
            item={item}
            disabled={disabled}
            control={control}
            onPrefill={onPrefill}
            onRemove={(button) => {
              if (document.activeElement === button)
                removed.current = { id: item.id, button };
              control.onRemove(item.id);
            }}
          />
        ))}
      </div>
      <p
        role="status"
        aria-atomic="true"
        className="text-xs leading-5 text-muted-foreground"
      >
        {control.announcement}
      </p>
    </div>
  );
}

function AttachmentRow({
  item,
  control,
  disabled,
  onRemove,
  onPrefill,
}: {
  item: ChatAttachment;
  control: ChatAttachmentsControl;
  disabled: boolean;
  onRemove: (button: HTMLButtonElement) => void;
  onPrefill: () => void;
}) {
  const id = React.useId();
  const pending = React.useRef<string | null>(null);
  const recoverFocus = React.useRef<HTMLButtonElement | null>(null);
  const summary = React.useRef<HTMLParagraphElement>(null);
  React.useLayoutEffect(() => {
    pending.current = null;
    if (item.status !== "reading" && recoverFocus.current) {
      const previous = recoverFocus.current;
      recoverFocus.current = null;
      if (
        document.activeElement === document.body ||
        document.activeElement === previous
      )
        summary.current?.focus({ preventScroll: true });
    }
  }, [item]);
  function act(
    action: string,
    button: HTMLButtonElement,
    callback: (id: string) => void,
  ) {
    if (disabled || pending.current === action) return;
    pending.current = action;
    if (document.activeElement === button) recoverFocus.current = button;
    callback(item.id);
  }
  return (
    <div
      className="min-w-0 rounded-lg border border-border bg-background p-4"
      role="group"
      aria-labelledby={`${id}-name`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-1">
          <p id={`${id}-name`} className="break-all text-sm font-medium">
            {item.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {sizeLabel(item.size)}
          </p>
        </div>
        <Badge variant="outline">{statusLabels[item.status]}</Badge>
      </div>
      <p
        ref={summary}
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        className="mt-3 text-xs leading-5 text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {item.status === "ready"
          ? "Reference text is ready for review."
          : item.status === "selected"
            ? "Selected only. Read the file when you are ready."
            : item.status === "reading"
              ? "Reading the reference. You can cancel this operation."
              : item.status === "cancelled"
                ? "Reading cancelled. You can retry or remove the file."
                : item.status === "error"
                  ? item.errorMessage
                  : ""}
      </p>
      {item.status === "ready" ? (
        <details className="mt-3 rounded-md border border-border p-3">
          <summary className="cursor-pointer text-xs font-medium">
            Text excerpt{item.truncated ? " · truncated" : ""}
          </summary>
          <pre
            tabIndex={0}
            aria-label="Reference text excerpt"
            className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap text-xs leading-6 [overflow-wrap:anywhere]"
          >
            {item.excerpt}
          </pre>
        </details>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {item.status === "selected" ? (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={disabled}
            onClick={(event) =>
              act("read", event.currentTarget, control.onRead)
            }
          >
            {control.policy.readLabel}
          </Button>
        ) : null}
        {item.status === "error" || item.status === "cancelled" ? (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={disabled}
            onClick={(event) =>
              act("retry", event.currentTarget, control.onRetry)
            }
          >
            Retry reading
          </Button>
        ) : null}
        {item.status === "reading" ? (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={disabled}
            onClick={(event) =>
              act("cancel", event.currentTarget, control.onCancel)
            }
          >
            Cancel reading
          </Button>
        ) : null}
        {item.status === "ready" && control.onUse ? (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={disabled}
            onClick={() => {
              control.onUse?.(item.id);
              onPrefill();
            }}
          >
            Use as reference
          </Button>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          className="min-h-11"
          disabled={disabled}
          aria-label={`Remove ${item.name}`}
          onClick={(event) => {
            if (pending.current === "remove") return;
            pending.current = "remove";
            onRemove(event.currentTarget);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
