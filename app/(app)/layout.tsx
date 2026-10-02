import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/logo";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const navLinks = [
    { href: "/matches", label: "Matches" },
    { href: "/calendar", label: "Calendar" },
    { href: "/map", label: "Map" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/dashboard">
            <Logo iconClassName="h-8 w-8" wordmarkClassName="text-lg" />
          </Link>

          <nav className="hidden items-center gap-6 font-mono text-sm text-muted sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent-strong"
              >
                {link.label}
              </Link>
            ))}
            {profile?.is_admin && (
              <Link
                href="/admin/goalkeepers"
                className="text-amber transition-colors hover:text-accent-strong"
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">
              {profile?.display_name ?? user.email}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm text-muted underline hover:text-fg"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {/* Nav mobile: se muestra siempre debajo en pantallas chicas. */}
        <nav className="flex items-center gap-5 overflow-x-auto border-t border-line px-6 py-2 font-mono text-xs text-muted sm:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent-strong">
              {link.label}
            </Link>
          ))}
          {profile?.is_admin && (
            <Link href="/admin/goalkeepers" className="text-amber hover:text-accent-strong">
              Admin
            </Link>
          )}
        </nav>
      </header>

      {children}
    </div>
  );
}
