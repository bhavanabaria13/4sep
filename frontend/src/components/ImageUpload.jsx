import { useState } from "react";
import { API, assetUrl } from "../lib/api.js";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageUpload({ value, onChange, testid = "image-upload", multiple = false }) {
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      if (multiple) {
        const form = new FormData();
        files.forEach((f) => form.append("files", f));
        const { data } = await API.post("/upload/multiple", form, { headers: { "Content-Type": "multipart/form-data" } });
        onChange([...(Array.isArray(value) ? value : []), ...data.urls]);
      } else {
        const form = new FormData();
        form.append("file", files[0]);
        const { data } = await API.post("/upload/single", form, { headers: { "Content-Type": "multipart/form-data" } });
        onChange(data.url);
      }
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeSingle = () => onChange("");
  const removeItem = (i) => onChange(value.filter((_, idx) => idx !== i));

  if (multiple) {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {arr.map((u, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
              <img src={assetUrl(u)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <label className="aspect-square rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-purple-500/50 cursor-pointer">
            <UploadCloud className="h-5 w-5" />
            <span className="text-[11px]">{uploading ? "Uploading..." : "Add"}</span>
            <input type="file" accept="image/*" multiple hidden onChange={handle} data-testid={testid} />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10">
          <img src={assetUrl(value)} alt="" className="h-full w-full object-cover" />
          <button type="button" onClick={removeSingle} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 h-40 w-full max-w-sm rounded-xl border border-dashed border-white/15 text-slate-400 hover:border-purple-500/50 cursor-pointer">
          <UploadCloud className="h-6 w-6" />
          <span className="text-xs">{uploading ? "Uploading..." : "Click to upload image"}</span>
          <input type="file" accept="image/*" hidden onChange={handle} data-testid={testid} />
        </label>
      )}
    </div>
  );
}
