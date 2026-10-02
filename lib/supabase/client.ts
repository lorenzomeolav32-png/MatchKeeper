import { createBrowserClient } from "@supabase/ssr";

// Cliente para Client Components (usa la anon key, protegido por RLS en Postgres).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
