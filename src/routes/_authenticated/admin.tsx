import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { defaultAgreement, docRef, formatNzDate, type AgreementData } from "@/lib/wpcheck-docs";
import {
  createAgreement,
  deleteAgreement,
  deleteUpload,
  isAdmin as checkAdmin,
  listAgreements,
  listUploads,
  replacePdf,
  signedUrl,
  uploadPdf,
  type CloudAgreement,
  type CloudUpload,
} from "@/lib/wpcheck-cloud";

const title = "Administrator portal | WP Check";
const description = "Restricted administrator area for managing WP Check verification documents.";

export const Route = createFileRoute("/_authenticated/admin")({
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

function AdminPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
    checkAdmin().then(setAdmin).catch(() => setAdmin(false));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (admin === null) {
    return (
      <SiteLayout>
        <p className="px-4 py-20 text-center text-sm text-gray-600">Checking your access…</p>
      </SiteLayout>
    );
  }

  if (!admin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h1 className="text-xl font-bold text-gray-900">Administrator access required</h1>
            <p className="mt-2 text-sm text-gray-700">
              You are signed in as {email || "this account"}, which does not have administrator permissions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              <button onClick={signOut} className="rounded bg-[#006272] px-4 py-2 text-white hover:bg-[#004f5c]">
                Sign out
              </button>
              <Link to="/" className="rounded border border-gray-400 px-4 py-2 text-gray-800 hover:bg-white">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return <AdminDashboard email={email} onSignOut={signOut} />;
}

function AdminDashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [tab, setTab] = useState<"documents" | "generate" | "audit">("documents");
  const [docs, setDocs] = useState<CloudUpload[]>([]);
  const [agreements, setAgreements] = useState<CloudAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [reference, setReference] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ doc: CloudUpload; url: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replacing, setReplacing] = useState<CloudUpload | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [u, a] = await Promise.all([listUploads(), listAgreements()]);
      setDocs(u);
      setAgreements(a);
      setErrorMsg(null);
    } catch {
      setErrorMsg("We couldn't load your documents. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null); setErrorMsg(null);
    const files = Array.from(fileRef.current?.files ?? []);
    const pdfs = files.filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) { setErrorMsg("Please select one or more PDF files."); return; }
    setBusy(true);
    try {
      for (const f of pdfs) await uploadPdf(f, reference.trim().toUpperCase());
      setMessage(`${pdfs.length} document${pdfs.length > 1 ? "s" : ""} uploaded.`);
      setReference("");
      if (fileRef.current) fileRef.current.value = "";
      await refresh();
    } catch {
      setErrorMsg("Upload failed. Please check the file and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onReplaceFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const doc = replacing;
    e.target.value = "";
    setReplacing(null);
    if (!file || !doc) return;
    setBusy(true); setMessage(null); setErrorMsg(null);
    try {
      await replacePdf(doc, file);
      setMessage(`Replaced with ${file.name}.`);
      await refresh();
    } catch {
      setErrorMsg("Unable to replace this document.");
    } finally {
      setBusy(false);
    }
  }

  async function onPreview(doc: CloudUpload) {
    setErrorMsg(null);
    try {
      setPreview({ doc, url: await signedUrl(doc.path) });
    } catch {
      setErrorMsg("Unable to open this document.");
    }
  }

  async function onDownload(doc: CloudUpload) {
    try {
      const url = await signedUrl(doc.path);
      window.open(url, "_blank", "noopener");
    } catch {
      setErrorMsg("Unable to download this document.");
    }
  }

  async function onDelete(doc: CloudUpload) {
    setBusy(true);
    try {
      await deleteUpload(doc);
      if (preview?.doc.id === doc.id) setPreview(null);
      await refresh();
    } catch {
      setErrorMsg("Unable to delete this document.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <div className="bg-[#1f1f1f]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-white sm:text-2xl">Administrator portal</h1>
            <p className="truncate text-sm text-gray-400">Signed in as {email}</p>
          </div>
          <button
            onClick={onSignOut}
            className="w-fit shrink-0 rounded border border-gray-500 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 sm:px-6">
          {([["documents", "Uploaded PDFs"], ["generate", "Generate agreement"], ["audit", "Check audit log"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-semibold transition-colors ${
                tab === key ? "border-[#006272] text-[#006272]" : "border-transparent text-gray-600 hover:text-[#006272]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <input ref={replaceRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={onReplaceFile} />

      {tab === "documents" ? (
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
          <form onSubmit={onUpload} className="h-fit rounded-xl border border-gray-200 p-5 shadow-sm sm:p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900">Upload WP Check PDF</h2>
            <label htmlFor="doc-reference" className="mb-1 mt-4 block text-sm font-semibold text-gray-800">
              Linked reference (optional)
            </label>
            <input
              id="doc-reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="AEWV-2026-994821"
              className="h-11 w-full rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
            />
            <label htmlFor="doc-files" className="mb-1 mt-4 block text-sm font-semibold text-gray-800">PDF file(s)</label>
            <input
              id="doc-files"
              ref={fileRef}
              type="file"
              accept="application/pdf,.pdf"
              multiple
              className="w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-[#006272] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c] disabled:opacity-60"
            >
              {busy ? "Working…" : "Upload document"}
            </button>
            {message && <p role="status" className="mt-3 text-sm text-green-700">{message}</p>}
            {errorMsg && <p role="alert" className="mt-3 text-sm text-red-700">{errorMsg}</p>}
          </form>

          <div className="lg:col-span-2">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Uploaded documents</h2>
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />)}
              </div>
            ) : docs.length === 0 ? (
              <p className="text-sm text-gray-600">No documents uploaded yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {docs.map((d) => (
                  <li key={d.id} className="grid grid-cols-1 items-center gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{d.name}</p>
                      <p className="text-xs text-gray-500">
                        {d.reference} · {(d.size / 1024).toFixed(0)} KB · {new Date(d.created).toLocaleString("en-NZ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-3 text-xs font-semibold">
                      <button onClick={() => onPreview(d)} className="text-[#006272] hover:underline">Preview</button>
                      <button onClick={() => onDownload(d)} className="text-[#006272] hover:underline">Download</button>
                      <button
                        onClick={() => { setReplacing(d); replaceRef.current?.click(); }}
                        className="text-[#006272] hover:underline"
                      >
                        Replace
                      </button>
                      <button onClick={() => onDelete(d)} className="text-red-700 hover:underline">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {preview && (
              <div className="mt-6 rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="truncate text-sm font-semibold text-gray-900">Preview — {preview.doc.name}</p>
                  <button onClick={() => setPreview(null)} className="shrink-0 text-xs font-semibold text-gray-600 hover:underline">
                    Close
                  </button>
                </div>
                <object data={preview.url} type="application/pdf" className="h-[70vh] w-full rounded border border-gray-200">
                  <p className="p-4 text-sm text-gray-600">
                    Inline preview isn&apos;t supported here.{" "}
                    <a href={preview.url} target="_blank" rel="noopener" className="text-[#006272] underline">Open the PDF</a>.
                  </p>
                </object>
              </div>
            )}
          </div>
        </div>
      ) : tab === "generate" ? (
        <GenerateTab agreements={agreements} onChanged={refresh} />
      ) : (
        <AuditTab />
      )}

    </SiteLayout>
  );
}

function GenerateTab({ agreements, onChanged }: { agreements: CloudAgreement[]; onChanged: () => Promise<void> }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<AgreementData>(defaultAgreement());
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = (k: keyof AgreementData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErrorMsg(null);
    try {
      const id = await createAgreement({ ...form, created: new Date().toISOString() });
      await onChanged();
      navigate({ to: "/documents/$id", params: { id } });
    } catch {
      setErrorMsg("We couldn't save this document. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const fields: Array<[keyof AgreementData, string, string?]> = [
    ["reference", "Document reference", "INZ-1188-AEWV-NZ8849201B"],
    ["effectiveDate", "Effective date"],
    ["employerName", "Employer (accredited)", "Fletcher Building Ltd"],
    ["employerNzbn", "Employer NZBN", "9429030000000"],
    ["employeeName", "Employee full name", "Shamim Ahmed"],
    ["clientId", "Client ID", "NZ8849201-B"],
    ["passport", "Passport number", "A00500438"],
    ["nationality", "Passport country", "Bangladesh"],
    ["position", "Position / job title", "Infrastructure Operations Specialist"],
    ["site", "Site / place of work", "Auckland Metro Connect Alliance"],
    ["hourlyRate", "Hourly rate (NZD)", "38.50"],
    ["hoursPerWeek", "Ordinary hours per week", "40"],
    ["jobCheckToken", "Job Check token", "JC-2026-994821"],
    ["caseOfficer", "INZ case officer"],
  ];

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
      <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 p-5 shadow-sm sm:p-6 lg:col-span-2">
        <h2 className="text-lg font-bold text-gray-900">Generate AEWV employment agreement</h2>
        <p className="mt-1 text-sm text-gray-600">
          The document structure is fixed. Only employer, employee, dates and reference details change.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(([key, label, placeholder]) => (
            <div key={key}>
              <label htmlFor={key} className="mb-1 block text-sm font-semibold text-gray-800">{label}</label>
              <input
                id={key}
                type={key === "effectiveDate" ? "date" : "text"}
                value={String(form[key] ?? "")}
                onChange={set(key)}
                placeholder={placeholder}
                required={["employerName", "employeeName", "effectiveDate"].includes(key)}
                className="h-11 w-full rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
              />
            </div>
          ))}
        </div>
        {errorMsg && <p role="alert" className="mt-4 text-sm text-red-700">{errorMsg}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c] disabled:opacity-60 sm:w-auto"
        >
          {busy ? "Saving…" : "Generate document"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Generated documents</h2>
        {agreements.length === 0 ? (
          <p className="text-sm text-gray-600">No documents generated yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {agreements.map((a) => (
              <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">{a.employeeName}</p>
                  <p className="truncate text-xs text-gray-500">{docRef(a)} · {formatNzDate(a.effectiveDate)}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-xs font-semibold">
                  <Link to="/documents/$id" params={{ id: a.id }} className="text-[#006272] hover:underline">Open</Link>
                  <button
                    onClick={() => { void deleteAgreement(a.id).then(onChanged); }}
                    className="text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
