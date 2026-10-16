"use client";

import * as React from "react";
import { Alert, Badge, Button } from "@pycolors/ui";
import type { ChatWorkAction, ChatWorkControl, ChatWorkStatus } from "./types";

const states: Record<ChatWorkStatus, { label: string; message: string }> = {
  planned: { label: "Planned", message: "Plan supplied. No work has started." },
  running: {
    label: "In progress",
    message: "Work is in progress, as reported by your application.",
  },
  "waiting-for-approval": {
    label: "Needs approval",
    message:
      "Waiting for your decision. Approval does not grant application permissions.",
  },
  succeeded: {
    label: "Completed",
    message: "Your application reports that this task completed.",
  },
  failed: {
    label: "Failed",
    message:
      "This attempt failed. Any supplied partial result remains available.",
  },
  cancelled: {
    label: "Cancelled",
    message:
      "Your application confirmed cancellation. Partial results may be incomplete.",
  },
  unknown: {
    label: "Status unavailable",
    message:
      "The current task state is unknown. Completion and cancellation are not confirmed.",
  },
};
const stepLabels = {
  pending: "Pending",
  running: "In progress",
  succeeded: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};
const requests: Record<ChatWorkAction, string> = {
  approve:
    "Approval requested. Waiting for your application to confirm the next state.",
  reject:
    "Rejection requested. Waiting for your application to confirm the next state.",
  cancel: "Cancellation requested. The task is not yet confirmed cancelled.",
  retry:
    "Retry requested. Waiting for your application to identify the new attempt.",
};

