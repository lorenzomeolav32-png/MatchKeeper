import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { completeness, profileChecklist, valuesFromRow } from "@/lib/profile";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const isGoalkeeper = profile?.role === "goalkeeper";

  let teamName = "";
  if (profile && !isGoalkeeper) {
    const { data: team } = await supabase
      .from("teams")
      .select("name")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    teamName = team?.name ?? "";
  }
  const { percent, requiredMissing } = profile
    ? completeness(
        profileChecklist(isGoalkeeper ? "goalkeeper" : "player", valuesFromRow(profile, teamName)),
      )
    : { percent: 100, requiredMissing: [] };

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-strong">
        {profile?.city ?? "London"}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-fg">
        Hi, {profile?.display_name ?? user.email}
      </h1>
      <p className="mt-2 text-muted">
        {isGoalkeeper
          ? profile?.approved
            ? "Your goalkeeper profile is approved — you can now apply to matches."
            : "Your goalkeeper profile is pending approval from an admin."
          : "Post a match and let nearby goalkeepers apply."}
      </p>

      {requiredMissing.length > 0 && (
        <Link
          href="/onboarding"
          className="card-surface mt-8 block rounded-2xl p-6 transition-colors hover:border-accent/50"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-lg font-semibold text-fg">Finish your profile</p>
            <p className="font-mono text-sm text-accent-strong">{percent}%</p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-3 text-sm text-muted">
            Still needed: {requiredMissing.map((i) => i.label.toLowerCase()).join(", ")}.
          </p>
        </Link>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {!isGoalkeeper && (
          <Link
            href="/matches/new"
            className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/50"
          >
            <p className="font-display text-lg font-semibold text-fg">
              Post a match
            </p>
            <p className="mt-1 text-sm text-muted">
              Find a goalkeeper for your next match.
            </p>
          </Link>
        )}
        <Link
          href="/matches"
          className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/50"
        >
          <p className="font-display text-lg font-semibold text-fg">Matches</p>
          <p className="mt-1 text-sm text-muted">
            {isGoalkeeper
              ? "Open matches where you can apply."
              : "All the matches you've posted."}
          </p>
        </Link>
        <Link
          href="/calendar"
          className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/50"
        >
          <p className="font-display text-lg font-semibold text-fg">My calendar</p>
          <p className="mt-1 text-sm text-muted">Your confirmed matches.</p>
        </Link>
        <Link
          href="/map"
          className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/50"
        >
          <p className="font-display text-lg font-semibold text-fg">Map</p>
          <p className="mt-1 text-sm text-muted">Explore matches near you.</p>
        </Link>
      </div>
    </main>
  );
}
