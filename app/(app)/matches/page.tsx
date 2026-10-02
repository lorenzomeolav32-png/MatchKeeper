import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MatchesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const { data: matches, error } = await supabase
    .from("matches")
    .select("id, starts_at, ends_at, address, level, budget_suggested, status, created_by")
    .order("starts_at", { ascending: true });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight text-fg">Matches</h1>
        {profile?.role !== "goalkeeper" && (
          <Link
            href="/matches/new"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
          >
            + Post a match
          </Link>
        )}
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error.message}</p>}

      {!error && matches?.length === 0 && (
        <p className="mt-6 text-sm text-muted">No matches yet.</p>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {matches?.map((m) => (
          <li key={m.id} className="card-surface rounded-2xl p-5 transition-colors hover:border-accent/50">
            <Link href={`/matches/${m.id}`} className="block">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-fg">{m.address}</p>
                <span className="rounded-full bg-surface-2 px-3 py-1 text-xs uppercase tracking-wide text-muted">
                  {m.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                {new Date(m.starts_at).toLocaleString("en-GB")} —{" "}
                {new Date(m.ends_at).toLocaleTimeString("en-GB")}
              </p>
              {m.level && <p className="mt-1 text-sm text-muted">Level: {m.level}</p>}
              {m.budget_suggested && (
                <p className="mt-1 text-sm text-muted">
                  Suggested budget: £{m.budget_suggested}
                </p>
              )}
              {m.created_by === user.id && (
                <span className="mt-2 inline-block text-xs text-accent">Your match</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
