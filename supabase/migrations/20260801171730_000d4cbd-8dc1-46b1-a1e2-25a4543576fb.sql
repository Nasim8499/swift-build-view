CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

CREATE TABLE public.wp_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('upload', 'generated')),
  name text NOT NULL,
  reference text,
  file_path text,
  file_size integer,
  agreement jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wp_documents TO authenticated;
GRANT ALL ON public.wp_documents TO service_role;
ALTER TABLE public.wp_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage wp documents"
  ON public.wp_documents FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER wp_documents_updated_at
BEFORE UPDATE ON public.wp_documents
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Admins read wp document files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'wp-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins upload wp document files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'wp-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update wp document files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'wp-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete wp document files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'wp-documents' AND public.has_role(auth.uid(), 'admin'));