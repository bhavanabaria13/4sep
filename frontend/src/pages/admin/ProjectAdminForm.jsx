import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../lib/api.js";
import { AdminHeader } from "./_shared.jsx";
import ImageUpload from "../../components/ImageUpload.jsx";
import CategorySelect from "../../components/CategorySelect.jsx";
import { Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  shortDesc: "",
  description: "",
  status: "PENDING",
  rank: 999,
  featured: false,
  thumbnail: "",
  logo: "",
  banner: "",
  blockchain: "Ethereum",
  category: "RPG",
  website: "",
  github: "",
  videoUrl: "",
  gallery: [],
  features: [],
  techStack: [],
  metaTitle: "",
  metaDesc: "",
};

export default function ProjectAdminForm({ type }) {
  const label = type === "game" ? "Game" : "dApp";
  const endpoint = type === "game" ? "/games" : "/dapps";
  const route = type === "game" ? "games" : "dapps";

  const { id } = useParams();
  const isEdit = !!id;
  const nav = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    API.get(`${endpoint}/${id}`)
      .then((r) => setForm({ ...initialForm, ...r.data.item }))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target?.value ?? e }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        rank: parseInt(form.rank, 10) || 999,
      };
      if (isEdit) {
        await API.put(`${endpoint}/${id}`, payload);
        toast.success(`${label} updated`);
      } else {
        await API.post(endpoint, payload);
        toast.success(`${label} created`);
      }
      nav(`/admin/${route}`);
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
        title={isEdit ? `Edit ${label}` : `New ${label}`}
        subtitle={isEdit ? "Update details, media, and workflow status" : `Create a new ${label.toLowerCase()}`}
        action={
          <button onClick={() => nav(`/admin/${route}`)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass glass-hover text-slate-300">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        }
      />
      <form onSubmit={submit} className="space-y-6" data-testid={`admin-${route}-form`}>
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Title" required value={form.title} onChange={set("title")} testid={`admin-${route}-title`} />
            <SelectField label="Status" value={form.status} onChange={set("status")} testid={`admin-${route}-status`}>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </SelectField>
          </div>
          <TextField label="Short Description" required value={form.shortDesc} onChange={set("shortDesc")} testid={`admin-${route}-shortdesc`} />
          <TextArea label="Description" rows={5} value={form.description} onChange={set("description")} testid={`admin-${route}-desc`} />
          <div className="grid md:grid-cols-3 gap-4">
            <TextField label="Blockchain" required value={form.blockchain} onChange={set("blockchain")} testid={`admin-${route}-blockchain`} />
            <CategorySelect type={type} value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} testid={`admin-${route}-category`} />
            <TextField label="Rank" type="number" value={form.rank} onChange={set("rank")} testid={`admin-${route}-rank`} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <TextField label="Website URL" value={form.website || ""} onChange={set("website")} />
            <TextField label="GitHub URL" value={form.github || ""} onChange={set("github")} />
            <TextField label="Video URL" value={form.videoUrl || ""} onChange={set("videoUrl")} />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              data-testid={`admin-${route}-featured`}
            />
            <label htmlFor="featured" className="text-sm text-slate-300">Featured</label>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="font-heading text-lg font-bold text-white">Media</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-slate-300 mb-2">Thumbnail</div>
              <ImageUpload value={form.thumbnail} onChange={(v) => setForm((f) => ({ ...f, thumbnail: v }))} testid={`admin-${route}-upload-thumb`} />
            </div>
            <div>
              <div className="text-sm text-slate-300 mb-2">Logo</div>
              <ImageUpload value={form.logo} onChange={(v) => setForm((f) => ({ ...f, logo: v }))} testid={`admin-${route}-upload-logo`} />
            </div>
            <div>
              <div className="text-sm text-slate-300 mb-2">Banner</div>
              <ImageUpload value={form.banner} onChange={(v) => setForm((f) => ({ ...f, banner: v }))} testid={`admin-${route}-upload-banner`} />
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-300 mb-2">Gallery</div>
            <ImageUpload multiple value={form.gallery} onChange={(v) => setForm((f) => ({ ...f, gallery: v }))} testid={`admin-${route}-upload-gallery`} />
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">Details</h2>
          <ArrayField label="Features (comma-separated)" value={form.features} onChange={(v) => setForm((f) => ({ ...f, features: v }))} />
          <ArrayField label="Tech Stack (comma-separated)" value={form.techStack} onChange={(v) => setForm((f) => ({ ...f, techStack: v }))} />
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">SEO</h2>
          <TextField label="Meta Title" value={form.metaTitle || ""} onChange={set("metaTitle")} />
          <TextArea label="Meta Description" rows={3} value={form.metaDesc || ""} onChange={set("metaDesc")} />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => nav(`/admin/${route}`)} className="px-5 py-2.5 rounded-xl glass glass-hover text-slate-300">Cancel</button>
          <button
            type="submit"
            disabled={saving}
            data-testid={`admin-${route}-save`}
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
