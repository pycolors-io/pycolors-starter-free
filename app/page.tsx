import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  FolderKanban,
  Layers2,
  MessagesSquare,
  Settings2,
  ShieldCheck,
  CreditCard,
  Users,
  Terminal,
} from "lucide-react";
import { Button } from "@pycolors/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { STARTER_VERSION_TAG } from "@/lib/version";

const surfaces = [
  {
    title: "Projects",
    detail: "Create, rename and revisit projects saved in this browser.",
    href: "/projects",
    icon: FolderKanban,
    tag: "Try the workflow",
  },
  {
    title: "Assistant",
    detail: "Explore sample replies, agent definitions and task states.",
    href: "/assistant",
    icon: MessagesSquare,
    tag: "Local playground",
  },
  {
    title: "Team",
    detail: "Try member and invitation patterns with sample data.",
    href: "/admin",
    icon: Users,
    tag: "Interface preview",
  },
  {
    title: "Billing",
    detail: "Inspect a subscription, payment method and invoice layout.",
    href: "/billing",
    icon: CreditCard,
    tag: "Interface preview",
  },
  {
    title: "Settings",
    detail: "Review profile, workspace and security layouts.",
    href: "/settings",
    icon: Settings2,
    tag: "Interface preview",
  },
  {
    title: "Account screens",
    detail: "Try local sign-in, registration and recovery feedback.",
    href: "/login",
    icon: ShieldCheck,
    tag: "Interface preview",
  },
];
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            <Layers2 aria-hidden="true" className="size-5 text-brand-primary" />
            PyColors{" "}
            <span className="hidden font-normal text-muted-foreground sm:inline">
              / Starter Free
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard">Open demo</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span
                className="size-1.5 rounded-full bg-brand-primary"
                aria-hidden="true"
              />
              Starter Free · {STARTER_VERSION_TAG}
            </p>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              Your next product
              <br />
              <span className="text-muted-foreground">starts here.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">
              A considered workspace for your Next.js app. Try real local
              interactions, make the interface yours, and build on a consistent
              foundation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/projects">Try the project workflow</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com/pycolors-io/pycolors-starter-free">
                  Get the free source
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs leading-6 text-muted-foreground">
              MIT licensed · No account required · Light & dark
            </p>
          </div>
          <div
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            aria-label="Sample workspace preview"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-xs font-semibold">Your workspace</span>
              <span className="text-[10px] text-muted-foreground">
                Local demo
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Overview</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight">
                    Make room for your ideas.
                  </p>
                </div>
                <FolderKanban
                  className="size-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-6 divide-y divide-border rounded-lg border border-border">
                {["Customer portal", "Design system", "Internal tools"].map(
                  (name, i) => (
                    <div key={name} className="flex items-center gap-3 p-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-xs font-medium">
                        0{i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-xs font-medium">
                        {name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Sample
                      </span>
                    </div>
                  ),
                )}
              </div>
              <Link
                href="/dashboard"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-medium underline underline-offset-4"
              >
                Explore the workspace
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section
          className="border-t border-border py-12 sm:py-16"
          aria-labelledby="surfaces-heading"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Explore the starter
              </p>
              <h2
                id="surfaces-heading"
                className="mt-2 text-2xl font-semibold tracking-tight"
              >
                More than an empty dashboard.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Every screen has a purpose. Projects stay in your browser; the
              other previews use local or sample data.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {surfaces.map(({ title, detail, href, icon: Icon, tag }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted/40 motion-reduce:transition-none"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Icon
                    className="size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
                <p className="mt-5 border-t border-border pt-4 text-[11px] text-muted-foreground">
                  {tag}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section
          className="grid gap-8 border-t border-border py-12 sm:py-16 lg:grid-cols-2"
          aria-labelledby="pro-heading"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              When your product needs more
            </p>
            <h2
              id="pro-heading"
              className="mt-3 text-3xl font-semibold tracking-tight"
            >
              Build the product.
              <br />
              Start with the foundations.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              Free helps you explore the interface. Starter Pro provides
              separate source code for authentication, database and billing
              foundations. Configure the services and adapt the product logic
              for your app.
            </p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Buying Pro does not unlock this demo, migrate its local data or
              connect an AI model.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="https://pycolors.io/starters/pro">
                  Explore Starter Pro
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://pycolors.io/docs/starter-pro/what-is-included">
                  See what is included
                </a>
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {[
              ["Identity", "Auth.js authentication and protected routes"],
              ["Data", "Prisma and PostgreSQL foundations"],
              ["Billing", "Stripe Checkout, customer portal and webhooks"],
              [
                "Your product",
                "Your business rules, integrations and configuration",
              ],
            ].map(([label, detail]) => (
              <div key={label} className="flex gap-3 p-5 sm:p-6">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-medium">{label}</h3>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-card p-6">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Terminal className="size-4" aria-hidden="true" />
              Make it yours
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              Clone the source, follow the setup guide and start with one useful
              flow.
            </p>
          </div>
          <a
            href="https://pycolors.io/docs/starter/getting-started"
            className="inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4"
          >
            Read the getting-started guide
          </a>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground">
          <span>PyColors Starter Free · {STARTER_VERSION_TAG}</span>
          <a
            href="https://pycolors.io"
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Explore PyColors
          </a>
        </div>
      </footer>
    </div>
  );
}
