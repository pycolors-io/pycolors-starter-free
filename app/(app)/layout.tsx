import { AppSidebar } from '@/components/app/app-sidebar';
import { MobileNav } from '@/components/app/mobile-nav';
import { UserMenu } from '@/components/app/user-menu';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full">
        <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-background md:block">
          <div className="sticky top-0 h-screen overflow-y-auto p-4">
            <AppSidebar />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  Template SaaS
                </div>

                <div className="text-xs text-muted-foreground">
                  Starter Free
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MobileNav />
                <UserMenu />
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-6 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
