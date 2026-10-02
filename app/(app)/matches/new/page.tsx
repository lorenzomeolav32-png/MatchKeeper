"use client";

import { useActionState, useState } from "react";
import { createMatchAction, type MatchActionState } from "@/lib/actions/matches";
import MapPicker from "@/components/map-picker";

const initialState: MatchActionState = { error: null };

// London centre — map starting point.
const DEFAULT_LAT = 51.5074;
const DEFAULT_LNG = -0.1278;

export default function NewMatchPage() {
  const [state, formAction, pending] = useActionState(
    createMatchAction,
    initialState,
  );
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);

  return (
    <main className="mx-auto flex max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg">Post your match</h1>
        <p className="mt-2 text-muted">
          Nearby goalkeepers will see it and can apply with their rate.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <label className="text-sm text-muted">
          Starts
          <input
            name="startsAt"
            type="datetime-local"
            required
            className="mt-1 w-full rounded-lg border border-line bg-bg-2 px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="text-sm text-muted">
          Ends
          <input
            name="endsAt"
            type="datetime-local"
            required
            className="mt-1 w-full rounded-lg border border-line bg-bg-2 px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>

        <input
          name="address"
          type="text"
          placeholder="Address / pitch (e.g. Hackney Marshes, London)"
          required
          className="rounded-lg border border-line bg-bg-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />

        <div>
          <MapPicker lat={lat} lng={lng} onChange={(la, ln) => { setLat(la); setLng(ln); }} />
          <p className="mt-2 text-xs text-muted">
            Click on the map or drag the pin to set the match location — {lat.toFixed(4)}, {lng.toFixed(4)}
          </p>
        </div>
        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />

        <input
          name="level"
          type="text"
          placeholder="Level (e.g. 5-a-side, casual)"
          className="rounded-lg border border-line bg-bg-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />
        <input
          name="budgetSuggested"
          type="number"
          step="0.01"
          placeholder="Suggested budget in £ (optional)"
          className="rounded-lg border border-line bg-bg-2 px-4 py-3 text-sm outline-none focus:border-accent"
        />

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink disabled:opacity-60"
        >
          {pending ? "Posting..." : "Post match"}
        </button>
      </form>
    </main>
  );
}
