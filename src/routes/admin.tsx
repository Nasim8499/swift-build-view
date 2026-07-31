import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import {
  defaultAgreement,
  docRef,
  fileToDataUrl,
  loadAgreements,
  loadUploads,
  saveAgreements,
  saveUploads,
  formatNzDate,
  type AgreementData,
  type UploadedDoc,
} from "@/lib/wpcheck-docs";

const PASSCODE = "6660875";

const title = "Administrator portal | WP Check";
const description = "Restricted administrator area for managing WP Check verification documents.";

export const Route = createFileRoute("/admin")({
  ssr: false,
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
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <AdminDashboard onLock={() => { setUnlocked(false); setCode(""); }} />;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
        <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Administrator access</h1>
          <p className="mt-1 text-sm text-gray-600">Enter the administrator passcode to continue.</p>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (code === PASSCODE) { setUnlocked(true); setError(false); } else setError(true);
            }}
          >
            <label htmlFor="passcode" className="mb-1 block text-sm font-semibold text-gray-800">Passcode</label>
            <input
              id="passcode"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-11 w-full rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
            />
            {error && <p role="alert" className="mt-2 text-sm text-red-700">Incorrect passcode.</p>}
            <button type="submit" className="mt-4 w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]">
              Unlock
            </button>
          </form>
          <Link to="/" className="mt-4 inline-block text-sm text-[#006272] hover:underline">Back to home</Link>
        </div>
      </div>
    </SiteLayout>
  );
}

function AdminDashboard({ onLock }: { onLock: () => void }) {
  const [tab, setTab] = useState<"documents" | "generate">("documents");
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [agreements, setAgreements] = useState<AgreementData[]>([]);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<UploadedDoc | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  useEffect(() => {
    setDocs(loadUploads());
    setAgreements(loadAgreements());
  }, []);

  function persistDocs(next: UploadedDoc[]) { setDocs(next); saveUploads(next); }
  function persistAgreements(next: AgreementData[]) { setAgreements(next); saveAgreements(next); }

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null); setErrorMsg(null);
    const files = Array.from(fileRef.current?.files ?? []);
    const pdfs = files.filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) { setErrorMsg("Please select one or more PDF files."); return; }
    try {
      const added: UploadedDoc[] = await Promise.all(
        pdfs.map(async (f, i) => ({
          id: `${Date.now()}-${i}`,
          name: f.name,
          size: f.size,
          uploaded: new Date().toISOString(),
          reference: reference.trim().toUpperCase() || "—",
          dataUrl: await fileToDataUrl(f),
        })),
      );
      persistDocs([...added, ...docs]);
      setMessage(`${added.length} document${added.length > 1 ? "s" : ""} uploaded.`);
      setReference("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setErrorMsg("We couldn't store these files. They may be too large for local storage.");
    }
  }

  async function onReplaceFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const id = replacingId;
    e.target.value = "";
    setReplacingId(null);
    if (!file || !id) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      persistDocs(
        docs.map((d) =>
          d.id === id ? { ...d, name: file.name, size: file.size, uploaded: new Date().toISOString(), dataUrl } : d,
        ),
      );
      setMessage(`Replaced with ${file.name}.`);
    } catch {
      setErrorMsg("Unable to replace this document.");
    }
  }

  return (
    <SiteLayout>
      <div className="bg-[#1f1f1f]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-8 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-white sm:text-2xl">Administrator portal</h1>
            <p className="text-sm text-gray-400">WP Check document management</p>
          </div>
          <button onClick={onLock} className="shrink-0 rounded border border-gray-500 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10">
            Lock
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] gap-1 px-4 sm:px-6">
          {([["documents", "Uploaded PDFs"], ["generate", "Generate agreement"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`border-b-[3px] px-4 py-3 text-sm font-semibold transition-colors ${
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
            <button type="submit" className="mt-5 w-full rounded bg-[#006272] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]">
              Upload document
            </button>
            {message && <p role="status" className="mt-3 text-sm text-green-700">{message}</p>}
            {errorMsg && <p role="alert" className="mt-3 text-sm text-red-700">{errorMsg}</p>}
          </form>

          <div className="lg:col-span-2">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Uploaded documents</h2>
            {docs.length === 0 ? (
              <p className="text-sm text-gray-600">No documents uploaded yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {docs.map((d) => (
                  <li key={d.id} className="grid grid-cols-1 items-center gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{d.name}</p>
                      <p className="text-xs text-gray-500">
                        {d.reference} · {(d.size / 1024).toFixed(0)} KB · {new Date(d.uploaded).toLocaleString("en-NZ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-3 text-xs font-semibold">
                      <button onClick={() => setPreview(d)} className="text-[#006272] hover:underline">Preview</button>
                      <a href={d.dataUrl} download={d.name} className="text-[#006272] hover:underline">Download</a>
                      <button
                        onClick={() => { setReplacingId(d.id); replaceRef.current?.click(); }}
                        className="text-[#006272] hover:underline"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => { persistDocs(docs.filter((x) => x.id !== d.id)); if (preview?.id === d.id) setPreview(null); }}
                        className="text-red-700 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {preview && (
              <div className="mt-6 rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="truncate text-sm font-semibold text-gray-900">Preview — {preview.name}</p>
                  <button onClick={() => setPreview(null)} className="shrink-0 text-xs font-semibold text-gray-600 hover:underline">
                    Close
                  </button>
                </div>
                <object data={preview.dataUrl} type="application/pdf" className="h-[70vh] w-full rounded border border-gray-200">
                  <p className="p-4 text-sm text-gray-600">
                    Inline preview isn&apos;t supported here.{" "}
                    <a href={preview.dataUrl} download={preview.name} className="text-[#006272] underline">Download the PDF</a>.
                  </p>
                </object>
              </div>
            )}
          </div>
        </div>
      ) : (
        <GenerateTab agreements={agreements} onSave={persistAgreements} />
      )}
    </SiteLayout>
  );
}

function GenerateTab({
  agreements,
  onSave,
}: {
  agreements: AgreementData[];
  onSave: (next: AgreementData[]) => void;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState<AgreementData>(defaultAgreement());

  const set = (k: keyof AgreementData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = `${Date.now()}`;
    const record: AgreementData = { ...form, id, created: new Date().toISOString() };
    onSave([record, ...agreements]);
    navigate({ to: "/documents/$id", params: { id } });
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
        <button type="submit" className="mt-6 w-full rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c] sm:w-auto">
          Generate document
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
                    onClick={() => onSave(agreements.filter((x) => x.id !== a.id))}
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
