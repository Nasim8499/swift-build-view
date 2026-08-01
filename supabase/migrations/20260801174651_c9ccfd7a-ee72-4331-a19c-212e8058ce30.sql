CREATE TABLE public.wp_check_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL,
  country text NOT NULL,
  status text NOT NULL,
  checked_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.wp_check_audit TO authenticated;
GRANT ALL ON public.wp_check_audit TO service_role;

ALTER TABLE public.wp_check_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read wp check audit"
ON public.wp_check_audit
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX wp_check_audit_checked_at_idx ON public.wp_check_audit (checked_at DESC);