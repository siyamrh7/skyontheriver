import { SignJWT, jwtVerify } from 'jose';

// jose works identically in the Edge runtime (middleware.js) and the Node
// runtime (route handlers) — one JWT library for both, no jsonwebtoken needed.
const getSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set — copy .env.local.example to .env.local and fill it in.');
  return new TextEncoder().encode(process.env.JWT_SECRET);
};

export const COOKIE_NAME = 'sotr_token';
export const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 7 * 24 * 3600,
};

export async function signToken(payload) {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(getSecret());
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}
