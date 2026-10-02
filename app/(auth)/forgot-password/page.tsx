import type { Metadata } from "next";
import { AuthShell } from "@/components/platform/auth-shell";
import { ForgotPasswordForm } from "@/components/platform/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthShell aside="login">
      <ForgotPasswordForm
        notice={error === "expired" ? "That reset link has expired or was already used. Request a new one." : undefined}
      />
    </AuthShell>
  );
}
