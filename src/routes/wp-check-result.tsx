import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import Reveal from "@/components/Reveal";
import { LAST_RESULT_KEY, LAST_VALUES_KEY, type StoredResult, type StoredValues } from "@/lib/wpcheck-result";

const title = "WP Check results explained | Verified, Further review, Not found";
const description =
  "Understand what a WP Check result means — verified, further review or not found — and the exact next steps to take for each outcome.";

export const Route = createFileRoute("/wp-check-result")({
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
  component: ResultPage,
});

const OUTCOMES = [
  {
    key: "verified" as const,
    label: "Verified",
    tone: "border-green-300 bg-green-50",
    badge: "bg-green-700",
    meaning:
      "A written work agreement is on record for that reference number and the passport number and date of birth you supplied match the record. The recorded pay, hours and leave meet the legal minimum.",
    steps: [
      "Keep the reference number and the date of the check for your records.",
      "Check that the job you are doing matches the role, hours and location on the agreement.",
      "If anything on the job differs from the agreement, raise it with your employer in writing.",
      "Re-run a WP Check whenever the agreement is varied or renewed.",
    ],
  },
  {
    key: "review" as const,
    label: "Further review",
    tone: "border-amber-300 bg-amber-50",
    badge: "bg-amber-600",
    meaning:
      "A record exists for that reference number, but at least one identity detail — passport number or date of birth — does not match. This is often a typing error, an old passport, or a record that needs updating.",
    steps: [
      "Re-check each character of the passport number and the date of birth, then run the check again.",
      "If you have renewed your passport, use the number printed on the agreement.",
      "Ask your employer to confirm the details held on the agreement.",
      "If it still does not match, call 0800 20 90 20 for a manual review.",
    ],
  },
  {
    key: "not_found" as const,
    label: "Not found",
    tone: "border-red-300 bg-red-50",
    badge: "bg-red-700",
    meaning:
      "No work agreement is held against that reference number. It does not automatically mean the job is unlawful — the reference may be mistyped, or the agreement may not have been lodged.",
    steps: [
      "Confirm the reference is in the format WPC-2026-004821 and try again.",
      "Ask your employer for the signed written agreement — you are entitled to a copy.",
      "Do not pay any fee for a job offer or for lodging an agreement; premiums are unlawful.",
      "If your employer cannot produce an agreement, contact the employment service line on 0800 20 90 20.",
    ],
  },
];

function ResultPage() {
  const [stored, setStored] = useState<StoredResult | null>(null);
  const [lastValues, setLastValues] = useState<StoredValues | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_RESULT_KEY);
      if (raw) setStored(JSON.parse(raw) as StoredResult);
      const rawValues = sessionStorage.getItem(LAST_VALUES_KEY);
      if (rawValues) setLastValues(JSON.parse(rawValues) as StoredValues);
    } catch {
      setStored(null);
    }
  }, []);

  const active = OUTCOMES.find((o) => o.key === stored?.status);

  return (
    <SiteLayout>
      <div className="bg-[#006272]">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-[#9fd4db]">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/wp-check" className="hover:underline">WP Check</Link>{" "}
            <span aria-hidden="true">/</span> Results
          </nav>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Your WP Check result</h1>
          <p className="mt-3 max-w-2xl text-sm text-[#b2d8de] sm:text-base">{description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14">
        {stored && active ? (
          <Reveal>
            <div className={`rounded-xl border p-5 sm:p-6 ${active.tone}`}>
              <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white ${active.badge}`}>
                {active.label}
              </span>
              <h2 className="mt-3 text-xl font-bold text-gray-900">{active.meaning}</h2>
              <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-3">
                <div><dt className="inline font-semibold">Reference: </dt><dd className="inline">{stored.reference}</dd></div>
                <div><dt className="inline font-semibold">Country of documents: </dt><dd className="inline">{stored.country}</dd></div>
                <div><dt className="inline font-semibold">Checked: </dt><dd className="inline">{new Date(stored.checkedAt).toLocaleString("en-NZ")}</dd></div>
              </dl>
              <h3 className="mt-5 font-bold text-gray-900">Your next step checklist</h3>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-gray-800">
                {active.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>

              {lastValues && (
                <div className="mt-5 rounded-lg border border-white/70 bg-white/80 p-4">
                  <h3 className="text-sm font-bold text-gray-900">Run this check again</h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Your last entries are kept in this browser session only. Resubmit to re-run the same check,
                    or edit a detail first if something was mistyped.
                  </p>
                  <dl className="mt-3 grid grid-cols-1 gap-1 text-xs text-gray-700 sm:grid-cols-2">
                    <div><dt className="inline font-semibold">Reference: </dt><dd className="inline">{lastValues.reference}</dd></div>
                    <div><dt className="inline font-semibold">Passport: </dt><dd className="inline">{lastValues.passport}</dd></div>
                    <div><dt className="inline font-semibold">Date of birth: </dt><dd className="inline">{lastValues.dob}</dd></div>
                    <div><dt className="inline font-semibold">Country: </dt><dd className="inline">{lastValues.country}</dd></div>
                  </dl>
                  <Link
                    to="/wp-check"
                    search={{ resubmit: 1 }}
                    className="mt-3 inline-flex items-center rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#004f5c]"
                  >
                    Resubmit with these details
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
              You have not run a check in this browser session yet.{" "}
              <Link to="/wp-check" className="font-semibold text-[#006272] hover:underline">Start a WP Check</Link>{" "}
              to see your result here.
            </div>
          </Reveal>
        )}

        <h2 className="mt-12 text-xl font-bold text-gray-900 sm:text-2xl">What each result means</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.key} delay={i * 90}>
              <div className={`h-full rounded-xl border p-5 transition-transform duration-300 hover:-translate-y-1 ${o.tone}`}>
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white ${o.badge}`}>
                  {o.label}
                </span>
                <p className="mt-3 text-sm text-gray-800">{o.meaning}</p>
                <h3 className="mt-4 text-sm font-bold text-gray-900">Next steps</h3>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {o.steps.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/wp-check"
            className="inline-flex items-center rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004f5c]"
          >
            Run another WP Check
          </Link>
          <a
            href="tel:0800209020"
            className="inline-flex items-center rounded border border-[#006272] px-5 py-2.5 text-sm font-semibold text-[#006272] transition-colors hover:bg-[#f0f9fa]"
          >
            Call 0800 20 90 20
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
