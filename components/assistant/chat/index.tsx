"use client";

import * as React from "react";
import { AIComposer, Alert, Button, cn } from "@pycolors/ui";
import { AgentDefinition } from "./agent-definition";
import { ChatAttachments } from "./attachments";
import { ChatThread } from "./chat-thread";
import { ChatWork } from "./work";
import type { AIChatProps } from "./types";

export type {
  AIChatProps,
  ChatWorkAction,
  ChatWorkControl,
  ChatWorkIdentity,
  ChatWorkState,
  ChatWorkStatus,
  ChatWorkStep,
  ChatAttachment,
  ChatAttachmentsControl,
  AgentDefinitionControl,
  AgentDefinitionDraft,
  AgentDefinitionFields,
  AgentDefinitionState,
  ChatMessage,
  ChatStatus,
  ChatSuggestion,
} from "./types";

/** A controlled, text-only chat. The consumer owns all transport and data. */
export const AIChat = React.forwardRef<HTMLTextAreaElement, AIChatProps>(
  function AIChat(
    {
      messages,
      draft,
      status,
      onDraftChange,
      onSubmit,
      onStop,
      onRetry,
      onCopy,
      suggestions = [],
      agentDefinition,
      attachments,
      work,
      errorMessage,
      disabled = false,
      className,
    },
    forwardedRef,
  ) {
    const id = React.useId();
    const input = React.useRef<HTMLTextAreaElement>(null);
    const restoreFocus = React.useRef(false);
    const busy = status === "submitting" || status === "streaming";
    const recoverable = status === "error" || status === "stopped";
    const statusText =
      status === "submitting"
        ? "Waiting for a response…"
        : status === "streaming"
          ? "Receiving a response…"
          : status === "stopped"
            ? "Response stopped. It may be incomplete."
            : status === "error"
              ? "Response failed. Your draft and messages are preserved."
              : messages.length
                ? "Ready for your next message."
                : "Ready when you are.";

    React.useLayoutEffect(() => {
      if (restoreFocus.current && !disabled) {
        restoreFocus.current = false;
        if (
          document.activeElement === document.body ||
          (document.activeElement?.tagName === "BUTTON" &&
            input.current?.form?.contains(document.activeElement))
        )
          input.current?.focus({ preventScroll: true });
      }
    }, [busy, recoverable, disabled]);

    return (
      <div
        data-slot="ai-chat"
        className={cn(
          "min-w-0 overflow-hidden rounded-xl border border-border bg-background text-foreground",
          className,
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4 sm:px-8">
          <h2
            id={`${id}-title`}
            className="text-sm font-semibold tracking-tight"
          >
            Conversation
          </h2>
          <span className="text-xs text-muted-foreground">
            Your context. Your next step.
          </span>
        </div>
        {messages.length ? (
          <ChatThread messages={messages} disabled={disabled} onCopy={onCopy} />
        ) : (
          <div className="space-y-5 px-5 py-10 sm:px-8 sm:py-14">
            <div className="max-w-md space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                A clear place to start
              </p>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What are you working on?
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                Start with a question, an idea, or a problem to work through.
              </p>
            </div>
            {suggestions.length ? (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Suggested prompts"
              >
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    type="button"
                    variant="outline"
                    className="h-auto min-h-11 max-w-full whitespace-normal text-left [overflow-wrap:anywhere]"
                    disabled={disabled || busy}
                    onClick={() => {
                      onDraftChange(suggestion.prompt);
                      input.current?.focus({ preventScroll: true });
                    }}
                  >
                    {suggestion.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        )}
        {work ? <ChatWork control={work} disabled={disabled} /> : null}
        {agentDefinition ? (
          <AgentDefinition
            key={agentDefinition.draft.id}
            control={agentDefinition}
            disabled={disabled}
          />
        ) : null}
        <div className="space-y-4 border-t border-border bg-muted/20 px-5 py-5 sm:px-8">
          <p
            id={`${id}-status`}
            role="status"
            aria-atomic="true"
            className="text-xs leading-5 text-muted-foreground"
          >
            {statusText}
          </p>
          {status === "error" ? (
            <Alert ariaLive="off" variant="destructive" id={`${id}-error`}>
              {errorMessage ||
                "The response could not be completed. Try again when you are ready."}
            </Alert>
          ) : null}
          {recoverable && onRetry ? (
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              disabled={disabled}
              onClick={(event) => {
                restoreFocus.current =
                  document.activeElement === event.currentTarget;
                onRetry();
              }}
            >
              Retry response
            </Button>
          ) : null}
          {attachments ? (
            <ChatAttachments
              control={attachments}
              disabled={disabled}
              onPrefill={() => input.current?.focus({ preventScroll: true })}
            />
          ) : null}
          <label htmlFor={`${id}-input`} className="sr-only">
            Message
          </label>
          <AIComposer
            ref={(element) => {
              input.current = element;
              if (typeof forwardedRef === "function")
                return forwardedRef(element);
              if (forwardedRef) forwardedRef.current = element;
            }}
            id={`${id}-input`}
            name="message"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onSubmit={() => {
              input.current?.focus({ preventScroll: true });
              onSubmit(draft);
            }}
            onStop={
              onStop
                ? () => {
                    restoreFocus.current =
                      input.current?.form?.contains(document.activeElement) ??
                      false;
                    onStop();
                  }
                : undefined
            }
            busy={busy}
            disabled={disabled}
            aria-invalid={status === "error" || undefined}
            aria-describedby={`${id}-status${status === "error" ? ` ${id}-error` : ""}`}
            placeholder="Write a message…"
            rows={3}
            className="min-h-24 resize-y bg-background text-sm"
          />
        </div>
      </div>
    );
  },
);
