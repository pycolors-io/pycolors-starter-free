import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthDemoForm } from "@/components/auth/auth-demo-form";
export default function Page() {
  return (
    <AuthShell
      title="Welcome back"
      description="Explore a focused sign-in experience."
      footer={
        <Link href="/register" className="underline underline-offset-4">
          Try the registration screen
        </Link>
      }
    >
      <AuthDemoForm mode="login" />
    </AuthShell>
  );
}
