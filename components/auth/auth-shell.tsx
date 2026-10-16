import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Layers2 } from "lucide-react";

export function AuthShell({
  title,
  description,
  footer,
  children,
}: Readonly<{
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}>) {
  return (
    <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
      <section className="order-1 p-6 sm:p-9 md:order-2">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Account screen demo
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div className="mt-7 space-y-5">
          {children}
          {footer ? (
            <div className="text-sm text-muted-foreground">{footer}</div>
          ) : null}
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center text-xs underline underline-offset-4"
          >
            Continue to the demo workspace
          </Link>
        </div>
      </section>
      <section className="order-2 border-t border-border bg-muted/30 p-6 sm:p-9 md:order-1 md:border-t-0 md:border-r">
        <Layers2
          aria-hidden="true"
          className="mb-8 size-6 text-brand-primary"
        />
        <p className="text-xs font-medium text-muted-foreground">
          PyColors Starter Free
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          A thoughtful first impression.
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Try account screens with the same visual language as the workspace.
          These forms demonstrate the interface locally.
        </p>
        <ul className="mt-6 space-y-3 text-xs">
          {[
            "Labelled inputs and validation",
            "Light and dark appearance",
            "Responsive account layouts",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check aria-hidden="true" className="size-3.5" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-border pt-5">
          <p className="text-xs leading-6 text-muted-foreground">
            Need real accounts? Starter Pro includes Auth.js and protected-route
            foundations to configure in your app.
          </p>
          <a
            href="https://pycolors.io/starters/pro"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-medium underline underline-offset-4"
          >
            Explore Starter Pro
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
