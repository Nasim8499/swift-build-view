import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Reveal from "./Reveal";

type Panel = {
  id: string;
  title: string;
  summary: string;
  stat: string;
  statLabel: string;
  points: string[];
  topic: string | null;
};

const PANELS: Panel[] = [
  {
    id: "agreements",
    title: "Written employment agreements",
    summary:
      "Every employee must have a signed written agreement before their first day. It sets out hours, pay, duties and the workplace they are employed at.",
    stat: "100%",
    statLabel: "of employees must have one",
    points: [
      "Employers must keep a signed copy and provide it on request",
      "Trial periods must be recorded in the agreement before work starts",
      "Changes must be agreed in writing by both parties",
      "Agreements must never contain terms below the legal minimum",
    ],
    topic: "employment-agreements",
  },
  {
    id: "pay",
    title: "Pay, wages and deductions",
    summary:
      "Wages must be paid in full, on time and without unlawful deductions. Adult minimum wage applies from the first hour worked.",
    stat: "$23.50",
    statLabel: "adult minimum hourly rate",
    points: [
      "Time and wage records must be kept for at least seven years",
      "Deductions require written consent and must be reasonable",
      "Unpaid trials and unpaid training hours are unlawful",
      "Overtime and allowances must match the agreement",
    ],
    topic: "pay-and-wages",
  },
  {
    id: "hours",
    title: "Hours, breaks and leave",
    summary:
      "Guaranteed hours must be stated. Rest and meal breaks are entitlements, not favours, and leave accrues from day one.",
    stat: "4 weeks",
    statLabel: "annual holidays each year",
    points: [
      "10-minute paid rest break and 30-minute meal break patterns apply",
      "10 days sick leave after six months of continuous employment",
      "11 public holidays with time-and-a-half plus an alternative day",
      "Availability clauses need reasonable compensation",
    ],
    topic: "hours-and-leave",
  },
  {
    id: "migrant",
    title: "Migrant and visa-holding workers",
    summary:
      "Migrant workers have exactly the same minimum rights as everyone else. Employers must hold accreditation for the relevant work visa.",
    stat: "Same rights",
    statLabel: "regardless of visa status",
    points: [
      "Premiums for a job offer are illegal and recoverable",
      "Employers must verify the right to work before employment starts",
      "Work must match the region, role and hours on the agreement",
      "Reporting exploitation does not affect your visa application",
    ],
    topic: null,
  },
  {
    id: "safety",
    title: "Health, safety and wellbeing",
    summary:
      "Employers must manage risks so far as reasonably practicable, and workers must be able to raise concerns without consequence.",
    stat: "Zero",
    statLabel: "tolerance for unsafe work",
    points: [
      "Hazard registers and incident reporting must be maintained",
      "Personal protective equipment is supplied by the employer",
      "Workers may refuse work that risks serious harm",
      "Bullying and harassment are workplace health and safety issues",
    ],
    topic: "health-and-safety",
  },
  {
    id: "resolution",
    title: "Resolving problems early",
    summary:
      "Most problems are fixed fastest by raising them directly, then using free mediation before any formal claim.",
    stat: "90 days",
    statLabel: "to raise a personal grievance",
    points: [
      "Free early resolution phone service for straightforward issues",
      "Mediation is confidential and agreements are binding",
      "Employment Relations Authority hears unresolved matters",
      "Labour inspectors enforce minimum entitlements",
    ],
    topic: "resolving-problems",
  },
];

export default function EmploymentDataSection() {
  const [openId, setOpenId] = useState<string>("agreements");

  return (
    <section aria-labelledby="employment-data-heading" className="bg-[#f5fbfc] border-y border-[#cfe8ec]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#006272]">Employment essentials</p>
          <h2 id="employment-data-heading" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Explore work and employment rules
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-700 sm:text-base">
            Select any card to open the detail. Each area links through to the full guidance so you can check an
            entitlement in seconds.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PANELS.map((panel, i) => {
            const open = openId === panel.id;
            return (
              <Reveal key={panel.id} delay={i * 70}>
                <div
                  className={`h-full rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    open ? "border-[#006272] ring-1 ring-[#006272]/30" : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`panel-${panel.id}`}
                    onClick={() => setOpenId(open ? "" : panel.id)}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <span>
                      <span className="block text-2xl font-bold text-[#006272]">{panel.stat}</span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {panel.statLabel}
                      </span>
                      <span className="mt-3 block text-base font-bold text-gray-900">{panel.title}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 shrink-0 text-[#006272] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>

                  <p className="mt-2 text-sm text-gray-700">{panel.summary}</p>

                  <div
                    id={`panel-${panel.id}`}
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700">
                        {panel.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      {panel.topic ? (
                        <Link
                          to="/topics/$topic"
                          params={{ topic: panel.topic }}
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#006272] hover:underline"
                        >
                          Read the full guidance <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <Link
                          to="/wp-check"
                          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#006272] hover:underline"
                        >
                          Run a WP Check <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
