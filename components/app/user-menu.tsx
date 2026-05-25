'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@pycolors/ui';

export function UserMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="User menu"
          className="gap-2"
        >
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
            P
          </span>

          <span className="hidden sm:inline">Patrice</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-border/60 bg-muted text-xs font-medium">
              P
            </span>

            <div className="min-w-0">
              <div className="truncate text-sm font-medium">
                Patrice
              </div>

              <div className="truncate text-xs font-normal text-muted-foreground">
                patrice@pycolors.io
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            Billing
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <User className="h-4 w-4" aria-hidden="true" />
          Profile
          <Badge variant="outline" className="ml-auto">
            Soon
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="https://pycolors.io/upgrade">
            <div className="flex w-full items-center gap-2">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Upgrade to Pro
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={(event) => {
            event.preventDefault();
            router.push('/login');
          }}
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
