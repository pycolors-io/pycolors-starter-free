'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@pycolors/ui';

import { AppSidebarFooter } from '@/components/app/app-sidebar-footer';
import { NAV_ITEMS } from '@/components/layout/app/nav-items';
import { STARTER_VERSION_TAG } from '@/lib/version';

import { AppNav } from './app-nav';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

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

        <SheetContent side="left" className="flex w-80 flex-col p-4">
          <SheetHeader className="mb-6 text-left">
            <div className="flex items-center gap-2">
              <SheetTitle>PyColors Starter</SheetTitle>

              <Badge variant="outline" className="text-[10px]">
                {STARTER_VERSION_TAG}
              </Badge>
            </div>

            <SheetDescription>
              Production-ready SaaS starter surfaces.
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
          <AppSidebarFooter onNavigate={close} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
