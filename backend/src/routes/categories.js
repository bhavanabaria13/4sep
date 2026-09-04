import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { slugifyText } from "../lib/helpers.js";

const router = Router();

const schema = z.object({
  name: z.string().min(1).max(60),
  type: z.enum(["game", "dapp", "blog"]),
  slug: z.string().optional(),
});

// Public: list categories, optionally filtered by type
router.get("/", async (req, res) => {
  const { type } = req.query;
  const where = {};
  if (type && ["game", "dapp", "blog"].includes(type)) where.type = type;
  const items = await prisma.category.findMany({ where, orderBy: { name: "asc" } });
  res.json({ items });
});

// Admin: create
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
  const { name, type } = parsed.data;
  const slug = slugifyText(parsed.data.slug || name);
  try {
    const item = await prisma.category.create({ data: { name, slug, type } });
    res.status(201).json({ item });
  } catch (e) {
    if (e.code === "P2002") return res.status(409).json({ error: "Category already exists for this type" });
    throw e;
  }
});

// Admin: update
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
  const data = { ...parsed.data };
  if (data.name && !data.slug) data.slug = slugifyText(data.name);
  else if (data.slug) data.slug = slugifyText(data.slug);
  try {
    const item = await prisma.category.update({ where: { id: req.params.id }, data });
    res.json({ item });
  } catch (e) {
    if (e.code === "P2002") return res.status(409).json({ error: "Category name/slug already exists for this type" });
    if (e.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw e;
  }
});

// Admin: delete
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw e;
  }
});

export default router;
