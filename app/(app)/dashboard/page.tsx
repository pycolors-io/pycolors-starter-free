import type * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CreditCard, FolderKanban, Users } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@/components/ui";
import { PageShell } from "@/components/app/page-shell";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { GETTING_STARTED_STEPS } from "@/lib/getting-started";

type TrendIntent = "good" | "neutral" | "bad";

function StatCard({
  label,
  value,
  hint,
  href,
  hrefLabel = "View",
  footer,
  trend,
}: Readonly<{
  label: string;
  value: string | number;
  hint: string;
  href?: string;
  hrefLabel?: string;
  footer?: React.ReactNode;
  trend?: Readonly<{
    label: string;
    intent?: TrendIntent;
  }>;
}>) {
  const trendClassByIntent: Record<TrendIntent, string> = {
    good: "text-emerald-600",
    neutral: "text-muted-foreground",
    bad: "text-rose-600",
  };

  const trendClass = trend
    ? trendClassByIntent[trend.intent ?? "neutral"]
    : undefined;

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardDescription className="flex items-center gap-2">
              <span>{label}</span>

              {trend ? (
                <span className={cn("text-xs", trendClass)}>{trend.label}</span>
              ) : null}
            </CardDescription>

            <CardTitle className="text-3xl">{value}</CardTitle>
          </div>

          {href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              aria-label={`${hrefLabel}: ${label}`}
            >
              {hrefLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-0 pt-4">
        <div className="text-sm text-muted-foreground">{hint}</div>

        {footer ? (
          <div className="text-xs text-muted-foreground">{footer}</div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  subtitle,
  href,
  hrefLabel = "Open",
  icon,
}: Readonly<{
  title: string;
  subtitle: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
}>) {
  return (
    <div className="rounded-md border border-border/60 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          {icon ? (
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {icon}
            </span>
          ) : null}

          <div className="min-w-0">
            <div className="text-sm font-medium">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
          </div>
        </div>

        {href ? (
          <Link
            href={href}
            className="shrink-0 text-sm underline underline-offset-4"
          >
            {hrefLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageShell
      title="Overview"
      description="A place to explore your product, try a workflow and plan what comes next."
      actions={
        <Button asChild size="sm">
          <Link href="/projects">Open projects</Link>
        </Button>
      }
    >
      <section aria-labelledby="getting-started-title" className="space-y-3">
        <div className="space-y-1">
          <h2 id="getting-started-title" className="text-base font-semibold">
            Get started with Starter Free
          </h2>
          <p className="text-sm text-muted-foreground">
            Try the workflow, make it yours, then choose your next foundation.
            These are suggestions, not a completion checklist.
          </p>
        </div>

        <ol
          role="list"
          className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {GETTING_STARTED_STEPS.map((step, index) => (
            <li key={step.id} className="min-w-0">
              <Card className="flex h-full min-w-0 flex-col p-5">
                <CardHeader className="p-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <CardDescription className="leading-6">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3 p-0 pt-3">
                  {step.files ? (
                    <details>
                      <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                        Customization files
                      </summary>
                      <dl className="mt-3 space-y-2 text-xs">
                        {step.files.map((file) => (
                          <div key={file.path}>
                            <dt>
                              <code className="[overflow-wrap:anywhere]">
                                {file.path}
                              </code>
                            </dt>
                            <dd className="mt-1 text-muted-foreground">
                              {file.purpose}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  ) : null}
                  {step.note ? (
                    <p className="text-xs leading-5 text-muted-foreground">
                      {step.note}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-col gap-2">
                    {step.links.map((link) => (
                      <Button
                        key={link.href}
                        asChild
                        variant={step.id === "projects" ? "default" : "outline"}
                        className="h-auto min-h-11 whitespace-normal py-2 text-center"
                      >
                        <Link href={link.href} prefetch={false}>
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Product snapshot</h2>
          <span className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground">
            Sample workspace
          </span>
        </div>
        <p className="text-xs leading-6 text-muted-foreground">
          <span className="font-medium text-foreground">
            Illustrative demo data.
          </span>{" "}
          These metrics and activity are fictional examples, not live billing or
          analytics.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="MRR"
            value="$1,240"
            hint="Sample monthly revenue"
            trend={{ label: "+12%", intent: "neutral" }}
            href="/billing"
            hrefLabel="Billing"
          />
          <StatCard
            label="Active users"
            value="312"
            hint="Sample activity · last 7 days"
            trend={{ label: "+8%", intent: "neutral" }}
            href="/admin"
            hrefLabel="Team"
          />
          <StatCard
            label="Churn"
            value="2.1%"
            hint="Sample subscriptions · last 30 days"
            href="/billing"
            hrefLabel="Billing"
          />
          <StatCard
            label="Workspace"
            value="Free"
            hint="Local demo · yours to adapt"
            href="/settings"
            hrefLabel="Settings"
          />
        </div>
      </div>
      <Card className="p-5 sm:p-6">
        <CardHeader className="p-0">
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>
            Sample events across a product workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-0 pt-5 lg:grid-cols-3">
          <ActivityItem
            title="Project updated"
            subtitle="Acme Workspace · Sample event"
            href="/projects"
            hrefLabel="Projects"
            icon={<FolderKanban className="size-4" aria-hidden="true" />}
          />
          <ActivityItem
            title="Member invited"
            subtitle="Design team · Sample event"
            href="/admin"
            hrefLabel="Team"
            icon={<Users className="size-4" aria-hidden="true" />}
          />
          <ActivityItem
            title="Subscription renewed"
            subtitle="Sample workspace · Yesterday"
            href="/billing"
            hrefLabel="Billing"
            icon={<CreditCard className="size-4" aria-hidden="true" />}
          />
        </CardContent>
      </Card>
      <UpgradeGate
        title="Move from a local demo to your own product"
        description="Keep the interface you understand. Starter Pro adds authentication, database and Stripe billing foundations for you to configure and adapt."
        features={[
          "Auth.js authentication",
          "Protected routes",
          "Prisma & PostgreSQL",
          "Stripe billing foundations",
        ]}
      >
        <p className="text-sm leading-6 text-muted-foreground">
          The snapshot above illustrates a possible product. Your application
          supplies real data, product logic and access policies.
        </p>
      </UpgradeGate>
    </PageShell>
  );
}
