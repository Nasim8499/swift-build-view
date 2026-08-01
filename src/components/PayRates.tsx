const rates = [
  { name: 'Adult minimum wage', rate: '$23.50', per: 'per hour', note: 'Employees aged 16 and over who are not starting-out or trainee workers.' },
  { name: 'Starting-out wage', rate: '$18.80', per: 'per hour', note: '16–19 year olds in their first six months with a new employer, or on a training course.' },
  { name: 'Training minimum wage', rate: '$18.80', per: 'per hour', note: 'Employees aged 20+ doing at least 60 credits a year of industry training.' },
  { name: 'Overtime and allowances', rate: 'By agreement', per: '', note: 'There is no legal overtime rate — rates must be recorded in the employment agreement.' },
];

const deductions = [
  'Written consent is required before any deduction from wages',
  'Deductions must be reasonable and can be withdrawn in writing',
  'Premiums for a job are unlawful and must be repaid in full',
  'Wage, time, holiday and leave records must be kept for seven years',
];

export default function PayRates() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-[#e6f4f6] px-3 py-1 text-xs font-bold text-[#006272]">
            Pay and wages
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">Current minimum pay rates</h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            Minimum wage rates apply to all hours worked and are reviewed each year. Rates below are before tax.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg border border-gray-200 lg:col-span-2">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Minimum wage rates by worker type</caption>
              <thead className="bg-[#f5f7f8] text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Rate type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Rate</th>
                  <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Who it applies to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rates.map((r) => (
                  <tr key={r.name} className="align-top">
                    <th scope="row" className="px-4 py-4 font-bold text-gray-900">
                      {r.name}
                      <span className="mt-1 block font-normal text-gray-600 sm:hidden">{r.note}</span>
                    </th>
                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#006272]">
                      {r.rate}
                      {r.per && <span className="block text-xs font-normal text-gray-500">{r.per}</span>}
                    </td>
                    <td className="hidden px-4 py-4 leading-relaxed text-gray-600 sm:table-cell">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-[#b2d8de] bg-[#e6f4f6] p-5">
            <h3 className="mb-3 text-base font-bold text-gray-900">Deductions and records</h3>
            <ul className="space-y-2.5">
              {deductions.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#006272" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
