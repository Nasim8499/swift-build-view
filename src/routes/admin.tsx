import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import SiteLayout from "@/components/SiteLayout";

const PASSCODE = "6660875";
const STORE_KEY = "wpcheck-admin-documents";

const title = "Administrator portal | WP Check";
const description = "Restricted administrator area for managing WP Check verification documents.";

export const Route = createFileRoute("/admin")({
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
  component: AdminPage,
});

type Doc = { id: string; name: string; size: number; uploaded: string; reference: string };

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <SiteLayout>
        <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">Administrator access</h1>
            <p className="mt-1 text-sm text-gray-600">Enter the administrator passcode to continue.</p>
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (code === PASSCODE) {
                  setUnlocked(true);
                  setError(false);
                } else {
                  setError(true);
                }
              }}
            >
              <label htmlFor="passcode" className="block text-sm font-semibold text-gray-800 mb-1">
                Passcode
              </label>
              <input
                id="passcode"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-11 rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
              />
              {error && <p className="mt-2 text-sm text-red-700">Incorrect passcode.</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]"
              >
                Unlock
              </button>
            </form>
            <Link to="/" className="mt-4 inline-block text-sm text-[#006272] hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return <AdminDashboard onLock={() => { setUnlocked(false); setCode(""); }} />;
}

function AdminDashboard({ onLock }: { onLock: () => void }) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setDocs(JSON.parse(raw) as Doc[]);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  function persist(next: Doc[]) {
    setDocs(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }

  function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const files = Array.from(fileRef.current?.files ?? []);
    const pdfs = files.filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) {
      setMessage("Please select one or more PDF files.");
      return;
    }
    const added: Doc[] = pdfs.map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      uploaded: new Date().toISOString(),
      reference: reference.trim().toUpperCase() || "—",
    }));
    persist([...added, ...docs]);
    setMessage(`${added.length} document${added.length > 1 ? "s" : ""} uploaded.`);
    setReference("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <SiteLayout>
      <div className="bg-[#1f1f1f]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-xl sm:text-2xl font-bold text-white">Administrator portal</h1>
            <p className="text-sm text-gray-400">WP Check document management</p>
          </div>
          <button onClick={onLock} className="shrink-0 rounded border border-gray-500 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10">
            Lock
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={onUpload} className="rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm lg:col-span-1 h-fit">
          <h2 className="text-lg font-bold text-gray-900">Upload WP Check PDF</h2>
          <label htmlFor="doc-reference" className="mt-4 block text-sm font-semibold text-gray-800 mb-1">
            Linked reference (optional)
          </label>
          <input
            id="doc-reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="WPC-2026-004821"
            className="w-full h-11 rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
          />
          <label htmlFor="doc-files" className="mt-4 block text-sm font-semibold text-gray-800 mb-1">
            PDF file(s)
          </label>
          <input
            id="doc-files"
            ref={fileRef}
            type="file"
            accept="application/pdf,.pdf"
            multiple
            className="w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-[#006272] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          <button type="submit" className="mt-5 w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]">
            Upload document
          </button>
          {message && <p role="status" className="mt-3 text-sm text-gray-700">{message}</p>}
        </form>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Uploaded documents</h2>
          {docs.length === 0 ? (
            <p className="text-sm text-gray-600">No documents uploaded yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {docs.map((d) => (
                <li key={d.id} className="py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-500">
                      {d.reference} · {(d.size / 1024).toFixed(0)} KB ·{" "}
                      {new Date(d.uploaded).toLocaleString("en-NZ")}
                    </p>
                  </div>
                  <button
                    onClick={() => persist(docs.filter((x) => x.id !== d.id))}
                    className="shrink-0 text-xs font-semibold text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
