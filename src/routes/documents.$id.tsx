import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import AgreementDocument from "@/components/AgreementDocument";
import { getAgreement, type AgreementData } from "@/lib/wpcheck-docs";

const title = "WP Check agreement document | Employment New Zealand";
const description = "Printable WP Check verified AEWV employment agreement document.";

export const Route = createFileRoute("/documents/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentPage,
});

function DocumentPage() {
  const { id } = Route.useParams();
  const [doc, setDoc] = useState<AgreementData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDoc(getAgreement(id));
    setReady(true);
  }, [id]);

  return (
    <SiteLayout>
      <div className="bg-[#f5f7f8] py-6 print:hidden">
        <div className="mx-auto flex max-w-[820px] flex-wrap items-center justify-between gap-3 px-4">
          <Link to="/admin" className="text-sm font-semibold text-[#006272] hover:underline">
            ← Back to administrator portal
          </Link>
          <button
            onClick={() => window.print()}
            className="rounded bg-[#006272] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004f5c]"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="px-4 py-8 print:p-0">
        {!ready && <p className="text-center text-sm text-gray-600">Loading document…</p>}
        {ready && !doc && (
          <p role="alert" className="mx-auto max-w-[820px] rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            This document could not be found on this device. Documents are stored locally in the administrator portal.
          </p>
        )}
        {doc && <AgreementDocument a={doc} />}
      </div>
    </SiteLayout>
  );
}
