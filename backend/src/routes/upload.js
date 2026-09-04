import multer from "multer";
import path from "path";
import fs from "fs";
import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { STORAGE_MODE, uploadBuffer } from "../lib/storage.js";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "/app/backend/uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Use memoryStorage so we can push buffers to Cloudinary; write to disk manually for local.
const memory = multer.memoryStorage();
const upload = multer({
  storage: memory,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif|svg\+xml)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const router = Router();

async function persist(file) {
  if (STORAGE_MODE === "cloudinary") {
    return await uploadBuffer(file.buffer, file.originalname, file.mimetype);
  }
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const filename = `${unique}${path.extname(file.originalname).toLowerCase()}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), file.buffer);
  return `/uploads/${filename}`;
}

router.post("/single", requireAuth, requireAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const url = await persist(req.file);
  res.json({ url, storage: STORAGE_MODE });
});

router.post("/multiple", requireAuth, requireAdmin, upload.array("files", 10), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: "No files uploaded" });
  const urls = await Promise.all(req.files.map(persist));
  res.json({ urls, storage: STORAGE_MODE });
});

// Admin utility: expose current storage mode
router.get("/status", requireAuth, requireAdmin, (_req, res) => {
  res.json({ storage: STORAGE_MODE });
});

export default router;
