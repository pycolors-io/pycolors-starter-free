# Starter Free assistant

This is a consumer integration of PyColors' Free `app-shells/ai-chat` Block.
Open `/assistant` in the running starter. The page is a local playground, not an
AI service: responses, definitions and Work results are fictional examples.

## Ownership

- `chat/`: the complete seven-file Block snapshot. `source-provenance.json`
  records its canonical monorepo revision and SHA-256 checksums. All runtime
  imports resolve inside this starter or its declared public dependencies.
- `assistant-playground.tsx`: this starter's client state, fixed sample responses,
  cancellation, retry, definition confirmation and reset.
- `use-local-chat-file.ts`: explicit browser-local reading of one UTF-8 `.txt` or
  `.md` file, up to 512 KiB. No upload; only a 2,000-character excerpt is shown.
- `work-simulation.tsx`: explicit reviewer controls for fictional Work states.

Copied source is yours to adapt; it does not automatically update. The integrity
check describes the delivered snapshot. If you deliberately customize a copied
file, record that divergence and update its checksum after review. To upgrade,
compare the canonical source at a new revision and rerun consumer checks. Never
replace consumer state/auth/backend code with a documentation demo blindly.

## Try the complete flow

1. Choose a suggestion. It fills the composer; Send starts the local example.
2. Stop a response, then Retry. Expand Test recovery to simulate an error.
3. Choose Define an agent, send, edit the fields, confirm, then copy/download JSON.
   This exports a local definition; it does not create a running agent.
4. Choose Add a reference and select a non-sensitive text file. Selection alone does not read it. Choose
   Read locally, then Use as reference and Send. Review its visible filename
   before exporting; file contents are excluded from the JSON.
5. Choose the task-plan suggestion. Use the clearly labelled simulation controls
   to supply status, approval and result states. No work executes in the background.
6. New chat clears the session and cancels local pending callbacks. Navigating
   away or reloading also clears it. Downloads already saved are not deleted.

## Connect an application

Replace the demo consumer while keeping `AIChat` controlled. Supply messages,
draft, status and submit/stop/retry/copy callbacks; pass optional definition,
attachment or Work controls only when your application actually supports them.
The generic Block never owns a model request, permission decision or persistence.

Follow https://pycolors.io/docs/starter/assistant and the existing versioned
recipe at https://pycolors.io/docs/blocks/app-shells/ai-chat. Validate your backend's
request limits, authorization, provider credentials, cancellation, safe rendering
and storage before using customer data. Client Stop alone does not prove an
upstream request or bill has stopped. Do not copy secrets into props or exports.

The assistant does not send prompts, filenames, file contents or definition
fields to analytics. The starter's existing site analytics remain separate.

## Free and Pro

This UI and its recovery, accessibility and local export are included in Free.
Starter Pro is separate source with configurable auth/database/billing foundations;
it does not automatically connect this assistant, supply inference or migrate
browser data. Future premium assistant compositions are not included or promised.

Run `pnpm test`, `pnpm lint`, `pnpm types:check` and `pnpm build` from this starter.
Review keyboard, mobile layout, both themes and the local flows after customization.
