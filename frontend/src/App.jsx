import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import GameDetails from "./pages/GameDetails.jsx";
import Dapps from "./pages/Dapps.jsx";
import DappDetails from "./pages/DappDetails.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminGames from "./pages/admin/Games.jsx";
import AdminGameForm from "./pages/admin/GameForm.jsx";
import AdminDapps from "./pages/admin/Dapps.jsx";
import AdminDappForm from "./pages/admin/DappForm.jsx";
import AdminBlogs from "./pages/admin/Blogs.jsx";
import AdminBlogForm from "./pages/admin/BlogForm.jsx";
import AdminContacts from "./pages/admin/Contacts.jsx";
import AdminCategories from "./pages/admin/Categories.jsx";
import AdminNewsletter from "./pages/admin/Newsletter.jsx";

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<GameDetails />} />
          <Route path="/dapps" element={<Dapps />} />
          <Route path="/dapps/:slug" element={<DappDetails />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="games" element={<AdminGames />} />
          <Route path="games/new" element={<AdminGameForm />} />
          <Route path="games/:id/edit" element={<AdminGameForm />} />
          <Route path="dapps" element={<AdminDapps />} />
          <Route path="dapps/new" element={<AdminDappForm />} />
          <Route path="dapps/:id/edit" element={<AdminDappForm />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="newsletter" element={<AdminNewsletter />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
