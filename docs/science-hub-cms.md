# Science Hub CMS — architecture, deploy & security runbook

The Science Hub blog is a **Payload CMS** installed inside this Next.js app.
Admin at `/admin`, public pages under `/science-hub`. SQLite database + uploaded
media live on a Render **persistent disk**. The whole site runs as one Node web
service on Render (not Vercel — Vercel is serverless and can't persist SQLite).

## Architecture
- `src/payload.config.ts` — Payload config (SQLite adapter, Lexical editor, SEO plugin, IAS-branded admin).
- `src/collections/` — Posts, Categories, Media, Users (auth + roles).
- `src/app/(payload)/` — Payload admin + REST/GraphQL routes (its own root layout).
- `src/app/(frontend)/` — the marketing site + Science Hub (its own root layout with nav/footer).
- `src/lib/posts.ts` — reads published posts from Payload; the public routes + sitemap consume it.
- Posts render Lexical via `@payloadcms/richtext-lexical/react` `<RichText>`; new/edited posts revalidate their pages instantly (`src/hooks/revalidatePost.ts`) plus 5‑min ISR.

## First-time deploy (Render)
1. **Create the service** from `render.yaml` (Dashboard → New → Blueprint). It provisions a `starter` web service + 5 GB disk at `/var/data`, and sets env vars (`PAYLOAD_SECRET` auto-generated, `DATABASE_URI=file:/var/data/blog.sqlite`, `MEDIA_DIR=/var/data/media`, `NEXT_PUBLIC_SITE_URL=https://iasamerica.com`).
2. **First boot** auto-creates the DB schema on the disk (`db.push`).
3. **Create the first admin**: visit `https://<service>/admin` → create-first-user. Choose role **Admin**.
4. **Seed the two legacy posts (one time):** in the Render Shell run `npm run seed:posts`. It's idempotent but should be run **once** — re-running overwrites those posts back to the markdown source, discarding later admin edits.
5. **Point the domain**: add `iasamerica.com` to the Render service, then move DNS to Cloudflare (below).
6. If the build or runtime OOMs on the 512 MB `starter` plan, bump `plan: standard` (2 GB) in `render.yaml`.

## Security (defense-in-depth)
- **Payload auth** (built-in): salted+hashed passwords, httpOnly **secure** cookies in prod, sessions, and account **lockout** after 5 failed logins for 15 min (`src/collections/Users.ts`). CSRF + CORS pinned to the site origin.
- **Role-based access** on every collection (admin / editor / author) — authors edit only their own drafts; drafts are never public.
- **Origin rate limiting** (`src/middleware.ts`): 10 auth attempts / 5 min / IP and a generous API cap — protects the Render origin directly.
- **Cloudflare (edge, primary)** — after DNS is on Cloudflare (proxied/orange-cloud):
  - Turn on **Bot Fight Mode** (Security → Bots).
  - Add a **Rate limiting rule** on `/admin*` and `/api/*`.
  - Add a **WAF managed-challenge / Turnstile** rule on `/admin*` (Security → WAF) — invisible to legit users, blocks bots at the edge. This satisfies "Turnstile on login" without touching app code.
  - (Recommended) restrict the Render origin to Cloudflare so attackers can't bypass the edge.
- **Security headers** are set in `next.config.ts` (HSTS, nosniff, frame SAMEORIGIN, referrer policy, permissions policy).

## Password reset / email (do before go-live)
Payload's forgot-password needs an email adapter, otherwise reset links are only
written to the server log. Add one (e.g. `@payloadcms/email-nodemailer` with SMTP,
or Resend) in `payload.config.ts` and set the SMTP/API env vars. Until then, an
admin can reset another user's password from `/admin` → Users.

## Everyday authoring
`/admin` → **Posts → Create**: title (slug auto-fills), excerpt, cover image
(uploads to the disk, auto-resized), category, author(s), rich-text body, and an
**SEO** tab (meta title/description/OG image with live preview). Save as **draft**
to stage; **Publish** to go live — the public page updates within seconds.

## Local development
```
cp .env.example .env   # fill PAYLOAD_SECRET, keep DATABASE_URI=file:./blog.db
npm run dev            # http://localhost:3000  (admin at /admin)
npm run seed:posts     # optional: import content/science-hub/*.md
npm run generate:types # after changing collections
```
Note: Next doesn't always inject `.env` into the Payload config context in dev —
if `/admin` 500s with "missing secret key", start dev with the env exported
(`set -a; . ./.env; set +a; npm run dev`). Production (Render env vars) is unaffected.

## Future schema changes
`db.push: true` auto-syncs additive changes. For destructive changes (renames/drops)
generate and review a migration first: `npm run payload -- migrate:create`.
