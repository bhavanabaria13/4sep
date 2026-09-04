import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../lib/api.js";
import { AdminHeader } from "./_shared.jsx";
import ImageUpload from "../../components/ImageUpload.jsx";
import RichTextEditor from "../../components/RichTextEditor.jsx";
import CategorySelect from "../../components/CategorySelect.jsx";
import { Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const init = {
  title: "",
  excerpt: "",
  content: "",
  status: "DRAFT",
  featured: false,
  thumbnail: "",
  banner: "",
  category: "Announcements",
  tags: [],
  author: "Admin",
  readingTime: 5,
  metaTitle: "",
  metaDesc: "",
};

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const nav = useNavigate();
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    API.get(`/blogs/${id}`)
      .then((r) => setForm({ ...init, ...r.data.item }))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target?.value ?? e }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, readingTime: parseInt(form.readingTime, 10) || 5 };
      if (isEdit) await API.put(`/blogs/${id}`, payload);
      else await API.post("/blogs", payload);
      toast.success(isEdit ? "Blog updated" : "Blog created");
      nav("/admin/blogs");
    } catch (err) {
      toast.error(err.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <AdminHeader
        title={isEdit ? "Edit Blog" : "New Blog"}
        action={
          <button onClick={() => nav("/admin/blogs")} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass glass-hover text-slate-300">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        }
      />
      <form onSubmit={submit} className="space-y-6" data-testid="admin-blog-form">
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Title" required value={form.title} onChange={set("title")} testid="admin-blog-title" />
            <SelectField label="Status" value={form.status} onChange={set("status")} testid="admin-blog-status">
              <option value="DRAFT">Draft</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="PUBLISHED">Published</option>
              <option value="REJECTED">Rejected</option>
            </SelectField>
          </div>
          <TextArea label="Excerpt" rows={2} value={form.excerpt} onChange={set("excerpt")} required testid="admin-blog-excerpt" />
          <div className="grid md:grid-cols-3 gap-4">
            <CategorySelect type="blog" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} testid="admin-blog-category" />
            <TextField label="Author" value={form.author} onChange={set("author")} />
            <TextField label="Reading Time (min)" type="number" value={form.readingTime} onChange={set("readingTime")} />
          </div>
          <ArrayField label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              data-testid="admin-blog-featured"
            />
            <label htmlFor="featured" className="text-sm text-slate-300">Featured</label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">Content</h2>
          <RichTextEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} testid="admin-blog-editor" />
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">Media</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-300 mb-2">Thumbnail</div>
              <ImageUpload value={form.thumbnail} onChange={(v) => setForm((f) => ({ ...f, thumbnail: v }))} testid="admin-blog-upload-thumb" />
            </div>
            <div>
              <div className="text-sm text-slate-300 mb-2">Banner</div>
              <ImageUpload value={form.banner} onChange={(v) => setForm((f) => ({ ...f, banner: v }))} testid="admin-blog-upload-banner" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">SEO</h2>
          <TextField label="Meta Title" value={form.metaTitle || ""} onChange={set("metaTitle")} />
          <TextArea label="Meta Description" rows={3} value={form.metaDesc || ""} onChange={set("metaDesc")} />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => nav("/admin/blogs")} className="px-5 py-2.5 rounded-xl glass glass-hover text-slate-300">Cancel</button>
          <button
            type="submit"
            disabled={saving}
            data-testid="admin-blog-save"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function TextField({ label, testid, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1.5 inline-block">{label}</label>
      <input {...props} data-testid={testid} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none" />
    </div>
  );
}
function TextArea({ label, testid, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1.5 inline-block">{label}</label>
      <textarea {...props} data-testid={testid} className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 py-3 text-sm outline-none" />
    </div>
  );
}
function SelectField({ label, testid, children, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1.5 inline-block">{label}</label>
      <select {...props} data-testid={testid} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none">
        {children}
      </select>
    </div>
  );
}
function ArrayField({ label, value, onChange }) {
  const str = Array.isArray(value) ? value.join(", ") : "";
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1.5 inline-block">{label}</label>
      <input
        value={str}
        onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
      />
    </div>
  );
}
