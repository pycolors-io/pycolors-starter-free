import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Layers2 } from "lucide-react";
import { Button, cn } from "@/components/ui";

type UpgradeGateProps = Readonly<{
  title: string;
  description: string;
  children: ReactNode;
  badge?: string;
  hint?: string;
  features?: readonly string[];
  upgradeHref?: string;
  ctaLabel?: string;
  previewHeightClassName?: string;
  className?: string;
}>;

export function UpgradeGate({
  title,
  description,
  children,
  badge = "Starter Pro",
  hint = "Separate source code to configure and adapt. Buying Pro does not unlock or automatically migrate this demo.",
  features,
  upgradeHref = "https://pycolors.io/starters/pro",
  ctaLabel = "Explore Starter Pro",
  className,
}: UpgradeGateProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
    >
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Layers2 aria-hidden="true" className="size-4" />
            {badge} · Next step
          </p>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <p className="mt-3 max-w-xl text-xs leading-6 text-muted-foreground">
            {hint}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-5">
          {features?.length ? (
            <ul className="grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm">
              <Link href={upgradeHref}>
                {ctaLabel}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Button>
            <a
              href="https://pycolors.io/docs/starter-pro/what-is-included"
              className="inline-flex min-h-11 items-center text-xs underline underline-offset-4"
            >
              What is included
            </a>
          </div>
        </div>
      </div>
      <details className="border-t border-border bg-muted/20">
        <summary className="cursor-pointer px-5 py-3 text-xs text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring sm:px-7">
          View illustrative interface · sample data
        </summary>
        <div className="border-t border-border p-4">{children}</div>
      </details>
    </section>
  );
}
