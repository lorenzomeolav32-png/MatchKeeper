import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setGoalkeeperApprovalAction } from "@/lib/actions/admin";

export default async function AdminGoalkeepersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: me } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!me?.is_admin) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-sm text-red-600">You don't have access to this section.</p>
      </main>
    );
  }

  const { data: goalkeepers } = await supabase
    .from("profiles")
    .select("id, display_name, city, approved, created_at")
    .eq("role", "goalkeeper")
    .order("approved", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">Admin — Goalkeepers</h1>
      <p className="mt-2 text-muted">
        Approve goalkeepers so they can apply to matches.
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {goalkeepers?.map((g) => (
          <li
            key={g.id}
            className="card-surface flex items-center justify-between rounded-2xl p-4"
          >
            <div>
              <p className="font-display font-semibold text-fg">{g.display_name}</p>
              <p className="text-sm text-muted">
                {g.city ?? "—"} · {new Date(g.created_at).toLocaleDateString("en-GB")}
              </p>
            </div>

            <form action={setGoalkeeperApprovalAction}>
              <input type="hidden" name="profileId" value={g.id} />
              <input type="hidden" name="approved" value={(!g.approved).toString()} />
              <button
                type="submit"
                className={
                  g.approved
                    ? "rounded-full border border-line px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent/50"
                    : "rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
                }
              >
                {g.approved ? "Revoke" : "Approve"}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
