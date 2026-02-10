'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../layout/app/nav-items';
import {
  AppNav,
  type AppNavItem,
  type AppNavRenderLinkProps,
} from './app-nav';

const items: AppNavItem[] = NAV_ITEMS;

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <AppNav
      items={items}
      currentPath={pathname}
      renderLink={({
        href,
        className,
        children,
        onClick,
        active,
      }: AppNavRenderLinkProps) => (
        <Link
          href={href}
          className={className}
          onClick={onClick}
          aria-current={active ? 'page' : undefined}
        >
          {children}
        </Link>
      )}
    />
  );
}
