import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { newsQueryOptions, formatNewsDate, type NewsItem } from "@/lib/news";

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 3L29 12L20 21" />
        <path d="M3 12L27 12" strokeDasharray="24" />
      </g>
    </svg>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

export default function NewsSection({ limit = 4 }: { limit?: number }) {
  const { data, isLoading, isError } = useQuery(newsQueryOptions(limit));

  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">News and updates</h2>
            <p className="text-gray-600 text-sm">Stay informed with the latest employment news and media releases.</p>
          </div>
          <Link
            to="/news"
            className="hidden sm:inline-flex items-center gap-2 text-[#006272] font-semibold hover:underline text-sm shrink-0"
          >
            All news and updates
            <ArrowIcon />
          </Link>
        </div>

        {isLoading && <Skeleton />}

        {isError && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
            We couldn&apos;t load news and updates right now. Please try again later.
          </p>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <FeaturedCard item={data[0]!} />

            <div className="lg:col-span-2 divide-y divide-gray-200 bg-white">
              {data.slice(1).map((item) => (
                <NewsRow key={item.id} item={item} />
              ))}

              <div className="p-5 bg-[#f5f7f8]">
                <Link to="/news" className="inline-flex items-center gap-2 text-[#006272] font-semibold text-sm hover:underline">
                  View all news and updates <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 sm:hidden">
          <Link to="/news" className="inline-flex items-center gap-2 text-[#006272] font-semibold hover:underline text-sm">
            All news and updates <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <div className="lg:col-span-1 bg-[#006272]">
      <div className="h-full p-6 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{item.category}</span>
          <span className="text-[#9fd4db] text-xs">{formatNewsDate(item.date)}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3">{item.title}</h3>
        <p className="text-[#b2d8de] text-sm leading-relaxed flex-1">{item.description}</p>
        <Link to="/news" className="flex items-center gap-2 mt-6 text-white text-sm font-semibold hover:underline">
          Read more <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <Link
      to="/news"
      className="group flex items-start gap-4 p-4 sm:p-5 hover:bg-[#f5fbfc] transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="bg-[#e6f4f6] text-[#006272] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {item.category}
          </span>
          <span className="text-gray-400 text-xs">{formatNewsDate(item.date)}</span>
          {item.tag && (
            <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {item.tag}
            </span>
          )}
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-[#006272] transition-colors leading-snug text-sm md:text-base">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mt-1 line-clamp-2">{item.description}</p>
      </div>
      <div className="text-[#006272] opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0 hidden sm:block">
        <ArrowIcon />
      </div>
    </Link>
  );
}
