"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";
import type {
  ChatWorkControl,
  ChatWorkIdentity,
  ChatWorkState,
  ChatWorkStep,
} from "./chat";

export const workSamplePrompt = "Show a sample launch review task plan.";
const sampleResult =
  "Sample checklist (fictional):\n- Make the primary action clear.\n- Verify keyboard access.\n- Explain how to recover from an error.";
const steps = (): ChatWorkStep[] => [
  {
    id: "brief",
    label: "Review the supplied brief",
    status: "pending",
    detail:
      "Example activity summary only. This demo does not read a real project or inspect a file.",
  },
  {
    id: "gaps",
    label: "Identify usability gaps",
    status: "pending",
    detail:
      "Fictional checks: clear labels, keyboard access and error recovery.",
  },
  {
    id: "checklist",
    label: "Prepare the review checklist",
    status: "pending",
    detail:
      "The sample text is already present locally. No model generates it.",
  },
];
type Transition =
  | "request-approval"
  | "approve"
  | "reject"
  | "cancel"
  | "confirm-cancel"
  | "retry"
  | "advance"
  | "complete"
  | "fail"
  | "unknown";

/** Demo consumer only. Every transition requires an explicit user action. */
export function useWorkSimulation() {
  const [state, setState] = React.useState<ChatWorkState>();
  const current = React.useRef<ChatWorkState | undefined>(undefined);
  const sequence = React.useRef(0);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      current.current = undefined;
    };
  }, []);
  function update(next: ChatWorkState | undefined) {
    if (!mounted.current) return;
    current.current = next;
    setState(next);
  }
  function change(
    identity: ChatWorkIdentity | undefined,
    transition: Transition,
  ) {
    const value = current.current;
    if (
      !mounted.current ||
      !value ||
      !identity ||
      value.id !== identity.id ||
      value.attempt !== identity.attempt ||
      value.revision !== identity.revision
    )
      return;
    if (value.pendingAction && transition !== "confirm-cancel") return;
    const next = { ...value, revision: value.revision + 1 };
    switch (transition) {
      case "request-approval":
        if (value.status === "planned")
          update({ ...next, status: "waiting-for-approval" });
        break;
      case "approve":
        if (value.status === "waiting-for-approval")
          update({
            ...next,
            status: "running",
            steps: value.steps.map((step, index) => ({
              ...step,
              status: index === 0 ? "running" : "pending",
            })),
          });
        break;
      case "reject":
        if (value.status === "waiting-for-approval")
          update({
            ...next,
            status: "cancelled",
            steps: value.steps.map((step) => ({
              ...step,
              status: "cancelled",
            })),
          });
        break;
      case "cancel":
        if (
          ["planned", "running", "waiting-for-approval", "unknown"].includes(
            value.status,
          )
        )
          update({ ...next, pendingAction: "cancel" });
        break;
      case "confirm-cancel":
        if (value.pendingAction === "cancel")
          update({
            ...next,
            pendingAction: undefined,
            status: "cancelled",
            steps: value.steps.map((step) => ({
              ...step,
              status: step.status === "succeeded" ? "succeeded" : "cancelled",
            })),
          });
        break;
      case "retry":
        if (["failed", "cancelled", "unknown"].includes(value.status))
          update({
            ...next,
            attempt: value.attempt + 1,
            revision: 0,
            status: "planned",
            steps: steps(),
            result: undefined,
            errorMessage: undefined,
          });
        break;
      case "advance": {
        const active = value.steps.findIndex(
          (step) => step.status === "running",
        );
        if (value.status !== "running" || active === -1) break;
        update({
          ...next,
          result: {
            text: "Sample finding (fictional): verify that the primary action has a clear label.",
          },
          steps: value.steps.map((step, index) => ({
            ...step,
            status:
              index === active
                ? "succeeded"
                : index === active + 1
                  ? "running"
                  : step.status,
          })),
        });
        break;
      }
      case "complete":
        if (
          value.status === "running" &&
          value.steps.length > 0 &&
          value.steps.every((step) => step.status === "succeeded")
        )
          update({
            ...next,
            status: "succeeded",
            result: { text: sampleResult },
          });
        break;
      case "fail":
        if (value.status === "running")
          update({
            ...next,
            status: "failed",
            errorMessage:
              "Simulated failure. The supplied partial result is kept; you can retry with a new attempt.",
            steps: value.steps.map((step) => ({
              ...step,
              status: step.status === "running" ? "failed" : step.status,
            })),
          });
        break;
      case "unknown":
        if (
          ["planned", "running", "waiting-for-approval"].includes(value.status)
        )
          update({ ...next, status: "unknown" });
        break;
    }
  }
  const work: ChatWorkControl | undefined = state
    ? {
        ...state,
        onApprove: (identity) => change(identity, "approve"),
        onReject: (identity) => change(identity, "reject"),
        onCancel: (identity) => change(identity, "cancel"),
        onRetry: (identity) => change(identity, "retry"),
      }
    : undefined;
  return {
    work,
    start: () =>
      update({
        id: `sample-work-${++sequence.current}`,
        attempt: 1,
        revision: 0,
        title: "Review a launch plan",
        description:
          "Work simulation. Fictional steps and results; no background task or model is running.",
        status: "planned",
        steps: steps(),
      }),
    reset: () => update(undefined),
    requestApproval: () => change(state, "request-approval"),
    advance: () => change(state, "advance"),
    complete: () => change(state, "complete"),
    fail: () => change(state, "fail"),
    unknown: () => change(state, "unknown"),
    confirmCancellation: () => change(state, "confirm-cancel"),
  };
}

export function WorkSimulationControls({
  simulation,
}: {
  simulation: ReturnType<typeof useWorkSimulation>;
}) {
  const work = simulation.work;
  if (!work) return null;
  const blocked = Boolean(work.pendingAction);
  return (
    <details className="rounded-lg border border-border px-4 py-3">
      <summary className="cursor-pointer text-sm font-medium">
        Work simulation controls
      </summary>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        These buttons supply fictional states manually. They do not execute
        work, call a model or write a file.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={blocked || work.status !== "planned"}
          onClick={simulation.requestApproval}
        >
          Simulate approval request
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={
            blocked ||
            work.status !== "running" ||
            !work.steps.some((step) => step.status === "running")
          }
          onClick={simulation.advance}
        >
          Advance one step
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={
            blocked ||
            work.status !== "running" ||
            !work.steps.every((step) => step.status === "succeeded")
          }
          onClick={simulation.complete}
        >
          Supply sample result
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={blocked || work.status !== "running"}
          onClick={simulation.fail}
        >
          Simulate failure
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={
            blocked ||
            !["planned", "running", "waiting-for-approval"].includes(
              work.status,
            )
          }
          onClick={simulation.unknown}
        >
          Simulate unknown status
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-11 max-w-full whitespace-normal py-2 [overflow-wrap:anywhere]"
          disabled={work.pendingAction !== "cancel"}
          onClick={simulation.confirmCancellation}
        >
          Confirm simulated cancellation
        </Button>
      </div>
    </details>
  );
}
