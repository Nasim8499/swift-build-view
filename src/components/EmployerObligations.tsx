import { Link } from '@tanstack/react-router';

const obligations = [
  {
    title: 'Before someone starts',
    items: [
      'Provide a written employment agreement and allow time to seek advice',
      'Run an official WP Check for anyone on a work visa',
      'Agree hours, pay rate, place of work and duties in writing',
    ],
  },
  {
    title: 'During employment',
    items: [
      'Pay at least the minimum wage for every hour worked',
      'Keep accurate wage, time, holiday and leave records',
      'Deal with each other in good faith at all times',
    ],
  },
  {
    title: 'When problems arise',
    items: [
      'Raise the issue early and in writing where possible',
      'Use the free early resolution service or mediation',
      'Follow a fair process before any disciplinary action',
    ],
  },
  {
    title: 'When employment ends',
    items: [
      'Give the correct notice set out in the agreement',
      'Pay all outstanding wages and holiday pay in the final pay',
      'Keep records of the final pay calculation',
    ],
  },
];

export default function EmployerObligations() {
  return (
    <section className="bg-[#f5f7f8] py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-[#006272] px-3 py-1 text-xs font-bold text-white">
            For employers
          </span>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">
            Your obligations across the employment lifecycle
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            Employment obligations do not stop at the offer letter. Use this checklist to keep your business compliant
            from hiring through to the final pay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {obligations.map((group) => (
            <div key={group.title} className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="mb-3 border-b border-gray-100 pb-2 text-[15px] font-bold text-gray-900">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006272]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          to="/wp-check"
          className="mt-8 inline-flex items-center gap-2 rounded bg-[#006272] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004f5c]"
        >
          Verify a worker with WP Check
        </Link>
      </div>
    </section>
  );
}
