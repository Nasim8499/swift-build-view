import { queryOptions } from "@tanstack/react-query";

export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  tag: string | null;
};

export function formatNewsDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

async function fetchNews(limit?: number): Promise<NewsItem[]> {
  const qs = limit ? `?limit=${limit}` : "";
  const res = await fetch(`/api/public/news${qs}`);
  if (!res.ok) throw new Error("Unable to load news and updates");
  const data = (await res.json()) as { items: NewsItem[] };
  return data.items;
}

export const newsQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: ["news", limit ?? "all"],
    queryFn: () => fetchNews(limit),
    staleTime: 60_000,
  });
