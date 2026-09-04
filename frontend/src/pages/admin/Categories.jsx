import { useEffect, useState } from "react";
import { API } from "../../lib/api.js";
import { AdminHeader } from "./_shared.jsx";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const TYPES = ["game", "dapp", "blog"];

export default function AdminCategories() {
  const [type, setType] = useState("game");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    API.get("/categories", { params: { type } })
      .then((r) => setItems(r.data.items))
      .finally(() => setLoading(false));
  };
  useEffect(load, [type]);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await API.post("/categories", { name: name.trim(), type });
      setName("");
      toast.success("Category added");
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed");
    }
  };

  const saveEdit = async (id, newName) => {
    try {
      await API.put(`/categories/${id}`, { name: newName });
      toast.success("Updated");
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this category?")) return;
    await API.delete(`/categories/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="p-8 max-w-4xl">
      <AdminHeader
        title="Categories"
        subtitle="Manage categories for Games, dApps and Blogs. Used in create/edit forms."
      />

      <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap gap-2" data-testid="admin-categories-tabs">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            data-testid={`admin-cat-tab-${t}`}
            className={`px-4 h-10 rounded-xl text-sm font-medium capitalize ${
              type === t ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "glass glass-hover text-slate-300"
            }`}
          >
            {t === "dapp" ? "dApp" : t}s
          </button>
        ))}
      </div>

      <form onSubmit={add} className="glass rounded-2xl p-4 mb-6 flex gap-2" data-testid="admin-cat-add-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`New ${type} category name...`}
          data-testid="admin-cat-name-input"
          className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
        />
        <button
          type="submit"
          data-testid="admin-cat-add-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Created</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-6 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="p-6 text-center text-slate-400">No categories yet.</td></tr>
            ) : items.map((c) => (
              <tr key={c.id} className="border-t border-white/5 hover:bg-white/5" data-testid={`admin-cat-row-${c.id}`}>
                <td className="px-4 py-3 text-white">
                  {editing === c.id ? (
                    <EditRow initial={c.name} onSave={(v) => saveEdit(c.id, v)} onCancel={() => setEditing(null)} testid={`admin-cat-editinput-${c.id}`} />
                  ) : c.name}
                </td>
                <td className="px-4 py-3 text-slate-400">{c.slug}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <IconBtn onClick={() => setEditing(c.id)} testid={`admin-cat-edit-${c.id}`}><Pencil className="h-4 w-4" /></IconBtn>
                    <IconBtn tone="danger" onClick={() => remove(c.id)} testid={`admin-cat-delete-${c.id}`}><Trash2 className="h-4 w-4" /></IconBtn>
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

function EditRow({ initial, onSave, onCancel, testid }) {
  const [v, setV] = useState(initial);
  return (
    <div className="flex items-center gap-2">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        data-testid={testid}
        className="h-9 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 px-3 text-sm outline-none flex-1 max-w-xs"
      />
      <IconBtn onClick={() => onSave(v.trim())}><Save className="h-4 w-4" /></IconBtn>
      <IconBtn onClick={onCancel}><X className="h-4 w-4" /></IconBtn>
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
