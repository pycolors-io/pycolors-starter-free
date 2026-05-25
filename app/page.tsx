import type * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pycolors/ui';

import { STARTER_VERSION_TAG } from '@/lib/version';

const EXTERNAL = {
  starters: 'https://pycolors.io/starters',
  free: 'https://pycolors.io/starters/free',
  pricing: 'https://pycolors.io/pricing',
  upgrade: 'https://pycolors.io/upgrade',
  pro: 'https://pycolors.io//starters/pro',
  docs: 'https://pycolors.io/docs/starter',
  github: 'https://github.com/pycolors-io/pycolors-starter-free',
  ui: 'https://pycolors.io/ui',
} as const;

const INCLUDED = [
  {
    title: 'Dashboard',
    description:
      'KPI metrics, activity feeds, quick actions, and upgrade-ready product analytics.',
    href: '/dashboard',
    badge: 'Core',
  },
  {
    title: 'Projects',
    description:
      'Project entities, table actions, rename flows, dialogs, navigation states, and scalable workspace patterns.',
    href: '/projects',
    badge: 'Data',
  },
  {
    title: 'Admin',
    description:
      'Members, invitations, protected ownership, and collaborative workspace management.',
    href: '/admin',
    badge: 'Team',
  },
  {
    title: 'Billing',
    description:
      'Subscription plans, invoices, payment methods, and billing portal entrypoints.',
    href: '/billing',
    badge: 'Revenue',
  },
  {
    title: 'Settings',
    description:
      'Profile preferences, organization controls, security flows, and danger-zone actions.',
    href: '/settings',
    badge: 'App',
  },
  {
    title: 'Auth',
    description:
      'Authentication flows, password recovery, account access, and onboarding surfaces.',
    href: '/login',
    badge: 'Flow',
  },
] satisfies ReadonlyArray<{
  title: string;
  description: string;
  href: string;
  badge: string;
}>;

