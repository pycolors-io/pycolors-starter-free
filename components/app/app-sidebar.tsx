'use client';

import { Badge } from '@pycolors/ui';
import { STARTER_VERSION_TAG } from '@/lib/version';
import { AppSidebarNav } from './app-sidebar-nav';

export function AppSidebar() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold">
                PyColors Starter
              </span>
              <Badge variant="outline" className="text-[10px]">
                {STARTER_VERSION_TAG}
              </Badge>
            </div>

            <div className="mt-1 text-xs text-muted-foreground">
              Starter Free · B2B-ready surfaces
            </div>
          </div>
        </div>

        <div className="h-px bg-border/60" />
      </div>

      <AppSidebarNav />

      <div className="pt-2 space-y-2 text-xs text-muted-foreground">
        <div>Mock data · No backend · Built with tokens + UI</div>

        <div className="flex items-center gap-3">
          <a
            href="https://pycolors.io/docs/saas-starter"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Docs
          </a>

          <a
            href="https://github.com/pycolors-io/pycolors-starter-free"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
