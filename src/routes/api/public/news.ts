import { createFileRoute } from "@tanstack/react-router";
import newsData from "@/data/news.json";

export const Route = createFileRoute("/api/public/news")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const limitParam = Number(url.searchParams.get("limit"));
        const limit =
          Number.isFinite(limitParam) && limitParam > 0
            ? Math.min(Math.floor(limitParam), 50)
            : undefined;

        const items = [...newsData].sort((a, b) => b.date.localeCompare(a.date));

        return Response.json({
          items: limit ? items.slice(0, limit) : items,
          total: items.length,
        });
      },
    },
  },
});
