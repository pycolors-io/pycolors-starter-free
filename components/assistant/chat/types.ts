export type ChatStatus =
  "idle" | "submitting" | "streaming" | "stopped" | "error";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
}

/** Source-copy API. Requests, IDs, draft and persistence belong to the consumer. */
export interface AIChatProps {
  messages: readonly ChatMessage[];
  draft: string;
  status: ChatStatus;
  onDraftChange: (draft: string) => void;
  onSubmit: (draft: string) => void;
  onStop?: () => void;
  onRetry?: () => void;
  /** Resolve only after the clipboard operation succeeds; reject on failure. */
  onCopy: (message: ChatMessage) => Promise<void>;
  suggestions?: readonly ChatSuggestion[];
  agentDefinition?: AgentDefinitionControl;
  attachments?: ChatAttachmentsControl;
  work?: ChatWorkControl;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export interface AgentDefinitionFields {
  name: string;
  purpose: string;
  instructions: string;
}

export interface AgentDefinitionDraft extends AgentDefinitionFields {
  id: string;
  /** Increment on every change, including provenance and requested capabilities. */
  revision: number;
  requestedCapabilities?: readonly string[];
  sourceReferences?: readonly { id: string; label: string }[];
}

export type AgentDefinitionState = {
  draft: AgentDefinitionDraft;
  errors?: Partial<Record<keyof AgentDefinitionFields, string>>;
  errorMessage?: string;
} & (
  | {
      status: "draft" | "confirming" | "error" | "cancelled";
      confirmed?: never;
    }
  | { status: "created"; confirmed: AgentDefinitionDraft }
);

export type AgentDefinitionControl = AgentDefinitionState & {
  onChange: (fields: AgentDefinitionFields) => void;
  /** Set confirming synchronously; validate and guard request identity in your consumer. */
  onConfirm: (snapshot: AgentDefinitionDraft) => void;
  /** Cancel this revision locally; this does not delete a remote resource. */
  onCancel: (identity: Pick<AgentDefinitionDraft, "id" | "revision">) => void;
};

export type ChatAttachment = {
  id: string;
  name: string;
  size: number;
} & (
  | { status: "selected" | "reading" | "cancelled" }
  | { status: "error"; errorMessage: string }
  | {
      status: "ready";
      excerpt: string;
      truncated: boolean;
      sourceReference: { id: string; label: string };
    }
);

/** Presentation only. The consumer validates, reads and owns every file. */
export interface ChatAttachmentsControl {
  policy: {
    accept: string;
    formatsLabel: string;
    readLabel: string;
    maxFiles: number;
    maxBytes: number;
    description: string;
  };
  items: readonly ChatAttachment[];
  errorMessage?: string;
  announcement?: string;
  onSelect: (files: readonly File[]) => void;
  onRead: (id: string) => void;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
  onRemove: (id: string) => void;
  /** May prefill a prompt, but must not submit or confirm a definition. */
  onUse?: (id: string) => void;
}

export type ChatWorkStatus =
  | "planned"
  | "running"
  | "waiting-for-approval"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "unknown";
export type ChatWorkAction = "approve" | "reject" | "cancel" | "retry";
export interface ChatWorkIdentity {
  id: string;
  /** A new attempt must have a new number, even after cancellation. */
  attempt: number;
  /** Increment on each accepted update; reject actions for older revisions. */
  revision: number;
}
export interface ChatWorkStep {
  id: string;
  label: string;
  status: "pending" | "running" | "succeeded" | "failed" | "cancelled";
  detail?: string;
}
export interface ChatWorkState extends ChatWorkIdentity {
  title: string;
  description?: string;
  status: ChatWorkStatus;
  steps: readonly ChatWorkStep[];
  errorMessage?: string;
  result?: {
    text: string;
    links?: readonly { id: string; label: string; href: string }[];
  };
  /** Accepted request still awaiting consumer confirmation, not a task outcome. */
  pendingAction?: ChatWorkAction;
  actionError?: string;
}
/** Presentation only. Consumers own execution, authorization and idempotence. */
export interface ChatWorkControl extends ChatWorkState {
  /** Resolving a callback acknowledges a request, not completion of the task. */
  onApprove?: (identity: ChatWorkIdentity) => void | Promise<void>;
  onReject?: (identity: ChatWorkIdentity) => void | Promise<void>;
  onCancel?: (identity: ChatWorkIdentity) => void | Promise<void>;
  onRetry?: (identity: ChatWorkIdentity) => void | Promise<void>;
}
