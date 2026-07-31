import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import HeroBanner from "@/components/HeroBanner";
import QuickLinks from "@/components/QuickLinks";
import MainTopics from "@/components/MainTopics";
import MigrantWorkers from "@/components/MigrantWorkers";
import NewsSection from "@/components/NewsSection";
import ToolsSection from "@/components/ToolsSection";

const title = "Employment Services Portal | Jobs, Rights & Support";
const description =
  "Find work, understand your employment rights, run an official WP Check, and use labour tools and services in one place.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <HeroBanner />
      <QuickLinks />
      <MainTopics />
      <MigrantWorkers />
      <NewsSection />
      <ToolsSection />
    </SiteLayout>
  );
}
