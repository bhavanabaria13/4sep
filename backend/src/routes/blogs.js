import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { uniqueSlug, paginate, buildOrder } from "../lib/helpers.js";

const router = Router();

const schema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().default(""),
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "REJECTED", "PUBLISHED"]).optional(),
  featured: z.boolean().optional(),
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  readingTime: z.number().int().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDesc: z.string().nullable().optional(),
});

function isPublic(status) {
  return status === "APPROVED" || status === "PUBLISHED";
}

router.get("/", async (req, res) => {
  const { page, limit, skip } = paginate(req.query);
  const { q, category, status, sort, admin } = req.query;
  const where = {};
  if (admin !== "true") {
    where.status = { in: ["APPROVED", "PUBLISHED"] };
  } else if (status) {
    where.status = status;
  }
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  }
  if (category && category !== "all") where.category = category;

  if (admin === "true") {
    try {
      const header = req.headers.authorization || "";
      if (!header.startsWith("Bearer ")) return res.status(401).json({ error: "Not authenticated" });
      const { verifyToken } = await import("../lib/jwt.js");
      const payload = verifyToken(header.slice(7));
      if (payload.role !== "admin") return res.status(403).json({ error: "Admin only" });
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }

  const orderBy = buildOrder(sort || "newest");
  const [items, total] = await Promise.all([
    prisma.blog.findMany({ where, orderBy, skip, take: limit }),
    prisma.blog.count({ where }),
  ]);
  const categories = await prisma.blog.findMany({
    where: admin === "true" ? {} : { status: { in: ["APPROVED", "PUBLISHED"] } },
    distinct: ["category"],
    select: { category: true },
  });
  res.json({
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    facets: { categories: categories.map((c) => c.category).filter(Boolean) },
  });
});

router.get("/top", async (req, res) => {
  const take = Math.min(20, parseInt(req.query.limit || "5", 10));
  const items = await prisma.blog.findMany({
    where: { status: { in: ["APPROVED", "PUBLISHED"] } },
    orderBy: { createdAt: "desc" },
    take,
  });
  res.json({ items });
});

router.get("/slug/:slug", async (req, res) => {
  const item = await prisma.blog.findUnique({ where: { slug: req.params.slug } });
  if (!item || !isPublic(item.status)) return res.status(404).json({ error: "Not found" });
  await prisma.blog.update({ where: { id: item.id }, data: { views: { increment: 1 } } });
  const related = await prisma.blog.findMany({
    where: { status: { in: ["APPROVED", "PUBLISHED"] }, category: item.category, id: { not: item.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  res.json({ item: { ...item, views: item.views + 1 }, related });
});

router.get("/:id", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.findUnique({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  const data = parsed.data;
  const slug = await uniqueSlug("blog", data.title);
  const publishedAt = data.status === "PUBLISHED" || data.status === "APPROVED" ? new Date() : null;
  const created = await prisma.blog.create({ data: { ...data, slug, publishedAt } });
  res.status(201).json({ item: created });
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const existing = await prisma.blog.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: "Not found" });
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
  const data = parsed.data;
  let slug = existing.slug;
  if (data.title && data.title !== existing.title) slug = await uniqueSlug("blog", data.title, existing.id);
  let publishedAt = existing.publishedAt;
  if (data.status && (data.status === "PUBLISHED" || data.status === "APPROVED") && !publishedAt) {
    publishedAt = new Date();
  }
  const updated = await prisma.blog.update({ where: { id: existing.id }, data: { ...data, slug, publishedAt } });
  res.json({ item: updated });
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await prisma.blog.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

router.post("/:id/approve", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.update({
    where: { id: req.params.id },
    data: { status: "APPROVED", publishedAt: new Date() },
  });
  res.json({ item });
});
router.post("/:id/reject", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.update({ where: { id: req.params.id }, data: { status: "REJECTED" } });
  res.json({ item });
});
router.post("/:id/publish", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.update({
    where: { id: req.params.id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
  res.json({ item });
});
router.post("/:id/unpublish", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.update({ where: { id: req.params.id }, data: { status: "DRAFT" } });
  res.json({ item });
});
router.post("/:id/feature", requireAuth, requireAdmin, async (req, res) => {
  const item = await prisma.blog.findUnique({ where: { id: req.params.id } });
  const updated = await prisma.blog.update({ where: { id: req.params.id }, data: { featured: !item.featured } });
  res.json({ item: updated });
});
router.post("/:id/like", async (req, res) => {
  const item = await prisma.blog.update({ where: { id: req.params.id }, data: { likes: { increment: 1 } } });
  res.json({ likes: item.likes });
});

export default router;
