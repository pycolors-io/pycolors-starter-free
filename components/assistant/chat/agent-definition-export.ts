import type { AgentDefinitionDraft } from "./types";

/** Copy the approved view fields, never arbitrary model/consumer properties. */
export function snapshotAgentDefinition(
  draft: AgentDefinitionDraft,
): AgentDefinitionDraft {
  return {
    id: draft.id,
    revision: draft.revision,
    name: draft.name,
    purpose: draft.purpose,
    instructions: draft.instructions,
    ...(draft.requestedCapabilities
      ? { requestedCapabilities: [...draft.requestedCapabilities] }
      : {}),
    ...(draft.sourceReferences
      ? {
          sourceReferences: draft.sourceReferences.map(({ id, label }) => ({
            id,
            label,
          })),
        }
      : {}),
  };
}

/** A PyColors example definition, not a runtime or permission grant. */
export function serializeAgentDefinition(draft: AgentDefinitionDraft): string {
  const {
    name,
    purpose,
    instructions,
    requestedCapabilities,
    sourceReferences,
  } = snapshotAgentDefinition(draft);
  return (
    JSON.stringify(
      {
        schemaVersion: 1,
        kind: "pycolors-agent-definition",
        name,
        purpose,
        instructions,
        requestedCapabilities,
        sourceReferences,
      },
      null,
      2,
    ) + "\n"
  );
}
