import { motion } from "framer-motion";

export default function GlassCard({
  title,
  icon: Icon,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      transition={{ duration: 0.3 }}
      className={`
        absolute
        flex items-center gap-3
        px-5 py-3
        rounded-2xl
        bg-[#1A1D2B]/75
        backdrop-blur-xl
        border border-white/10
        shadow-[0_0_35px_rgba(0,255,255,.08)]
        ${className}
      `}
    >
      {Icon && (
        <div
          className="
            w-10 h-10
            rounded-xl
            flex items-center justify-center
            bg-gradient-to-br
            from-cyan-500/20
            to-purple-600/20
            border border-cyan-400/20
          "
        >
          <Icon className="w-5 h-5 text-cyan-300" />
        </div>
      )}

      <span className="text-white font-semibold tracking-wide whitespace-nowrap">
        {title}
      </span>
    </motion.div>
  );
}