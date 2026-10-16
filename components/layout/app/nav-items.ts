export type AppNavItem = Readonly<{
  label: string;
  href: string;
  badge?: string;
}>;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Assistant", href: "/assistant", badge: "Free" },
  { label: "Admin", href: "/admin", badge: "Demo" },
  { label: "Billing", href: "/billing", badge: "Demo" },
  { label: "Settings", href: "/settings" },
  { label: "Explore Pro", href: "https://pycolors.io/starters/pro" },
] satisfies ReadonlyArray<AppNavItem>;
