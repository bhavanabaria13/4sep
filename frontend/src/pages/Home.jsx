import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { SectionTitle, Skeleton } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";
import GlassCard from "../components/GlassCard.jsx";
import heroCube from "../assets/hero2.png";
import StatsCard from "../components/StatsCard.jsx";
import FeatureSection from "../components/FeatureSection.jsx";

import arbitrum from "../assets/networks-icon/arbitrum.svg";
import AvalancheAvax from "../assets/networks-icon/AvalancheAvax.svg";
import basescan from "../assets/networks-icon/basescan.svg";

//partner image display
import CoinGecko from "../assets/partner-icon/coingercko.png";
import CoinMarketCap from "../assets/partner-icon/coinmarket.png";
import EtherAuthority from "../assets/partner-icon/etherauthority.png";
import hardhat from "../assets/partner-icon/hardhat.png";
import InterFi from "../assets/partner-icon/inter.png";
import metamask from "../assets/partner-icon/metamask.png";
import taffle from "../assets/partner-icon/truffle.png";
import remix from "../assets/partner-icon/remox.png";

import internshipCtaBg from "../assets/internship-cta-banner.avif";

import {
  FileText,
  GraduationCap,
  MessageCircleMore,
} from "lucide-react";

//import { motion } from "framer-motion";
import {
  ArrowRight,
  Youtube,
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
  Search,
  Database,
  Activity,
  CheckCircle2,
  Zap,
  Brain,
  ShieldCheck,
  BriefcaseBusiness,
  Wallet,
  Bot,
  DatabaseBackup,
  Twitter,
  Send,
  Github,
  Facebook,
  ExternalLink,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast & Scalable Blockchain",
    description:
      "Securely scale your DApps with a high-performance blockchain designed for real-world applications.",
  },
  {
    icon: Brain,
    title: "Power of AI",
    description:
      "Combining blockchain and Artificial Intelligence to create a smarter and more secure Web3 ecosystem.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in Security",
    description:
      "AI-based on-chain monitoring helps reduce the risk of scams, hacks and fraudulent activities.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Utility Focussed",
    description:
      "On-chain products and services increase ecosystem utility and create value for stakeholders.",
  },
  {
    icon: Wallet,
    title: "Gasless Transactions",
    description:
      "Users can interact with the platform and create tokens or NFTs without traditional transaction fees.",
  },
  {
    icon: TrendingUp,
    title: "Deflationary",
    description:
      "SCAI coins are burned on transactions, reducing supply and increasing scarcity.",
  },
];

const productsServices = [
  {
    icon: ShieldCheck,
    title: "Smart Contract Audit",
    description:
      "Intensive smart contract auditing to identify security and logical vulnerabilities.",
  },
  {
    icon: Users,
    title: "KYC Verification",
    description:
      "KYC services for blockchain businesses to increase trust while protecting project-owner privacy.",
  },
  {
    icon: Search,
    title: "Due Diligence Service",
    description:
      "Helps investors verify the authenticity, reliability and credibility of crypto projects.",
  },
  {
    icon: Boxes,
    title: "Enterprise Blockchain",
    description:
      "Helps blockchain enterprises launch their own mainnet and improve ecosystem utility.",
  },
  {
    icon: Users,
    title: "Freelance Network",
    description:
      "A talent network connecting blockchain businesses with skilled professionals.",
  },
  {
    icon: Wallet,
    title: "Escrow Service",
    description:
      "Smart-contract based escrow providing a safer environment for decentralized transactions.",
  },
  {
    icon: Bot,
    title: "AI-based Forensics",
    description:
      "Helps trace hackers and investigate crypto attacks and lost funds.",
  },
  {
    icon: DatabaseBackup,
    title: "Blacklist Database",
    description:
      "A database of scam wallets and domains that can help DApps prevent risky interactions.",
  },
];

const secureChainRoadmap = [
  {
    quarter: "Foundation",
    title: "Laying Foundation",
    items: [
      "Team formation",
      "Website launch",
      "Community building",
      "Press release",
    ],
  },
  {
    quarter: "Initial Launch",
    title: "Initial Launch",
    items: [
      "TestNet launch",
      "Paid marketing",
      "Fair launch",
      "CMC & CoinGecko listing",
      "MainNet launch",
    ],
  },
  {
    quarter: "Marketing & Integration",
    title: "Marketing and Integration",
    items: [
      "Aggressive marketing",
      "Cross-Chain Bridge",
      "DEX",
      "Staking",
    ],
  },
  {
    quarter: "Product Development",
    title: "Product Development",
    items: [
      "Web Wallet",
      "DeFi projects",
      "NFT Marketplace",
      "AI-based Crypto Forensics",
      "On-chain Audit Beta",
    ],
  },
  {
    quarter: "Advanced Products",
    title: "Product Development",
    items: [
      "AI-based Crypto Forensics Final Launch",
      "On-chain Audit",
      "Blacklist Database",
      "On-chain KYC",
      "Payment Gateway Beta",
      "Hackathon and events",
    ],
  },
  {
    quarter: "Partnerships",
    title: "Marketing / Partnerships",
    items: [
      "Partnerships",
      "Influencer marketing",
      "More DApps building",
    ],
  },
];


function DiscordIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.54 5.02A16.84 16.84 0 0 0 15.6 3.8a11.6 11.6 0 0 0-.5 1.02 15.6 15.6 0 0 0-4.2 0 11.6 11.6 0 0 0-.5-1.02 16.84 16.84 0 0 0-3.94 1.22C3.97 8.94 3.3 12.77 3.64 16.55a16.7 16.7 0 0 0 4.86 2.45c.4-.55.76-1.14 1.07-1.76-.59-.22-1.16-.5-1.7-.82.14-.1.28-.2.41-.31 3.28 1.53 7.04 1.53 10.28 0 .14.11.27.21.41.31-.54.32-1.11.6-1.7.82.31.62.67 1.21 1.07 1.76a16.7 16.7 0 0 0 4.86-2.45c.4-4.38-.68-8.18-3.66-11.53ZM9.18 14.75c-.98 0-1.79-.9-1.79-2.01s.79-2.02 1.79-2.02c1 0 1.8.91 1.79 2.02 0 1.11-.79 2.01-1.79 2.01Zm5.64 0c-.98 0-1.79-.9-1.79-2.01s.79-2.02 1.79-2.02c1 0 1.8.91 1.79 2.02 0 1.11-.79 2.01-1.79 2.01Z" />
    </svg>
  );
}



const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/SecureChainAI",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/SecureChainAI",
  },
  {
    name: "Discord",
    icon: DiscordIcon,
    url: "https://discord.gg/jVUUtzRAvQ",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/securechainai",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/SecureChainAI/",
  },
   {
    name: "Youtube",
    icon: Youtube,
    url: "https://www.youtube.com/@SecureChainAI",
  },
];

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
  const [explorerStats, setExplorerStats] = useState(null);
const [explorerStatsLoading, setExplorerStatsLoading] = useState(true);

const totalProjects =
  Number(stats?.approvedGames || 0) +
  Number(stats?.approvedDapps || 0);

