import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-3">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-black tracking-tight text-white">{title}</h1>
        {subtitle && <p className="text-slate-400 mt-1 text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function NewButton({ to, label = "New", testid }) {
  return (
    <Link
      to={to}
      data-testid={testid}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
    >
      <Plus className="h-4 w-4" /> {label}
    </Link>
  );
}

export function StatusBadge({ status }) {
  const map = {
    APPROVED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    PUBLISHED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    PENDING: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    DRAFT: "bg-slate-500/15 text-slate-300 border-slate-500/20",
    REJECTED: "bg-red-500/15 text-red-300 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${map[status] || map.DRAFT}`}>
      {status}
    </span>
  );
}
