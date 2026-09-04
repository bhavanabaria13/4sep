import jwt from "jsonwebtoken";

const JWT_ALG = "HS256";
const ACCESS_TOKEN_TTL = "7d";

export function getJwtSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET not set");
  return s;
}

export function createAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    getJwtSecret(),
    { algorithm: JWT_ALG, expiresIn: ACCESS_TOKEN_TTL }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret(), { algorithms: [JWT_ALG] });
}
