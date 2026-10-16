"use client";

import * as React from "react";
import { Alert, Badge, Button, Input, Textarea } from "@pycolors/ui";
import {
  serializeAgentDefinition,
  snapshotAgentDefinition,
} from "./agent-definition-export";
import type { AgentDefinitionControl, AgentDefinitionFields } from "./types";

const fields = ["name", "purpose", "instructions"] as const;
const labels = {
  name: "Agent name",
  purpose: "Purpose",
  instructions: "Instructions",
};

/** An inline, controlled review form. It never creates or runs an agent itself. */
export function AgentDefinition({
  control,
  disabled,
}: {
  control: AgentDefinitionControl;
  disabled: boolean;
}) {
  const { draft, status } = control;
  const id = React.useId();
  const form = React.useRef<HTMLFormElement>(null);
  const result = React.useRef<HTMLParagraphElement>(null);
  const restoreFocus = React.useRef(false);
  const submitted = React.useRef<string | null>(null);
  const cancelled = React.useRef(false);
  const [validation, setValidation] = React.useState<{
    revision: number;
    errors: AgentDefinitionControl["errors"];
  }>();
  const busy = status === "confirming";
  const terminal = status === "created" || status === "cancelled";
  const errors = {
    ...(validation?.revision === draft.revision ? validation.errors : {}),
    ...control.errors,
  };
  const json = serializeAgentDefinition(draft);
  const confirmed =
    status === "created" &&
    control.confirmed.id === draft.id &&
    control.confirmed.revision === draft.revision &&
    serializeAgentDefinition(control.confirmed) === json;
  const stateText =
    status === "created"
      ? confirmed
        ? "Definition created locally"
        : "This revision has not been confirmed. Ask your application to review it again."
      : status === "cancelled"
        ? "Definition cancelled. No agent was created."
        : busy
          ? "Confirming this definition…"
          : status === "error"
            ? "Confirmation failed. Your edits are preserved."
            : "Review the definition before creating it locally.";

  React.useLayoutEffect(() => {
    if (!busy) submitted.current = null;
    cancelled.current = false;
    if (!busy && restoreFocus.current) {
      restoreFocus.current = false;
      if (
        document.activeElement === document.body ||
        form.current?.contains(document.activeElement)
      ) {
        result.current?.focus({ preventScroll: true });
      }
    }
  }, [busy, status, draft.revision]);

  return (
    <div
      role="group"
      aria-labelledby={`${id}-title`}
      data-slot="agent-definition"
      className="border-t border-border px-5 py-6 sm:px-8"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <h3
            id={`${id}-title`}
            className="text-base font-semibold tracking-tight"
          >
            Agent definition
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            Define its purpose and review its instructions. You stay in control.
          </p>
        </div>
        <Badge variant="outline">
          {confirmed
            ? "Created locally"
            : status === "cancelled"
              ? "Cancelled"
              : busy
                ? "Confirming"
                : "Needs review"}
        </Badge>
      </div>
      <p
        ref={result}
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        className="mb-5 rounded-sm text-sm leading-6 text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {stateText}
      </p>
      <form
        ref={form}
        noValidate
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          const key = `${draft.id}:${draft.revision}`;
          if (disabled || busy || terminal || submitted.current === key) return;
          const required = Object.fromEntries(
            fields
              .filter((field) => !draft[field].trim())
              .map((field) => [field, `${labels[field]} is required.`]),
          );
          setValidation({ revision: draft.revision, errors: required });
          const first = fields.find((field) => required[field]);
          if (first) {
            form.current
              ?.querySelector<HTMLElement>(`[name="${first}"]`)
              ?.focus();
            return;
          }
          submitted.current = key;
          restoreFocus.current =
            form.current?.contains(document.activeElement) ?? false;
          control.onConfirm(snapshotAgentDefinition(draft));
        }}
      >
        {fields.map((field) => {
          const Component = field === "name" ? Input : Textarea;
          return (
            <Component
              key={field}
              id={`${id}-${field}`}
              name={field}
              label={labels[field]}
              required
              value={draft[field]}
              disabled={disabled || busy}
              readOnly={terminal}
              error={errors[field]}
              className={
                field === "name"
                  ? "bg-background"
                  : "min-h-24 resize-y bg-background"
              }
              onChange={(event) => {
                const next: AgentDefinitionFields = {
                  name: draft.name,
                  purpose: draft.purpose,
                  instructions: draft.instructions,
                  [field]: event.target.value,
                };
                control.onChange(next);
              }}
            />
          );
        })}
        {draft.requestedCapabilities?.length ? (
          <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-4">
            <p className="text-xs font-medium">Requested capabilities</p>
            <ul className="list-inside list-disc space-y-1 text-sm [overflow-wrap:anywhere]">
              {draft.requestedCapabilities.map((capability, index) => (
                <li key={index}>{capability}</li>
              ))}
            </ul>
            <p className="text-xs leading-5 text-muted-foreground">
              Requests only. No permissions are granted and no tools are
              connected.
            </p>
          </div>
        ) : null}
        {draft.sourceReferences?.length ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Source references · labels only
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm [overflow-wrap:anywhere]">
              {draft.sourceReferences.map((source, index) => (
                <li key={index}>{source.label}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {status === "error" ? (
          <Alert variant="destructive" ariaLive="off">
            {control.errorMessage ||
              "The definition could not be confirmed. Review your fields and retry."}
          </Alert>
        ) : null}
        {!terminal ? (
          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              disabled={disabled || busy}
              className="min-h-11"
            >
              {busy
                ? "Confirming…"
                : status === "error"
                  ? "Retry confirmation"
                  : "Confirm definition"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className="min-h-11"
              onClick={() => {
                if (cancelled.current) return;
                cancelled.current = true;
                restoreFocus.current =
                  form.current?.contains(document.activeElement) ?? false;
                control.onCancel({ id: draft.id, revision: draft.revision });
              }}
            >
              Cancel definition
            </Button>
          </div>
        ) : null}
      </form>
      {confirmed ? (
        <DefinitionExport key={json} json={json} disabled={disabled} />
      ) : null}
      <p className="mt-5 text-xs leading-5 text-muted-foreground">
        A local definition, not a running agent. Keep credentials and private
        data out of these fields.
      </p>
    </div>
  );
}

function DefinitionExport({
  json,
  disabled,
}: {
  json: string;
  disabled: boolean;
}) {
  const [feedback, setFeedback] = React.useState("");
  const [copying, setCopying] = React.useState(false);
  const inFlight = React.useRef(false);
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <div className="mt-5 space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={disabled || copying}
          onClick={async () => {
            if (inFlight.current) return;
            inFlight.current = true;
            setCopying(true);
            setFeedback("");
            try {
              await navigator.clipboard.writeText(json);
              if (mounted.current) setFeedback("Definition JSON copied.");
            } catch {
              if (mounted.current)
                setFeedback(
                  "Copy unavailable. Open Definition JSON and select the text manually.",
                );
            } finally {
              inFlight.current = false;
              if (mounted.current) setCopying(false);
            }
          }}
        >
          {copying ? "Copying…" : "Copy JSON"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={disabled}
          onClick={() => {
            let url: string | undefined;
            const link = document.createElement("a");
            try {
              url = URL.createObjectURL(
                new Blob([json], { type: "application/json" }),
              );
              link.href = url;
              link.download = "agent-definition.json";
              document.body.append(link);
              link.click();
              setFeedback(
                "JSON download requested. Keep the file to reuse your definition.",
              );
            } catch {
              setFeedback(
                "Download unavailable. Open Definition JSON and select the text manually.",
              );
            } finally {
              link.remove();
              if (url) {
                const objectUrl = url;
                setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
              }
            }
          }}
        >
          Download JSON
        </Button>
      </div>
      <p
        role="status"
        aria-atomic="true"
        className="min-h-5 text-xs leading-5 text-muted-foreground"
      >
        {feedback}
      </p>
      <details className="rounded-lg border border-border p-4">
        <summary className="cursor-pointer text-sm font-medium">
          Definition JSON
        </summary>
        <pre
          className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs leading-6 [overflow-wrap:anywhere]"
          tabIndex={0}
          aria-label="Confirmed definition JSON"
        >
          {json}
        </pre>
      </details>
    </div>
  );
}
