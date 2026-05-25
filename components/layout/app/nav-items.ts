export type AppNavItem = Readonly<{
  label: string;
  href: string;
  badge?: string;
}>;

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/projects' },
  { label: 'Admin', href: '/admin', badge: 'Pro' },
  { label: 'Billing', href: '/billing', badge: 'Pro' },
  { label: 'Settings', href: '/settings' },
  { label: 'Upgrade', href: 'https://pycolors.io/upgrade' },
] satisfies ReadonlyArray<AppNavItem>;
