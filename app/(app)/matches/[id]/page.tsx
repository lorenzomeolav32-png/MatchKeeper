import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { acceptApplicationAction } from "@/lib/actions/applications";
import ApplyForm from "./apply-form";
import ChatPanel from "./chat-panel";

type ApplicationRow = {
  id: string;
  rate: string;
  message: string | null;
  status: string;
  goalkeeper_id: string;
  profiles: { display_name: string; city: string | null } | null;
};

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: match } = await supabase
    .from("matches")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!match) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, approved")
    .eq("id", user.id)
    .maybeSingle();

  const isOwner = match.created_by === user.id;

  let applications: ApplicationRow[] = [];
  if (isOwner) {
    const { data } = await supabase
      .from("applications")
      .select(
        "id, rate, message, status, goalkeeper_id, profiles:goalkeeper_id(display_name, city)",
      )
      .eq("match_id", id)
      .order("created_at", { ascending: true });
    applications = (data as unknown as ApplicationRow[]) ?? [];
  }

  let myApplication: { id: string; status: string; rate: string } | null = null;
  if (!isOwner && profile?.role === "goalkeeper") {
    const { data } = await supabase
      .from("applications")
      .select("id, status, rate")
      .eq("match_id", id)
      .eq("goalkeeper_id", user.id)
      .maybeSingle();
    myApplication = data;
  }

  const canApply =
    !isOwner &&
    profile?.role === "goalkeeper" &&
    profile?.approved &&
    match.status === "open" &&
    !myApplication;

  const isParticipant = isOwner || myApplication?.status === "accepted";

  let initialMessages: { id: string; sender_id: string; body: string; created_at: string }[] = [];
  if (isParticipant) {
    const { data } = await supabase
      .from("messages")
      .select("id, sender_id, body, created_at")
      .eq("match_id", id)
      .order("created_at", { ascending: true });
    initialMessages = data ?? [];
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">{match.address}</h1>
      <p className="mt-2 text-muted">
        {new Date(match.starts_at).toLocaleString("en-GB")} —{" "}
        {new Date(match.ends_at).toLocaleTimeString("en-GB")}
      </p>
      <span className="mt-2 inline-block rounded-full bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted">
        {match.status}
      </span>

      {canApply && <ApplyForm matchId={match.id} />}

      {!isOwner && profile?.role === "goalkeeper" && !profile?.approved && (
        <p className="mt-6 text-sm text-amber">
          Your goalkeeper profile hasn&apos;t been approved by an admin yet — you can&apos;t apply yet.
        </p>
      )}

      {myApplication && (
        <p className="mt-6 text-sm text-muted">
          You already applied — rate £{myApplication.rate} · status: {myApplication.status}
        </p>
      )}

      {isOwner && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-fg">Applications</h2>
          {applications.length === 0 && (
            <p className="mt-2 text-sm text-muted">No one has applied yet.</p>
          )}
          <ul className="mt-4 flex flex-col gap-3">
            {applications.map((a) => (
              <li key={a.id} className="card-surface rounded-2xl p-4">
                <p className="font-display font-semibold text-fg">{a.profiles?.display_name ?? "Goalkeeper"}</p>
                <p className="text-sm text-muted">
                  {a.profiles?.city} · £{a.rate}
                </p>
                {a.message && <p className="mt-1 text-sm text-muted">&quot;{a.message}&quot;</p>}
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">{a.status}</p>
                {a.status === "pending" && match.status === "open" && (
                  <form action={acceptApplicationAction} className="mt-2">
                    <input type="hidden" name="applicationId" value={a.id} />
                    <input type="hidden" name="matchId" value={match.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
                    >
                      Accept
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {isParticipant && (
        <ChatPanel
          matchId={match.id}
          currentUserId={user.id}
          initialMessages={initialMessages}
        />
      )}
    </main>
  );
}
