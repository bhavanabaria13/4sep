import "dotenv/config";

/**
 * Storage abstraction: local (default) or Cloudinary (if CLOUDINARY_* env are set).
 * Local: writes to /app/backend/uploads and returns `/uploads/<name>` path.
 * Cloudinary: uploads via v2.uploader.upload_stream and returns the secure_url.
 */
const HAS_CLOUDINARY =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

let cloudinary = null;
if (HAS_CLOUDINARY) {
  try {
    const mod = await import("cloudinary");
    cloudinary = mod.v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log("[storage] Cloudinary enabled");
  } catch (e) {
    console.warn("[storage] Cloudinary configured but 'cloudinary' package not installed. Falling back to local.");
    cloudinary = null;
  }
}

export const STORAGE_MODE = cloudinary ? "cloudinary" : "local";

export async function uploadBuffer(buffer, filename, mimetype) {
  if (cloudinary) {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "etherauthority", resource_type: "image" },
        (err, result) => (err ? reject(err) : resolve(result.secure_url))
      );
      stream.end(buffer);
    });
  }
  // fallback: caller writes locally (handled by multer diskStorage)
  return null;
}
