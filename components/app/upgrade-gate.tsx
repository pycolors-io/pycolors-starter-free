'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check, Lock, Sparkles } from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  cn,
} from '@pycolors/ui';

type UpgradeGateProps = Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
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
  badge = 'Pro',
  hint = 'Available in Starter Pro.',
  features,
  upgradeHref = 'https://pycolors.io/upgrade',
  ctaLabel = 'Upgrade to Starter Pro',
  previewHeightClassName = 'min-h-[420px]',
  className,
}: UpgradeGateProps) {
  const hasFeatures = Boolean(features?.length);

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-pro-border-subtle bg-pro-surface transition-all duration-200',
        'hover:border-pro-border hover:bg-pro-surface/80 hover:shadow-soft',
        previewHeightClassName,
        className,
      )}
    >
      {/* Preview */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="h-full w-full opacity-40">{children}</div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center p-6',
          previewHeightClassName,
        )}
      >
        <div
          className={cn(
            'w-full max-w-2xl rounded-md border border-border/50 bg-background/90 p-6 shadow-soft transition-all duration-200',
            'group-hover:border-pro-border-subtle group-hover:bg-background/95 group-hover:shadow-medium',
          )}
        >
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/30 text-muted-foreground transition-colors duration-200 group-hover:border-pro-border-subtle group-hover:bg-pro-surface-muted">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base font-medium">
                  {title}
                </CardTitle>

                <Badge
                  variant="outline"
                  className="gap-1 border-pro-border-subtle bg-pro-surface text-[10px]"
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {badge}
                </Badge>
              </div>

              <CardDescription className="mt-2 max-w-xl text-sm leading-6">
                {description}
              </CardDescription>

              <p className="mt-3 text-xs text-muted-foreground">
                {hint}
              </p>

              {hasFeatures ? (
                <div className="mt-5 grid gap-x-6 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {features?.map((feature) => (
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
              ) : null}

              <div className="mt-6">
                <Button
                  asChild
                  className="shadow-soft transition-all duration-200 hover:shadow-medium"
                >
                  <Link
                    href={upgradeHref}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {ctaLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
