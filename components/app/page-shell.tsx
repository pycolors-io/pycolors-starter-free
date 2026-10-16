import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  actions,
  meta,
  children,
}: Readonly<{
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}>) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Workspace / {title}
          </p>
          <h1 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
      {meta ? <div>{meta}</div> : null}
      {children}
    </div>
  );
}
