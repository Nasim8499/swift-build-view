import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export default function AccountLink() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.session));
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  if (signedIn === null) return null;

  return signedIn ? (
    <Link to="/admin" className="hidden sm:inline text-[#006272] hover:underline">
      My account
    </Link>
  ) : (
    <Link to="/auth" className="hidden sm:inline text-[#006272] hover:underline">
      Sign in
    </Link>
  );
}
