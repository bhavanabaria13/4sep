import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, assetUrl } from "../../lib/api.js";
import { AdminHeader, NewButton, StatusBadge } from "./_shared.jsx";
import { Pencil, Trash2, Check, X, Star, MoveVertical, Search } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Reusable admin list for Games/Dapps.
 */
export default function ProjectAdminList({ type }) {
  const label = type === "game" ? "Game" : "dApp";
  const labelPlural = type === "game" ? "Games" : "dApps";
  const endpoint = type === "game" ? "/games" : "/dapps";
  const route = type === "game" ? "games" : "dapps";
  const nav = useNavigate();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    API.get(endpoint, { params: { admin: "true", q, status: status || undefined, page, limit: 12, sort: "newest" } })
      .then((r) => {
        setItems(r.data.items);
        setTotal(r.data.total);
        setTotalPages(r.data.totalPages);
      })
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  };
  useEffect(load, [q, status, page]);

  const act = async (id, path) => {
    try {
      await API.post(`${endpoint}/${id}/${path}`);
      toast.success("Updated");
      load();
    } catch (e) {
      toast.error("Action failed");
    }
  };
  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await API.delete(`${endpoint}/${id}`);
    toast.success("Deleted");
    load();
  };
  const setRank = async (id, current) => {
    const val = prompt("Set rank (integer)", current || 999);
    if (val === null) return;
    await API.post(`${endpoint}/${id}/rank`, { rank: parseInt(val, 10) });
    toast.success("Rank updated");
    load();
  };

  return (
    <div className="p-8">
      <AdminHeader
        title={`Manage ${labelPlural}`}
        subtitle={`${total} total`}
        action={<NewButton to={`/admin/${route}/new`} label={`New ${label}`} testid={`admin-new-${route}`} />}
      />

      <div className="glass rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            data-testid={`admin-${route}-search`}
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder={`Search ${labelPlural}...`}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
        </div>
        <select
          data-testid={`admin-${route}-status-filter`}
          value={status}
          onChange={(e) => { setPage(1); setStatus(e.target.value); }}
          className="h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-sm"
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Blockchain</th>
              <th className="text-left px-4 py-3">Rank</th>
              <th className="text-left px-4 py-3">Views</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-slate-400">No records yet.</td></tr>
            ) : items.map((it) => (
              <tr key={it.id} className="border-t border-white/5 hover:bg-white/5" data-testid={`admin-${route}-row-${it.id}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                      {it.thumbnail && <img src={assetUrl(it.thumbnail)} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <div className="text-white font-medium">{it.title}</div>
                      <div className="text-slate-500 text-xs">{it.slug}</div>
                    </div>
                    {it.featured && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">{it.category}</td>
                <td className="px-4 py-3 text-slate-300">{it.blockchain}</td>
                <td className="px-4 py-3 text-slate-300">#{it.rank}</td>
                <td className="px-4 py-3 text-slate-300">{it.views}</td>
                <td className="px-4 py-3"><StatusBadge status={it.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <IconBtn title="Set rank" onClick={() => setRank(it.id, it.rank)} testid={`admin-${route}-rank-${it.id}`}><MoveVertical className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Toggle featured" onClick={() => act(it.id, "feature")} testid={`admin-${route}-feature-${it.id}`}><Star className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Approve" onClick={() => act(it.id, "approve")} testid={`admin-${route}-approve-${it.id}`}><Check className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Reject" onClick={() => act(it.id, "reject")} testid={`admin-${route}-reject-${it.id}`}><X className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Edit" onClick={() => nav(`/admin/${route}/${it.id}/edit`)} testid={`admin-${route}-edit-${it.id}`}><Pencil className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Delete" tone="danger" onClick={() => remove(it.id)} testid={`admin-${route}-delete-${it.id}`}><Trash2 className="h-4 w-4" /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded-lg glass glass-hover disabled:opacity-40">Prev</button>
          <span className="text-slate-400 text-sm">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded-lg glass glass-hover disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

function IconBtn({ children, tone = "default", testid, ...props }) {
  const tones = {
    default: "bg-white/5 hover:bg-white/10 text-slate-300",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-300",
  };
  return (
    <button
      {...props}
      data-testid={testid}
      className={`h-8 w-8 rounded-lg flex items-center justify-center border border-white/10 transition ${tones[tone]}`}
    >
      {children}
    </button>
  );
}
