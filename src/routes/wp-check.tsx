import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import SiteLayout from "@/components/SiteLayout";
import { COUNTRIES } from "@/lib/countries";
import { runWpCheck } from "@/lib/wpcheck-verify.functions";
import { LAST_RESULT_KEY, LAST_VALUES_KEY, type StoredValues } from "@/lib/wpcheck-result";
import {
  maskReference,
  maskPassport,
  maskDob,
  validateWpCheck,
  type WpCheckFieldErrors,
} from "@/lib/wpcheck-form";


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
  const [fieldErrors, setFieldErrors] = useState<WpCheckFieldErrors>({});
  const [values, setValues] = useState({ reference: "", passport: "", dob: "", country: "" });
  const check = useServerFn(runWpCheck);

  // Prefill from a previous check so "Run this check again" works from the results page.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_VALUES_KEY);
      if (raw) setValues(JSON.parse(raw) as StoredValues);
    } catch {
      // Prefill is optional.
    }
  }, []);

  const mutation = useMutation({ mutationFn: check });
  const result = mutation.data;

  function setValue(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const { errors, dobIso } = validateWpCheck(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0 || !dobIso) {
      setError("Please correct the highlighted fields before running a WP Check.");
      return;
    }
    mutation.mutate(
      {
        data: {
          reference: values.reference.trim(),
          passport: values.passport.trim(),
          dob: dobIso,
          country: values.country.trim(),
        },
      },
      {
        onSuccess: (data) => {
          try {
            sessionStorage.setItem(LAST_RESULT_KEY, JSON.stringify(data));
            sessionStorage.setItem(LAST_VALUES_KEY, JSON.stringify(values));
          } catch {
            // Session storage is optional; the result is shown inline regardless.
          }
        },
        onError: () => setError("We could not complete the check. Please try again in a moment."),
      },
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
          <form onSubmit={onSubmit} noValidate className="rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Start a WP Check</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter the reference number and travel document details exactly as they appear on the work agreement.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="reference"
                label="Reference number"
                placeholder="WPC-2026-004821"
                hint="Format: three letters, year, then the record number."
                value={values.reference}
                error={fieldErrors.reference}
                inputMode="text"
                onChange={(v) => setValue("reference", maskReference(v))}
              />
              <Field
                id="passport"
                label="Passport number"
                placeholder="LA1234567"
                hint="6 to 12 letters and numbers, no spaces."
                value={values.passport}
                error={fieldErrors.passport}
                inputMode="text"
                onChange={(v) => setValue("passport", maskPassport(v))}
              />
              <Field
                id="dob"
                label="Date of birth"
                placeholder="DD/MM/YYYY"
                hint="Type the numbers only — slashes are added for you."
                value={values.dob}
                error={fieldErrors.dob}
                inputMode="numeric"
                onChange={(v) => setValue("dob", maskDob(v))}
              />
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-800 mb-1">
                  Country of documents
                </label>
                <select
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={(e) => setValue("country", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.country)}
                  className={`w-full h-11 rounded border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272] ${
                    fieldErrors.country ? "border-red-500" : "border-gray-400"
                  }`}
                >
                  <option value="" disabled>Select a country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {fieldErrors.country && (
                  <p className="mt-1 text-xs font-semibold text-red-700">{fieldErrors.country}</p>
                )}
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
              <Link
                to="/wp-check-result"
                className="mt-4 inline-flex items-center gap-1 rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004f5c]"
              >
                See what this result means and next steps <span aria-hidden="true">→</span>
              </Link>
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
  placeholder,
  hint,
  value,
  error,
  inputMode,
  onChange,
}: {
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  value: string;
  error?: string | undefined;
  inputMode?: "text" | "numeric";
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full h-11 rounded border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006272] ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-semibold text-red-700">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );

}
