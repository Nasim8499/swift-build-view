import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AuditEntry = {
  id: string;
  reference: string;
  country: string;
  status: "verified" | "review" | "not_found";
  checked_at: string;
  latency_ms: number | null;
  provider_error: string | null;
};

/** Admin-only: the most recent WP Check verification requests and their outcome. */
export const listWpCheckAudit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("wp_check_audit")
      .select("id, reference, country, status, checked_at, latency_ms, provider_error")
      .order("checked_at", { ascending: false })
      .limit(200);

    if (error) throw new Error("Unable to load the audit log.");
    return (data ?? []) as AuditEntry[];
  });
