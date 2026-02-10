'use client';

import * as React from 'react';
import { cn } from '@pycolors/ui';

export type AppNavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type AppNavRenderLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  active: boolean;
};

export type AppNavProps = {
  items: readonly AppNavItem[];
  currentPath: string;

  /**
   * Optional escape hatch to render links with Next/React Router/etc.
   * If not provided, AppNav renders <a>.
   */
  renderLink?: (props: AppNavRenderLinkProps) => React.ReactNode;

  /** Called when a nav item is clicked (gives access to the item). */
  onItemClick?: (item: AppNavItem) => void;

  /** Called after navigation intent (useful to close mobile sheets/drawers). */
  onNavigate?: () => void;

  className?: string;
};

function isActiveRoute(currentPath: string, href: string) {
  if (href === '/dashboard') return currentPath === '/dashboard';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function AppNav({
  items,
  currentPath,
  renderLink,
  onItemClick,
  onNavigate,
  className,
}: AppNavProps) {
  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {items.map((item) => {
        const active = isActiveRoute(currentPath, item.href);

        const linkClassName = cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
          active ? 'bg-muted font-medium' : 'hover:bg-muted/60',
        );

        const content = (
          <>
            {item.icon ? <item.icon className="h-4 w-4" /> : null}
            <span>{item.label}</span>
          </>
        );

        const onClick = () => {
          onItemClick?.(item);
          onNavigate?.();
        };

        if (renderLink) {
          return (
            <React.Fragment key={item.href}>
              {renderLink({
                href: item.href,
                className: linkClassName,
                children: content,
                onClick,
                active,
              })}
            </React.Fragment>
          );
        }

        return (
          <a
            key={item.href}
            href={item.href}
            className={linkClassName}
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
