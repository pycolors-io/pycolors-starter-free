import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@pycolors/ui';

const EXTERNAL = {
  starters: 'https://pycolors.io/starters',
  docs: 'https://pycolors.io/docs/saas-starter',
  github: 'https://github.com/pycolors-io/pycolors-starter-free',
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function IncludedCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-1">
              {description}
            </CardDescription>
          </div>
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-4">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Link href={href}>
            Open{' '}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Link
            href={EXTERNAL.starters}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight underline underline-offset-4"
          >
            PyColors SaaS Starter (FREE)
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>

          <div className="text-xs text-muted-foreground">
            Minimal landing inside the starter. Full details live on
            pycolors.io.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={EXTERNAL.docs}>
              Docs{' '}
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={EXTERNAL.github}>
              GitHub{' '}
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Next.js App Router</Pill>
            <Pill>Tailwind v4</Pill>
            <Pill>PyColors UI</Pill>
            <Pill>Mock data · No backend</Pill>
            <Pill>Prod patterns</Pill>
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            A production-shaped SaaS starter — even before backend.
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Most starters stop at UI screens. This one ships the real
            UX surface: navigation, states, tables, dialogs, settings,
            billing entrypoints, and auth flows — ready to wire.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild>
            <Link href="/dashboard">
              Open live demo{' '}
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href={EXTERNAL.starters}>
              Get the starter{' '}
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <div className="text-xs text-muted-foreground sm:ml-2">
            Pro version planned (billing + auth wired + more blocks).
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  Quality gates
                </div>
                <div className="text-sm text-muted-foreground">
                  a11y defaults, clear states, stable layouts, safe
                  destructive patterns.
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles
                className="mt-0.5 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  B2B-ready surface
                </div>
                <div className="text-sm text-muted-foreground">
                  org members + invitations, settings tabs, billing
                  overview, portal entrypoint.
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <ArrowRight
                className="mt-0.5 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <div className="text-sm font-medium">Wire later</div>
                <div className="text-sm text-muted-foreground">
                  Plug your backend (NestJS/Prisma), Stripe portal,
                  and auth provider when ready.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionTitle
          title="What’s included"
          description="Core pages and patterns that make a starter feel like a real SaaS."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <IncludedCard
            title="Dashboard"
            description="KPI cards, quick actions, credible layout and navigation."
            href="/dashboard"
            badge="v1"
          />
          <IncludedCard
            title="Projects"
            description="Table + row actions + rename/delete dialogs + empty/loading states."
            href="/projects"
            badge=" mock"
          />
          <IncludedCard
            title="Admin"
            description="Members + invitations. Resend/cancel actions. B2B readiness."
            href="/admin"
            badge="B2B"
          />
          <IncludedCard
            title="Billing"
            description="Plan overview + invoices table + portal entrypoint (mock)."
            href="/billing"
            badge="Monetization"
          />
          <IncludedCard
            title="Settings"
            description="Tabs + forms (disabled) + danger zone. Product-like feel."
            href="/settings"
            badge="Surface"
          />
          <IncludedCard
            title="Auth"
            description="Login/register/forgot. Uses PasswordInput. OAuth placeholder."
            href="/login"
            badge="UI"
          />
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionTitle
          title="Why it’s different"
          description="Short version here. Deep dive on pycolors.io."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base">
                Production patterns
              </CardTitle>
              <CardDescription>
                The starter includes interaction contracts, not just
                components.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Tables: loading/empty states, row actions, safe
                  destructive flows
                </li>
                <li>
                  • Forms: labels, helper text, error slots,
                  disabled/coming next
                </li>
                <li>
                  • Navigation: stable layout, active route logic,
                  predictable IA
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base">
                Design system first
              </CardTitle>
              <CardDescription>
                Tokens + consistent UI primitives, ready for a pro
                layer.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Tokens + theming: consistent spacing, radii,
                  colors
                </li>
                <li>
                  • a11y defaults: aria, focus states,
                  keyboard-friendly overlays
                </li>
                <li>
                  • Reusable states: Skeleton, EmptyState,
                  TableLoading
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <SectionTitle
          title="Quickstart"
          description="Keep it short. Devs want to run it fast."
        />

        <Card className="p-4">
          <pre className="overflow-x-auto rounded-md bg-muted/30 p-3 text-xs">
            {`pnpm install
pnpm dev`}
          </pre>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Want the full guide, architecture notes, and release
              checklist?
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href={EXTERNAL.docs}>
                Read docs on pycolors.io{' '}
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </Card>
      </section>

      <footer className="mt-12 border-t border-border/60 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Starter v1 · mock data · no backend · built with PyColors
            UI
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href={EXTERNAL.starters}
              className="underline underline-offset-4"
            >
              Starters
            </Link>
            <Link
              href={EXTERNAL.docs}
              className="underline underline-offset-4"
            >
              Docs
            </Link>
            <Link
              href="/dashboard"
              className="underline underline-offset-4"
            >
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
