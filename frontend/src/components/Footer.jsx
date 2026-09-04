import {
  Github,
  Youtube,
  Send,
  Twitter,
  Gamepad2,
  Facebook,
} from "lucide-react";

import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#030914] text-gray-300">

      {/* ================= FOOTER CONTENT ================= */}
      <div className="container mx-auto px-6 md:px-8 pt-10 pb-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}
          <div>
            {/* Logo */}
            <a
              href="/"
              className="inline-flex items-center"
            >
              <img
                src={logo}
                alt="SecureChain AI"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </a>

            {/* Description */}
            <p className="mt-4 max-w-[240px] text-[11px] md:text-xs leading-5 text-slate-400">
              SecureChain AI is building a secure, scalable and
              intelligent blockchain ecosystem for the future of Web3.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">

              {/* X / Twitter */}
              <a
                href="https://twitter.com/SecureChainAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="
                  text-slate-400
                  hover:text-white
                  transition-colors
                  duration-200
                "
              >
                <Twitter size={15} strokeWidth={2} />
              </a>
<a
                href="https://www.facebook.com/SecureChainAI/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  text-slate-400
                  hover:text-indigo-400
                  transition-colors
                  duration-200
                "
              >
                <Facebook size={15} strokeWidth={2} />
              </a>
              {/* Telegram */}
              <a
                href="https://t.me/SecureChainAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="
                  text-slate-400
                  hover:text-cyan-400
                  transition-colors
                  duration-200
                "
              >
                <Send size={15} strokeWidth={2} />
              </a>

              {/* Discord */}
              <a
                href="https://discord.com/jVUUtzRAvQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="
                  text-slate-400
                  hover:text-indigo-400
                  transition-colors
                  duration-200
                "
              >
                <Gamepad2 size={15} strokeWidth={2} />
              </a>

              {/* Youtube */}
              <a
                href="https://www.youtube.com/@SecureChainAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="
                  text-slate-400
                  hover:text-blue-400
                  transition-colors
                  duration-200
                "
              >
                <Youtube size={15} strokeWidth={2} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/securechainai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  text-slate-400
                  hover:text-white
                  transition-colors
                  duration-200
                "
              >
                <Github size={15} strokeWidth={2} />
              </a>

            </div>
          </div>


          {/* ================================================= */}
          {/* EXPLORE */}
          {/* ================================================= */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-[11px] md:text-xs text-slate-400">

              <li>
                <a
                  href="/"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/games"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="/blogs"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Blogs
                </a>
              </li>

              <li>
                <a
                  href="https://explorer.securechain.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Blockchain Explorer
                </a>
              </li>

            </ul>
          </div>


          {/* ================================================= */}
          {/* ECOSYSTEM */}
          {/* ================================================= */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">
              Ecosystem
            </h3>

            <ul className="space-y-3 text-[11px] md:text-xs text-slate-400">

              <li>
                <a
                  href="https://docs.securechain.ai/ecosystem/wallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Wallet
                </a>
              </li>

              <li>
                <a
                  href="https://explorer.securechain.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Mainnet Explorer
                </a>
              </li>

              <li>
                <a
                  href="https://bridge.securechain.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Cross-Chain Bridge
                </a>
              </li>

              <li>
                <a
                  href="https://scai.exchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  DEX
                </a>
              </li>

            </ul>
          </div>


          {/* ================================================= */}
          {/* COMPANY */}
          {/* ================================================= */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-[11px] md:text-xs text-slate-400">

              <li>
                <a
                  href="/about"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="https://internship.etherauthority.io/career"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="https://docs.securechain.ai/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>

            </ul>
          </div>

        </div>


        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}
        <div className="mt-8 border-t border-white/10" />


        {/* ================================================= */}
        {/* COPYRIGHT */}
        {/* ================================================= */}
        <div className="pt-4 text-center">
          <p className="text-[10px] md:text-xs text-slate-400">
            © {new Date().getFullYear()} SecureChain AI. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}