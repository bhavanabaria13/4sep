import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  BookOpen,
  Globe,
  TrendingUp,
  FolderGit2,
  Moon,
} from "lucide-react";

import { API } from "../lib/api";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";

import heroCube from "../assets/images/hero-cube.png";
import logo from "../assets/logo.png";

const kFmt = (n) => {
  if (!n && n !== 0) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

export default function Home() {
  const [games, setGames] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadHome();
  }, []);

  const loadHome = async () => {
    try {
      const [g, b, s] = await Promise.all([
        API.get("/games/top?limit=6"),
        API.get("/blogs/top?limit=4"),
        API.get("/stats"),
      ]);

      setGames(g.data.items || []);
      setBlogs(b.data.items || []);
      setStats(s.data || {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#040814] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#040814]" />

        <div className="absolute left-0 top-20 h-[650px] w-[650px] rounded-full bg-cyan-500/10 blur-[170px]" />

        <div className="absolute right-0 top-10 h-[650px] w-[650px] rounded-full bg-purple-600/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#040814]/70 border-b border-cyan-500/10">

        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

          <Link to="/" className="flex items-center gap-3">

            <img src={logo} className="w-11 h-11" />

            <div>

              <h2 className="font-bold text-xl leading-none">
                SECURE
              </h2>

              <span className="text-slate-300 text-sm">
                CHAIN
              </span>

            </div>

          </Link>

          <nav className="hidden lg:flex gap-10 font-medium">

            <NavLink className="text-cyan-400 relative">
              Home

              <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan-400" />

            </NavLink>

            <NavLink>Projects</NavLink>

            <NavLink>Blogs</NavLink>

            <NavLink>Blockchain Explorer</NavLink>

            <NavLink>Interns</NavLink>

            <NavLink>About Us</NavLink>

          </nav>

          <div className="flex items-center gap-4">

            <button
              className="
              px-5
              py-2.5
              rounded-xl
              font-semibold
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              hover:scale-105
              duration-300
              shadow-[0_0_25px_rgba(0,255,255,.35)]
            "
            >
              Connect Wallet
            </button>

            <button className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-cyan-400">
              <Moon size={18} />
            </button>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}

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

            <div className="grid grid-cols-5 gap-8 mt-16">

              <Stat
                icon={FolderGit2}
                value="120+"
                label="Projects"
              />

              <Stat
                icon={Users}
                value="85+"
                label="Interns"
              />

              <Stat
                icon={BookOpen}
                value="25+"
                label="Blogs"
              />

              <Stat
                icon={Globe}
                value="10+"
                label="Networks"
              />

              <Stat
                icon={TrendingUp}
                value="1M+"
                label="Transactions"
              />

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .7 }}
            className="relative"
          >

            <img
              src={heroCube}
              alt=""
              className="w-full animate-float drop-shadow-[0_0_80px_#00E8FF]"
            />

            <GlassCard
              title="DECENTRALIZED"
              className="top-8 left-2"
            />

            <GlassCard
              title="TRANSPARENT"
              className="top-60 left-0"
            />

            <GlassCard
              title="SECURE"
              className="top-24 right-0"
            />

            <GlassCard
              title="SCALABLE"
              className="bottom-12 right-2"
            />

          </motion.div>

        </div>

      </section>
	        {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-cyan-400">
            FEATURES
          </p>

          <h2 className="text-4xl font-black mt-3">
            Everything You Need
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <FeatureCard
            title="Intern Projects"
            icon="🚀"
            desc="Explore real blockchain projects built by our talented interns."
          />

          <FeatureCard
            title="Technical Blogs"
            icon="📘"
            desc="Tutorials, smart contract guides and Web3 development."
          />

          <FeatureCard
            title="Blockchain Explorer"
            icon="🔍"
            desc="Search blocks, transactions, wallets and tokens."
          />

          <FeatureCard
            title="Learn & Grow"
            icon="🎓"
            desc="Courses, resources and internship learning materials."
          />

        </div>

      </section>

      {/* ================= PROJECTS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-cyan-400 uppercase tracking-[4px]">
              INTERNS PROJECTS
            </p>

            <h2 className="text-4xl font-black mt-2">
              Innovative Projects Built by Interns
            </h2>

          </div>

          <Link
            to="/projects"
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 duration-300"
          >
            View All
            <ArrowRight size={18}/>
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

          {games.map((item,index)=>(
              <ProjectCard
                  key={item.id}
                  item={item}
                  type="game"
                  index={index}
              />
          ))}

        </div>

      </section>

      {/* ================= BLOGS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-cyan-400 uppercase tracking-[4px]">
              LATEST BLOGS
            </p>

            <h2 className="text-4xl font-black mt-2">
              Insights & Knowledge
            </h2>

          </div>

          <Link
            to="/blogs"
            className="text-cyan-400 flex items-center gap-2"
          >
            View All
            <ArrowRight size={18}/>
          </Link>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {blogs.map((blog,index)=>(
            <BlogCard
                key={blog.id}
                item={blog}
                index={index}
            />
          ))}

        </div>

      </section>

      {/* ================= BLOCKCHAIN EXPLORER ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="mb-10">

          <p className="uppercase tracking-[4px] text-cyan-400">
            BLOCKCHAIN EXPLORER
          </p>

          <h2 className="text-4xl font-black mt-3">
            Explore Blockchain Data
          </h2>

        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1124]/70 backdrop-blur-xl p-8">

          <div className="grid lg:grid-cols-12 gap-5">

            <input
              placeholder="Search Transaction Hash, Address, Block or Token..."
              className="lg:col-span-8 h-14 px-6 rounded-xl bg-[#121a33] border border-white/10 outline-none"
            />

            <select
              className="lg:col-span-2 rounded-xl bg-[#121a33] border border-white/10 px-4"
            >
              <option>All Networks</option>
              <option>Ethereum</option>
              <option>Polygon</option>
              <option>BNB Chain</option>
              <option>Base</option>
            </select>

            <button
              className="lg:col-span-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
            >
              Search
            </button>

          </div>

          <div className="flex flex-wrap gap-4 mt-8">

            {[
              "Ethereum",
              "Sepolia",
              "Polygon",
              "BNB Chain",
              "Base",
              "Arbitrum",
              "Optimism",
              "Avalanche"
            ].map((network)=>(
              <div
                key={network}
                className="px-5 py-2 rounded-xl border border-white/10 bg-[#121a33]"
              >
                {network}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ---------- Components ---------- */}

      function FeatureCard({title,desc,icon}) {
        return (
          <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1124]/70 backdrop-blur-xl p-8 hover:border-cyan-400 duration-300">

            <div className="text-4xl mb-6">
              {icon}
            </div>

            <h3 className="text-xl font-bold">
              {title}
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              {desc}
            </p>

          </div>
        );
      }

      function Stat({icon:Icon,value,label}) {
        return (
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Icon size={22}/>
            </div>

            <div>

              <h3 className="text-2xl font-bold">
                {value}
              </h3>

              <p className="text-sm text-slate-400">
                {label}
              </p>

            </div>

          </div>
        );
      }

      function GlassCard({title,className}) {
        return (
          <div
            className={`absolute ${className} rounded-2xl border border-cyan-500/30 bg-[#0b1124]/80 backdrop-blur-xl px-6 py-5`}
          >
            <h4 className="font-semibold tracking-wide">
              {title}
            </h4>
          </div>
        );
      }
	  
	        {/* ================= ROADMAP ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-cyan-400">
            ROADMAP
          </p>

          <h2 className="text-4xl font-black mt-3">
            Secure Chain Journey
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              phase: "Phase 1",
              title: "Platform Launch",
              items: [
                "Website",
                "Projects",
                "Blogs",
                "Intern Portal",
              ],
            },
            {
              phase: "Phase 2",
              title: "Blockchain Explorer",
              items: [
                "Explorer",
                "Wallet Search",
                "Token Search",
                "Charts",
              ],
            },
            {
              phase: "Phase 3",
              title: "Community",
              items: [
                "Leaderboard",
                "Hackathons",
                "NFT",
                "DAO",
              ],
            },
            {
              phase: "Phase 4",
              title: "AI Ecosystem",
              items: [
                "AI Audit",
                "AI Chat",
                "AI Assistant",
                "Marketplace",
              ],
            },
          ].map((road) => (
            <div
              key={road.phase}
              className="rounded-3xl bg-[#0B1124]/70 border border-cyan-500/20 p-7 backdrop-blur-xl hover:border-cyan-400 duration-300"
            >
              <span className="text-cyan-400 font-semibold">
                {road.phase}
              </span>

              <h3 className="text-2xl font-bold mt-3">
                {road.title}
              </h3>

              <ul className="space-y-3 mt-6 text-slate-400">
                {road.items.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </section>

      {/* ================= PARTNERS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-cyan-400">
            PARTNERS
          </p>

          <h2 className="text-4xl font-black mt-3">
            Trusted By
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {[
            "Ethereum",
            "Polygon",
            "BNB",
            "Chainlink",
            "OpenZeppelin",
            "SecureChain",
          ].map((partner) => (
            <div
              key={partner}
              className="rounded-2xl h-28 border border-white/10 bg-[#0B1124]/70 backdrop-blur-xl flex items-center justify-center text-slate-300 hover:border-cyan-400 hover:text-white duration-300"
            >
              {partner}
            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="relative rounded-[32px] overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,.15),transparent_70%)]" />

          <div className="relative py-20 px-10 text-center">

            <h2 className="text-5xl font-black">
              Ready To Build The Future?
            </h2>

            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              Join Secure Chain internships, build blockchain applications,
              publish technical blogs and contribute to the Web3 ecosystem.
            </p>

            <div className="flex justify-center gap-5 mt-10">

              <Link
                to="/interns"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 duration-300"
              >
                Join Internship
              </Link>

              <Link
                to="/projects"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-cyan-400"
              >
                Explore Projects
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>

              <img
                src={logo}
                className="w-14 mb-4"
                alt="Secure Chain"
              />

              <h3 className="font-bold text-2xl">
                Secure Chain
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Empowering the next generation of Web3 developers through
                internships, blockchain projects, technical blogs and AI.
              </p>

            </div>

            <div>

              <h4 className="font-bold mb-5">
                Platform
              </h4>

              <div className="space-y-3 text-slate-400">

                <Link to="/projects">Projects</Link>

                <br />

                <Link to="/blogs">Blogs</Link>

                <br />

                <Link to="/blockchain-explorer">
                  Blockchain Explorer
                </Link>

                <br />

                <Link to="/interns">
                  Interns
                </Link>

              </div>

            </div>

            <div>

              <h4 className="font-bold mb-5">
                Resources
              </h4>

              <div className="space-y-3 text-slate-400">

                <p>Documentation</p>

                <p>API</p>

                <p>Whitepaper</p>

                <p>Support</p>

              </div>

            </div>

            <div>

              <h4 className="font-bold mb-5">
                Newsletter
              </h4>

              <input
                placeholder="Your Email"
                className="w-full h-12 rounded-xl bg-[#121a33] border border-white/10 px-4 outline-none"
              />

              <button className="mt-4 w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
                Subscribe
              </button>

            </div>

          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500">

            <p>
              © 2026 Secure Chain. All Rights Reserved.
            </p>

            <div className="flex gap-6 mt-5 md:mt-0">

              <a href="#">Privacy</a>

              <a href="#">Terms</a>

              <a href="#">Contact</a>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}