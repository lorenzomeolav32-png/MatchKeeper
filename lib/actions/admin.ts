"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setGoalkeeperApprovalAction(formData: FormData) {
  const supabase = await createClient();
  const profileId = String(formData.get("profileId") ?? "");
  const approved = formData.get("approved") === "true";

  const { error } = await supabase
    .from("profiles")
    .update({ approved })
    .eq("id", profileId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/goalkeepers");
}
