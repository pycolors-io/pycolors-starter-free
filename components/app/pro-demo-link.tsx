"use client";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui";
import { proDemoUrl } from "@/lib/pro-demo-url";

export function ProDemoLink() {
  const href = proDemoUrl(usePathname());
  if (!href) return null;
  return (
    <Button asChild size="sm">
      <a
        href={href}
        onClick={() => {
          try {
            track("free_to_pro_demo_clicked");
          } catch {
            /* Optional analytics. */
          }
        }}
      >
        Explore Pro demo
      </a>
    </Button>
  );
}
