import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthDemoForm } from "@/components/auth/auth-demo-form";
export default function Page() {
  return (
    <AuthShell
      title="Start your workspace"
      description="Preview the first step into your product."
      footer={
        <Link href="/login" className="underline underline-offset-4">
          Try the sign-in screen
        </Link>
      }
    >
      <AuthDemoForm mode="register" />
    </AuthShell>
  );
}
