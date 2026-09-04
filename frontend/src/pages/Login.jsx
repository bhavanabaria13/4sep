import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LogIn, Hexagon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

import logo from "../assets/logo.png";

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@etherauthority.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      nav("/admin");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-16 relative">
      <div className="hero-glow" />
      <div className="relative glass rounded-3xl p-8 md:p-10 w-full max-w-md" data-testid="login-card">
        <div className="flex items-center gap-2 mb-6">
        
          <div>
            <div className="font-heading font-black"><img
            src={logo}
            alt="SecureChain"
            className="h-11 w-auto object-contain"
          /></div>
            <div className="text-[20px] tracking-[0.24em] text-purple-300/80 -mt-0.5">ADMIN LOGIN</div>
          </div>
        </div>
        <h1 className="font-heading text-2xl font-bold">Welcome back</h1>
        <p className="text-slate-400 text-sm mt-1">Sign in to the admin console.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" data-testid="login-form">
          <div>
            <label className="text-sm text-slate-300 mb-1.5 inline-block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="login-email"
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300 mb-1.5 inline-block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="login-password"
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 px-4 text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            data-testid="login-submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-60 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-500 text-center">
          Not an admin? <Link to="/" className="text-purple-300 hover:text-white">Back to site</Link>
        </p>
      </div>
    </div>
  );
}
