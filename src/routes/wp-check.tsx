import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import SiteLayout from "@/components/SiteLayout";
import { COUNTRIES } from "@/lib/countries";
import { runWpCheck } from "@/lib/wpcheck-verify.functions";

const title = "WP Check — Work Agreement & Entitlement Verification";
const description =
  "Use the official WP Check service to verify a work agreement and confirm minimum employment entitlements before employment starts.";

export const Route = createFileRoute("/wp-check")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WpCheckPage,
});

const styles = {
  verified: "border-green-200 bg-green-50",
  review: "border-amber-200 bg-amber-50",
  not_found: "border-red-200 bg-red-50",
} as const;

const headings = {
  verified: "Work agreement and entitlements verified",
  review: "Further review required",
  not_found: "No matching record found",
} as const;

function WpCheckPage() {
  const [error, setError] = useState<string | null>(null);
  const check = useServerFn(runWpCheck);
  const mutation = useMutation({ mutationFn: check });
  const result = mutation.data;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      reference: String(form.get("reference") ?? "").trim(),
      passport: String(form.get("passport") ?? "").trim(),
      dob: String(form.get("dob") ?? "").trim(),
      country: String(form.get("country") ?? "").trim(),
    };
    if (!payload.reference || !payload.passport || !payload.dob || !payload.country) {
      setError("Please complete every field before running a WP Check.");
      return;
    }
    mutation.mutate(
      { data: payload },
      { onError: () => setError("We could not complete the check. Please try again in a moment.") },
    );
  }

  return (
    <SiteLayout>
      <div className="bg-[#006272]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-[#9fd4db] mb-3">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> WP Check
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            WP Check
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#9fd4db]">
            Work Agreement &amp; Entitlement Verification
          </p>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#b2d8de]">{description}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={onSubmit} className="rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Start a WP Check</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter the reference number and travel document details exactly as they appear on the work agreement.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id="reference" label="Reference number" required placeholder="e.g. WPC-2026-004821" />
              <Field id="passport" label="Passport number" required placeholder="e.g. LA1234567" />
              <Field id="dob" label="Date of birth" type="date" required max={new Date().toISOString().slice(0, 10)} />
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-800 mb-1">
                  Country of documents
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  defaultValue=""
                  className="w-full h-11 rounded border border-gray-400 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
                >
                  <option value="" disabled>Select a country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="mt-6 inline-flex items-center justify-center rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c] disabled:opacity-60 transition-colors w-full sm:w-auto"
            >
              {mutation.isPending ? "Checking…" : "Run WP Check"}
            </button>
          </form>

          {result && (
            <div role="status" className={`mt-6 rounded-xl border p-5 ${styles[result.status]}`}>
              <h3 className="font-bold text-gray-900">{headings[result.status]}</h3>
              <p className="mt-2 text-sm text-gray-700">{result.message}</p>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <div><dt className="inline font-semibold">Reference: </dt><dd className="inline">{result.reference}</dd></div>
                <div><dt className="inline font-semibold">Country of documents: </dt><dd className="inline">{result.country}</dd></div>
                <div><dt className="inline font-semibold">Checked: </dt><dd className="inline">{new Date(result.checkedAt).toLocaleString("en-NZ")}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <aside className="rounded-xl bg-[#f5fbfc] border border-[#cfe8ec] p-5 h-fit">
          <h2 className="font-bold text-gray-900">What WP Check confirms</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li>A written work agreement exists and matches the employer record</li>
            <li>The passport number and date of birth match the agreement on file</li>
            <li>Minimum wage and hours comply with current law</li>
            <li>Leave and holiday entitlements are correctly recorded</li>
            <li>Record keeping obligations are being met</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            WP Check is the official verification service. It replaces all previous verification lookups.
          </p>
        </aside>
      </div>
    </SiteLayout>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  max,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  max?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        max={max}
        className="w-full h-11 rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
      />
    </div>
  );
}


function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-11 rounded border border-gray-400 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272]"
      />
    </div>
  );
}
