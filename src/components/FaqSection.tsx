const faqs = [
  {
    q: 'Do migrant workers have the same rights as New Zealand workers?',
    a: 'Yes. Everyone working in New Zealand has the same minimum employment rights, no matter what visa they hold. Employers who breach those standards can be penalised and banned from recruiting migrant workers.',
  },
  {
    q: 'What is an official WP Check?',
    a: 'A WP Check is the Work Agreement and Entitlement Verification. It confirms that a person is entitled to do a specific job, for a specific employer, in a specific location, and returns a dated reference number for your records.',
  },
  {
    q: 'Is it legal to charge someone for a job?',
    a: 'No. Charging a premium — money, goods or services — in exchange for employment is unlawful. Any premium must be repaid in full and penalties can be awarded on top.',
  },
  {
    q: 'When must an employment agreement be provided?',
    a: 'Before the employee starts work. The employer must give a written agreement, allow reasonable time to seek independent advice, and keep a signed copy on file.',
  },
  {
    q: 'How do I resolve a problem at work?',
    a: 'Raise it directly and in writing first. If that does not work, the free early resolution phone service or formal mediation can help both parties reach an agreement without going to the Employment Relations Authority.',
  },
  {
    q: 'How long must employment records be kept?',
    a: 'Wage, time, holiday and leave records must be kept for at least seven years, and employees can ask to see their own records at any time.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-[#e6f4f6] px-3 py-1 text-xs font-bold text-[#006272]">
            Common questions
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">Frequently asked questions</h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            Quick answers to the questions employers and employees ask most often.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg border border-gray-200 bg-white p-4 open:border-[#006272] open:bg-[#f5fbfc]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[15px] font-bold text-gray-900">
                {f.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#006272] transition-transform group-open:rotate-45"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
