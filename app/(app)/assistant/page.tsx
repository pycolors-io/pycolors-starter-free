import type { Metadata } from "next";
import { ArrowUpRight, Code2, FlaskConical } from "lucide-react";
import { Badge } from "@pycolors/ui";
import { PageShell } from "@/components/app/page-shell";
import { AssistantPlayground } from "@/components/assistant/assistant-playground";

export const metadata: Metadata = {
  title: "Assistant | Starter Free",
  description:
    "Explore a local assistant interface with chat, editable agent definitions and sample task states.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageShell
        title="Assistant"
        description="Explore an AI product interface, then connect your own application."
        actions={<Badge variant="outline">Included in Free</Badge>}
      >
        <section
          aria-labelledby="assistant-demo-title"
          className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <FlaskConical
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            />
            <div className="min-w-0 space-y-2">
              <h2 id="assistant-demo-title" className="text-sm font-semibold">
                A local playground, ready to adapt
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Try fixed sample replies and editable agent definitions. No
                model is connected. Use sample data; this session clears when
                you leave.
              </p>
            </div>
          </div>
        </section>
        <AssistantPlayground />
        <section
          aria-labelledby="assistant-integration-title"
          className="rounded-2xl border border-border p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <Code2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            />
            <div className="min-w-0 space-y-2">
              <h2
                id="assistant-integration-title"
                className="text-sm font-semibold"
              >
                Build on this interface
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                The UI is included in Free. Your application owns model
                requests, storage, access checks and costs. Starter Pro offers
                separate auth, database and billing foundations to configure;
                buying it does not connect an AI model or unlock this demo.
              </p>
              <a
                href="https://pycolors.io/docs/starter/assistant"
                className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Connect your own backend{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </section>
      </PageShell>
    </div>
  );
}
