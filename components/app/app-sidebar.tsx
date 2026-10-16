import Link from "next/link";
import { Layers2 } from "lucide-react";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarNav } from "./app-sidebar-nav";

export function AppSidebar() {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="mb-8 flex min-h-11 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-ring"
      >
        <span className="grid size-9 place-items-center rounded-lg border border-border bg-foreground text-background">
          <Layers2 className="size-4" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold tracking-tight">
            PyColors
          </span>
          <span className="text-xs text-muted-foreground">
            Personal workspace
          </span>
        </span>
      </Link>
      <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        Build & explore
      </p>
      <AppSidebarNav />
      <AppSidebarFooter />
    </div>
  );
}
