import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import HeroBanner from "@/components/HeroBanner";
import QuickLinks from "@/components/QuickLinks";
import StatsBar from "@/components/StatsBar";
import AudiencePaths from "@/components/AudiencePaths";
import MainTopics from "@/components/MainTopics";
import MinimumRights from "@/components/MinimumRights";
import WpCheckSteps from "@/components/WpCheckSteps";
import MigrantWorkers from "@/components/MigrantWorkers";
import PayRates from "@/components/PayRates";
import NewsSection from "@/components/NewsSection";
import WorkPermitSection from "@/components/WorkPermitSection";
import EmployerObligations from "@/components/EmployerObligations";
import FaqSection from "@/components/FaqSection";
import ToolsSection from "@/components/ToolsSection";
import SupportContact from "@/components/SupportContact";
import EmploymentDataSection from "@/components/EmploymentDataSection";
import SectorSpotlight from "@/components/SectorSpotlight";
import WorkJourney from "@/components/WorkJourney";
import Reveal from "@/components/Reveal";


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
      <StatsBar />
      <Reveal><AudiencePaths /></Reveal>
      <EmploymentDataSection />
      <Reveal><MainTopics /></Reveal>
      <Reveal><MinimumRights /></Reveal>
      <WorkJourney />
      <Reveal><WpCheckSteps /></Reveal>
      <SectorSpotlight />
      <Reveal><MigrantWorkers /></Reveal>
      <Reveal><PayRates /></Reveal>
      <Reveal><NewsSection /></Reveal>
      <Reveal><WorkPermitSection /></Reveal>
      <Reveal><EmployerObligations /></Reveal>
      <Reveal><FaqSection /></Reveal>
      <Reveal><ToolsSection /></Reveal>
      <Reveal><SupportContact /></Reveal>
    </SiteLayout>
  );
}

