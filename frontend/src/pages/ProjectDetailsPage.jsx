import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Globe, Github as GithubIcon, Eye, Heart, PlayCircle, ArrowRight } from "lucide-react";
import { API, assetUrl } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import { Skeleton, Badge } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";
import toast from "react-hot-toast";

export default function ProjectDetailsPage({ type = "game" }) {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useSEO({
    title: item ? item.title : "Loading...",
    description: item ? item.metaDesc || item.shortDesc : "",
    image: item ? assetUrl(item.banner || item.thumbnail) : undefined,
    type: "article",
  });

  useEffect(() => {
    setLoading(true);
    const endpoint = type === "game" ? "/games" : "/dapps";
    API.get(`${endpoint}/slug/${slug}`)
      .then((res) => {
        setItem(res.data.item);
        setRelated(res.data.related);
        setSelectedImage(res.data.item.banner || res.data.item.gallery?.[0]);
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [slug, type]);

  const like = async () => {
    try {
      const endpoint = type === "game" ? "/games" : "/dapps";
      const res = await API.post(`${endpoint}/slug/${slug}/like`);
      setItem((prev) => ({ ...prev, likes: res.data.likes }));
      toast.success("Liked!");
    } catch {
      toast.error("Please try again");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-16">
        <Skeleton className="aspect-[21/9]" />
      </div>
    );
  }
  if (!item) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 text-center">
        <div className="text-2xl font-bold">Not found</div>
        <Link to={type === "game" ? "/games" : "/dapps"} className="text-purple-300 hover:underline mt-2 inline-block">
          Back to listing
        </Link>
      </div>
    );
  }

  const gallery = [item.banner, ...(item.gallery || [])].filter(Boolean);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <nav className="text-sm text-slate-400 flex items-center gap-2" data-testid={`${type}-breadcrumbs`}>
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={type === "game" ? "/games" : "/dapps"} className="hover:text-white">
            {type === "game" ? "Games" : "dApps"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{item.title}</span>
        </nav>
      </div>

      {/* Banner + header */}
      <div className="container mx-auto px-4 md:px-8 pt-6">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="relative aspect-[16/7]">
            <img src={assetUrl(selectedImage || item.thumbnail)} alt={item.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />
            {item.category && (
              <span className="absolute top-5 left-5 uppercase tracking-widest text-xs font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full">
                {item.category}
              </span>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            {item.logo && (
              <img
                src={assetUrl(item.logo)}
                alt=""
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 bg-white/5 shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="font-heading text-3xl md:text-5xl font-black tracking-tight" data-testid={`${type}-title`}>
                {item.title}
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl">{item.shortDesc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="purple">{item.blockchain}</Badge>
                <Badge tone="info">Rank #{item.rank}</Badge>
                <Badge tone="default"><Eye className="h-3 w-3" /> {item.views}</Badge>
                <Badge tone="default"><Heart className="h-3 w-3" /> {item.likes}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`${type}-visit-website`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                  <Globe className="h-4 w-4" /> Visit Website
                </a>
              )}
              <button
                onClick={like}
                data-testid={`${type}-like-button`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass glass-hover text-white font-semibold"
              >
                <Heart className="h-4 w-4" /> Add to Favorite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 1 && (
        <div className="container mx-auto px-4 md:px-8 mt-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(g)}
                className={`aspect-video rounded-xl overflow-hidden border ${
                  selectedImage === g ? "border-purple-500 ring-2 ring-purple-500/40" : "border-white/10"
                }`}
              >
                <img src={assetUrl(g)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold">About {item.title}</h2>
            <p className="mt-3 text-slate-300 leading-relaxed whitespace-pre-line">{item.description}</p>
            {item.features?.length > 0 && (
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {item.videoUrl && (
            <section className="glass rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-black/50 flex items-center justify-center">
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold"
                >
                  <PlayCircle className="h-16 w-16 text-white/80" />
                </a>
              </div>
            </section>
          )}

          {item.techStack?.length > 0 && (
            <section className="glass rounded-2xl p-6">
              <h3 className="font-heading text-xl font-bold">Technology Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.techStack.map((t) => (
                  <Badge key={t} tone="info">{t}</Badge>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold mb-4">Key Info</h3>
            <dl className="space-y-3 text-sm">
              <Row label="Category" value={item.category} />
              <Row label="Blockchain" value={item.blockchain} />
              <Row label="Rank" value={`#${item.rank}`} />
              <Row label="Status" value={item.status} />
              <Row
                label="Website"
                value={
                  item.website ? (
                    <a href={item.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                      {item.website.replace(/^https?:\/\//, "").slice(0, 30)}
                    </a>
                  ) : (
                    "—"
                  )
                }
              />
              {item.github && (
                <Row
                  label="GitHub"
                  value={
                    <a href={item.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                      <GithubIcon className="h-3.5 w-3.5" /> Repository
                    </a>
                  }
                />
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 pb-16">
          <h3 className="font-heading text-2xl font-bold mb-6">Related {type === "game" ? "Games" : "dApps"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((r, i) => (
              <ProjectCard key={r.id} item={r} type={type} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1 border-b border-white/5 last:border-b-0">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-white font-medium">{value}</dd>
    </div>
  );
}
