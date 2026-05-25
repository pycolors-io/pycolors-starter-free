'use client';

import * as React from 'react';
import { cn } from '@pycolors/ui';

export type AppNavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
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
  renderLink?: (props: AppNavRenderLinkProps) => React.ReactNode;
  onItemClick?: (item: AppNavItem) => void;
  onNavigate?: () => void;
  className?: string;
};

function isActiveRoute(currentPath: string, href: string) {
  if (href === '/dashboard') return currentPath === '/dashboard';

  if (href.startsWith('http')) return false;

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function AppNav({
  items,
  currentPath,
  renderLink,
  onItemClick,
  onNavigate,
  className,
}: Readonly<AppNavProps>) {
  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {items.map((item) => {
        const active = isActiveRoute(currentPath, item.href);
        const isExternal = item.href.startsWith('http');

        const linkClassName = cn(
          'group flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          active
            ? 'bg-muted font-medium text-foreground'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
        );

        const content = (
          <div className="flex min-w-0 items-center gap-2">
            {item.icon ? (
              <item.icon className="h-4 w-4 shrink-0" />
            ) : null}

            <span className="truncate">{item.label}</span>
          </div>
        );

        const rightSlot = item.badge ? (
          <span
            className={cn(
              'ml-auto inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium',
              active
                ? 'bg-background text-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {item.badge}
          </span>
        ) : null;

        const children = (
          <>
            {content}
            {rightSlot}
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
                children,
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
            {...(isExternal
              ? { target: '_blank', rel: 'noreferrer noopener' }
              : {})}
          >
            {children}
          </a>
        );
      })}
    </nav>
  );
}
