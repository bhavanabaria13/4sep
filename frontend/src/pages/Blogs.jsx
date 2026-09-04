import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { API } from "../lib/api.js";
import BlogCard from "../components/BlogCard.jsx";
import { PageHeader, Skeleton, EmptyState } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function Blogs() {
  useSEO({
    title: "Blog",
    description: "Latest news, updates and insights from EtherAuthority interns.",
  });
  const [sp, setSp] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: [], total: 0, page: 1, totalPages: 1, facets: { categories: [] } });

  const filters = useMemo(
    () => ({
      q: sp.get("q") || "",
      category: sp.get("category") || "all",
      sort: sp.get("sort") || "newest",
      page: parseInt(sp.get("page") || "1", 10),
    }),
    [sp]
  );

  useEffect(() => {
    setLoading(true);
    API.get("/blogs", { params: { ...filters, limit: 9 } })
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(sp);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    setSp(next);
  };

  return (
    <div>
      <PageHeader title="Blog" subtitle="Latest news, updates and insights from EtherAuthority interns." testid="blogs-page-header" />

      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="glass rounded-2xl p-4 md:p-5 mb-8 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              data-testid="blogs-search-input"
              value={filters.q}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search blog posts..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("category", "all")}
              data-testid="blogs-cat-all"
              className={`px-4 h-10 rounded-full text-sm font-medium ${
                filters.category === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "glass glass-hover text-slate-300"
              }`}
            >
              All
            </button>
            {data.facets?.categories?.map((c) => (
              <button
                key={c}
                onClick={() => setFilter("category", c)}
                data-testid={`blogs-cat-${c.toLowerCase()}`}
                className={`px-4 h-10 rounded-full text-sm font-medium ${
                  filters.category === c ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "glass glass-hover text-slate-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        ) : data.items.length === 0 ? (
          <EmptyState title="No blog posts yet" subtitle="Check back soon for the latest updates." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.items.map((b, i) => (
                <BlogCard key={b.id} item={b} index={i} />
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => setFilter("page", filters.page - 1)}
                  className="h-10 w-10 rounded-lg glass glass-hover flex items-center justify-center disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: Math.min(data.totalPages, 7) }).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setFilter("page", p)}
                      className={`h-10 w-10 rounded-lg text-sm font-medium ${
                        p === filters.page
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "glass glass-hover text-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  disabled={filters.page >= data.totalPages}
                  onClick={() => setFilter("page", filters.page + 1)}
                  className="h-10 w-10 rounded-lg glass glass-hover flex items-center justify-center disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
