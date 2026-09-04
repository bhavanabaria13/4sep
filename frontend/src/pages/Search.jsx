import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { PageHeader, Skeleton, EmptyState } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function Search() {
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";
  const [data, setData] = useState({ games: [], dapps: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  useSEO({
    title: q ? `Search: ${q}` : "Search",
    description: q ? `Search results across games, dApps and blogs for "${q}".` : "Search across games, dApps and blogs.",
  });

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }
    setLoading(true);
    API.get("/search", { params: { q } })
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q]);

  const total = data.games.length + data.dapps.length + data.blogs.length;

  return (
    <div>
      <PageHeader title={q ? `Results for "${q}"` : "Search"} subtitle={q ? `${total} results found` : "Type in the header to search."} testid="search-header" />
      <div className="container mx-auto px-4 md:px-8 pb-16 space-y-12">
        {loading ? (
          <Skeleton className="h-64" />
        ) : !q ? (
          <EmptyState title="Enter a search term" />
        ) : total === 0 ? (
          <EmptyState title="Nothing matched your search" subtitle="Try a different keyword." />
        ) : (
          <>
            {data.games.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Games ({data.games.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.games.map((g, i) => <ProjectCard key={g.id} item={g} type="game" index={i} />)}
                </div>
              </section>
            )}
            {data.dapps.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">dApps ({data.dapps.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.dapps.map((d, i) => <ProjectCard key={d.id} item={d} type="dapp" index={i} />)}
                </div>
              </section>
            )}
            {data.blogs.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Blogs ({data.blogs.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.blogs.map((b, i) => <BlogCard key={b.id} item={b} index={i} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
