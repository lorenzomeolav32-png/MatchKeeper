import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/platform/auth-shell";
import { SignupForm } from "@/components/platform/signup-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Find a goalkeeper",
  robots: { index: false },
};

export default async function PlayerSignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <AuthShell aside="player">
      <SignupForm role="player" />
    </AuthShell>
  );
}
