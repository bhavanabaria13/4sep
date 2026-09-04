import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed, name: "Admin", role: "admin" },
    });
    console.log(`[seed] admin created: ${email}`);
  } else {
    const match = await bcrypt.compare(password, existing.password);
    if (!match) {
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.update({ where: { email }, data: { password: hashed } });
      console.log(`[seed] admin password updated: ${email}`);
    }
  }
}
