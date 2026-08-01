import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Reveal from "./Reveal";

const SECTORS = [
  {
    name: "Construction",
    demand: "High demand",
    roles: ["Carpenters", "Site supervisors", "Civil labourers", "Scaffolders"],
    note: "Accredited employer roles must pay at or above the median wage where the visa requires it.",
    fill: "w-[86%]",
  },
  {
    name: "Healthcare & care",
    demand: "Critical shortage",
    roles: ["Registered nurses", "Care assistants", "Aged residential support"],
    note: "Rosters must record all hours worked, including sleepovers and on-call time.",
    fill: "w-[94%]",
  },
  {
    name: "Horticulture & seasonal",
    demand: "Seasonal peaks",
    roles: ["Pickers and packers", "Orchard hands", "Machine operators"],
    note: "Piece rates must still average at least the minimum wage for every hour worked.",
    fill: "w-[72%]",
  },
  {
    name: "Hospitality & tourism",
    demand: "Steady demand",
    roles: ["Chefs", "Front of house", "Housekeeping", "Duty managers"],
    note: "Split shifts and availability must be compensated and set out in the agreement.",
    fill: "w-[65%]",
  },
  {
    name: "Transport & logistics",
    demand: "Growing",
    roles: ["Class 4/5 drivers", "Warehouse staff", "Forklift operators"],
    note: "Work time and logbook rules apply on top of employment minimums.",
    fill: "w-[70%]",
  },
  {
    name: "Technology & engineering",
    demand: "Skilled roles",
    roles: ["Software engineers", "Mechanical engineers", "Data specialists"],
    note: "Salaried roles still require recorded hours and agreed overtime arrangements.",
    fill: "w-[58%]",
  },
];

export default function SectorSpotlight() {
  const [active, setActive] = useState(0);
  const current = SECTORS[active]!;

  return (
    <section aria-labelledby="sector-heading" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#006272]">Work and industry</p>
          <h2 id="sector-heading" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Where the work is, and what applies
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-700 sm:text-base">
            Choose an industry to see the roles most often employed on work visas and the rules employers must follow.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <Reveal>
            <ul className="space-y-2">
              {SECTORS.map((s, i) => (
                <li key={s.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`w-full rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
                      i === active
                        ? "border-[#006272] bg-[#f0f9fa] shadow-sm"
                        : "border-gray-200 hover:border-[#006272]/50 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-900">{s.name}</span>
                      <span className="text-xs font-semibold text-[#006272]">{s.demand}</span>
                    </span>
                    <span className="mt-2 block h-1.5 w-full rounded bg-gray-200">
                      <span className={`block h-1.5 rounded bg-[#006272] transition-all duration-700 ${i === active ? s.fill : "w-0"}`} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div key={current.name} className="h-full rounded-xl border border-gray-200 bg-[#f5fbfc] p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-bold text-gray-900">{current.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[#006272]">{current.demand}</p>
              <h4 className="mt-4 text-sm font-bold uppercase tracking-wide text-gray-600">Common roles</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {current.roles.map((r) => (
                  <li key={r} className="rounded-full border border-[#cfe8ec] bg-white px-3 py-1 text-sm text-gray-800">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border border-[#cfe8ec] bg-white p-4 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Employer obligation: </span>
                {current.note}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/wp-check"
                  className="inline-flex items-center rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#004f5c]"
                >
                  Verify an agreement
                </Link>
                <Link
                  to="/topics"
                  className="inline-flex items-center rounded border border-[#006272] px-4 py-2 text-sm font-semibold text-[#006272] transition-colors hover:bg-white"
                >
                  Browse all topics
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
