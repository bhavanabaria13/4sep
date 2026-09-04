import { Link } from "react-router-dom";
import { Eye, Heart, TrendingUp } from "lucide-react";
import { assetUrl } from "../lib/api.js";
import { motion } from "framer-motion";

const kFmt = (n) => {
  if (!n && n !== 0) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

export default function ProjectCard({ item, type = "game", index = 0 }) {
  const to = type === "game" ? `/games/${item.slug}` : `/dapps/${item.slug}`;
  const badge = item.category;
  const img = assetUrl(item.thumbnail || item.banner);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <Link
        to={to}
        data-testid={`${type}-card-${item.slug}`}
        className="group block glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(139,92,246,0.5)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {badge && (
            <span className="absolute top-3 left-3 uppercase tracking-widest text-[10px] font-bold bg-black/50 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
          {item.rank && item.rank <= 10 && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> #{item.rank}
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            {item.logo && (
              <img
                src={assetUrl(item.logo)}
                alt=""
                className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10 bg-white/5"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="font-heading font-bold text-white truncate">{item.title}</div>
              <div className="text-[11px] text-purple-300/80">{item.blockchain}</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400 line-clamp-2">{item.shortDesc}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {kFmt(item.views)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" /> {kFmt(item.likes)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
