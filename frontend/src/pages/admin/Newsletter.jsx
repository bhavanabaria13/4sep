import { useEffect, useState } from "react";
import { API, BACKEND_URL } from "../../lib/api.js";
import { AdminHeader } from "./_shared.jsx";
import { Download, Trash2, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminNewsletter() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    API.get("/admin/newsletter")
      .then((r) => setItems(r.data.items))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const exportCsv = async () => {
    try {
      const token = localStorage.getItem("ea_token");
      const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/export.csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `newsletter-subscribers-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Exported");
    } catch {
      toast.error("Export failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this subscriber?")) return;
    await API.delete(`/admin/newsletter/${id}`);
    toast.success("Removed");
    load();
  };

  return (
    <div className="p-8">
      <AdminHeader
        title="Newsletter Subscribers"
        subtitle={`${items.length} subscribers`}
        action={
          <button
            onClick={exportCsv}
            disabled={items.length === 0}
            data-testid="admin-newsletter-export"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-40"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Subscribed</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-6 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={3} className="p-6 text-center text-slate-400">No subscribers yet.</td></tr>
            ) : items.map((s) => (
              <tr key={s.id} className="border-t border-white/5 hover:bg-white/5" data-testid={`admin-sub-row-${s.id}`}>
                <td className="px-4 py-3">
                  <a href={`mailto:${s.email}`} className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {s.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(s.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => remove(s.id)}
                      data-testid={`admin-sub-delete-${s.id}`}
                      className="h-8 w-8 rounded-lg flex items-center justify-center border border-white/10 bg-red-500/10 hover:bg-red-500/20 text-red-300 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
