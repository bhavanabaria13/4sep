import { useState } from "react";
import { PageHeader } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";
import { API } from "../lib/api.js";
import toast from "react-hot-toast";
import { Send, Mail, MapPin, Github } from "lucide-react";

export default function Contact() {
  useSEO({
    title: "Contact",
    description: "Get in touch with the EtherAuthority Interns team — questions, partnerships, or feedback are welcome.",
  });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/contact", form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="Got questions or want to collaborate? Send us a message." testid="contact-page-header" />
      <div className="container mx-auto px-4 md:px-8 pb-16 grid lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 glass rounded-2xl p-6 md:p-8 space-y-4" data-testid="contact-form">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Your Name" testid="contact-name" value={form.name} onChange={set("name")} required />
            <Field label="Email" testid="contact-email" type="email" value={form.email} onChange={set("email")} required />
          </div>
          <Field label="Subject" testid="contact-subject" value={form.subject} onChange={set("subject")} required />
          <div>
            <label className="text-sm text-slate-300 mb-1.5 inline-block">Message</label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={set("message")}
              data-testid="contact-message"
              className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 py-3 text-sm outline-none resize-y"
            />
          </div>
          <button
            disabled={loading}
            data-testid="contact-submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <aside className="space-y-4">
          <InfoCard icon={Mail} title="Email" value="hello@etherauthority.com" />
          <InfoCard icon={MapPin} title="Location" value="Distributed / Remote-first" />
          <InfoCard icon={Github} title="GitHub" value="github.com/etherauthority" />
        </aside>
      </div>
    </div>
  );
}

function Field({ label, testid, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300 mb-1.5 inline-block">{label}</label>
      <input
        {...props}
        data-testid={testid}
        className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
      />
    </div>
  );
}
function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="text-white text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
