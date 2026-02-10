'use client';

import { AppSidebarNav } from './app-sidebar-nav';

export function AppSidebar() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold">PyColors SaaS</div>
        <div className="text-xs text-muted-foreground">
          App skeleton
        </div>
      </div>

      <AppSidebarNav />

      <div className="pt-2 text-xs text-muted-foreground">
        Starter v1 · mock data · no backend
      </div>
    </div>
  );
}
