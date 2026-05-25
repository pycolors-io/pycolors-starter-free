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
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

type BillingStatus = 'active' | 'trialing' | 'past_due';
type InvoiceStatus = 'paid' | 'open' | 'void';

type Invoice = Readonly<{
  id: string;
  number: string;
  dateIso: string;
  amountCents: number;
  status: InvoiceStatus;
}>;

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

function formatDate(iso: string) {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatMoneyEUR(amountCents: number) {
  const amount = amountCents / 100;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

function StatusBadge({
  status,
}: Readonly<{
  status: BillingStatus;
}>) {
  const labelByStatus: Record<BillingStatus, string> = {
    active: 'Active',
    trialing: 'Trialing',
    past_due: 'Past due',
  };

  return <Badge>{labelByStatus[status]}</Badge>;
}

function InvoiceStatusBadge({
  status,
}: Readonly<{
  status: InvoiceStatus;
}>) {
  const labelByStatus: Record<InvoiceStatus, string> = {
    paid: 'Paid',
    open: 'Open',
    void: 'Void',
  };

  return <Badge variant="success">{labelByStatus[status]}</Badge>;
}

function InvoiceRows({
  isLoading,
  invoices,
}: Readonly<{
  isLoading: boolean;
  invoices: Invoice[];
}>) {
  if (isLoading) {
    return <TableLoading colSpan={5} />;
  }

  if (invoices.length === 0) {
    return (
      <TableEmpty
        colSpan={5}
        title="No invoices yet"
        description="Invoices will appear here once billing history is connected."
      />
    );
  }

  return invoices.map((invoice) => (
    <TableRow key={invoice.id}>
      <TableCell className="font-medium">{invoice.number}</TableCell>

      <TableCell className="text-muted-foreground">
        {formatDate(invoice.dateIso)}
      </TableCell>

      <TableCell>
        <InvoiceStatusBadge status={invoice.status} />
      </TableCell>

      <TableCell className="text-right">
        {formatMoneyEUR(invoice.amountCents)}
      </TableCell>

      <TableCell className="text-right">
        <Button type="button" variant="outline" size="sm" disabled>
          Download
        </Button>
      </TableCell>
    </TableRow>
  ));
}

export default function BillingPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, []);

  const plan = {
    name: 'Pro',
    priceLabel: '€29 / month',
    seats: 10,
    renewalIso: '2026-03-01',
    status: 'active' as const satisfies BillingStatus,
  };

  const invoices = MOCK_INVOICES;

  const statusHintByStatus: Record<BillingStatus, string> = {
    active: 'All features enabled',
    trialing: 'Trial period',
    past_due: 'Payment issue',
  };

  const statusHint = statusHintByStatus[plan.status];

  return (
    <PageShell
      title="Billing"
      description="Manage plan, subscription status, invoices, and payment operations."
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/settings">Settings</Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((value) => !value)}
          >
            Toggle loading
          </Button>

          <Button size="sm" type="button" disabled>
            Manage billing
          </Button>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>Billing-ready SaaS surface</AlertTitle>
          <AlertDescription>
            A complete billing experience shaped for subscriptions,
            invoices, payment methods, customer portal access, and
            Stripe-backed monetization.
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
                  Subscription details, seats, renewal date, and plan
                  status.
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
                  Auto-renewal enabled for this subscription.
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Upgrades, invoices, and payment methods are managed
                through the billing portal.
              </div>

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
              Default payment method stored securely by your payment
              provider.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 p-0 pt-4">
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
              Payment method updates should be handled through a
              secure customer portal flow.
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
            Billing history prepared for downloadable invoice records.
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
              <InvoiceRows
                isLoading={isLoading}
                invoices={invoices}
              />
            </TableBody>
          </Table>

          <div className="mt-3 text-xs text-muted-foreground">
            Invoice rows are shaped for PDF downloads, receipt URLs,
            tax metadata, and customer billing history.
          </div>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Monetization path</CardTitle>

          <CardDescription>
            Connect the portal, subscription state, invoice records,
            and access control to make billing production-ready.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 p-0 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Use a server route to create a secure customer portal
            session and redirect the authenticated user.
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" disabled>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open portal
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
