# Stars on the River — Next.js + MongoDB (Vercel-ready)

Single Next.js 15 App Router project — pages, API routes, and database access all live in one app, ready to deploy to Vercel as-is. No separate backend process.

- **Database:** MongoDB via Mongoose, connection cached for serverless reuse (`lib/mongodb.js`).
- **Auth:** JWT in an httpOnly cookie, signed/verified with `jose` (works in both the Edge middleware and Node route handlers). `middleware.js` guards every `/admin/*` page and `/api/admin/*` route before it ever runs.
- **File storage:** default photos ship as static files in `public/photos/`; anything an admin uploads (custom photos, invoices) goes to **Vercel Blob** and is referenced by its URL.
- **Data access:** Server Components query MongoDB directly (`lib/queries.js`) — no internal HTTP round-trip. Client Components call the `/api/*` route handlers.

## Setup

1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in:
   - `MONGODB_URI` — an Atlas connection string. Use a **different database name** than the other (Express-based) build in this repo family, so the two don't share data.
   - `JWT_SECRET` — any long random string.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used once by the seed script to create your admin login.
   - `BLOB_READ_WRITE_TOKEN` — from your Vercel project's **Storage → Blob** tab (create a store if you don't have one; the token works locally too, not just when deployed).
3. `npm run seed` — creates the deck/cabin/pricing defaults and your admin user (skips anything that already exists, safe to re-run).
4. `npm run dev` — http://localhost:3000, admin at `/admin/login`.

## Deploying to Vercel

1. Push this folder to its own GitHub repo (it already has its own `git init`, separate from the sibling Express-based app).
2. Import it in Vercel.
3. Add the same env vars from `.env.local` in the Vercel project settings (Production + Preview).
4. Enable Blob storage on the project (Storage tab) if you haven't already — this generates `BLOB_READ_WRITE_TOKEN` automatically for you in that environment.
5. Deploy, then run `npm run seed` once against the production `MONGODB_URI` (e.g. from your machine with `.env.local` pointed at the prod database) to create the admin user and defaults.
