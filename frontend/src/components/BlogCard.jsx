import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { assetUrl } from "../lib/api.js";
import { motion } from "framer-motion";

export default function BlogCard({ item, index = 0 }) {
  const img = assetUrl(item.thumbnail || item.banner);
  const date = new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <Link
        to={`/blog/${item.slug}`}
        data-testid={`blog-card-${item.slug}`}
        className="group block glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {item.category && (
            <span className="absolute top-3 left-3 uppercase tracking-widest text-[10px] font-bold bg-purple-500/80 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-full">
              {item.category}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-heading font-bold text-white text-lg leading-snug line-clamp-2 group-hover:text-purple-300 transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400 line-clamp-2">{item.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {item.readingTime || 5} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
