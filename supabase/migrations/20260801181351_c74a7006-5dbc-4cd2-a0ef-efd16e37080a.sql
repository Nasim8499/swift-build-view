ALTER TABLE public.wp_check_audit
  ADD COLUMN IF NOT EXISTS latency_ms integer,
  ADD COLUMN IF NOT EXISTS provider_error text;