import { useSEO } from "../hooks/useSEO.js";
import {
  Rocket,
  Users,
  ShieldCheck,
  Sparkles,
  BrainCircuit,
  Code2,
  Blocks,
  Globe2,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  useSEO({
    title: "About Us",
    description:
      "Learn about SecureChain and EtherAuthority Interns, a Web3-focused ecosystem building secure, scalable and innovative blockchain applications.",
  });

  const stats = [
    { value: "12+", label: "Projects", icon: Blocks },
    { value: "85+", label: "Interns", icon: Users },
    { value: "6+", label: "Blogs", icon: Code2 },
    { value: "10+", label: "Networks", icon: Globe2 },
  ];

  const values = [
    {
      icon: Rocket,
      title: "Innovation",
      text: "We experiment with emerging blockchain technologies and turn ambitious ideas into practical Web3 products.",
    },
    {
      icon: Users,
      title: "Community",
      text: "We create an environment where interns, mentors and developers learn, collaborate and build together.",
    },
    {
      icon: ShieldCheck,
      title: "Security First",
      text: "Security is built into every stage of our development process, from smart contracts to user experience.",
    },
    {
      icon: Sparkles,
      title: "Craft",
      text: "We care about the details that make decentralized applications intuitive, reliable and enjoyable.",
    },
  ];

  const capabilities = [
    {
      icon: BrainCircuit,
      title: "AI + Blockchain",
      text: "Exploring intelligent decentralized applications powered by AI and blockchain technology.",
    },
    {
      icon: Blocks,
      title: "Web3 Products",
      text: "Building dApps, decentralized games, DAO tools, NFT platforms and blockchain utilities.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Development",
      text: "Following security-focused engineering practices for smart contracts and decentralized systems.",
    },
    {
      icon: Globe2,
      title: "Multi-Chain",
      text: "Working across modern blockchain networks and exploring new decentralized ecosystems.",
    },
  ];

  const journey = [
    {
      number: "01",
      title: "Learn",
      text: "Interns learn blockchain fundamentals, development tools and security practices.",
    },
    {
      number: "02",
      title: "Build",
      text: "Teams transform ideas into working Web3 applications and decentralized experiences.",
    },
    {
      number: "03",
      title: "Validate",
      text: "Projects are tested, reviewed and improved with guidance from experienced mentors.",
    },
    {
      number: "04",
      title: "Launch",
      text: "The strongest projects move toward real users, real networks and real-world impact.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-28 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute top-40 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-px w-8 bg-cyan-400" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan-400 font-bold">
                  About SecureChain
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95]">
                Building the
                <br />
                <span className="text-white">Future of </span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Web3
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-7 text-slate-400">
                SecureChain is a Web3-focused ecosystem where young builders,
                developers and mentors come together to create secure,
                scalable and innovative blockchain applications.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                From decentralized applications and blockchain games to
                AI-powered Web3 experiences, our mission is to turn ideas into
                meaningful products.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/games"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/10 hover:opacity-90 transition"
                >
                  Explore Our Projects
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.06] transition"
                >
                  Join Our Journey
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-2xl" />

              <div className="relative rounded-3xl border border-white/10 bg-[#07101f]/80 p-5 shadow-2xl">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#030817] relative">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.14),transparent_50%)]" />

                  <div className="absolute inset-8 rounded-full border border-cyan-400/20" />
                  <div className="absolute inset-16 rounded-full border border-purple-500/20" />
                  <div className="absolute inset-24 rounded-full border border-cyan-400/10" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-28 w-28 md:h-36 md:w-36 rounded-full border border-cyan-400/40 bg-cyan-400/5 flex items-center justify-center shadow-[0_0_80px_rgba(0,212,255,0.15)]">
                      <ShieldCheck className="h-14 w-14 md:h-20 md:w-20 text-cyan-400" />
                    </div>
                  </div>

                  <div className="absolute top-10 left-8 rounded-lg border border-cyan-400/20 bg-[#07101f]/90 px-3 py-2">
                    <div className="text-[8px] uppercase tracking-widest text-cyan-400">
                      Secure
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Blockchain
                    </div>
                  </div>

                  <div className="absolute top-16 right-8 rounded-lg border border-purple-400/20 bg-[#07101f]/90 px-3 py-2">
                    <div className="text-[8px] uppercase tracking-widest text-purple-400">
                      AI
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Innovation
                    </div>
                  </div>

                  <div className="absolute bottom-14 left-10 rounded-lg border border-cyan-400/20 bg-[#07101f]/90 px-3 py-2">
                    <div className="text-[8px] uppercase tracking-widest text-cyan-400">
                      Web3
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Ecosystem
                    </div>
                  </div>

                  <div className="absolute bottom-10 right-8 rounded-lg border border-purple-400/20 bg-[#07101f]/90 px-3 py-2">
                    <div className="text-[8px] uppercase tracking-widest text-purple-400">
                      Future
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Technology
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-5 text-center hover:border-cyan-400/20 transition"
              >
                <Icon className="mx-auto h-5 w-5 text-cyan-400" />

                <div className="mt-3 font-heading text-2xl font-black">
                  {stat.value}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who We Are */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-cyan-400" />
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-cyan-400">
                  Who We Are
                </div>

                <h2 className="mt-1 font-heading text-2xl md:text-3xl font-bold">
                  Builders of Tomorrow
                </h2>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              SecureChain brings together students, developers, designers and
              mentors who believe decentralized technology can create a more
              open digital future.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              We give emerging developers the opportunity to work on real
              projects instead of only learning through theory. Every project
              becomes an opportunity to explore, experiment and improve.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Mentorship-led development",
                "Real-world blockchain projects",
                "Security-focused engineering",
                "Collaborative Web3 community",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-xs text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.05] to-purple-600/[0.05] p-7 md:p-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-purple-400">
                  Our Mission
                </div>

                <h2 className="mt-1 font-heading text-2xl md:text-3xl font-bold">
                  Turn Ideas Into Impact
                </h2>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              Our mission is to create an environment where the next
              generation of Web3 developers can learn by building.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              We combine mentorship, technology and creativity to transform
              promising ideas into secure decentralized applications that can
              make a real difference.
            </p>

            <div className="mt-7 h-px bg-gradient-to-r from-cyan-400/40 via-purple-500/30 to-transparent" />

            <div className="mt-6 flex items-center gap-4">
              <Lightbulb className="h-7 w-7 text-cyan-400" />

              <div>
                <div className="font-heading font-bold text-sm">
                  Learn. Build. Innovate.
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  The philosophy behind every project we create.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Capabilities */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="text-center mb-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">
            What We Build
          </div>

          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-black">
            Our <span className="text-cyan-400">Capabilities</span>
          </h2>

          <p className="mt-3 text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
            Combining blockchain, AI and modern development practices to
            create the next generation of decentralized experiences.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-[#07101b] p-6 hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] transition"
              >
                <div className="h-11 w-11 rounded-xl border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>

                <h3 className="mt-5 font-heading text-base font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {item.text}
                </p>

                <div className="mt-5 h-px w-0 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">

          <div className="text-center mb-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">
              Our Principles
            </div>

            <h2 className="mt-2 font-heading text-2xl md:text-3xl font-black">
              Why <span className="text-cyan-400">SecureChain?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-xl border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>

                  <h3 className="mt-4 font-heading text-sm font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="mb-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">
            Our Journey
          </div>

          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-black">
            From Learning to{" "}
            <span className="text-purple-400">Launch</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/40 via-purple-500/40 to-cyan-400/40" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {journey.map((item) => (
              <div
                key={item.number}
                className="relative rounded-2xl border border-white/10 bg-[#07101b] p-6"
              >
                <div className="relative z-10 h-8 w-8 rounded-full border border-cyan-400/30 bg-[#07101b] flex items-center justify-center text-[10px] font-bold text-cyan-400">
                  {item.number}
                </div>

                <h3 className="mt-5 font-heading text-base font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-r from-cyan-500/[0.06] via-purple-500/[0.08] to-cyan-500/[0.04] px-6 py-12 md:px-12 text-center">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-[80px]" />
            <div className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />
          </div>

          <div className="relative">
            <div className="text-[9px] uppercase tracking-[0.35em] text-cyan-400 font-bold">
              Build With Us
            </div>

            <h2 className="mt-3 font-heading text-2xl md:text-4xl font-black">
              Ready to Shape the
              <span className="text-cyan-400"> Future of Web3?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-xs md:text-sm leading-6 text-slate-500">
              Explore our projects, discover what our builders are creating
              and become part of the next generation of decentralized
              technology.
            </p>

            <div className="mt-7 flex justify-center flex-wrap gap-3">
              <a
                href="/dapps"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-xs font-semibold shadow-lg shadow-cyan-500/10 hover:opacity-90 transition"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-slate-300 hover:bg-white/[0.06] transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}