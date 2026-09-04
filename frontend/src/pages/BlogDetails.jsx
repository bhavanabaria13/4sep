import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, ChevronRight, User2 } from "lucide-react";
import { API, assetUrl } from "../lib/api.js";
import BlogCard from "../components/BlogCard.jsx";
import { Skeleton, Badge } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function BlogDetails() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: item ? item.title : "Loading...",
    description: item ? item.metaDesc || item.excerpt : "",
    image: item ? assetUrl(item.banner || item.thumbnail) : undefined,
    type: "article",
  });

  useEffect(() => {
    setLoading(true);
    API.get(`/blogs/slug/${slug}`)
      .then((res) => {
        setItem(res.data.item);
        setRelated(res.data.related);
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 md:px-8 py-16"><Skeleton className="h-96" /></div>;
  if (!item) return <div className="container mx-auto px-4 md:px-8 py-24 text-center text-white">Not found</div>;

  const date = new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <nav className="text-sm text-slate-400 flex items-center gap-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{item.title}</span>
        </nav>
      </div>

      <article className="container mx-auto px-4 md:px-8 py-10 max-w-4xl">
        {item.category && <Badge tone="purple">{item.category}</Badge>}
        <h1 className="mt-4 font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight" data-testid="blog-title">
          {item.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span className="inline-flex items-center gap-1.5"><User2 className="h-4 w-4" /> {item.author}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {date}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {item.readingTime || 5} min read</span>
        </div>

        {item.banner && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
            <img src={assetUrl(item.banner)} alt={item.title} className="w-full h-auto object-cover aspect-[16/9]" />
          </div>
        )}

        <div className="prose-invert mt-8" data-testid="blog-content" dangerouslySetInnerHTML={{ __html: item.content }} />
      </article>

      {related.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 pb-16">
          <h3 className="font-heading text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((b, i) => (
              <BlogCard key={b.id} item={b} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