/** Destination syntax only; the consumer must supply trustworthy, existing results. */
function safeResultHref(href: string) {
  if (
    !href ||
    /[\s\\]/u.test(href) ||
    Array.from(href).some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    ) ||
    /%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/iu.test(href)
  )
    return false;
  try {
    const url = new URL(href, "https://work.invalid");
    if (href.startsWith("/") && !/^\/(?:\/|%2f)/iu.test(href))
      return url.origin === "https://work.invalid";
    return (
      /^https:\/\/[^/]/iu.test(href) &&
      url.protocol === "https:" &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function ChatWork({
  control,
  disabled,
}: {
  control: ChatWorkControl;
  disabled: boolean;
}) {
  const id = React.useId();
  const key = JSON.stringify([control.id, control.attempt, control.revision]);
  const liveKey = React.useRef(key);
  const mounted = React.useRef(true);
  const flight = React.useRef<{ key: string; token: number } | null>(null);
  const sequence = React.useRef(0);
  const [feedback, setFeedback] = React.useState<{
    key: string;
    action?: ChatWorkAction;
    error?: string;
  }>();
  const actionButton = React.useRef<HTMLButtonElement | null>(null);
  const summary = React.useRef<HTMLParagraphElement>(null);
  React.useLayoutEffect(() => {
    liveKey.current = key;
  }, [key]);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      flight.current = null;
    };
  }, []);
  React.useLayoutEffect(() => {
    const button = actionButton.current;
    if (button && !button.isConnected) {
      actionButton.current = null;
      if (document.activeElement === document.body)
        summary.current?.focus({ preventScroll: true });
    }
  });
  const currentFeedback = feedback?.key === key ? feedback : undefined;
  const pending = control.pendingAction ?? currentFeedback?.action;
  const error = control.actionError || currentFeedback?.error;
  const canCancel = [
    "planned",
    "running",
    "waiting-for-approval",
    "unknown",
  ].includes(control.status);
  const canRetry = ["failed", "cancelled", "unknown"].includes(control.status);
  const actions = [
    {
      action: "approve" as const,
      label: "Approve",
      callback:
        control.status === "waiting-for-approval"
          ? control.onApprove
          : undefined,
    },
    {
      action: "reject" as const,
      label: "Reject",
      callback:
        control.status === "waiting-for-approval"
          ? control.onReject
          : undefined,
    },
    {
      action: "cancel" as const,
      label: "Cancel task",
      callback: canCancel ? control.onCancel : undefined,
    },
    {
      action: "retry" as const,
      label: "Retry task",
      callback: canRetry ? control.onRetry : undefined,
    },
  ];
  return (
    <section
      aria-labelledby={`${id}-title`}
      data-slot="chat-work"
      className="min-w-0 space-y-5 border-t border-border px-5 py-6 sm:px-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Task progress · Attempt {control.attempt}
          </p>
          <h3
            id={`${id}-title`}
            className="text-base font-semibold tracking-tight [overflow-wrap:anywhere]"
          >
            {control.title}
          </h3>
          {control.description ? (
            <p className="text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
              {control.description}
            </p>
          ) : null}
        </div>
        <Badge variant="outline">{states[control.status].label}</Badge>
      </div>
      <p
        ref={summary}
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        className="rounded-sm text-sm leading-6 text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {pending ? requests[pending] : states[control.status].message}
      </p>
      {control.steps.length ? (
        <ol
          aria-label="Task steps"
          className="divide-y divide-border rounded-lg border border-border px-4"
        >
          {control.steps.map((step, index) => (
            <li key={step.id} className="min-w-0 py-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="min-w-0 flex-1 text-sm leading-6 [overflow-wrap:anywhere]">
                  <span className="mr-2 text-muted-foreground">
                    {index + 1}.
                  </span>
                  {step.label}
                </p>
                <span className="text-xs leading-6 text-muted-foreground">
                  {stepLabels[step.status]}
                </span>
              </div>
              {step.detail ? (
                <details className="mt-2">
                  <summary className="w-fit cursor-pointer text-xs font-medium">
                    Step {index + 1} details
                  </summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                    {step.detail}
                  </p>
                </details>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">
          No step details supplied.
        </p>
      )}
      {control.errorMessage ? (
        <Alert
          variant="destructive"
          ariaLive="off"
          className="[overflow-wrap:anywhere]"
        >
          {control.errorMessage}
        </Alert>
      ) : null}
      {control.result ? (
        <div
          className="min-w-0 space-y-3 rounded-lg border border-border bg-muted/20 p-4"
          data-slot="chat-work-result"
        >
          <p className="text-sm font-medium">
            {control.status === "succeeded"
              ? "Result supplied by your application"
              : "Partial result · not final"}
          </p>
          <p className="whitespace-pre-wrap text-sm leading-6 [overflow-wrap:anywhere]">
            {control.result.text}
          </p>
          {control.result.links?.length ? (
            <ul className="space-y-2 text-sm">
              {control.result.links.map((link) => (
                <li key={link.id} className="[overflow-wrap:anywhere]">
                  {safeResultHref(link.href) ? (
                    disabled ? (
                      <span>{link.label}</span>
                    ) : (
                      <a
                        className="underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                        href={link.href}
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    )
                  ) : (
                    <span>
                      {link.label}{" "}
                      <span className="text-xs text-muted-foreground">
                        (Link unavailable)
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : control.status === "succeeded" ? (
        <p className="text-sm text-muted-foreground">
          No result was supplied by your application.
        </p>
      ) : null}
      {error ? (
        <Alert
          id={`${id}-action-error`}
          variant="destructive"
          className="[overflow-wrap:anywhere]"
        >
          {error}
        </Alert>
      ) : null}
      {actions.some(({ callback }) => callback) ? (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Task actions"
        >
          {actions.map(({ action, label, callback }) =>
            callback ? (
              <Button
                key={action}
                type="button"
                variant={action === "approve" ? "default" : "outline"}
                className="min-h-11"
                disabled={disabled || Boolean(pending)}
                aria-describedby={error ? `${id}-action-error` : undefined}
                onClick={async (event) => {
                  if (disabled || pending || flight.current?.key === key)
                    return;
                  if (document.activeElement === event.currentTarget)
                    actionButton.current = event.currentTarget;
                  const token = ++sequence.current;
                  flight.current = { key, token };
                  setFeedback({ key, action });
                  const identity = {
                    id: control.id,
                    attempt: control.attempt,
                    revision: control.revision,
                  };
                  try {
                    await callback(identity);
                    if (
                      mounted.current &&
                      liveKey.current === key &&
                      flight.current?.token === token
                    )
                      setFeedback({ key });
                  } catch {
                    if (
                      mounted.current &&
                      liveKey.current === key &&
                      flight.current?.token === token
                    )
                      setFeedback({
                        key,
                        error:
                          "The action request failed. Your task state is unchanged; try again.",
                      });
                  } finally {
                    if (flight.current?.token === token) flight.current = null;
                  }
                }}
              >
                {label}
              </Button>
            ) : null,
          )}
        </div>
      ) : null}
    </section>
  );
}
