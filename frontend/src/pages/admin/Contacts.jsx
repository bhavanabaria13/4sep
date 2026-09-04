import { useEffect, useState } from "react";
import { API } from "../../lib/api.js";
import { AdminHeader } from "./_shared.jsx";
import { Mail } from "lucide-react";

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get("/contact").then((r) => setItems(r.data.items)).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return (
    <div className="p-8">
      <AdminHeader title="Contact Messages" subtitle={`${items.length} messages received`} />
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Subject</th>
              <th className="text-left px-4 py-3">Message</th>
              <th className="text-left px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No messages yet.</td></tr>
            ) : items.map((m) => (
              <tr key={m.id} className="border-t border-white/5">
                <td className="px-4 py-3 text-white">{m.name}</td>
                <td className="px-4 py-3 text-slate-300">
                  <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300">
                    <Mail className="h-3.5 w-3.5" /> {m.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-300">{m.subject}</td>
                <td className="px-4 py-3 text-slate-400 max-w-md truncate">{m.message}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{new Date(m.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
