import { Link } from '@tanstack/react-router';

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

const permitTypes = [
  {
    title: 'Accredited Employer Work Visa (AEWV)',
    duration: 'Up to 5 years',
    description:
      'For migrants with a job offer from an accredited employer. The role must meet the median wage or sector agreement rules and match an approved job check.',
    points: ['Employer must be accredited', 'Job check required before applying', 'Tied to one employer and role'],
  },
  {
    title: 'Specific Purpose Work Visa',
    duration: 'Up to 3 years',
    description:
      'For people coming to New Zealand for a clearly defined purpose or event, such as installing equipment, seasonal projects or specialist assignments.',
    points: ['Fixed, defined purpose', 'Evidence of the engagement required', 'No general open-market work rights'],
  },
  {
    title: 'Partner of a Worker Work Visa',
    duration: 'Matches partner visa',
    description:
      'Lets the partner of an eligible work visa holder live and work in New Zealand for the same period as the primary visa holder.',
    points: ['Genuine and stable relationship evidence', 'Open or employer-assisted conditions', 'Renewed with the primary visa'],
  },
  {
    title: 'Post Study Work Visa',
    duration: 'Up to 3 years',
    description:
      'For graduates of eligible New Zealand qualifications who want to gain local work experience with open work rights.',
    points: ['Eligible qualification required', 'Open work rights', 'Pathway to skilled residence'],
  },
];

const conditions = [
  { label: 'Employer', value: 'Named on the visa for employer-assisted permits' },
  { label: 'Occupation', value: 'Must match the approved role and ANZSCO code' },
  { label: 'Location', value: 'Work region stated on the visa conditions' },
  { label: 'Hours & pay', value: 'Minimum hours and pay rate as agreed in the employment agreement' },
];

export default function WorkPermitSection() {
  return (
    <section className="py-12 bg-[#f5f7f8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-block bg-[#006272] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            Work permits
          </span>
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 mb-2">
            Work permit and visa conditions
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
            Every work visa carries conditions that both the employer and the worker must follow. Check the permit
            type, then confirm the worker&apos;s entitlement with an official WP Check before employment starts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {permitTypes.map((permit) => (
            <article
              key={permit.title}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#006272] hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-gray-900 text-[15px] md:text-base leading-snug">{permit.title}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e6f4f6] text-[#006272] whitespace-nowrap flex-shrink-0">
                  {permit.duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{permit.description}</p>
              <ul className="space-y-1.5 mb-4">
                {permit.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#006272" className="mt-0.5 flex-shrink-0">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to="/wp-check"
                className="flex items-center gap-1.5 text-[#006272] text-[13px] font-semibold mt-auto hover:underline"
              >
                Check entitlement <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5 md:p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-base">Conditions employers must verify</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {conditions.map((c) => (
              <div key={c.label} className="border-l-2 border-[#006272] pl-3">
                <dt className="text-sm font-semibold text-gray-900">{c.label}</dt>
                <dd className="text-sm text-gray-600 leading-relaxed">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
