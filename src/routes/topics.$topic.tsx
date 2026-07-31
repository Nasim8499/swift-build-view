import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import { navItems } from "@/components/Header";

export const Route = createFileRoute("/topics/$topic")({
  beforeLoad: ({ params }) => {
    if (!navItems.some((n) => n.slug === params.topic)) throw notFound();
  },
  head: ({ params }) => {
    const item = navItems.find((n) => n.slug === params.topic);
    const title = item
      ? `${item.label} | Employment New Zealand`
      : "Topic unavailable | Employment New Zealand";
    const description = item
      ? `Guidance on ${item.label.toLowerCase()}: rights, obligations and practical information for employers and employees in New Zealand.`
      : "This topic is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TopicPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <p role="alert" className="max-w-[1200px] mx-auto px-4 py-16 text-sm text-red-700">{error.message}</p>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900">Topic not found</h1>
        <Link to="/" className="mt-4 inline-block text-[#006272] font-semibold hover:underline">Back to home</Link>
      </div>
    </SiteLayout>
  ),
});

function TopicPage() {
  const { topic } = Route.useParams();
  const item = navItems.find((n) => n.slug === topic)!;

  return (
    <SiteLayout>
      <div className="bg-[#006272]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-[#9fd4db] mb-3">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span> {item.label}
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{item.label}</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#b2d8de]">
            Practical guidance, minimum entitlements and obligations relating to {item.label.toLowerCase()}.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-xl font-bold text-gray-900 mb-5">In this section</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {item.children.map((child) => (
            <li key={child}>
              <div className="h-full rounded-xl border border-gray-200 p-5 hover:border-[#006272] hover:shadow-sm transition-all">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{child}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Information about {child.toLowerCase()} under New Zealand employment law.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteLayout>
  );
}
