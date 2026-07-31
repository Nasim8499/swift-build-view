import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import { navItems } from "@/components/Header";

const title = "Browse employment topics | Employment New Zealand";
const description =
  "Browse all employment topics — starting employment, pay and hours, leave and holidays, workplace policies, resolving problems and ending employment.";

export const Route = createFileRoute("/topics/")({
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
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <SiteLayout>
      <div className="bg-[#006272]">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-[#9fd4db]">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> Topics
          </nav>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Browse topics</h1>
          <p className="mt-3 max-w-2xl text-sm text-[#b2d8de] sm:text-base">{description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <section
              key={item.slug}
              className="flex h-full flex-col rounded-xl border border-gray-200 p-5 shadow-sm transition-all hover:border-[#006272] hover:shadow-md"
            >
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                <Link to="/topics/$topic" params={{ topic: item.slug }} className="hover:text-[#006272] hover:underline">
                  {item.label}
                </Link>
              </h2>
              <ul className="mt-3 flex-1 space-y-1.5">
                {item.children.slice(0, 5).map((child) => (
                  <li key={child}>
                    <Link
                      to="/topics/$topic"
                      params={{ topic: item.slug }}
                      className="text-sm text-gray-600 hover:text-[#006272] hover:underline"
                    >
                      {child}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/topics/$topic"
                params={{ topic: item.slug }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#006272] hover:underline"
              >
                View all {item.children.length} pages →
              </Link>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
