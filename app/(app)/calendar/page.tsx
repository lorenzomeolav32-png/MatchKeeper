import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type BookingRow = {
  id: string;
  rate: string;
  payment_status: string;
  matches: {
    id: string;
    address: string;
    starts_at: string;
    ends_at: string;
    status: string;
  } | null;
};

export default async function CalendarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("bookings")
    .select("id, rate, payment_status, matches(id, address, starts_at, ends_at, status)")
    .or(`player_id.eq.${user.id},goalkeeper_id.eq.${user.id}`);

  const bookings = ((data as unknown as BookingRow[]) ?? [])
    .filter((b) => b.matches)
    .sort(
      (a, b) =>
        new Date(a.matches!.starts_at).getTime() -
        new Date(b.matches!.starts_at).getTime(),
    );

  const now = Date.now();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg">My calendar</h1>
      <p className="mt-2 text-muted">
        Confirmed matches (with an assigned goalkeeper) you're part of.
      </p>

      {error && <p className="mt-6 text-sm text-red-600">{error.message}</p>}

      {!error && bookings.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          You don't have any confirmed matches yet.
        </p>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {bookings.map((b) => {
          const m = b.matches!;
          const isPast = new Date(m.ends_at).getTime() < now;
          return (
            <li key={b.id} className="card-surface rounded-2xl p-5 transition-colors hover:border-accent/50">
              <Link href={`/matches/${m.id}`} className="block">
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-fg">{m.address}</p>
                  <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted">
                    {isPast ? "past" : m.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {new Date(m.starts_at).toLocaleString("en-GB")} —{" "}
                  {new Date(m.ends_at).toLocaleTimeString("en-GB")}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Rate: £{b.rate} · Payment: {b.payment_status}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
