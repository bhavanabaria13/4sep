import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { seedAdmin } from "./lib/seedAdmin.js";
import { seedCategories } from "./lib/seedCategories.js";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { createProjectRouter } from "./routes/projectRouter.js";
import blogsRouter from "./routes/blogs.js";
import miscRouter from "./routes/misc.js";
import categoriesRouter from "./routes/categories.js";
import newsletterAdminRouter from "./routes/newsletter.js";
import { seedDemoContent } from "./seed/demo.js";

const app = express();
const PORT = parseInt(process.env.PORT || "8001", 10);
const UPLOAD_DIR = process.env.UPLOAD_DIR || "/app/backend/uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// Static uploads (served through ingress via /api/uploads too)
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api/uploads", express.static(UPLOAD_DIR));

// Health
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "etherauthority-api" }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/games", createProjectRouter({ model: "game", type: "game" }));
app.use("/api/dapps", createProjectRouter({ model: "dapp", type: "dapp" }));
app.use("/api/blogs", blogsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/admin/newsletter", newsletterAdminRouter);
app.use("/api", miscRouter);

// Error handler
app.use((err, _req, res, _next) => {
  console.error("[error]", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

async function bootstrap() {
  await seedAdmin();
  await seedCategories();
  await seedDemoContent();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[api] listening on 0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error("Fatal bootstrap error", e);
  process.exit(1);
});
