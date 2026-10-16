"use client";

import * as React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  MessagesSquare,
  Users,
  CreditCard,
  Settings2,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@pycolors/ui";

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

const routeIcons: Record<string, typeof LayoutDashboard> = {
  "/dashboard": LayoutDashboard,
  "/projects": FolderKanban,
  "/assistant": MessagesSquare,
  "/admin": Users,
  "/billing": CreditCard,
  "/settings": Settings2,
  "https://pycolors.io/starters/pro": ArrowUpRight,
};

function isActiveRoute(currentPath: string, href: string) {
  if (href === "/dashboard") return currentPath === "/dashboard";

  if (href.startsWith("http")) return false;

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
    <nav
      aria-label="Workspace navigation"
      className={cn("flex flex-col gap-1", className)}
    >
      {items.map((item) => {
        const active = isActiveRoute(currentPath, item.href);
        const isExternal = item.href.startsWith("http");

        const linkClassName = cn(
          "group flex min-h-11 items-center justify-between gap-3 rounded-md px-3 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none",
          active
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        );

        const Icon = item.icon ?? routeIcons[item.href];
        const content = (
          <div className="flex min-w-0 items-center gap-2">
            {Icon ? (
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
            ) : null}

            <span className="truncate">{item.label}</span>
          </div>
        );

        const rightSlot = item.badge ? (
          <span
            className={cn(
              "ml-auto inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium",
              active
                ? "bg-background text-foreground"
                : "bg-muted text-muted-foreground",
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
            aria-current={active ? "page" : undefined}
            {...(isExternal
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {children}
          </a>
        );
      })}
    </nav>
  );
}
