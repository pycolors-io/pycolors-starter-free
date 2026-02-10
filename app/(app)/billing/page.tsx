'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ExternalLink,
  FileText,
  ShieldCheck,
} from 'lucide-react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  TableLoading,
  Skeleton,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatMoneyEUR(amountCents: number) {
  // simple mock helper; later: use Stripe amounts + currency
  const v = amountCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(v);
}

type BillingStatus = 'active' | 'trialing' | 'past_due';

function StatusBadge({ status }: { status: BillingStatus }) {
  const label =
    status === 'active'
      ? 'Active'
      : status === 'trialing'
        ? 'Trialing'
        : 'Past due';
  return <Badge>{label}</Badge>;
}

type InvoiceStatus = 'paid' | 'open' | 'void';

type Invoice = {
  id: string;
  number: string;
  dateIso: string;
  amountCents: number;
  status: InvoiceStatus;
};

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const label =
    status === 'paid' ? 'Paid' : status === 'open' ? 'Open' : 'Void';
  return <Badge>{label}</Badge>;
}

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_001',
    number: 'INV-0001',
    dateIso: '2026-02-01',
    amountCents: 2900,
    status: 'paid',
  },
  {
    id: 'inv_002',
    number: 'INV-0002',
    dateIso: '2026-01-01',
    amountCents: 2900,
    status: 'paid',
  },
];

export default function BillingPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  // v1 mock — later comes from backend/Stripe
  const plan = {
    name: 'Pro',
    priceLabel: '€29 / month',
    seats: 10,
    renewalIso: '2026-03-01',
    status: 'active' as const satisfies BillingStatus,
  };

  const invoices = MOCK_INVOICES;

  const statusHint =
    plan.status === 'active'
      ? 'All features enabled'
      : plan.status === 'trialing'
        ? 'Trial period'
        : 'Payment issue';

  return (
    <PageShell
      title="Billing"
      description="Plan, invoices, and billing portal entrypoint (v1)."
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/settings">Settings</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((v) => !v)}
          >
            Toggle loading
          </Button>

          <div className="flex items-center gap-2">
            <Button size="sm" type="button" disabled>
              Manage billing
            </Button>
            <span className="text-xs text-muted-foreground">
              Coming next
            </span>
          </div>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>Stripe portal (coming next)</AlertTitle>
          <AlertDescription>
            This starter ships a complete billing UX surface. Next:
            connect Stripe Customer Portal and load subscription +
            invoices from the backend.
          </AlertDescription>
        </Alert>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  Current plan
                </CardTitle>
                <CardDescription>
                  Subscription details and renewal.
                </CardDescription>
              </div>

              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={plan.status} />
                <span className="text-xs text-muted-foreground">
                  {statusHint}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md border border-border/60 p-3">
                <div className="text-xs text-muted-foreground">
                  Plan
                </div>
                <div className="mt-1 text-sm font-medium">
                  {isLoading ? (
                    <Skeleton className="h-5 w-24" />
                  ) : (
                    plan.name
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {isLoading ? (
                    <Skeleton className="h-4 w-28" />
                  ) : (
                    plan.priceLabel
                  )}
                </div>
              </div>

              <div className="rounded-md border border-border/60 p-3">
                <div className="text-xs text-muted-foreground">
                  Seats
                </div>
                <div className="mt-1 text-sm font-medium">
                  {isLoading ? (
                    <Skeleton className="h-5 w-16" />
                  ) : (
                    plan.seats
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Team members allowed on this plan.
                </div>
              </div>

              <div className="rounded-md border border-border/60 p-3">
                <div className="text-xs text-muted-foreground">
                  Renewal
                </div>
                <div className="mt-1 text-sm font-medium">
                  {isLoading ? (
                    <Skeleton className="h-5 w-40" />
                  ) : (
                    `Renews on ${formatDate(plan.renewalIso)}`
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Auto-renew enabled (v1 mock).
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Upgrades, invoices, and payment method are managed in
                the billing portal.
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled
                >
                  <ExternalLink
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Open portal
                </Button>
                <span className="text-xs text-muted-foreground">
                  Coming next
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2">
              <CreditCard
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              Payment method
            </CardTitle>
            <CardDescription>
              Stored securely via Stripe.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-4 space-y-3">
            <div className="rounded-md border border-border/60 p-3">
              <div className="text-xs text-muted-foreground">
                Default
              </div>
              <div className="mt-1 text-sm font-medium">
                {isLoading ? (
                  <Skeleton className="h-5 w-36" />
                ) : (
                  'Visa •••• 4242'
                )}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  'Expires 12/29'
                )}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled
              className="w-full"
            >
              Update payment method
            </Button>

            <div className="text-xs text-muted-foreground">
              Coming next: Stripe portal handles payment method
              updates.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <FileText
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            Invoices
          </CardTitle>
          <CardDescription>
            Billing history (v1 mock). In v2, invoices come from
            Stripe.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableLoading colSpan={5} />
              ) : invoices.length === 0 ? (
                <TableEmpty
                  colSpan={5}
                  title="No invoices yet"
                  description="Invoices will appear here once Stripe is connected."
                />
              ) : (
                invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">
                      {inv.number}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(inv.dateIso)}
                    </TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={inv.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatMoneyEUR(inv.amountCents)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-3 text-xs text-muted-foreground">
            Coming next: “Download” links to the Stripe invoice PDF.
          </div>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Next step</CardTitle>
          <CardDescription>
            Make monetization real by wiring Stripe portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Add a server route that creates a Stripe portal session
            and redirects the user.
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" disabled>
              <ExternalLink className=" h-4 w-4" aria-hidden="true" />
              Open portal (mock)
            </Button>
            <Button asChild>
              <Link href="/admin">Go to members</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
