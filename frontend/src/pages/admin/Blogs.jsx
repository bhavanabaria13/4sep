import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, assetUrl } from "../../lib/api.js";
import { AdminHeader, NewButton, StatusBadge } from "./_shared.jsx";
import { Pencil, Trash2, Check, X, Star, Eye, EyeOff, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBlogs() {
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
    API.get("/blogs", { params: { admin: "true", q, status: status || undefined, page, limit: 12, sort: "newest" } })
      .then((r) => { setItems(r.data.items); setTotal(r.data.total); setTotalPages(r.data.totalPages); })
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  };
  useEffect(load, [q, status, page]);

  const act = async (id, path) => {
    try {
      await API.post(`/blogs/${id}/${path}`);
      toast.success("Updated");
      load();
    } catch { toast.error("Action failed"); }
  };
  const remove = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await API.delete(`/blogs/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="p-8">
      <AdminHeader
        title="Manage Blogs"
        subtitle={`${total} total`}
        action={<NewButton to="/admin/blogs/new" label="New Blog" testid="admin-new-blog" />}
      />

      <div className="glass rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            data-testid="admin-blogs-search"
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Search blogs..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm"
          />
        </div>
        <select
          data-testid="admin-blogs-status-filter"
          value={status}
          onChange={(e) => { setPage(1); setStatus(e.target.value); }}
          className="h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-sm"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="PUBLISHED">Published</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Author</th>
              <th className="text-left px-4 py-3">Views</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-400">No blogs yet.</td></tr>
            ) : items.map((it) => (
              <tr key={it.id} className="border-t border-white/5 hover:bg-white/5" data-testid={`admin-blog-row-${it.id}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-14 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                      {it.thumbnail && <img src={assetUrl(it.thumbnail)} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <div className="text-white font-medium line-clamp-1">{it.title}</div>
                      <div className="text-slate-500 text-xs line-clamp-1">{it.slug}</div>
                    </div>
                    {it.featured && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">{it.category}</td>
                <td className="px-4 py-3 text-slate-300">{it.author}</td>
                <td className="px-4 py-3 text-slate-300">{it.views}</td>
                <td className="px-4 py-3"><StatusBadge status={it.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <IconBtn title="Toggle featured" onClick={() => act(it.id, "feature")} testid={`admin-blog-feature-${it.id}`}><Star className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Publish" onClick={() => act(it.id, "publish")} testid={`admin-blog-publish-${it.id}`}><Eye className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Unpublish" onClick={() => act(it.id, "unpublish")} testid={`admin-blog-unpublish-${it.id}`}><EyeOff className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Approve" onClick={() => act(it.id, "approve")} testid={`admin-blog-approve-${it.id}`}><Check className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Reject" onClick={() => act(it.id, "reject")} testid={`admin-blog-reject-${it.id}`}><X className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Edit" onClick={() => nav(`/admin/blogs/${it.id}/edit`)} testid={`admin-blog-edit-${it.id}`}><Pencil className="h-4 w-4" /></IconBtn>
                    <IconBtn title="Delete" tone="danger" onClick={() => remove(it.id)} testid={`admin-blog-delete-${it.id}`}><Trash2 className="h-4 w-4" /></IconBtn>
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
    <button {...props} data-testid={testid} className={`h-8 w-8 rounded-lg flex items-center justify-center border border-white/10 transition ${tones[tone]}`}>
      {children}
    </button>
  );
}
