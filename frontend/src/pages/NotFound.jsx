import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-black text-gradient font-heading">404</div>
      <p className="mt-3 text-slate-400">Page not found</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
        Return home
      </Link>
    </div>
  );
}