const totalBlogs = Number(stats?.publishedBlogs || 0);
const totalViews = Number(stats?.totalViews || 0);

  // Blockchain explorer controls
  const [explorerQuery, setExplorerQuery] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("All Networks");
  const [explorerError, setExplorerError] = useState("");

  const explorerUrls = {
    "All Networks": "https://etherscan.io/search?f=0&q=",
    Ethereum: "https://etherscan.io/search?f=0&q=",
    Sepolia: "https://sepolia.etherscan.io/search?f=0&q=",
    Polygon: "https://polygonscan.com/search?f=0&q=",
    "BNB Chain": "https://bscscan.com/search?f=0&q=",
    Base: "https://basescan.org/search?f=0&q=",
    Arbitrum: "https://arbiscan.io/search?f=0&q=",
    Optimism: "https://optimistic.etherscan.io/search?f=0&q=",
    Avalanche: "https://snowtrace.io/search?search=",
  };

  const handleExplorerSearch = () => {
    const query = explorerQuery.trim();

    if (!query) {
      setExplorerError("Please enter a transaction hash, address, block or token.");
      return;
    }

    setExplorerError("");
    const baseUrl = explorerUrls[selectedNetwork] || explorerUrls["All Networks"];
    window.open(`${baseUrl}${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  };

  const handleExplorerKeyDown = (event) => {
    if (event.key === "Enter") {
      handleExplorerSearch();
    }
  };


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
   const loadExplorerStats = async () => {
    try {
      const response = await fetch(
        "https://explorer.securechain.ai/api/v2/stats"
      );

      if (!response.ok) {
        throw new Error("Failed to load explorer stats");
      }

      const data = await response.json();

      console.log("Explorer Stats:", data);

      setExplorerStats(data);
    } catch (error) {
      console.error("Explorer Stats Error:", error);
      setExplorerStats(null);
    } finally {
      setExplorerStatsLoading(false);
    }
  };

  loadExplorerStats();
}, []);


function NetworkButton({ icon, name }) {
  return (
    <button
      type="button"
      onClick={() => setSelectedNetwork(name)}
      className="
        group
        flex items-center gap-2
        px-4 py-2.5
        rounded-lg
        border border-white/10
        bg-[#0a0d24]
        text-sm text-slate-300
        hover:border-cyan-400/60
        hover:bg-[#10163a]
        hover:text-white
        transition-all duration-200
        whitespace-nowrap
      "
    >
      <span
        className="
          flex items-center justify-center
          w-5 h-5
          rounded-full
          bg-black/30
          shrink-0
        "
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={name}
            className="w-4 h-4 object-contain group-hover:scale-110 transition-transform"
          />
        ) : (
          icon
        )}
      </span>

      <span>{name}</span>
    </button>
  );
}

const partners = [
  {
    name: "InterFi",
    icon: InterFi,
  },
  {
    name: "EtherAuthority",
    icon: EtherAuthority,
  },
  {
    name: "CoinMarketCap",
    icon: CoinMarketCap,
  },
  {
    name: "CoinGecko",
    icon: CoinGecko,
  },
  {
    name: "MetaMask",
    icon: metamask,
  },
  {
    name: "Remix",
    icon: remix,
  },
  {
    name: "Hardhat",
    icon: hardhat,
  },
  {
    name: "Truffle",
    icon: taffle,
  },
];

// ADD THESE
function ExplorerStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-purple-500/10 border border-purple-500/20">
        <Icon size={19} className="text-cyan-400" />
      </div>

      <div>
        <p className="text-[11px] text-slate-500">
          {label}
        </p>

        <p className="text-sm font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function SolutionItem({ icon: Icon, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        flex
        flex-col
        items-center
        justify-center
        text-center
        min-h-[125px]
        px-3
        group
      "
    >

      {/* Vertical separator */}
      <div
        className="
          absolute
          right-0
          top-3
          bottom-3
          w-px
          bg-white/10
          hidden
          lg:block
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          w-12
          h-12
          mb-3
        "
      >
        <Icon
          className="
            w-10
            h-10
            text-cyan-400
            stroke-[1.4]
            group-hover:text-blue-400
            group-hover:scale-110
            transition-all
            duration-300
            drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]
          "
        />
      </div>

      {/* Title */}
      <h3
        className="
          text-[11px]
          md:text-xs
          font-semibold
          leading-4
          text-white
          group-hover:text-cyan-300
          transition-colors
        "
      >
        {title}
      </h3>

    </motion.div>
  );
}

function RoadmapCard({ quarter, title, items }) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-[#080B20] p-5 pt-7 hover:border-cyan-400/40 transition">

      <div className="absolute -top-2 left-5 h-4 w-4 rounded-full bg-[#080B20] border-2 border-cyan-400" />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold">
        <CheckCircle2 size={13} />
        {quarter}
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">
        {title}
      </h3>

      <ul className="mt-4 space-y-2 text-xs text-slate-400">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-cyan-400">•</span>
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}
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
              AI + BLOCKCHAIN FOR A SECURE FUTURE
            </p>

            <h1 className="mt-6 text-6xl lg:text-7xl font-black leading-tight">

             Building the Future

              <br />

              of Web3 with 

              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI & Blockchain
              </span>

            </h1>

            <p className="mt-8 text-slate-400 text-lg leading-8 max-w-xl">
              Secure, scalable and innovative decentralized applications powered by the SecureChain AI ecosystem.
            </p>

            <div className="mt-10 flex gap-5">

              <Link to="/games"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold flex items-center gap-2 hover:scale-105 duration-300"
              >
                Explore Intern Projects
                <ArrowRight size={18} />
              </Link>

              <Link to="https://explorer.securechain.ai/"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-cyan-400"
              >
                Explore SecureChain
              </Link>

            </div>

      
          </motion.div>

          {/* RIGHT */}

         <div className="relative">

    <img
        src={heroCube}
        className="w-full"
        alt=""
    />

</div>
        </div>

      </section>
	  
	  
<section className="max-w-7xl mx-auto px-6 " style={{ margin: "43px 36px"}}>
      {/* Stats */}

           <div 
  className="
    w-full
    max-w-6xl
    mx-auto
    mt-14
    rounded-3xl
    bg-[#090B18]
    border border-white/5
    backdrop-blur-xl
    shadow-[0_0_40px_rgba(0,0,0,.35)]
  "
>
  <div className="grid grid-cols-2 md:grid-cols-5">

    {/* Projects = Games + dApps */}
    <StatsCard
      icon={FolderGit2}
      value={`${totalProjects}+`}
      title="Projects"
    />

    {/* Interns */}
    <StatsCard
      icon={Users}
      value="85+"
      title="Interns"
    />

    {/* Blogs */}
    <StatsCard
      icon={BookOpen}
      value={`${totalBlogs}+`}
      title="Blogs"
    />

    {/* Networks */}
    <StatsCard
      icon={Globe}
      value="10+"
      title="Networks"
    />

    {/* Transactions = Views */}
    <StatsCard
      icon={TrendingUp}
      value={kFmt(totalViews)}
      title="Transactions"
    />

  </div>
</div>
      </section>
	  
	  
	  {/* ================= TOP FEATURES ================= */}
<section className="container mx-auto px-4 md:px-8 mb-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        group relative
        min-h-[135px]
        rounded-xl
        border border-white/15
        bg-[#050914]
        px-5 py-4
        flex items-center gap-5
        overflow-hidden
        hover:border-cyan-400/60
        transition-all duration-300
      "
    >
      <div className="
        shrink-0
        w-20 h-20
        flex items-center justify-center
        rounded-xl
        bg-cyan-400/5
      ">
        <ShieldCheck
          className="
            w-16 h-16
            text-cyan-400
            drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
          "
        />
      </div>

      <div>
        <h3 className="text-base md:text-lg font-bold text-white">
          AI-Powered Security
        </h3>

        <p className="mt-2 text-[11px] md:text-xs leading-5 text-slate-300">
          Intelligent Security Engine detects vulnerabilities,
          fraud and threats in real-time using AI & ML.
        </p>

        <a
          href="https://securechain.ai/"
          className="
            inline-flex items-center gap-1
            mt-3
            text-[11px]
            font-semibold
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Learn more →
        </a>
      </div>
    </motion.div>


    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="
        group relative
        min-h-[135px]
        rounded-xl
        border border-white/15
        bg-[#050914]
        px-5 py-4
        flex items-center gap-5
        overflow-hidden
        hover:border-cyan-400/60
        transition-all duration-300
      "
    >
      <div className="
        shrink-0
        w-20 h-20
        flex items-center justify-center
        rounded-xl
        bg-cyan-400/5
      ">
        <Boxes
          className="
            w-16 h-16
            text-cyan-400
            drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
          "
        />
      </div>

      <div>
        <h3 className="text-base md:text-lg font-bold text-white">
          Fast & Scalable Blockchain
        </h3>

        <p className="mt-2 text-[11px] md:text-xs leading-5 text-slate-300">
          High performance, low latency and scalable
          infrastructure for the next generation DApps.
        </p>

        <a
          href="https://securechain.ai/"
          className="
            inline-flex items-center gap-1
            mt-3
            text-[11px]
            font-semibold
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Learn more →
        </a>
      </div>
    </motion.div>


    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="
        group relative
        min-h-[135px]
        rounded-xl
        border border-white/15
        bg-[#050914]
        px-5 py-4
        flex items-center gap-5
        overflow-hidden
        hover:border-cyan-400/60
        transition-all duration-300
      "
    >
      <div className="
        shrink-0
        w-20 h-20
        flex items-center justify-center
        rounded-xl
        bg-cyan-400/5
      ">
        <Zap
          className="
            w-16 h-16
            text-cyan-400
            drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
          "
        />
      </div>

      <div>
        <h3 className="text-base md:text-lg font-bold text-white">
          Gasless Transactions
        </h3>

        <p className="mt-2 text-[11px] md:text-xs leading-5 text-slate-300">
          Enjoy seamless Web3 experience with gasless
          and user-friendly transactions.
        </p>

        <a
          href="https://securechain.ai/"
          className="
            inline-flex items-center gap-1
            mt-3
            text-[11px]
            font-semibold
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Learn more →
        </a>
      </div>
    </motion.div>

  </div>
</section>
{/* ================= SECURECHAIN SOLUTIONS ================= */}
<section className="container mx-auto px-4 md:px-8 mb-20">

  <div className="relative">

    {/* Section border */}
    <div
      className="
        relative
        rounded-xl
        border border-white/20
        bg-[#050914]
        px-4
        md:px-6
        pt-8
        pb-5
      "
    >

      {/* Title on border */}
      <div
        className="
          absolute
          -top-5
          left-1/2
          -translate-x-1/2
          px-5
          bg-[#050914]
          whitespace-nowrap
        "
      >
        <h2 className="text-xl md:text-2xl font-black text-white">
          SecureChain Solutions
        </h2>
      </div>


      {/* Services */}
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-4
        lg:grid-cols-8
      ">

        {/* Smart Contract Audit */}
        <SolutionItem
          icon={ShieldCheck}
          title={
            <>
              Smart Contract
              <br />
              Audit
            </>
          }
        />

        {/* KYC */}
        <SolutionItem
          icon={Users}
          title={
            <>
              KYC
              <br />
              Verification
            </>
          }
        />

        {/* Due Diligence */}
        <SolutionItem
          icon={FileText}
          title={
            <>
              Due
              <br />
              Diligence
            </>
          }
        />

        {/* Enterprise */}
        <SolutionItem
          icon={Boxes}
          title={
            <>
              Enterprise
              <br />
              Blockchain
            </>
          }
        />

        {/* Freelance */}
        <SolutionItem
          icon={Users}
          title={
            <>
              Freelance
              <br />
              Network
            </>
          }
        />

        {/* Escrow */}
        <SolutionItem
          icon={Shield}
          title={
            <>
              Escrow
              <br />
              Service
            </>
          }
        />

        {/* AI Forensics */}
        <SolutionItem
          icon={Bot}
          title={
            <>
              AI-based
              <br />
              Forensics
            </>
          }
        />

        {/* Blacklist */}
        <SolutionItem
          icon={Database}
          title={
            <>
              Blacklist
              <br />
              Database
            </>
          }
        />

      </div>

    </div>

  </div>

</section>
	     {/* Latest Games */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
	  <div className="text-center mb-10">
    <div className="relative z-10 text-center mb-5 md:mb-6">

      <h2
        className="
          text-2xl
          md:text-3xl
          lg:text-4xl
          font-black
          tracking-tight
          text-white
        "
      >
        Featured Projects{" "}
        <span
          className="
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            bg-clip-text
            text-transparent
          "
        >
          by EtherAuthority Interns
        </span>
      </h2>

    </div>

    <p className="mt-4 max-w-2xl mx-auto text-slate-400">
      Real Projects. Real impact. Build by the next generation of the Web3 Builders.
    </p>
  </div>
        <SectionTitle
          title="Latest Games"
          action={
            <Link to="/games" data-testid="home-view-all-games" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All Projects <ArrowRight className="h-4 w-4" />
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
              View All Projects <ArrowRight className="h-4 w-4" />
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
 
	  {/* ================= WHY SECURECHAIN ================= */}
<section className="container mx-auto px-4 md:px-8 mb-16">

  <div
    className="
      relative
      rounded-xl
      border border-white/15
      bg-[#050914]
      px-5
      md:px-7
      py-5
      md:py-6
      overflow-hidden
    "
  >

    {/* Subtle background glow */}
    <div
      className="
        absolute
        inset-0
        pointer-events-none
        opacity-20
        bg-[radial-gradient(circle_at_center,#1645ff_0%,transparent_65%)]
      "
    />

    {/* Heading */}
    <div className="relative z-10 text-center mb-5 md:mb-6">

      <h2
        className="
          text-2xl
          md:text-3xl
          lg:text-4xl
          font-black
          tracking-tight
          text-white
        "
      >
        Why{" "}
        <span
          className="
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            bg-clip-text
            text-transparent
          "
        >
          SecureChain?
        </span>
      </h2>

    </div>


    {/* Features */}
    <div
      className="
        relative
        z-10
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >

      {/* ================= SECURITY ================= */}
      <div
        className="
          group
          flex
          items-center
          gap-4
          px-4
          py-4
          lg:border-r
          border-white/10
        "
      >

        {/* Icon */}
        <div
          className="
            shrink-0
            w-14
            h-14
            flex
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/5
          "
        >
          <ShieldCheck
            className="
              w-11
              h-11
              text-cyan-400
              stroke-[1.4]
              drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
              group-hover:scale-110
              transition-transform
            "
          />
        </div>

        {/* Content */}
        <div>
          <h3
            className="
              text-sm
              md:text-base
              font-bold
              text-white
            "
          >
            Security First
          </h3>

          <p
            className="
              mt-1
              text-[9px]
              md:text-[10px]
              leading-4
              text-slate-400
            "
          >
            AI-driven security audits, real-time threat
            detection and formally verified smart contracts
            create a safe Web3 environment.
          </p>
        </div>

      </div>


      {/* ================= SCALABLE ================= */}
      <div
        className="
          group
          flex
          items-center
          gap-4
          px-4
          py-4
          lg:border-r
          border-white/10
        "
      >

        {/* Icon */}
        <div
          className="
            shrink-0
            w-14
            h-14
            flex
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/5
          "
        >
          <Boxes
            className="
              w-11
              h-11
              text-cyan-400
              stroke-[1.4]
              drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
              group-hover:scale-110
              transition-transform
            "
          />
        </div>

        {/* Content */}
        <div>
          <h3
            className="
              text-sm
              md:text-base
              font-bold
              text-white
            "
          >
            Scalable & Fast
          </h3>

          <p
            className="
              mt-1
              text-[9px]
              md:text-[10px]
              leading-4
              text-slate-400
            "
          >
            Built for mass adoption with high-throughput,
            low-latency and multi-chain interoperability.
          </p>
        </div>

      </div>


      {/* ================= AI INNOVATION ================= */}
      <div
        className="
          group
          flex
          items-center
          gap-4
          px-4
          py-4
          lg:border-r
          border-white/10
        "
      >

        {/* Icon */}
        <div
          className="
            shrink-0
            w-14
            h-14
            flex
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/5
          "
        >
          <Brain
            className="
              w-11
              h-11
              text-cyan-400
              stroke-[1.4]
              drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
              group-hover:scale-110
              transition-transform
            "
          />
        </div>

        {/* Content */}
        <div>
          <h3
            className="
              text-sm
              md:text-base
              font-bold
              text-white
            "
          >
            AI Innovation
          </h3>

          <p
            className="
              mt-1
              text-[9px]
              md:text-[10px]
              leading-4
              text-slate-400
            "
          >
            Leverage AI for smart analytics, fraud detection,
            contract analysis and on-chain forensics.
          </p>
        </div>

      </div>


      {/* ================= DEVELOPER ================= */}
      <div
        className="
          group
          flex
          items-center
          gap-4
          px-4
          py-4
        "
      >

        {/* Icon */}
        <div
          className="
            shrink-0
            w-14
            h-14
            flex
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/5
          "
        >
          <FolderGit2
            className="
              w-11
              h-11
              text-cyan-400
              stroke-[1.4]
              drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
              group-hover:scale-110
              transition-transform
            "
          />
        </div>

        {/* Content */}
        <div>
          <h3
            className="
              text-sm
              md:text-base
              font-bold
              text-white
            "
          >
            Developer Ecosystem
          </h3>

          <p
            className="
              mt-1
              text-[9px]
              md:text-[10px]
              leading-4
              text-slate-400
            "
          >
            Powerful tools, dApps and a vibrant community
            to build the future of Web3 on SecureChain.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
      {/* Latest Blogs */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
	    <div className="text-left mb-5">
        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#0a8bf1", fontSize: "30px" }}>
            LATEST BLOGS
        </h2>
    </div>
        <SectionTitle
          title="Insights & Knowledge"
          action={
            <Link to="/blog" data-testid="home-view-all-blogs" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All BLOGS <ArrowRight className="h-4 w-4" />
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
            {blogs.slice(0, 3).map((b, i) => (
              <BlogCard key={b.id} item={b} index={i} />
            ))}
          </div>
        )}
      </section>
	  
	  {/* ================= BUILD • LEARN • INNOVATE CTA ================= */}

{/* ================= SOCIAL COMMUNITY ================= */}
<section className="container mx-auto px-4 md:px-8 mb-20">

  <div
    className="
      rounded-3xl
      border border-white/10
      bg-[#080b20]
      p-8 md:p-10
      text-center
    "
  >

    <p className="uppercase tracking-[5px] text-cyan-400 text-xs font-bold">
      COMMUNITY
    </p>

    <h2 className="mt-3 text-3xl font-black text-white">
      Connect With SecureChain
    </h2>

    <p className="mt-3 text-slate-400 max-w-xl mx-auto">
      Follow our ecosystem, development updates and Web3 community.
    </p>

    <div className="mt-7 flex flex-wrap justify-center gap-3">

      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              px-5 py-3
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              text-slate-300
              hover:text-white
              hover:border-cyan-400/50
              hover:bg-cyan-400/10
              transition
            "
          >
            <Icon size={18} />
            <span>{social.name}</span>
            <ExternalLink size={13} />
          </a>
        );
      })}

    </div>

  </div>

</section>


	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  

{/* ================= BLOCKCHAIN EXPLORER ================= */}
<section className="container mx-auto px-4 md:px-8 mb-16">

  {/* Explorer */}
  <div className="relative overflow-hidden">

    {/* Background map / glow */}
    <div className="absolute right-0 top-0 w-[55%] h-[260px] opacity-20 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1746ff_0%,transparent_65%)]" />

      <div
        className="
          absolute inset-0
          opacity-40
          bg-[linear-gradient(90deg,transparent_49%,#1645ff_50%,transparent_51%),
          linear-gradient(0deg,transparent_49%,#1645ff_50%,transparent_51%)]
          bg-[length:40px_40px]
        "
      />
    </div>


    {/* Heading */}
    <div className="relative z-10 mb-8">

  <p className="
    uppercase
    tracking-[5px]
    text-cyan-400
    text-[11px]
    md:text-xs
    font-bold
  ">
    BLOCKCHAIN EXPLORER
  </p>

  <h2 className="
    mt-2
    text-3xl
    md:text-4xl
    lg:text-[42px]
    font-black
    tracking-tight
    text-white
  ">
    Explore Blockchain Data
  </h2>

</div>

    <div className="
      relative
      z-10
      grid
      lg:grid-cols-[1fr_260px]
      gap-6
    ">

      {/* ================= LEFT ================= */}
      <div>

        {/* Search box */}
       <div
  className="
    flex
    flex-col
    lg:flex-row
    gap-2
    p-2
    rounded-xl
    bg-[#080b20]
    border border-white/10
    shadow-[0_0_40px_rgba(0,100,255,0.08)]
  "
>

  {/* Search Input */}
  <div
    className="
      flex
      items-center
      gap-3
      flex-1
      min-h-[48px]
      px-4
    "
  >

    <Search
      size={20}
      className="text-slate-400 shrink-0"
    />

    <input
      type="text"
      value={explorerQuery}
      onChange={(event) => {
        setExplorerQuery(event.target.value);
        setExplorerError("");
      }}
      onKeyDown={handleExplorerKeyDown}
      placeholder="Search by Transaction Hash, Address, Block or Token..."
      className="
        w-full
        bg-transparent
        outline-none
        text-sm
        text-white
        placeholder:text-slate-500
      "
    />

  </div>


  {/* Network */}
  <select
    value={selectedNetwork}
    onChange={(event) => {
      setSelectedNetwork(event.target.value);
      setExplorerError("");
    }}
    className="
      lg:w-[150px]
      min-h-[48px]
      bg-[#10142e]
      border border-white/10
      rounded-lg
      px-4
      text-sm
      text-slate-300
      outline-none
      cursor-pointer
    "
  >
    <option>All Networks</option>
    <option>Ethereum</option>
    <option>Sepolia</option>
    <option>Polygon</option>
    <option>BNB Chain</option>
    <option>Base</option>
    <option>Arbitrum</option>
    <option>Optimism</option>
    <option>Avalanche</option>
  </select>


  {/* Search */}
  <button
    type="button"
    onClick={handleExplorerSearch}
    className="
      min-h-[48px]
      px-8
      rounded-lg
      font-bold
      text-white
      bg-gradient-to-r
      from-purple-600
      via-blue-500
      to-cyan-500
      hover:shadow-[0_0_25px_rgba(0,200,255,0.35)]
      hover:scale-[1.02]
      transition
    "
  >
    Search
  </button>

</div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-xs text-slate-500">Selected network: <span className="text-cyan-300 font-semibold">{selectedNetwork}</span></p>
          {explorerError && (
            <p className="text-xs text-red-400">{explorerError}</p>
          )}
        </div>

        {/* Popular networks */}
        <div className="mt-6">

  <p className="
    text-xs
    text-slate-400
    mb-3
    font-medium
  ">
    Popular Networks
  </p>

  <div className="flex flex-wrap gap-2.5">

  <NetworkButton
  name="Ethereum"
  icon="https://cdn.simpleicons.org/ethereum/627EEA"
/>

<NetworkButton
  name="Sepolia"
  icon="https://cdn.simpleicons.org/ethereum/8B5CF6"
/>

<NetworkButton
  name="Polygon"
  icon="https://cdn.simpleicons.org/polygon/8247E5"
/>

<NetworkButton
  name="BNB Chain"
  icon="https://cdn.simpleicons.org/bnbchain/F3BA2F"
/>

<NetworkButton
  name="Base"
  icon={<img src={basescan} alt="Base" className="w-4 h-4 object-contain" />}
/>

<NetworkButton
  name="Arbitrum"
  icon={<img src={arbitrum} alt="Arbitrum" className="w-4 h-4 object-contain" />}
/>

<NetworkButton
  name="Avalanche"
  icon={
    <img
      src={AvalancheAvax}
      alt="Avalanche"
      className="w-4 h-4 object-contain"
    />
  }
/>

<NetworkButton
  name="Optimism"
  icon="https://cdn.simpleicons.org/optimism/FF0420"
/>

  </div>
</div>

</div>
      {/* ================= STATS ================= */}
     <div
  className="
    rounded-2xl
    border border-white/10
    bg-[#090b20]
    p-5
    space-y-5
    shadow-[0_0_35px_rgba(50,50,255,0.08)]
  "
>

  <ExplorerStat
  icon={Database}
  label="Total Blocks"
  value={
    explorerStatsLoading
      ? "Loading..."
      : Number(explorerStats?.total_blocks || 0).toLocaleString()
  }
/>

<ExplorerStat
  icon={Activity}
  label="Total Transactions"
  value={
    explorerStatsLoading
      ? "Loading..."
      : Number(explorerStats?.total_transactions || 0).toLocaleString()
  }
/>

<ExplorerStat
  icon={Users}
  label="Active Addresses"
  value={
    explorerStatsLoading
      ? "Loading..."
      : Number(explorerStats?.total_addresses || 0).toLocaleString()
  }
/>

<ExplorerStat
  icon={TrendingUp}
  label="Gas Price (Avg)"
  value={
    explorerStatsLoading
      ? "Loading..."
      : `${explorerStats?.gas_prices?.average ?? 0} Gwei`
  }
/>
</div>
    </div>

  </div>


  {/* ================================================= */}
  {/* ROADMAP */}
  {/* ================================================= */}

  <div className="relative mt-10">

    {/* background dots */}
    <div className="
      absolute
      inset-0
      opacity-20
      pointer-events-none
      bg-[radial-gradient(circle,#00eaff_1px,transparent_1px)]
      bg-[size:35px_35px]
    " />


    <div className="relative z-10">

     



      {/* Timeline */}
      <div className="
        hidden
        md:block
        relative
        h-[2px]
        mt-7
        mb-3
        bg-gradient-to-r
        from-cyan-400
        via-purple-500
        to-cyan-400
      " />


     {/* ================= ROADMAP ================= */}

{/* ================= ROADMAP ================= */}
<section className="container mx-auto px-4 md:px-8 mb-20">

  {/* Header */}
  <div className="mb-8">

    <p className="uppercase tracking-[4px] text-cyan-400 text-xs font-bold">
      ROADMAP
    </p>

    <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">
      Our Journey to{" "}
      <span className="text-purple-400">
        Transform Web3
      </span>
    </h2>

  </div>

  {/* Timeline */}
  <div className="relative">

    {/* Line */}
    <div
      className="
        absolute
        top-[8px]
        left-0
        right-0
        h-[2px]
        bg-gradient-to-r
        from-cyan-400
        via-purple-500
        to-cyan-400
      "
    />

    {/* ALL 6 CARDS - ONE LINE */}
    <div
      className="
        relative
        grid
        grid-cols-6
        gap-2
        pt-5
      "
    >

      {secureChainRoadmap.map((item, index) => (
        <motion.div
          key={`${item.title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="relative min-w-0"
        >

          {/* Timeline Dot */}
          <div
            className="
              absolute
              -top-[13px]
              left-4
              z-20
              w-3.5
              h-3.5
              rounded-full
              bg-[#080b20]
              border-2
              border-cyan-400
              shadow-[0_0_8px_rgba(34,211,238,0.5)]
            "
          />

          <RoadmapCard
            quarter={item.quarter}
            title={item.title}
            items={item.items}
          />

        </motion.div>
      ))}

    </div>

  </div>

</section>
</div>

  </div>


  {/* ================================================= */}
  {/* JOIN THE JOURNEY */}
  {/* ================================================= */}

  <div className="
    mt-7
    grid
    lg:grid-cols-[1fr_230px]
    gap-5
  ">

    {/* Partners */}
    <div>

      <p className="
        uppercase
        tracking-[4px]
        text-cyan-400
        text-xs
        font-bold
        mb-4
      ">
        PARTNERS & BACKERS
      </p>


      <div className="
  grid
  grid-cols-2
  md:grid-cols-4
  lg:grid-cols-4
  gap-3
">

 {partners.map((partner) => (
  <div
    key={partner.name}
    className="
     
    "
  >
    <img
      src={partner.icon}
      alt={partner.name}
      className=""
    />

    
  </div>
))}
</div>

    </div>


    {/* Join card */}
    <div className="
      relative
      overflow-hidden
      rounded-2xl
      border border-purple-500/30
      bg-gradient-to-br
      from-purple-900/30
      via-[#090b20]
      to-cyan-900/20
      p-5
    ">

     <div
  className="
    absolute
    right-4
    text-[80px]
    opacity-20
    pointer-events-none
    select-none
  "
>
  🚀
</div>


      <h3 className="
        relative
        text-lg
        font-bold
      ">
        Join the Journey
      </h3>


      <p className="
        relative
        mt-2
        text-xs
        leading-5
        text-slate-400
      ">
        Be a part of the movement building a secure
        and decentralized future.
      </p>


      <Link
        to="https://internship.etherauthority.io/"
        className="
          relative
          inline-flex
          mt-4
          px-4
          py-2
          rounded-lg
          bg-gradient-to-r
          from-purple-600
          to-cyan-500
          text-xs
          font-semibold
          hover:scale-105
          transition
        "
      >
        Become an Intern
      </Link>

    </div>

  </div>

</section>
      {/* CTA */}
     {/* ================= BUILD • LEARN • INNOVATE ================= */}
<section className="container mx-auto px-4 md:px-8 mb-16">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="
      group
      relative
      overflow-hidden
      min-h-[220px]
      md:min-h-[250px]
      rounded-2xl
      border
      border-blue-400/30
      shadow-[0_0_50px_rgba(37,99,235,0.18)]
    "
  >
    {/* Background Image */}
    <img
      src={internshipCtaBg}
      alt="Build Learn Innovate"
      className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        object-center
        transition-transform
        duration-700
        group-hover:scale-[1.02]
      "
    />

    {/* Dark overlay for readability */}
    <div
      className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#09001f]/80
        via-[#080b35]/50
        to-transparent
      "
    />

    {/* Additional glow */}
    <div
      className="
        absolute
        -left-20
        top-1/2
        -translate-y-1/2
        w-72
        h-72
        rounded-full
        bg-purple-600/20
        blur-3xl
        pointer-events-none
      "
    />

    {/* Content */}
    <div
      className="
        relative
        z-10
        flex
        min-h-[220px]
        md:min-h-[250px]
        items-center
        justify-between
        gap-8
        px-6
        py-8
        md:px-10
        lg:px-12
      "
    >
      {/* Left Content */}
      <div className="max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            tracking-tight
            text-white
          "
        >
          Build. Learn.{" "}
          <span
            className="
              bg-gradient-to-r
              from-blue-300
              via-cyan-300
              to-blue-400
              bg-clip-text
              text-transparent
            "
          >
            Innovate.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="
            mt-3
            max-w-xl
            text-sm
            md:text-base
            leading-6
            text-white/80
          "
        >
          Join EtherAuthority's Web3+AI Internship Program and build
          real-world projects on SecureChain.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="
            mt-1
            text-sm
            md:text-base
            font-semibold
            bg-gradient-to-r
            from-purple-300
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          Learn. Build. Launch your Web3 career.
        </motion.p>
      </div>

      {/* Button */}
      <motion.a
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5 }}
        href="https://internship.etherauthority.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group/btn
          hidden
          sm:inline-flex
          shrink-0
          items-center
          gap-3
          rounded-xl
          border
          border-white/20
          bg-gradient-to-r
          from-purple-600
          to-blue-500
          px-6
          md:px-8
          py-3.5
          md:py-4
          text-sm
          md:text-base
          font-bold
          text-white
          shadow-[0_0_30px_rgba(79,70,229,0.35)]
          transition-all
          duration-300
          hover:scale-105
          hover:from-purple-500
          hover:to-cyan-500
          hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
        "
      >
        Join Internship Program

        <ArrowRight
          size={20}
          className="
            transition-transform
            duration-300
            group-hover/btn:translate-x-1
          "
        />
      </motion.a>
    </div>

    {/* Mobile Button */}
    <div className="relative z-20 px-6 pb-7 sm:hidden">
      <a
        href="https://internship.etherauthority.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/20
          bg-gradient-to-r
          from-purple-600
          to-blue-500
          px-5
          py-3
          text-sm
          font-bold
          text-white
          shadow-lg
        "
      >
        Join Internship Program
        <ArrowRight size={18} />
      </a>
    </div>
  </motion.div>
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