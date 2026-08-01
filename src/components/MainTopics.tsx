import { Link } from '@tanstack/react-router';

const slugify = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

const topics = [
  {
    bgColor: '#006272',
    title: 'Starting employment',
    maori: 'Te tīmata i te mahi',
    description: 'Starting a new job is an exciting time. Employers and employees need to follow minimum rights and responsibilities.',
    links: [
      'Employment agreements',
      'Types of employment',
      'Rights and responsibilities',
      'Hiring employees',
      'Minimum rights of employees',
    ],
    viewAllHref: '#',
  },
  {
    bgColor: '#005a50',
    title: 'Pay and hours',
    maori: 'Ūtu me ngā hāora',
    description: 'Information on minimum wage, hours of work, rest and meal breaks and what employers must keep records of.',
    links: [
      'Minimum wage',
      'Pay and wages',
      'Hours of work',
      'Rest and meal breaks',
      'Record keeping',
    ],
    viewAllHref: '#',
  },
  {
    bgColor: '#2d6b8c',
    title: 'Leave and holidays',
    maori: 'Whakamatuatanga me ngā hararei',
    description: 'Employees are entitled to annual holidays, public holidays, sick leave, bereavement leave, parental leave and more.',
    links: [
      'Annual holidays',
      'Public holidays',
      'Sick leave',
      'Parental leave',
      'Bereavement leave',
    ],
    viewAllHref: '#',
  },
  {
    bgColor: '#4a3a7a',
    title: 'Workplace policies',
    maori: 'Ngā kaupeka mahi',
    description: 'Workplace policies and procedures, flexible working, health and safety, and preventing harassment and bullying.',
    links: [
      'Workplace policies and procedures',
      'Flexible working',
      'Health and safety',
      'Harassment and bullying',
      'Drug and alcohol testing',
    ],
    viewAllHref: '#',
  },
  {
    bgColor: '#7a3a28',
    title: 'Resolving problems',
    maori: 'Te whakaoti i ngā raruraru',
    description: 'Steps to resolve employment relationship problems. If you can\'t resolve issues informally, mediation may help.',
    links: [
      'Steps to resolve a problem',
      'Early resolution',
      'Mediation',
      'Employment Relations Authority',
      'Labour Inspectorate',
    ],
    viewAllHref: '#',
  },
  {
    bgColor: '#5a5228',
    title: 'Ending employment',
    maori: 'Te mutunga o te mahi',
    description: 'Information about resignation, dismissal, redundancy and retirement – including rights for both employers and employees.',
    links: [
      'Resignation',
      'Dismissal',
      'Redundancy',
      'Retirement',
      'Final pay',
    ],
    viewAllHref: '#',
  },
];

function ArrowSvg({ white = false }: { white?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      className="w-4 h-3.5 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={white ? 'white' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

export default function MainTopics() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 mb-1">Browse by topic</h2>
        <p className="text-gray-600 text-sm mb-8">
          Find the information you need quickly. All content applies to both employers and employees unless stated otherwise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="flex flex-col rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Coloured header */}
              <div
                className="px-5 py-4"
                style={{ backgroundColor: topic.bgColor }}
              >
                <h3 className="text-[1.05rem] font-bold text-white leading-snug">
                  {topic.title}
                </h3>
                <p className="text-white/70 text-xs mt-0.5 italic">{topic.maori}</p>
              </div>

              {/* Body */}
              <div className="flex-1 bg-white p-5 flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{topic.description}</p>

                <ul className="flex-1 space-y-1 mb-4">
                  {topic.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/topics/$topic"
                        params={{ topic: slugify(topic.title) }}
                        className="flex items-center gap-2 text-[13px] font-medium text-[#006272] hover:text-[#004f5c] hover:underline group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          <ArrowSvg />
                        </span>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/topics/$topic"
                  params={{ topic: slugify(topic.title) }}
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-white px-4 py-2 rounded self-start mt-auto transition-opacity hover:opacity-90"
                  style={{ backgroundColor: topic.bgColor }}
                >
                  View all
                  <ArrowSvg white />
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
