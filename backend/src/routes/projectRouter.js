import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { uniqueSlug, paginate, buildOrder } from "../lib/helpers.js";

/**
 * Factory to build CRUD + public routes for Game or Dapp model.
 */
export function createProjectRouter({ model, type }) {
  const router = Router();

  const schema = z.object({
    title: z.string().min(1),
    shortDesc: z.string().min(1),
    description: z.string().default(""),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    rank: z.number().int().optional(),
    featured: z.boolean().optional(),
    thumbnail: z.string().nullable().optional(),
    logo: z.string().nullable().optional(),
    banner: z.string().nullable().optional(),
    blockchain: z.string().min(1),
    category: z.string().min(1),
    website: z.string().nullable().optional(),
    github: z.string().nullable().optional(),
    videoUrl: z.string().nullable().optional(),
    gallery: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    metaTitle: z.string().nullable().optional(),
    metaDesc: z.string().nullable().optional(),
  });

  // Public list (approved only unless admin=true and authenticated)
  router.get("/", async (req, res) => {
    const { page, limit, skip } = paginate(req.query);
    const { q, blockchain, category, status, sort, admin } = req.query;

    const where = {};
    if (admin !== "true") where.status = "APPROVED";
    else if (status) where.status = status;

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { shortDesc: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }
    if (blockchain && blockchain !== "all") where.blockchain = blockchain;
    if (category && category !== "all") where.category = category;

    const orderBy = buildOrder(sort);

    // If admin request, require full auth+admin
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

    const [items, total] = await Promise.all([
      prisma[model].findMany({ where, orderBy, skip, take: limit }),
      prisma[model].count({ where }),
    ]);

    // Also expose filter facets (distinct values)
    const [blockchains, categories] = await Promise.all([
      prisma[model].findMany({
        where: admin === "true" ? {} : { status: "APPROVED" },
        distinct: ["blockchain"],
        select: { blockchain: true },
      }),
      prisma[model].findMany({
        where: admin === "true" ? {} : { status: "APPROVED" },
        distinct: ["category"],
        select: { category: true },
      }),
    ]);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      facets: {
        blockchains: blockchains.map((b) => b.blockchain).filter(Boolean),
        categories: categories.map((c) => c.category).filter(Boolean),
      },
    });
  });

  // Top N (used on homepage)
  router.get("/top", async (req, res) => {
    const take = Math.min(20, parseInt(req.query.limit || "5", 10));
    const items = await prisma[model].findMany({
      where: { status: "APPROVED" },
      orderBy: [{ rank: "asc" }, { createdAt: "desc" }],
      take,
    });
    res.json({ items });
  });

  // Public: by slug (increment views)
  router.get("/slug/:slug", async (req, res) => {
    const item = await prisma[model].findUnique({ where: { slug: req.params.slug } });
    if (!item || item.status !== "APPROVED") return res.status(404).json({ error: "Not found" });
    await prisma[model].update({ where: { id: item.id }, data: { views: { increment: 1 } } });
    // Related: same category, exclude current
    const related = await prisma[model].findMany({
      where: { status: "APPROVED", category: item.category, id: { not: item.id } },
      orderBy: { rank: "asc" },
      take: 4,
    });
    res.json({ item: { ...item, views: item.views + 1 }, related });
  });

  // Public: like
  router.post("/slug/:slug/like", async (req, res) => {
    const item = await prisma[model].findUnique({ where: { slug: req.params.slug } });
    if (!item || item.status !== "APPROVED") return res.status(404).json({ error: "Not found" });
    const updated = await prisma[model].update({ where: { id: item.id }, data: { likes: { increment: 1 } } });
    res.json({ likes: updated.likes });
  });

  // Admin: get by id
  router.get("/:id", requireAuth, requireAdmin, async (req, res) => {
    const item = await prisma[model].findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ item });
  });

  // Admin: create
  router.post("/", requireAuth, requireAdmin, async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    const data = parsed.data;
    const slug = await uniqueSlug(model, data.title);
    const created = await prisma[model].create({ data: { ...data, slug } });
    res.status(201).json({ item: created });
  });

  // Admin: update
  router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
    const existing = await prisma[model].findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: "Not found" });
    const parsed = schema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
    const data = parsed.data;
    let slug = existing.slug;
    if (data.title && data.title !== existing.title) {
      slug = await uniqueSlug(model, data.title, existing.id);
    }
    const updated = await prisma[model].update({ where: { id: existing.id }, data: { ...data, slug } });
    res.json({ item: updated });
  });

  // Admin: delete
  router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    await prisma[model].delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  });

  // Admin: workflow actions
  router.post("/:id/approve", requireAuth, requireAdmin, async (req, res) => {
    const item = await prisma[model].update({ where: { id: req.params.id }, data: { status: "APPROVED" } });
    res.json({ item });
  });
  router.post("/:id/reject", requireAuth, requireAdmin, async (req, res) => {
    const item = await prisma[model].update({ where: { id: req.params.id }, data: { status: "REJECTED" } });
    res.json({ item });
  });
  router.post("/:id/feature", requireAuth, requireAdmin, async (req, res) => {
    const item = await prisma[model].findUnique({ where: { id: req.params.id } });
    const updated = await prisma[model].update({ where: { id: req.params.id }, data: { featured: !item.featured } });
    res.json({ item: updated });
  });
  router.post("/:id/rank", requireAuth, requireAdmin, async (req, res) => {
    const rank = parseInt(req.body.rank, 10);
    if (isNaN(rank)) return res.status(400).json({ error: "Invalid rank" });
    const item = await prisma[model].update({ where: { id: req.params.id }, data: { rank } });
    res.json({ item });
  });

  return router;
}
