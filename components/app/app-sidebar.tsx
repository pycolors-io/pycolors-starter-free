'use client';

import { Badge } from '@pycolors/ui';

import { AppSidebarFooter } from '@/components/app/app-sidebar-footer';
import { STARTER_VERSION_TAG } from '@/lib/version';

import { AppSidebarNav } from './app-sidebar-nav';

export function AppSidebar() {
  return (
    <div className="flex h-full flex-col">
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
      </div>

      <AppSidebarFooter />
    </div>
  );
}
