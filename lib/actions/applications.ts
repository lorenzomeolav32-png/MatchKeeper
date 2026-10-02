"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ApplicationActionState = { error: string | null };

export async function applyToMatchAction(
  _prevState: ApplicationActionState,
  formData: FormData,
): Promise<ApplicationActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to be logged in." };
  }

  const matchId = String(formData.get("matchId") ?? "");
  const rateRaw = String(formData.get("rate") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim() || null;
  const rate = Number(rateRaw);

  if (!matchId || !rateRaw || Number.isNaN(rate) || rate <= 0) {
    return { error: "Please enter a valid rate." };
  }

  const { error } = await supabase.from("applications").insert({
    match_id: matchId,
    goalkeeper_id: user.id,
    rate,
    message,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/matches/${matchId}`);
  return { error: null };
}

export async function acceptApplicationAction(formData: FormData) {
  const supabase = await createClient();
  const applicationId = String(formData.get("applicationId") ?? "");
  const matchId = String(formData.get("matchId") ?? "");

  const { error } = await supabase.rpc("accept_application", {
    p_application_id: applicationId,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/matches/${matchId}`);
}
