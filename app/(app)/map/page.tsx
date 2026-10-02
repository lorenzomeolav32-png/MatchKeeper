import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MatchesMap from "./matches-map";

export default async function MapPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: matches } = await supabase
    .from("matches")
    .select("id, address, lat, lng, starts_at")
    .eq("status", "open")
    .order("starts_at", { ascending: true });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">Match map</h1>
      <p className="mt-2 text-muted">
        Open matches near you — click a pin to see the details.
      </p>

      <div className="mt-6">
        <MatchesMap matches={matches ?? []} />
      </div>
    </main>
  );
}
