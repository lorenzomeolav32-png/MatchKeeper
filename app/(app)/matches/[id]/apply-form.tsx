"use client";

import { useActionState } from "react";
import { applyToMatchAction, type ApplicationActionState } from "@/lib/actions/applications";

const initialState: ApplicationActionState = { error: null };

export default function ApplyForm({ matchId }: { matchId: string }) {
  const [state, formAction, pending] = useActionState(
    applyToMatchAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="card-surface mt-6 flex flex-col gap-3 rounded-2xl p-5"
    >
      <input type="hidden" name="matchId" value={matchId} />
      <label className="text-sm text-muted">
        Your rate (£)
        <input
          name="rate"
          type="number"
          step="0.01"
          required
          className="mt-1 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <textarea
        name="message"
        placeholder="Message (optional)"
        className="rounded-lg border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
      />

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? "Applying..." : "Apply to this match"}
      </button>
    </form>
  );
}
