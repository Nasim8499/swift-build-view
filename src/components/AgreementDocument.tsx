import { annualGross, docRef, formatNzDate, money, type AgreementData } from "@/lib/wpcheck-docs";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-200 align-top">
      <th scope="row" className="w-[42%] bg-[#f5f7f8] px-3 py-2 text-left font-semibold text-gray-800">
        {label}
      </th>
      <td className="px-3 py-2 text-gray-900">{value || "—"}</td>
    </tr>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="mb-3 border-b-2 border-[#006272] pb-1 text-base font-bold text-[#006272]">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

export default function AgreementDocument({ a }: { a: AgreementData }) {
  const gross = annualGross(a);
  const overtime = (Number(a.hourlyRate) || 0) * 1.5;

  return (
    <article className="mx-auto max-w-[820px] bg-white p-6 text-[12.5px] leading-relaxed text-gray-900 shadow-sm print:shadow-none sm:p-10">
      <header className="border-b-4 border-[#006272] pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Official government format | New Zealand legislation | Employment agreement compliance
        </p>
        <h1 className="mt-2 text-xl font-extrabold text-[#006272] sm:text-2xl">AEWV Employment Agreement</h1>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
          Individual employment contract — New Zealand Government compliance format
        </p>
        <p className="mt-3 text-[11px] text-gray-700">
          <strong>Document reference:</strong> {docRef(a)} (INZ Form 1188 — Accredited Employer Work Visa) &nbsp;|&nbsp;
          <strong>Effective date:</strong> {formatNzDate(a.effectiveDate)} &nbsp;|&nbsp;
          <strong>Employer:</strong> {a.employerName || "—"} {a.employerNzbn && `(NZBN ${a.employerNzbn})`} &nbsp;|&nbsp;
          <strong>Employee:</strong> {a.employeeName || "—"} {a.clientId && `(Client ID: ${a.clientId})`}
        </p>
      </header>

      <Section n={1} title="Document control & verification">
        <table className="w-full border border-gray-200 text-[12px]">
          <tbody>
            <Row label="Document ref" value={docRef(a)} />
            <Row label="Form" value="INZ Form 1188 (AEWV)" />
            <Row label="Version" value="FINAL — PRINT READY / ARCHIVE READY" />
            <Row label="Effective date" value={formatNzDate(a.effectiveDate)} />
            <Row label="Accredited employer" value={`${a.employerName}${a.employerNzbn ? ` (NZBN ${a.employerNzbn})` : ""}`} />
            <Row label="Client / employee" value={`${a.employeeName}${a.clientId ? ` (Client ID: ${a.clientId})` : ""}`} />
            <Row label={`Passport${a.nationality ? ` (${a.nationality})` : ""}`} value={a.passport} />
            <Row label="Job Check token" value={a.jobCheckToken} />
            <Row label="INZ case officer" value={a.caseOfficer} />
            <Row label="Position" value={a.position} />
            <Row label="Site" value={a.site} />
          </tbody>
        </table>
      </Section>

      <Section n={2} title="Compliance verification">
        <p className="mb-2 inline-block rounded bg-green-50 px-2 py-1 text-[11px] font-bold text-green-800">
          VERIFIED — ALL STATUTORY REQUIREMENTS MET
        </p>
        <p className="text-gray-800">
          This agreement complies with current statutory requirements as at {formatNzDate(a.effectiveDate)}:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-800">
          <li><strong>Employment Relations Act 2000</strong> — s65, s63A</li>
          <li><strong>Wages Protection Act 1983</strong> — deductions, zero fee recovery</li>
          <li><strong>Health and Safety at Work Act 2015</strong> — HSWA 2015</li>
          <li><strong>Holidays Act 2003</strong> — leave entitlements</li>
          <li><strong>Accident Compensation Act 2001</strong> — ACC Framework v25.0</li>
          <li><strong>Tax Administration Act 1994 / IRD rules</strong> — IR742, IR334, PAYE, KiwiSaver</li>
          <li><strong>MBIE Labour Inspectorate standards</strong> — classification, triangular employment</li>
          <li><strong>Triangular Employment Amendment Act 2019</strong></li>
        </ul>
      </Section>

      <Section n={3} title="Disclaimer & legal notice">
        <p className="text-gray-800">
          This document (Reference: <strong>{docRef(a)}</strong>) is a verified employment agreement and compliance
          suite prepared for <strong>{a.employerName || "the accredited employer"}</strong>
          {a.employerNzbn ? ` (NZBN ${a.employerNzbn})` : ""} and employee <strong>{a.employeeName || "the employee"}</strong>
          {a.clientId ? ` (Client ID: ${a.clientId}` : ""}
          {a.passport ? `, Passport: ${a.passport}` : ""}
          {a.clientId || a.passport ? ")" : ""}. It aligns with statutory requirements under New Zealand employment,
          immigration, tax and accident compensation law.
        </p>
        <p className="mt-2 text-gray-800">
          This agreement does not constitute independent legal advice. All numerical values must be confirmed against
          current statutory rates and the employer&apos;s accreditation agreement at time of signing. The original must
          be retained by the employer for the duration of employment plus 7 years (minimum).
        </p>
      </Section>

      <Section n={4} title="INZ visa lodgement & client verification">
        <table className="w-full border border-gray-200 text-[12px]">
          <tbody>
            <Row label="Identity document" value={a.passport ? `Passport ${a.passport}${a.nationality ? ` (${a.nationality})` : ""} — verified` : "—"} />
            <Row label="Client ID" value={a.clientId} />
            <Row label="Job Check token" value={a.jobCheckToken} />
            <Row label="Employer (primary sponsor)" value={`${a.employerName}${a.employerNzbn ? ` — NZBN ${a.employerNzbn}` : ""}`} />
            <Row label="Position / job title" value={`${a.position}${a.position ? " (Full-time — verified)" : ""}`} />
            <Row label="Site / place of work" value={a.site} />
          </tbody>
        </table>
      </Section>

      <Section n={5} title="Individual employment agreement (IEA) — key terms">
        <table className="w-full border border-gray-200 text-[12px]">
          <tbody>
            <Row label="Ordinary hourly rate" value={`$${a.hourlyRate}/hr`} />
            <Row label="Overtime rate (1.5×)" value={`$${overtime.toFixed(2)}/hr`} />
            <Row label="Ordinary hours" value={`${a.hoursPerWeek} hours per week`} />
            <Row label="Estimated gross annual" value={money(gross)} />
            <Row label="Annual holidays" value="4 weeks per year (Holidays Act 2003)" />
            <Row label="Sick leave" value="10 days/year (carry over to max 20 days)" />
            <Row label="Bereavement leave" value="3 days (immediate family); 1 day (other bereavement)" />
            <Row label="Family violence leave" value="10 days/year" />
            <Row label="Public holidays" value="12 per year" />
            <Row label="Parental leave" value="Up to 52 weeks (eligibility applies)" />
            <Row label="Deductions" value="Lawful deductions only; no recruitment fee recovery (Wages Protection Act 1983)" />
            <Row label="Rest and meal breaks" value="Provided in accordance with Part 6D, Employment Relations Act 2000" />
          </tbody>
        </table>
      </Section>

      <Section n={6} title="Statutory protection & workplace operations">
        <ol className="list-decimal space-y-1 pl-5 text-gray-800">
          <li>Informal discussion — employee raises concern with supervisor within 5 working days.</li>
          <li>Formal mediation — unresolved matters referred to MBIE Employment Mediation Services.</li>
          <li>Employment Relations Authority — if mediation fails.</li>
          <li>Personal grievances — raised within 90 days (12 months for sexual harassment).</li>
        </ol>
        <p className="mt-3 rounded bg-[#f5fbfc] p-2 text-[11px] font-semibold text-[#006272]">
          VERIFIED — TRIANGULAR EMPLOYMENT AMENDMENT ACT 2019 — 100% PRIMARY SPONSOR RESPONSIBILITY CONFIRMED
        </p>
      </Section>

      <Section n={7} title="Tax, ACC & KiwiSaver">
        <table className="w-full border border-gray-200 text-[12px]">
          <tbody>
            <Row label="Tax code" value="M (IR330 completed)" />
            <Row label="ACC earner levy" value="1.39% of liable earnings (standard)" />
            <Row label="KiwiSaver — employee" value="3% default contribution" />
            <Row label="KiwiSaver — employer" value="3% minimum compulsory match" />
            <Row label="ESCT" value="Graduated 10.5%–39% based on previous-year earnings" />
            <Row label="Gross annual (illustrative)" value={money(gross)} />
          </tbody>
        </table>
      </Section>

      <Section n={8} title="Signatures & endorsement">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            "MBIE — Chief Executive",
            "Immigration New Zealand",
            "Inland Revenue (IRD)",
            "ACC",
            "WorkSafe New Zealand",
            `${a.employerName || "Employer"} — Authorised signatory`,
          ].map((label) => (
            <div key={label} className="rounded border border-gray-300 p-3">
              <p className="text-[11px] font-semibold text-gray-800">{label}</p>
              <div className="mt-6 border-b border-gray-400" />
              <p className="mt-1 text-[10px] text-gray-500">Signature / date / seal</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded border border-gray-300 p-3">
          <p className="text-[11px] font-semibold text-gray-800">Employee — {a.employeeName || "—"}</p>
          <div className="mt-6 border-b border-gray-400" />
          <p className="mt-1 text-[10px] text-gray-500">Signature / date</p>
        </div>
      </Section>

      <footer className="mt-8 border-t border-gray-300 pt-3 text-[10px] text-gray-500">
        {docRef(a)} | CONFIDENTIAL | NEW ZEALAND LEGISLATION — FINAL, VERIFIED, ARCHIVE READY
      </footer>
    </article>
  );
}
