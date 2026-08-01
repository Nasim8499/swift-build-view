import { useState } from "react";
import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Before you accept a job",
    detail:
      "Read the written agreement in full, check the hours and pay, and never pay a premium for a job offer. Ask for the reference number so you can run a WP Check.",
    items: ["Get the agreement in writing", "Check the pay rate and hours", "Confirm the work location and role"],
  },
  {
    title: "Your first week",
    detail:
      "Confirm your start date, tax code and bank details are recorded, and that time records are being kept from day one.",
    items: ["Signed copy of the agreement", "Correct tax code and KiwiSaver", "Induction and safety briefing"],
  },
  {
    title: "While you are employed",
    detail:
      "Keep your own record of hours worked, payslips and any changes agreed. Leave accrues automatically and cannot be traded away.",
    items: ["Check payslips against your hours", "Track leave balances", "Ask for changes in writing"],
  },
  {
    title: "If something goes wrong",
    detail:
      "Raise the issue with your employer first. Free early resolution and mediation are available, and personal grievances must be raised within 90 days.",
    items: ["Raise it in writing", "Use free mediation", "Call 0800 20 90 20"],
  },
];

export default function WorkJourney() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="journey-heading" className="bg-[#1f3d44]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-[#9fd4db]">Your employment journey</p>
          <h2 id="journey-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            From job offer to resolving a problem
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[#b2d8de] sm:text-base">
            Tap any stage to see what should happen and what to keep a record of.
          </p>
        </Reveal>

        <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => {
            const active = open === i;
            return (
              <Reveal key={step.title} delay={i * 80}>
                <li className="h-full list-none">
                  <button
                    type="button"
                    onClick={() => setOpen(active ? -1 : i)}
                    aria-expanded={active}
                    className={`h-full w-full rounded-xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      active ? "border-[#9fd4db] bg-white/10" : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#9fd4db] text-sm font-bold text-[#1f3d44]">
                      {i + 1}
                    </span>
                    <span className="mt-3 block text-base font-bold text-white">{step.title}</span>
                    <span className="mt-2 block text-sm text-[#b2d8de]">{step.detail}</span>
                    <span
                      className={`grid transition-all duration-500 ${active ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="overflow-hidden">
                        <span className="block space-y-1 text-sm text-white">
                          {step.items.map((item) => (
                            <span key={item} className="block">• {item}</span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
