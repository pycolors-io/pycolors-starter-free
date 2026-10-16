"use client";

import * as React from "react";
import type { ChatAttachment, ChatAttachmentsControl } from "./chat";

export const localFilePolicy: ChatAttachmentsControl["policy"] = {
  accept: ".txt,.md",
  formatsLabel: "UTF-8 .txt or .md",
  readLabel: "Read locally",
  maxFiles: 1,
  maxBytes: 512 * 1024,
  description:
    "Read in this browser only. No upload or storage. Choose a non-sensitive file; its visible name may appear in confirmed JSON, never its contents.",
};

export function validateLocalFile(
  file: Pick<File, "name" | "type" | "size">,
): string | undefined {
  if (file.size === 0) return "Choose a non-empty text file.";
  if (file.size > localFilePolicy.maxBytes)
    return "The file exceeds 512 KiB. Choose a smaller file.";
  const extension = file.name.toLowerCase().split(".").at(-1);
  if (!file.name.includes(".") || (extension !== "txt" && extension !== "md"))
    return "Only UTF-8 .txt and .md files are supported. PDF, Office and images are not supported.";
  const type = file.type.toLowerCase();
  if (
    type &&
    type !== "text/plain" &&
    !(extension === "md" && type === "text/markdown")
  )
    return "The file type does not match a supported text format.";
}

/** Consumer-only local example. The copied presentation never reads a file. */
export function useLocalChatFile({
  onUseSource,
  onRemoveSource,
}: {
  onUseSource: (source: { id: string; label: string }) => void;
  onRemoveSource: (id: string) => void;
}) {
  const [item, setItem] = React.useState<ChatAttachment | null>(null);
  const [error, setError] = React.useState<string>();
  const [announcement, setAnnouncement] = React.useState("");
  const current = React.useRef<ChatAttachment | null>(null);
  const file = React.useRef<File | null>(null);
  const reader = React.useRef<FileReader | null>(null);
  const generation = React.useRef(0);
  const sequence = React.useRef(0);
  function update(next: ChatAttachment | null) {
    current.current = next;
    setItem(next);
  }
  const invalidate = React.useCallback(() => {
    generation.current++;
    const active = reader.current;
    reader.current = null;
    if (active) {
      active.onload = active.onerror = active.onabort = null;
      if (active.readyState === FileReader.LOADING) active.abort();
    }
  }, []);
  React.useEffect(
    () => () => {
      invalidate();
      file.current = null;
      current.current = null;
    },
    [invalidate],
  );

  function reset() {
    invalidate();
    file.current = null;
    update(null);
    setError(undefined);
    setAnnouncement("");
  }
  function read(id: string) {
    const selected = current.current,
      selectedFile = file.current;
    if (
      !selected ||
      selected.id !== id ||
      !selectedFile ||
      selected.status === "reading" ||
      selected.status === "ready"
    )
      return;
    invalidate();
    const token = generation.current;
    const metadata = { id, name: selected.name, size: selected.size };
    setError(undefined);
    setAnnouncement("");
    const invalid = validateLocalFile(selectedFile);
    if (invalid) {
      update({ ...metadata, status: "error", errorMessage: invalid });
      return;
    }
    const active = new FileReader();
    reader.current = active;
    update({ ...metadata, status: "reading" });
    function finish(next: ChatAttachment) {
      if (generation.current !== token || current.current?.id !== id) return;
      active.onload = active.onerror = active.onabort = null;
      reader.current = null;
      update(next);
    }
    active.onload = () => {
      if (generation.current !== token || current.current?.id !== id) return;
      try {
        if (
          !active.result ||
          typeof active.result === "string" ||
          active.result.byteLength > localFilePolicy.maxBytes
        )
          throw new Error("invalid");
        const text = new TextDecoder("utf-8", { fatal: true }).decode(
          new Uint8Array(active.result),
        );
        if (
          !text.trim() ||
          Array.from(text).some((character) => {
            const code = character.charCodeAt(0);
            return (
              (code < 32 && code !== 9 && code !== 10 && code !== 13) ||
              code === 127
            );
          })
        )
          throw new Error("invalid");
        const excerpt = Array.from(text.slice(0, 4002)).slice(0, 2000).join("");
        file.current = null;
        finish({
          ...metadata,
          status: "ready",
          excerpt,
          truncated: excerpt.length < text.length,
          sourceReference: { id, label: selected.name },
        });
      } catch {
        finish({
          ...metadata,
          status: "error",
          errorMessage:
            "Could not read supported UTF-8 text. The file may be empty, malformed or binary. Choose a plain-text file.",
        });
      }
    };
    active.onerror = () =>
      finish({
        ...metadata,
        status: "error",
        errorMessage:
          "The local file could not be read. Retry or choose another file.",
      });
    active.onabort = () => finish({ ...metadata, status: "cancelled" });
    try {
      active.readAsArrayBuffer(selectedFile);
    } catch {
      finish({
        ...metadata,
        status: "error",
        errorMessage:
          "The local file could not be read. Retry or choose another file.",
      });
    }
  }
  const control: ChatAttachmentsControl = {
    policy: localFilePolicy,
    items: item ? [item] : [],
    errorMessage: error,
    announcement,
    onSelect: (files) => {
      if (files.length !== 1) {
        setError("Choose one file at a time.");
        return;
      }
      const invalid = validateLocalFile(files[0]);
      if (invalid) {
        setError(invalid);
        return;
      }
      if (current.current) {
        setError(
          "Remove the current file before selecting another, including the same file again.",
        );
        return;
      }
      invalidate();
      file.current = files[0];
      setError(undefined);
      setAnnouncement("");
      update({
        id: `local-file-${++sequence.current}`,
        name: files[0].name,
        size: files[0].size,
        status: "selected",
      });
    },
    onRead: read,
    onRetry: read,
    onCancel: (id) => {
      const selected = current.current;
      if (selected?.id !== id || selected.status !== "reading") return;
      invalidate();
      update({
        id,
        name: selected.name,
        size: selected.size,
        status: "cancelled",
      });
    },
    onRemove: (id) => {
      if (current.current?.id !== id) return;
      reset();
      setAnnouncement(
        "File removed. Any linked definition needs review again.",
      );
      onRemoveSource(id);
    },
    onUse: (id) => {
      const source = current.current;
      if (source?.id === id && source.status === "ready")
        onUseSource(source.sourceReference);
    },
  };
  return {
    control,
    reset,
    source: item?.status === "ready" ? item.sourceReference : undefined,
  };
}
