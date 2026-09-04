import slugify from "slugify";
import { prisma } from "./prisma.js";

export function slugifyText(s) {
  return slugify(s || "", { lower: true, strict: true, trim: true });
}

export async function uniqueSlug(model, base, ignoreId = null) {
  let slug = slugifyText(base) || "item";
  let attempt = 0;
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const existing = await prisma[model].findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    attempt++;
  }
}

export function paginate(query) {
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || "12", 10)));
  return { page, limit, skip: (page - 1) * limit };
}

export function buildOrder(sort) {
  switch (sort) {
    case "newest":
      return { createdAt: "desc" };
    case "oldest":
      return { createdAt: "asc" };
    case "rank_asc":
      return { rank: "asc" };
    case "rank_desc":
      return { rank: "desc" };
    case "az":
      return { title: "asc" };
    case "za":
      return { title: "desc" };
    default:
      return { rank: "asc" };
  }
}
