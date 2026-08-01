import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import { newsQueryOptions, formatNewsDate } from "@/lib/news";

const title = "News and updates | Employment New Zealand";
const description =
  "Media releases, enforcement outcomes and law changes from Employment New Zealand, updated as they are published.";

type NewsSearch = { q: string; category: string };

export const Route = createFileRoute("/news")({
  validateSearch: (search: Record<string, unknown>): NewsSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? search.category : "All",
  }),
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
  const { q, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/news" });
  const { data, isLoading, isError, refetch, isFetching } = useQuery(newsQueryOptions());

  const categories = useMemo(() => {
    const set = new Set((data ?? []).map((i) => i.category));
    return ["All", ...Array.from(set).sort()];
  }, [data]);

  const query = q.trim().toLowerCase().slice(0, 100);
  const filtered = useMemo(() => {
    return (data ?? []).filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.tag ?? "").toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [data, category, query]);

  const setSearch = (patch: Partial<NewsSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

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
        {/* Search and filters */}
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="mb-6 rounded-xl border border-gray-200 bg-[#f5f7f8] p-4 sm:p-5"
        >
          <label htmlFor="news-search" className="block text-sm font-semibold text-gray-900 mb-2">
            Search news and updates
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z" />
              </svg>
              <input
                id="news-search"
                type="search"
                value={q}
                onChange={(e) => setSearch({ q: e.target.value })}
                placeholder="Search by keyword, e.g. minimum wage, migrant, holiday pay"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#006272] focus:outline-none focus:ring-2 focus:ring-[#006272]/25"
              />
            </div>
            {(q || category !== "All") && (
              <button
                type="button"
                onClick={() => setSearch({ q: "", category: "All" })}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#006272] hover:text-[#006272]"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSearch({ category: c })}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "border-[#006272] bg-[#006272] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#006272] hover:text-[#006272]"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {isLoading && (
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">We couldn&apos;t load news and updates right now.</p>
            <p className="mt-1 text-red-700">This is usually temporary — please try again in a moment.</p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-3 rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004f5c] disabled:opacity-60"
            >
              {isFetching ? "Retrying…" : "Try again"}
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <p aria-live="polite" className="mb-4 text-sm text-gray-600">
              Showing <strong>{filtered.length}</strong> of {data?.length ?? 0} items
              {category !== "All" && <> in <strong>{category}</strong></>}
              {query && <> matching “{q.trim()}”</>}
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-[#f5f7f8] p-8 text-center">
                <p className="font-semibold text-gray-900">No news items match your search.</p>
                <p className="mt-1 text-sm text-gray-600">Try a different keyword or clear the category filter.</p>
                <button
                  type="button"
                  onClick={() => setSearch({ q: "", category: "All" })}
                  className="mt-4 rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004f5c]"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {filtered.map((item) => (
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
            )}
          </>
        )}
      </div>
    </SiteLayout>
  );
}
