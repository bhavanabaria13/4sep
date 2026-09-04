import { prisma } from "../lib/prisma.js";
import { slugifyText } from "../lib/helpers.js";

const DEFAULTS = {
  game: ["RPG", "Strategy", "Card", "Racing", "Adventure", "Action", "Puzzle", "Sports"],
  dapp: ["DeFi", "DAO", "NFT", "Tools", "Social", "Bridge", "Wallet", "Marketplace"],
  blog: ["Announcements", "Updates", "Tutorials", "Web3", "Product", "Community"],
};

export async function seedCategories() {
  const count = await prisma.category.count();
  if (count > 0) return;
  const rows = [];
  for (const [type, names] of Object.entries(DEFAULTS)) {
    for (const name of names) {
      rows.push({ name, slug: slugifyText(name), type });
    }
  }
  await prisma.category.createMany({ data: rows, skipDuplicates: true });
  console.log(`[seed] categories inserted (${rows.length})`);
}
