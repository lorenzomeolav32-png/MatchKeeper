"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type MatchActionState = { error: string | null };

export async function createMatchAction(
  _prevState: MatchActionState,
  formData: FormData,
): Promise<MatchActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to be logged in." };
  }

  const startsAt = String(formData.get("startsAt") ?? "");
  const endsAt = String(formData.get("endsAt") ?? "");
  const address = String(formData.get("address") ?? "").trim();
  const lat = Number(formData.get("lat"));
  const lng = Number(formData.get("lng"));
  const level = String(formData.get("level") ?? "").trim() || null;
  const budgetRaw = String(formData.get("budgetSuggested") ?? "").trim();
  const budgetSuggested = budgetRaw ? Number(budgetRaw) : null;

  if (!startsAt || !endsAt || !address || Number.isNaN(lat) || Number.isNaN(lng)) {
    return { error: "Please fill in all required fields." };
  }
  if (new Date(endsAt) <= new Date(startsAt)) {
    return { error: "End time must be after start time." };
  }

  const { error } = await supabase.from("matches").insert({
    created_by: user.id,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: new Date(endsAt).toISOString(),
    address,
    lat,
    lng,
    level,
    budget_suggested: budgetSuggested,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/matches");
}
