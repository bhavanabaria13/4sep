import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { createProjectRouter } from "./routes/projectRouter.js";
import blogsRouter from "./routes/blogs.js";
import miscRouter from "./routes/misc.js";
import categoriesRouter from "./routes/categories.js";
import newsletterAdminRouter from "./routes/newsletter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || "8001", 10);

// Local upload folder
const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  path.join(__dirname, "../uploads");

// Only create directory if possible
if (!fs.existsSync(UPLOAD_DIR)) {
  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error("Upload directory error:", error);
  }
}

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

app.use(morgan("dev"));

// Static uploads
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api/uploads", express.static(UPLOAD_DIR));

// Health Check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "etherauthority-api",
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes
app.use("/api/auth", authRouter);

app.use("/api/upload", uploadRouter);

app.use(
  "/api/games",
  createProjectRouter({
    model: "game",
    type: "game",
  })
);

app.use(
  "/api/dapps",
  createProjectRouter({
    model: "dapp",
    type: "dapp",
  })
);

app.use("/api/blogs", blogsRouter);

app.use("/api/categories", categoriesRouter);

app.use(
  "/api/admin/newsletter",
  newsletterAdminRouter
);

app.use("/api", miscRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Error Handler
app.use((err, _req, res, _next) => {
  console.error("[API ERROR]", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// IMPORTANT: Export for Vercel
export default app;

// Run only locally
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}