const newsItems = [
  {
    date: '27 Jul 2026',
    category: 'News',
    title: 'Thames Four Square and owner penalised over $120,000 migrant worker premiums',
    description: 'A Thames Four Square and its owner have been ordered by the Employment Relations Authority (ERA) to pay $44,000 in penalties after making 2 migrant workers pay a total of $120,000 in premiums for their jobs.',
    href: '#',
    tag: null,
  },
  {
    date: '2 Jul 2026',
    category: 'News',
    title: 'Horticulture company and director fined $135,000 for migrant worker breaches',
    description: 'A horticulture company and its director have been ordered to pay $135,000 in penalties after the ERA found they breached minimum employment standards affecting 4 migrant workers.',
    href: '#',
    tag: 'Migrant exploitation',
  },
  {
    date: '24 Jun 2026',
    category: 'News',
    title: 'Auckland restaurant and owner must pay $377,000 for exploiting migrant workers',
    description: 'An Auckland restaurant has been ordered by the ERA to pay almost $200,000 in wage arrears to seven employees, while the company\'s sole director was penalised $177,300 for exploiting the workers.',
    href: '#',
    tag: 'Migrant exploitation',
  },
  {
    date: '21 Feb 2026',
    category: 'News',
    title: 'Employment Relations Act changes take effect today',
    description: 'A series of changes to the Employment Relations Act come into force today, following the passing of the Employment Relations Amendment Act 2025.',
    href: '#',
    tag: null,
  },
];

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

export default function NewsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">News and updates</h2>
            <p className="text-gray-600 text-sm">Stay informed with the latest employment news and media releases.</p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 text-[#006272] font-semibold hover:underline text-sm"
          >
            All news and updates
            <ArrowIcon />
          </a>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Featured / first item */}
          <div className="lg:col-span-1 bg-[#006272]">
            <a href={newsItems[0].href} className="group block h-full p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {newsItems[0].category}
                </span>
                <span className="text-[#9fd4db] text-xs">{newsItems[0].date}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:underline">
                {newsItems[0].title}
              </h3>
              <p className="text-[#b2d8de] text-sm leading-relaxed flex-1">
                {newsItems[0].description}
              </p>
              <div className="flex items-center gap-2 mt-6 text-white text-sm font-semibold">
                Read more <ArrowIcon className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Other news */}
          <div className="lg:col-span-2 divide-y divide-gray-200 bg-white">
            {newsItems.slice(1).map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-start gap-4 p-5 hover:bg-[#f5fbfc] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-[#e6f4f6] text-[#006272] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-gray-400 text-xs">{item.date}</span>
                    {item.tag && (
                      <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#006272] transition-colors leading-snug text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="text-[#006272] opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0 mt-1">
                  <ArrowIcon />
                </div>
              </a>
            ))}

            {/* View all link inside the box */}
            <div className="p-5 bg-[#f5f7f8]">
              <a href="#" className="inline-flex items-center gap-2 text-[#006272] font-semibold text-sm hover:underline">
                View all news and updates <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-5 sm:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-[#006272] font-semibold hover:underline text-sm">
            All news and updates <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
