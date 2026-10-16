"use client";

import * as React from "react";
import { Button } from "@pycolors/ui";
import type { AIChatProps, ChatMessage } from "./types";

function Message({
  message,
  disabled,
  onCopy,
}: {
  message: ChatMessage;
  disabled: boolean;
  onCopy: AIChatProps["onCopy"];
}) {
  const [feedback, setFeedback] = React.useState<{
    text: string;
    state: "pending" | "success" | "error";
  }>();
  const copying = React.useRef(false);
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const state = feedback?.text === message.text ? feedback.state : undefined;
  return (
    <li
      className="min-w-0 space-y-3 border-b border-border/60 py-6 last:border-0"
      data-slot="ai-chat-message"
    >
      <p className="text-xs font-semibold tracking-wide text-muted-foreground">
        {message.role === "user" ? "You" : "Assistant"}
      </p>
      <div className="whitespace-pre-wrap text-sm leading-7 [overflow-wrap:anywhere] text-foreground">
        {message.text || "Waiting for a response…"}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="min-h-11 text-muted-foreground motion-reduce:transition-none"
          disabled={disabled || !message.text || feedback?.state === "pending"}
          aria-label={`Copy ${message.role === "user" ? "your" : "assistant"} message`}
          onClick={async () => {
            if (copying.current) return;
            copying.current = true;
            const snapshot = { ...message };
            setFeedback({ text: snapshot.text, state: "pending" });
            try {
              await onCopy(snapshot);
              if (mounted.current)
                setFeedback({ text: snapshot.text, state: "success" });
            } catch {
              if (mounted.current)
                setFeedback({ text: snapshot.text, state: "error" });
            } finally {
              copying.current = false;
            }
          }}
        >
          Copy
        </Button>
        <span role="status" className="text-xs text-muted-foreground">
          {state === "pending"
            ? "Copying…"
            : state === "success"
              ? "Copied."
              : state === "error"
                ? "Could not copy. Select the text to copy it manually."
                : ""}
        </span>
      </div>
    </li>
  );
}

export function ChatThread({
  messages,
  disabled,
  onCopy,
}: Pick<AIChatProps, "messages" | "onCopy"> & { disabled: boolean }) {
  const viewport = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLOListElement>(null);
  const following = React.useRef(true);
  const observedSize = React.useRef<{
    height: number;
    viewportHeight: number;
  } | null>(null);
  const [atBottom, setAtBottom] = React.useState(true);
  React.useLayoutEffect(() => {
    if (following.current && viewport.current) {
      viewport.current.scrollTop = viewport.current.scrollHeight;
    }
  }, [messages]);
  React.useLayoutEffect(() => {
    const element = viewport.current;
    const list = content.current;
    if (!element || !list || typeof ResizeObserver === "undefined") return;

    const measure = () => ({
      height: element.scrollHeight,
      viewportHeight: element.clientHeight,
    });
    observedSize.current = measure();
    const observer = new ResizeObserver(() => {
      observedSize.current = measure();
      // Reflow can move the end without changing messages. Respect a reader who
      // scrolled back; resume following once the entire conversation fits.
      if (following.current || element.scrollHeight <= element.clientHeight) {
        following.current = true;
        element.scrollTop = element.scrollHeight;
        setAtBottom(true);
      }
    });
    observer.observe(element);
    observer.observe(list);
    return () => {
      observer.disconnect();
      observedSize.current = null;
    };
  }, []);
  return (
    <div className="min-w-0">
      <div
        ref={viewport}
        role="group"
        aria-label="Conversation"
        tabIndex={0}
        className="max-h-[28rem] min-w-0 overflow-y-auto overscroll-contain px-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-8"
        onScroll={(event) => {
          const element = event.currentTarget;
          const size = observedSize.current;
          // Browser anchoring may scroll during reflow before ResizeObserver
          // runs. Let that observer reconcile the layout without pausing follow.
          if (
            size &&
            (size.height !== element.scrollHeight ||
              size.viewportHeight !== element.clientHeight)
          )
            return;
          following.current =
            element.scrollHeight - element.scrollTop - element.clientHeight <=
            32;
          setAtBottom(following.current);
        }}
      >
        <ol ref={content} aria-label="Messages" className="m-0 list-none p-0">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              disabled={disabled}
              onCopy={onCopy}
            />
          ))}
        </ol>
      </div>
      {!atBottom ? (
        <div className="flex justify-center border-t border-border px-4 py-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={() => {
              const element = viewport.current;
              if (!element) return;
              following.current = true;
              element.scrollTop = element.scrollHeight;
              setAtBottom(true);
              element.focus({ preventScroll: true });
            }}
          >
            Jump to latest
          </Button>
        </div>
      ) : null}
    </div>
  );
}