const PRO_FEATURES = [
  'Email & password authentication',
  'Google & GitHub OAuth',
  'Stripe Checkout & billing portal',
  'Protected routes & session handling',
  'Webhook synchronization',
  'Subscription lifecycle flows',
] satisfies ReadonlyArray<string>;

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function IncludedCard({
  title,
  description,
  href,
  badge,
}: Readonly<{
  title: string;
  description: string;
  href: string;
  badge: string;
}>) {
  return (
    <Card className="group relative overflow-hidden p-4 transition-all duration-200 hover:border-pro-border-subtle hover:bg-pro-surface/40 hover:shadow-soft">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="text-base font-medium tracking-tight">
              {title}
            </CardTitle>

            <CardDescription className="mt-1.5 text-sm leading-6">
              {description}
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className="shrink-0 border-pro-border-subtle bg-pro-surface text-[10px] font-medium"
          >
            {badge}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-5">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-between border-border/60 bg-background/60 transition-colors group-hover:border-pro-border-subtle group-hover:bg-background"
        >
          <Link href={href}>
            <span>Open surface</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
function FeatureCard({
  title,
  description,
  icon: Icon,
}: Readonly<{
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>

        <div className="space-y-1">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-sm leading-6 text-muted-foreground">
            {description}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <a
            href={EXTERNAL.free}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight underline underline-offset-4"
          >
            PyColors Starter Free
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Production-shaped SaaS starter</span>
            <span className="text-muted-foreground/70">·</span>
            <span>
              Version{' '}
              <span className="font-mono">{STARTER_VERSION_TAG}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a
              href={EXTERNAL.docs}
              target="_blank"
              rel="noreferrer noopener"
            >
              Docs
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={EXTERNAL.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </header>

      <section className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Next.js App Router</Pill>
            <Pill>Tailwind v4</Pill>
            <Pill>PyColors UI</Pill>
            <Pill>Upgrade-ready</Pill>
            <Pill>No backend required</Pill>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              A SaaS starter that feels like a real product from day
              one.
            </h1>

            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Starter Free gives you the product shell, application
              surfaces, states, navigation, tables, settings, billing
              previews, and auth flows needed to validate a SaaS
              quickly — then upgrade when you need authentication,
              billing, protected routes, and production wiring.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild>
            <Link href="/dashboard">
              Open live demo
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <a
              href={EXTERNAL.upgrade}
              target="_blank"
              rel="noreferrer noopener"
            >
              Upgrade to Starter Pro
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button asChild variant="outline">
            <a
              href={EXTERNAL.docs}
              target="_blank"
              rel="noreferrer noopener"
            >
              Read docs
            </a>
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <FeatureCard
            title="Product-shaped UX"
            description="Dashboard, projects, admin, billing, settings, and auth flows designed like a real SaaS."
            icon={Layers}
          />

          <FeatureCard
            title="Upgrade path built in"
            description="Free surfaces stay useful while Pro gates highlight authentication, billing, and protected workflows."
            icon={Sparkles}
          />

          <FeatureCard
            title="Production patterns"
            description="Reusable states, stable layouts, safe destructive actions, accessible overlays, and predictable navigation."
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionTitle
          title="What’s included"
          description="Core app surfaces that make the starter feel credible before you wire your backend."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((item) => (
            <IncludedCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-pro-border-subtle bg-pro-surface p-5">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Built to convert to Starter Pro</CardTitle>
                <CardDescription className="mt-1">
                  Starter Free validates the product experience.
                  Starter Pro adds the production business layer.
                </CardDescription>
              </div>

              <Badge
                variant="outline"
                className="gap-1 border-pro-border-subtle bg-pro-surface-muted"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Pro
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0 pt-5">
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {PRO_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2"
                >
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-brand-primary"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <a
                  href={EXTERNAL.pro}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  View Starter Pro
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button asChild variant="outline">
                <a
                  href={EXTERNAL.pricing}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Compare pricing
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardHeader className="p-0">
            <CardTitle>Positioning</CardTitle>
            <CardDescription className="mt-1">
              Free is not unfinished. It is intentionally scoped.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 p-0 pt-5 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <Zap
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span>
                Use Starter Free to test the product shape, IA, UI
                patterns, and user flows.
              </span>
            </div>

            <div className="flex gap-3">
              <Lock
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span>
                Upgrade when you need authentication, billing,
                subscriptions, protected routes, and production
                wiring.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 space-y-6">
        <SectionTitle
          title="Why it’s different"
          description="PyColors Starter focuses on product surfaces and SaaS workflows, not isolated components."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base">
                Interaction contracts
              </CardTitle>
              <CardDescription>
                Tables, actions, dialogs, loading states, empty
                states, and destructive flows work together.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Tables with loading, empty states, and actions.
                </li>
                <li>
                  • Forms with labels, helper text, and validation
                  slots.
                </li>
                <li>
                  • Navigation with active routes and stable layout.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base">
                Design-system first
              </CardTitle>
              <CardDescription>
                Built with PyColors UI primitives and tokens for a
                consistent, extensible product baseline.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Token-driven color, border, radius, and elevation.
                </li>
                <li>
                  • Accessible overlays, focus states, and controls.
                </li>
                <li>
                  • Reusable states: Skeleton, EmptyState,
                  TableLoading.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <SectionTitle
          title="Quickstart"
          description="Clone, install, and run the starter locally."
        />

        <Card className="p-4">
          <pre className="overflow-x-auto rounded-md bg-muted/30 p-3 text-xs">
            {`pnpm install
pnpm dev`}
          </pre>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Read the guide for architecture notes, customization,
              and release workflow.
            </div>

            <Button asChild variant="outline" size="sm">
              <a
                href={EXTERNAL.docs}
                target="_blank"
                rel="noreferrer noopener"
              >
                Read docs
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </Card>
      </section>

      <footer className="mt-12 border-t border-border/60 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            Starter{' '}
            <span className="font-mono">{STARTER_VERSION_TAG}</span> ·
            mock data · no backend · built with{' '}
            <a
              href={EXTERNAL.ui}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              PyColors UI
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={EXTERNAL.starters}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4"
            >
              Starters
            </a>

            <a
              href={EXTERNAL.docs}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4"
            >
              Docs
            </a>

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
