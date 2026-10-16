import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/components/app/app-sidebar";
import { MobileNav } from "@/components/app/mobile-nav";
import { UserMenu } from "@/components/app/user-menu";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-muted/20">
      <a
        href="#workspace-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-foreground focus:p-3 focus:text-background"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-screen w-full">
        <aside className="hidden w-60 shrink-0 border-r border-border bg-background md:block">
          <div className="sticky top-0 h-dvh overflow-y-auto p-4">
            <AppSidebar />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-background">
            <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
              <div className="flex items-center gap-3">
                <MobileNav />
                <span className="text-sm font-medium">Workspace</span>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                  Free demo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="https://pycolors.io/starters/pro"
                  className="hidden min-h-10 items-center rounded-md px-3 text-xs font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring sm:inline-flex"
                >
                  Explore Pro
                </Link>
                <ThemeToggle />
                <UserMenu />
              </div>
            </div>
          </header>
          <main
            id="workspace-content"
            tabIndex={-1}
            className="mx-auto w-full min-w-0 max-w-7xl flex-1 px-4 py-8 outline-none sm:px-6 lg:px-10 lg:py-10"
          >
            {children}
          </main>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-5 text-xs text-muted-foreground md:px-8">
            <span>PyColors Starter Free · Browser-local demo</span>
            <a
              href="https://pycolors.io/docs/starter"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Build with this starter
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
