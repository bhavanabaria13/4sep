import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { SectionTitle, Skeleton } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";
import GlassCard from "../components/GlassCard.jsx";
import heroCube from "../assets/hero.png";
import StatsCard from "../components/StatsCard.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
import {
  FileText,
  GraduationCap,
  MessageCircleMore,
} from "lucide-react";

//import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Gamepad2,
  Layers,
  Rocket,
  Users,
  TrendingUp,
  BookOpen,
  Globe,
  FolderGit2,
  Shield,
  Lock,
  Boxes,
} from "lucide-react";


const kFmt = (n) => {
  if (!n && n !== 0) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

export default function Home() {
  useSEO({
    title: "Blockchain Games & dApps by our Interns",
    description: "Discover innovative blockchain games and dApps built by EtherAuthority Interns. Rankings, reviews, and tutorials on the future of Web3.",
    image: "https://images.unsplash.com/photo-1637825891028-564f672aa42c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  });
  const [games, setGames] = useState([]);
  const [dapps, setDapps] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadHome = async () => {
    try {
      const [g, d, b, s] = await Promise.all([
        API.get("/games/top?limit=5"),
        API.get("/dapps/top?limit=5"),
        API.get("/blogs/top?limit=6"),
        API.get("/stats"),
      ]);

      console.log("Games API:", g.data);
      console.log("Dapps API:", d.data);
      console.log("Blogs API:", b.data);
      console.log("Stats API:", s.data);

      setGames(
        Array.isArray(g.data?.items)
          ? g.data.items
          : Array.isArray(g.data)
          ? g.data
          : []
      );

      setDapps(
        Array.isArray(d.data?.items)
          ? d.data.items
          : Array.isArray(d.data)
          ? d.data
          : []
      );

      setBlogs(
        Array.isArray(b.data?.items)
          ? b.data.items
          : Array.isArray(b.data)
          ? b.data
          : []
      );

      setStats(s.data || {});
    } catch (err) {
      console.error(err);

      setGames([]);
      setDapps([]);
      setBlogs([]);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  loadHome();
}, []);
{(games || []).map((g, i) => (
  <ProjectCard key={g.id} item={g} type="game" index={i} />
))}
{(dapps || []).map((d, i) => (
  <ProjectCard key={d.id} item={d} type="dapp" index={i} />
))}
{(blogs || []).slice(0, 6).map((b, i) => (
  <BlogCard key={b.id} item={b} index={i} />
))}
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6 pt-28 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <p className="uppercase tracking-[5px] text-cyan-400 text-sm font-semibold">
              BUILD • LEARN • SECURE
            </p>

            <h1 className="mt-6 text-6xl lg:text-7xl font-black leading-tight">

              Empowering the

              <br />

              Future of Web3

              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Built by Interns
              </span>

            </h1>

            <p className="mt-8 text-slate-400 text-lg leading-8 max-w-xl">
              Discover innovative blockchain projects, technical blogs,
              tutorials and real-world Web3 solutions built by talented
              Secure Chain interns.
            </p>

            <div className="mt-10 flex gap-5">

              <Link
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold flex items-center gap-2 hover:scale-105 duration-300"
              >
                Explore Projects
                <ArrowRight size={18} />
              </Link>

              <Link
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-cyan-400"
              >
                Read Blogs
              </Link>

            </div>

            {/* Stats */}

            <div   className="mt-14 w-full max-w-5xl">

    <div className="grid grid-cols-5">

        <StatsCard
            icon={FolderGit2}
            value="120+"
            title="Projects"
        />

        <StatsCard
            icon={Users}
            value="85+"
            title="Interns"
        />

        <StatsCard
            icon={BookOpen}
            value="25+"
            title="Blogs"
        />

        <StatsCard
            icon={Globe}
            value="10+"
            title="Networks"
        />

        <StatsCard
            icon={TrendingUp}
            value="1M+"
            title="Transactions"
        />

    </div>

</div>
          </motion.div>

          {/* RIGHT */}

         <div className="relative">

    <img
        src={heroCube}
        className="w-full"
        alt=""
    />

    <GlassCard
        title="DECENTRALIZED"
        icon={Boxes}
        className="top-6 left-4"
    />

    <GlassCard
        title="TRANSPARENT"
        icon={Layers}
        className="top-52 left-0"
    />

    <GlassCard
        title="SECURE"
        icon={Lock}
        className="top-24 right-0"
    />

    <GlassCard
        title="SCALABLE"
        icon={Shield}
        className="bottom-8 right-4"
    />

</div>
        </div>

      </section>
	     
      {/* Stats band */}
      <section className="container mx-auto px-4 md:px-8 -mt-6 mb-16 relative" style={{ marginTop: "34px"}}>
        <div className="glass rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="home-stats">
          <Stat icon={Gamepad2} label="Games" value={stats?.approvedGames} tone="from-blue-500 to-cyan-500" />
          <Stat icon={Layers} label="dApps" value={stats?.approvedDapps} tone="from-purple-500 to-pink-500" />
          <Stat icon={Rocket} label="Blog Posts" value={stats?.publishedBlogs} tone="from-amber-500 to-red-500" />
          <Stat icon={Users} label="Views" value={stats?.totalViews} tone="from-emerald-500 to-teal-500" />
        </div>
      </section>
<section className="max-w-7xl mx-auto px-6 py-24">

    <div className="text-center mb-14">

        <h2 className="text-5xl font-black text-white">
            Explore the Platform
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Everything you need to learn, build and explore Web3.
        </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-7">

        <FeatureSection
            icon={Users}
            color="cyan"
            title="Interns Projects"
            description="Explore real-world blockchain projects developed by our talented interns."
        />

        <FeatureSection
            icon={FileText}
            color="purple"
            title="Technical Blogs"
            description="In-depth articles on blockchain, Web3, security and emerging technologies."
        />

        <FeatureSection
            icon={Boxes}
            color="blue"
            title="Blockchain Explorer"
            description="Search transactions, blocks, addresses and tokens across multiple networks."
        />

        <FeatureSection
            icon={GraduationCap}
            color="amber"
            title="Learn & Grow"
            description="Access resources, tutorials and guides to enhance your blockchain skills."
        />

        <FeatureSection
            icon={MessageCircleMore}
            color="pink"
            title="Join Community"
            description="Be part of a vibrant Web3 community building the decentralized future."
        />

    </div>

</section>

      {/* Latest Games */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest Games"
          action={
            <Link to="/games" data-testid="home-view-all-games" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {games.map((g, i) => (
              <ProjectCard key={g.id} item={g} type="game" index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Latest dApps */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest dApps"
          action={
            <Link to="/dapps" data-testid="home-view-all-dapps" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {dapps.map((d, i) => (
              <ProjectCard key={d.id} item={d} type="dapp" index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Blogs */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest Blogs"
          action={
            <Link to="/blog" data-testid="home-view-all-blogs" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((b, i) => (
              <BlogCard key={b.id} item={b} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/20 p-10 md:p-14">
          <div className="hero-glow opacity-50" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-3xl md:text-4xl font-black">Building the Future of Web3</h3>
              <p className="text-slate-300 mt-2 max-w-xl">EtherAuthority interns are building innovative blockchain projects to shape the decentralized future.</p>
            </div>
            <Link
              to="/about"
              data-testid="home-cta-about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
            >
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tone} flex items-center justify-center shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-heading font-black">{kFmt(value || 0)}</div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="aspect-[3/4]" />
      ))}
    </div>
  );
}
