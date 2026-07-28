import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@pycolors/ui";

// Keep Starter Free deployable from npm while @pycolors/ui@1.1.2 is still
// the latest published version with an RSC-unsafe Card onKeyDown handler.
type CardVariant = "default" | "muted" | "transparent";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  interactive?: boolean;
  variant?: CardVariant;
}

const variantClassNameByVariant: Record<CardVariant, string> = {
  default: "bg-card",
  muted: "bg-muted/40",
  transparent: "bg-transparent",
};

const interactiveClassName = [
  "cursor-pointer",
  "transition-colors",
  "hover:bg-accent/40",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
].join(" ");

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      asChild = false,
      className,
      variant = "default",
      interactive = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        data-slot="card"
        className={cn(
          "rounded-lg border text-card-foreground",
          variantClassNameByVariant[variant],
          interactive ? interactiveClassName : undefined,
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-base font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
