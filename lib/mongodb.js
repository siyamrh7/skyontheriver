import mongoose from 'mongoose';

// Serverless functions are stateless between cold starts but a warm Lambda
// container reuses its module scope — cache the connection on `global` so
// concurrent/warm invocations reuse one connection instead of opening a new
// one per request (the standard Next.js + Mongoose + Vercel pattern).
let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set — copy .env.local.example to .env.local and fill it in.');
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
