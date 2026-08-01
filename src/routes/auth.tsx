import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const title = "Sign in | Employment New Zealand";
const description = "Sign in to the Employment New Zealand administrator area to manage WP Check documents.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null); setInfo(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("Check your email to confirm your account, then sign in.");
          return;
        }
        navigate({ to: "/admin", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { setError("Google sign-in failed. Please try again."); return; }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
        <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Access to the administrator portal is restricted to approved accounts.
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-800">Email</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-800">Password</label>
              <input
                id="password" type="password" required minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
              />
            </div>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            {info && <p role="status" className="text-sm text-green-700">{info}</p>}
            <button
              type="submit" disabled={busy}
              className="w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c] disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" /> or <span className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            onClick={onGoogle}
            className="w-full rounded border border-gray-400 px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Continue with Google
          </button>

          <p className="mt-5 text-sm text-gray-600">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
              className="font-semibold text-[#006272] hover:underline"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
          <Link to="/" className="mt-4 inline-block text-sm text-[#006272] hover:underline">Back to home</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
