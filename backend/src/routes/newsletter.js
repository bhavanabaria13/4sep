import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Admin: list subscribers
router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  const items = await prisma.newsletterSub.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ items });
});

// Admin: CSV export
router.get("/export.csv", requireAuth, requireAdmin, async (_req, res) => {
  const items = await prisma.newsletterSub.findMany({ orderBy: { createdAt: "desc" } });
  const rows = [["email", "subscribedAt"], ...items.map((s) => [s.email, s.createdAt.toISOString()])];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="newsletter-subscribers-${Date.now()}.csv"`);
  res.send(csv);
});

// Admin: delete subscriber
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    await prisma.newsletterSub.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e) {
    if (e.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw e;
  }
});

export default router;
