import type { ReactNode } from 'react';

export function PageShell({
  title,
  description,
  actions,
  meta,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </div>

      {meta ? <div>{meta}</div> : null}

      {children}
    </div>
  );
}
