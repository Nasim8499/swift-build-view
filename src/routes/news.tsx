import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import SiteLayout from "@/components/SiteLayout";
import { newsQueryOptions, formatNewsDate } from "@/lib/news";

const title = "News and updates | Employment New Zealand";
const description =
  "Media releases, enforcement outcomes and law changes from Employment New Zealand, updated as they are published.";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { data, isLoading, isError } = useQuery(newsQueryOptions());

  return (
    <SiteLayout>
      <div className="bg-[#006272]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-[#9fd4db] mb-3">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> News and updates
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">News and updates</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#b2d8de]">{description}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {isLoading && (
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
            We couldn&apos;t load news and updates right now. Please try again later.
          </p>
        )}

        <ul className="divide-y divide-gray-200 border-y border-gray-200">
          {data?.map((item) => (
            <li key={item.id} className="py-5">
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
              <h2 className="font-bold text-gray-900 text-base sm:text-lg leading-snug">{item.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mt-1 max-w-3xl">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
}
