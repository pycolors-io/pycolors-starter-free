import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthDemoForm } from "@/components/auth/auth-demo-form";
export default function Page() {
  return (
    <AuthShell
      title="Recover access"
      description="Preview a clear password-recovery experience."
      footer={
        <Link href="/login" className="underline underline-offset-4">
          Back to sign in
        </Link>
      }
    >
      <AuthDemoForm mode="reset" />
    </AuthShell>
  );
}
