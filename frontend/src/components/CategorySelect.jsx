import { useEffect, useState } from "react";
import { API } from "../lib/api.js";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

/**
 * Category select with inline "add new" flow.
 * Fetches categories for a given type and lets the admin pick or create a new one.
 */
export default function CategorySelect({ type, value, onChange, testid = "category-select" }) {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const load = () => {
    API.get("/categories", { params: { type } })
      .then((r) => setItems(r.data.items))
      .catch(() => {});
  };
  useEffect(() => { load(); }, [type]);

  const create = async () => {
    if (!newName.trim()) return;
    try {
      const { data } = await API.post("/categories", { name: newName.trim(), type });
      setItems((prev) => [...prev, data.item].sort((a, b) => a.name.localeCompare(b.name)));
      onChange(data.item.name);
      setNewName("");
      setAdding(false);
      toast.success("Category added");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm text-slate-300">Category</label>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          data-testid={`${testid}-add-toggle`}
          className="text-[11px] text-purple-300 hover:text-white inline-flex items-center gap-1"
        >
          <Plus className="h-3 w-3" /> {adding ? "Cancel" : "Add new"}
        </button>
      </div>
      {adding ? (
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name"
            data-testid={`${testid}-new-input`}
            className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
          />
          <button
            type="button"
            onClick={create}
            data-testid={`${testid}-save`}
            className="px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold"
          >
            Save
          </button>
        </div>
      ) : (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testid}
          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
        >
          <option value="">— Select category —</option>
          {items.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
          {/* If a legacy value exists that's not in the list, still show it */}
          {value && !items.some((c) => c.name === value) && (
            <option value={value}>{value} (legacy)</option>
          )}
        </select>
      )}
    </div>
  );
}
