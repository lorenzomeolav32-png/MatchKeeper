import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/platform/auth-shell";
import { ResetPasswordForm } from "@/components/platform/reset-password-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false },
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Sin sesión de recuperación (enlace caducado o abierto directamente).
  if (!user) redirect("/forgot-password?error=expired");

  return (
    <AuthShell aside="login">
      <ResetPasswordForm />
    </AuthShell>
  );
}
