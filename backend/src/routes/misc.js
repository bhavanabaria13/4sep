import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Global search across games, dapps, blogs (approved/published only)
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").toString().trim();
  if (!q) return res.json({ games: [], dapps: [], blogs: [] });
  const take = 12;
  const [games, dapps, blogs] = await Promise.all([
    prisma.game.findMany({
      where: {
        status: "APPROVED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { shortDesc: { contains: q, mode: "insensitive" } },
        ],
      },
      take,
    }),
    prisma.dapp.findMany({
      where: {
        status: "APPROVED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { shortDesc: { contains: q, mode: "insensitive" } },
        ],
      },
      take,
    }),
    prisma.blog.findMany({
      where: {
        status: { in: ["APPROVED", "PUBLISHED"] },
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      take,
    }),
  ]);
  res.json({ games, dapps, blogs });
});

// Home stats
router.get("/stats", async (_req, res) => {
  const [
    totalGames,
    totalDapps,
    totalBlogs,
    approvedGames,
    approvedDapps,
    publishedBlogs,
  ] = await Promise.all([
    prisma.game.count(),
    prisma.dapp.count(),
    prisma.blog.count(),
    prisma.game.count({ where: { status: "APPROVED" } }),
    prisma.dapp.count({ where: { status: "APPROVED" } }),
    prisma.blog.count({ where: { status: { in: ["APPROVED", "PUBLISHED"] } } }),
  ]);
  const gameViews = await prisma.game.aggregate({ _sum: { views: true, likes: true } });
  const dappViews = await prisma.dapp.aggregate({ _sum: { views: true, likes: true } });
  res.json({
    totalGames,
    totalDapps,
    totalBlogs,
    approvedGames,
    approvedDapps,
    publishedBlogs,
    totalViews: (gameViews._sum.views || 0) + (dappViews._sum.views || 0),
    totalLikes: (gameViews._sum.likes || 0) + (dappViews._sum.likes || 0),
  });
});

// Admin dashboard stats
router.get("/admin/stats", requireAuth, requireAdmin, async (_req, res) => {
  const [
    games,
    gamesPending,
    gamesApproved,
    gamesRejected,
    dapps,
    dappsPending,
    dappsApproved,
    dappsRejected,
    blogs,
    blogsDraft,
    blogsPublished,
    blogsRejected,
    contacts,
    subscribers,
  ] = await Promise.all([
    prisma.game.count(),
    prisma.game.count({ where: { status: "PENDING" } }),
    prisma.game.count({ where: { status: "APPROVED" } }),
    prisma.game.count({ where: { status: "REJECTED" } }),
    prisma.dapp.count(),
    prisma.dapp.count({ where: { status: "PENDING" } }),
    prisma.dapp.count({ where: { status: "APPROVED" } }),
    prisma.dapp.count({ where: { status: "REJECTED" } }),
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "DRAFT" } }),
    prisma.blog.count({ where: { status: { in: ["APPROVED", "PUBLISHED"] } } }),
    prisma.blog.count({ where: { status: "REJECTED" } }),
    prisma.contactMessage.count(),
    prisma.newsletterSub.count(),
  ]);
  const recentGames = await prisma.game.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const recentDapps = await prisma.dapp.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const recentBlogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const topGames = await prisma.game.findMany({ orderBy: { views: "desc" }, take: 5 });
  const topDapps = await prisma.dapp.findMany({ orderBy: { views: "desc" }, take: 5 });
  res.json({
    counts: {
      games: { total: games, pending: gamesPending, approved: gamesApproved, rejected: gamesRejected },
      dapps: { total: dapps, pending: dappsPending, approved: dappsApproved, rejected: dappsRejected },
      blogs: { total: blogs, draft: blogsDraft, published: blogsPublished, rejected: blogsRejected },
      contacts,
      subscribers,
    },
    recent: { games: recentGames, dapps: recentDapps, blogs: recentBlogs },
    top: { games: topGames, dapps: topDapps },
  });
});

// Contact form (public)
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
  const item = await prisma.contactMessage.create({ data: parsed.data });
  res.status(201).json({ ok: true, id: item.id });
});

router.get("/contact", requireAuth, requireAdmin, async (_req, res) => {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ items });
});

// Newsletter (public)
router.post("/newsletter", async (req, res) => {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: "Invalid email" });
  await prisma.newsletterSub.upsert({
    where: { email },
    update: {},
    create: { email },
  });
  res.status(201).json({ ok: true });
});

export default router;
