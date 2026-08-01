import { Link } from '@tanstack/react-router';

const audiences = [
  {
    label: 'For employees',
    title: 'Know what you are entitled to',
    text: 'Understand your agreement, pay, breaks, leave and what to do if something goes wrong at work.',
    links: [
      { label: 'Pay and hours', topic: 'pay-and-hours' },
      { label: 'Leave and holidays', topic: 'leave-and-holidays' },
      { label: 'Resolving problems', topic: 'resolving-problems' },
    ],
  },
  {
    label: 'For employers',
    title: 'Hire and manage people correctly',
    text: 'Meet your obligations from the first offer through to the final pay, and keep the records that prove it.',
    links: [
      { label: 'Starting employment', topic: 'starting-employment' },
      { label: 'Workplace policies', topic: 'workplace-policies' },
      { label: 'Ending employment', topic: 'ending-employment' },
    ],
  },
  {
    label: 'For migrant workers',
    title: 'The same rights, whatever your visa',
    text: 'Your minimum rights are protected by law. Reporting a problem does not affect your right to be here.',
    links: [
      { label: 'Pay and hours', topic: 'pay-and-hours' },
      { label: 'Resolving problems', topic: 'resolving-problems' },
      { label: 'Starting employment', topic: 'starting-employment' },
    ],
  },
];

export default function AudiencePaths() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">Where would you like to start?</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
          Choose the path that matches your situation and we will point you to the guidance that applies to you.
        </p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.label}
              className="flex flex-col rounded-xl border border-gray-200 p-6 transition-all hover:border-[#006272] hover:shadow-md"
            >
              <span className="mb-3 self-start rounded-full bg-[#e6f4f6] px-3 py-1 text-xs font-bold text-[#006272]">
                {a.label}
              </span>
              <h3 className="text-lg font-bold leading-snug text-gray-900">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{a.text}</p>
              <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
                {a.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to="/topics/$topic"
                      params={{ topic: l.topic }}
                      className="text-sm font-medium text-[#006272] hover:underline"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
