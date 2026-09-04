import { motion } from "framer-motion";

export function PageHeader({ title, subtitle, testid = "page-header" }) {
  return (
    <div data-testid={testid} className="relative overflow-hidden">
      <div className="hero-glow" />
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl font-black tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-slate-400 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function SectionTitle({ title, action }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function EmptyState({ title = "Nothing here yet", subtitle, action }) {
  return (
    <div className="glass rounded-2xl p-10 text-center">
      <div className="text-white font-heading text-xl font-bold">{title}</div>
      {subtitle && <div className="mt-2 text-slate-400">{subtitle}</div>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-white/10 text-white border-white/10",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    danger: "bg-red-500/15 text-red-300 border-red-500/20",
    info: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
}
