import { ArrowRight } from "lucide-react";

export default function FeatureSection({
  icon: Icon,
  title,
  description,
  color = "cyan",
}) {
  const colors = {
    cyan: {
      border: "hover:border-cyan-400/70 border-cyan-500/30",
      glow: "shadow-[0_0_30px_rgba(34,211,238,.12)]",
      icon: "text-cyan-300",
      bg: "from-cyan-500/15 to-blue-500/5",
    },
    purple: {
      border: "hover:border-purple-400/70 border-purple-500/30",
      glow: "shadow-[0_0_30px_rgba(168,85,247,.12)]",
      icon: "text-fuchsia-300",
      bg: "from-purple-500/15 to-indigo-500/5",
    },
    blue: {
      border: "hover:border-blue-400/70 border-blue-500/30",
      glow: "shadow-[0_0_30px_rgba(59,130,246,.12)]",
      icon: "text-sky-300",
      bg: "from-sky-500/15 to-blue-500/5",
    },
    amber: {
      border: "hover:border-yellow-400/70 border-yellow-500/30",
      glow: "shadow-[0_0_30px_rgba(251,191,36,.12)]",
      icon: "text-yellow-300",
      bg: "from-yellow-500/15 to-orange-500/5",
    },
    pink: {
      border: "hover:border-pink-400/70 border-pink-500/30",
      glow: "shadow-[0_0_30px_rgba(236,72,153,.12)]",
      icon: "text-pink-300",
      bg: "from-pink-500/15 to-purple-500/5",
    },
  };

  const c = colors[color];

  return (
    <div
      className={`
      group relative
      rounded-2xl
      border ${c.border}
      ${c.glow}
      bg-[#0B1020]/95
      backdrop-blur-xl
      p-7
      h-[255px]
      transition-all
      duration-300
      hover:-translate-y-2
      overflow-hidden
      `}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-0 group-hover:opacity-100 transition duration-500`}
      />

      {/* Icon */}
      <div className="relative" style={{ display: "ruby-text" }}>
        <div
          className={`
          w-10 h-10
          rounded-xl
          flex items-center justify-center
          bg-[#111827]
          border border-white/5
          shadow-[0_0_18px_rgba(255,255,255,.04)]
          `}
        >
          <Icon
            size={24}
            strokeWidth={1.4}
            className={`${c.icon} drop-shadow-[0_0_8px_currentColor]`}
          />
		   
        </div>  <h3 className="mt-6 text-[18px] font-semibold text-white">
        {title}
      </h3>
      </div>

     

      {/* Description */}
      <p className="mt-4 text-[12px] leading-7 text-slate-300">
        {description}
      </p>

      {/* Arrow */}
      <ArrowRight
        size={20}
        className="absolute bottom-7 right-7 text-white/80 group-hover:translate-x-1 transition"
      />
    </div>
  );
}