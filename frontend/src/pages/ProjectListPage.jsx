import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { API } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import { PageHeader, Skeleton, EmptyState } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function ProjectListPage({ type = "game", title, subtitle }) {
  useSEO({
    title,
    description: subtitle,
  });
  const [sp, setSp] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: [], total: 0, page: 1, totalPages: 1, facets: { blockchains: [], categories: [] } });

  const filters = useMemo(
    () => ({
      q: sp.get("q") || "",
      blockchain: sp.get("blockchain") || "all",
      category: sp.get("category") || "all",
      sort: sp.get("sort") || "rank_asc",
      page: parseInt(sp.get("page") || "1", 10),
    }),
    [sp]
  );

  useEffect(() => {
    setLoading(true);
    const endpoint = type === "game" ? "/games" : "/dapps";
    const params = { ...filters, limit: 12 };
    API.get(endpoint, { params })
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters, type]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(sp);
    if (value === undefined || value === null || value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    setSp(next);
  };

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} testid={`${type}-page-header`} />

      <div className="container mx-auto px-4 md:px-8 pb-16">
        {/* Filters */}
        <div className="glass rounded-2xl p-4 md:p-5 mb-8 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              data-testid={`${type}-search-input`}
              value={filters.q}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder={`Search ${type === "game" ? "games" : "dApps"}...`}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              data-testid={`${type}-filter-blockchain`}
              value={filters.blockchain}
              onChange={(e) => setFilter("blockchain", e.target.value)}
              className="h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
            >
              <option value="all">All Blockchains</option>
              {data.facets?.blockchains?.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              data-testid={`${type}-filter-category`}
              value={filters.category}
              onChange={(e) => setFilter("category", e.target.value)}
              className="h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
            >
              <option value="all">All Categories</option>
              {data.facets?.categories?.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              data-testid={`${type}-filter-sort`}
              value={filters.sort}
              onChange={(e) => setFilter("sort", e.target.value)}
              className="h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
            >
              <option value="rank_asc">Highest Rank</option>
              <option value="rank_desc">Lowest Rank</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4]" />
            ))}
          </div>
        ) : data.items.length === 0 ? (
          <EmptyState title={`No ${type === "game" ? "games" : "dApps"} found`} subtitle="Try adjusting your filters." />
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-400" data-testid={`${type}-result-count`}>
              Showing {data.items.length} of {data.total} results
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.items.map((item, i) => (
                <ProjectCard key={item.id} item={item} type={type} index={i} />
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2" data-testid={`${type}-pagination`}>
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
