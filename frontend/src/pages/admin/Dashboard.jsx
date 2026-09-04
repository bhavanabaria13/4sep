import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../lib/api.js";
import { Gamepad2, LayoutGrid, FileText, Mail, Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import { AdminHeader } from "./_shared.jsx";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/admin/stats").then((r) => setData(r.data)).catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="p-8">
        <AdminHeader title="Dashboard" subtitle="Overview & health of your platform" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const { counts, recent, top } = data;
  const pie = [
    { name: "Approved", value: counts.games.approved + counts.dapps.approved },
    { name: "Pending", value: counts.games.pending + counts.dapps.pending },
    { name: "Rejected", value: counts.games.rejected + counts.dapps.rejected },
    { name: "Drafts", value: counts.blogs.draft },
  ];
  const trend = [
    { name: "Games", v: counts.games.total },
    { name: "dApps", v: counts.dapps.total },
    { name: "Blogs", v: counts.blogs.total },
    { name: "Msgs", v: counts.contacts },
    { name: "Subs", v: counts.subscribers },
  ];

  return (
    <div className="p-8">
      <AdminHeader title="Dashboard" subtitle="Overview & health of your platform" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-testid="admin-stat-cards">
        <StatCard icon={Gamepad2} label="Games" value={counts.games.total} tone="from-blue-500 to-cyan-500" />
        <StatCard icon={LayoutGrid} label="dApps" value={counts.dapps.total} tone="from-purple-500 to-pink-500" />
        <StatCard icon={FileText} label="Blogs" value={counts.blogs.total} tone="from-amber-500 to-red-500" />
        <StatCard icon={Clock} label="Pending" value={counts.games.pending + counts.dapps.pending} tone="from-yellow-500 to-amber-600" />
        <StatCard icon={CheckCircle2} label="Approved" value={counts.games.approved + counts.dapps.approved} tone="from-emerald-500 to-teal-500" />
        <StatCard icon={XCircle} label="Rejected" value={counts.games.rejected + counts.dapps.rejected} tone="from-red-500 to-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-heading font-bold">Content overview</div>
              <div className="text-slate-400 text-sm">Volume across all resource types</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={trend}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="#a855f7" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-white font-heading font-bold mb-4">Status split</div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} innerRadius={44} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {pie.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-slate-400">{p.name}</span>
                <span className="ml-auto text-white font-semibold">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <RecentList title="Recent Games" items={recent.games} type="games" />
        <RecentList title="Recent dApps" items={recent.dapps} type="dapps" />
        <RecentList title="Recent Blogs" items={recent.blogs} type="blogs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopList title="Most Viewed Games" items={top.games} type="games" />
        <TopList title="Most Viewed dApps" items={top.dapps} type="dapps" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${tone} flex items-center justify-center`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="mt-3 text-2xl font-heading font-black text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  );
}

function RecentList({ title, items, type }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-white font-heading font-bold mb-3">{title}</div>
      <div className="space-y-2">
        {items.length === 0 ? <div className="text-slate-500 text-sm">Nothing yet.</div> :
          items.map((it) => (
            <Link key={it.id} to={`/admin/${type}/${it.id}/edit`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
              <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                {it.thumbnail && <img src={it.thumbnail} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm truncate">{it.title}</div>
                <div className="text-slate-500 text-[11px]">{new Date(it.createdAt).toLocaleDateString()}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeColor(it.status)}`}>{it.status}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}

function TopList({ title, items }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-white font-heading font-bold mb-3">{title}</div>
      <div className="space-y-2">
        {items.length === 0 ? <div className="text-slate-500 text-sm">Nothing yet.</div> :
          items.map((it, i) => (
            <div key={it.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm truncate">{it.title}</div>
              </div>
              <span className="text-slate-400 text-xs">{it.views} views</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function badgeColor(status) {
  switch (status) {
    case "APPROVED":
    case "PUBLISHED":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
    case "PENDING":
    case "DRAFT":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/20";
    case "REJECTED":
      return "bg-red-500/15 text-red-300 border border-red-500/20";
    default:
      return "bg-white/10 text-white border border-white/10";
  }
}
