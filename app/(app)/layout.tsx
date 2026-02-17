'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { AppSidebar } from '@/components/app/app-sidebar';
import { UserMenu } from '@/components/app/user-menu';
import { NAV_ITEMS } from '@/components/layout/app/nav-items';

import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@pycolors/ui';
import { AppNav } from '@/components/app/app-nav';

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const close = React.useCallback(() => setOpen(false), []);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader className="mb-4">
            <SheetTitle>PyColors SaaS</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate between sections
            </SheetDescription>
          </SheetHeader>

          <AppNav
            items={NAV_ITEMS}
            currentPath={pathname}
            onNavigate={close}
            renderLink={({
              href,
              className,
              children,
              onClick,
              active,
            }) => (
              <Link
                href={href}
                className={className}
                aria-current={active ? 'page' : undefined}
                onClick={onClick}
              >
                {children}
              </Link>
            )}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full">
        <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-background md:block">
          <div className="sticky top-0 h-screen overflow-y-auto p-4">
            <AppSidebar />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  Template SaaS
                </div>
                <div className="text-xs text-muted-foreground">
                  Starter v1
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MobileNav />
                <UserMenu />
              </div>
            </div>
          </div>

          <main className="min-w-0 flex-1 px-4 py-6 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
