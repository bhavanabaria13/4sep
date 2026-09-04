# EtherAuthority Interns – PRD

## Original problem statement
Full-stack DappRadar-style directory for Blockchain Games, dApps and Blogs, with rank system, approval workflow, admin dashboard and image uploads. Vite + React + Tailwind on the front, Node/Express + PostgreSQL + Prisma on the back.

## Tech Stack
- **Frontend**: React 18 (Vite), Tailwind 3, Framer Motion, Lucide, React Router, React Hook Form, Axios, TipTap, Recharts, react-hot-toast.
- **Backend**: Node/Express 4 (ESM), Prisma 5, bcryptjs, jsonwebtoken, Multer (memory storage), Zod, Morgan, optional Cloudinary.
- **DB**: PostgreSQL 15 (local, supervisor-managed).

## Personas
- **Visitor**: browses games/dApps/blogs, searches, subscribes to newsletter, contacts team.
- **Admin**: full CRUD + approval workflow + rank + category management + newsletter export + contact inbox.

## What's implemented
### Iteration 1 (2026-01-06)
- All public pages (Home, Games listing + details, dApps listing + details, Blog listing + details, Search, About, Contact, Login, 404).
- Admin: Dashboard (Recharts), Games/dApps/Blogs CRUD + approve/reject/feature/set-rank/publish/unpublish, TipTap editor, local image uploads, Contact inbox.
- Auth: JWT bearer with pre-seeded admin (`admin@etherauthority.com` / `Admin@123`).
- Rank system, approval workflow (Pending → Approved/Rejected), draft/publish for blogs.
- Global search, homepage stats, footer newsletter subscribe.
- Testing agent iteration 1: 33/33 backend + 17/17 frontend PASS.

### Iteration 2 (2026-01-07)
- **Category CRUD** admin page (per-type: game/dapp/blog) + `CategorySelect` dropdown in all forms with inline "Add new" flow. Categories seeded on boot.
- **Dynamic SEO `<head>`** via `useSEO` hook on every public page: title, description, og:title/desc/image/type/url, twitter:card/title/desc/image, canonical link. og:type toggles website/article automatically.
- **Cloudinary-ready upload storage** (`storage.js` picks `cloudinary` mode if `CLOUDINARY_CLOUD_NAME`+`CLOUDINARY_API_KEY`+`CLOUDINARY_API_SECRET` env vars are present, else local disk). New endpoint `GET /api/upload/status` reports current mode.
- **Newsletter admin**: subscribers list at `/admin/newsletter`, one-click CSV export (`GET /api/admin/newsletter/export.csv`), delete subscriber.
- Testing agent iteration 2: 49/49 backend + all new frontend flows PASS.

## Backlog / Next steps
- P1: Newsletter broadcast composer (needs `RESEND_API_KEY` or `SENDGRID_API_KEY` from user).
- P1: Cloudinary keys from user to activate remote storage.
- P2: Rename BlogForm testids from `admin-blog-*` to `admin-blogs-*` for naming consistency with games/dapps forms.
- P2: Optional Emergent Google Auth for a "site editor" role.
- P2: Public "Submit Your Project" form so external builders can push into the Pending queue.

## Deployment notes
- PostgreSQL via supervisor. Reinstall via `apt-get install -y postgresql postgresql-contrib` + role/db setup if the environment resets.
- Backend on 8001, Vite dev server on 3000. Ingress routes `/api/*` → 8001, everything else → 3000.
- To enable Cloudinary: set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `/app/backend/.env` and restart backend.
