import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import logo from "../assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  {
    label: "Projects",
    children: [
      { to: "/games", label: "Games" },
      { to: "/dapps", label: "dApps" },
    ],
  },
  { to: "/blogs", label: "Blogs" },
  { to: "https://explorer.securechain.ai/", label: "Blockchain Explorer" },
  { to: "https://internship.etherauthority.io/", label: "Internship Portal" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobileProjects, setMobileProjects] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!q.trim()) return;

    navigate(`/search?q=${encodeURIComponent(q.trim())}`);

    setOpen(false);
  };

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#00071a]/90 backdrop-blur-xl border-b border-white/10"
          : "bg-[#00071a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center">

        {/* Logo */}

        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SecureChain"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center ml-8 gap-1">

          {NAV.map((item) => {

            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative group"
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    {item.label}

                    <ChevronDown size={16} />
                  </button>

                  <div
                    className="
                    absolute
                    left-0
                    top-full
                    mt-2
                    w-52
                    rounded-xl
                    bg-[#0d1224]
                    border
                    border-white/10
                    shadow-2xl
                    opacity-0
                    invisible
                    group-hover:opacity-100
                    group-hover:visible
                    transition-all
                    duration-200
                    overflow-hidden
                    "
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-4 py-3 text-sm transition ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-white/5 text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Search */}

        <form
          onSubmit={submit}
          className="hidden md:flex ml-auto relative"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games, dApps, blogs..."
            className="w-72 h-10 rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </form>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden ml-auto p-2 rounded-lg bg-white/5 border border-white/10"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="lg:hidden bg-[#00071a] border-t border-white/10">

          <div className="p-4 space-y-2">

            <form onSubmit={submit} className="relative mb-4">

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 text-white"
              />

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </form>

            {NAV.map((item) => {

              if (item.children) {
                return (
                  <div key={item.label}>

                    <button
                      onClick={() =>
                        setMobileProjects(!mobileProjects)
                      }
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-300 hover:bg-white/5"
                    >
                      {item.label}

                      <ChevronRight
                        className={`transition ${
                          mobileProjects ? "rotate-90" : ""
                        }`}
                        size={18}
                      />
                    </button>

                    {mobileProjects && (

                      <div className="ml-4 mt-1">

                        {item.children.map((child) => (

                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                          >
                            {child.label}
                          </NavLink>

                        ))}

                      </div>

                    )}

                  </div>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}