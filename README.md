# Little Cats Childcare LLC — complete editable website

Six-page original, mobile-responsive childcare website for Little Cats Childcare LLC, Cashion, Oklahoma.

## Pages
- `/` — Home
- `/our-place/` — Our Place
- `/little-years/` — Little Years (interactive age guide)
- `/for-families/` — For Families
- `/questions/` — Questions / FAQ
- `/contact/` — Contact (email-app inquiry)

## Run locally (VS Code)

1. Open this folder in VS Code.
2. Run `npm run dev` from the terminal. (Requires Node.js 18+; `npm install` is NOT needed.)
3. Open `http://localhost:5173`.

## Deploy

Run `npm run build`. Deploy the `dist/` directory to Cloudflare Pages or Vercel. Use:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Framework preset**: Other / None

`dist/` is already generated for quick upload. The project uses zero runtime or npm package dependencies. `npm run check` checks generated routes, title/description, links, and file assets.

## Change business details, links and artwork

See **BRAND-AND-IMAGE-GUIDE.md**. Edit `src/config/site.json` for business details and approved social links, `src/config/media.json` for artwork, or replace `public/branding/logo.png` directly. After edits, run `npm run build` again.

### Website domain and SEO

In `src/config/site.json`, enter the **real final site URL** in `domain`, e.g. `https://your-authorized-domain.com` (do not leave a sample URL). Rebuild. The site generates a sitemap and robots.txt with that URL. It does not invent a canonical domain when one has not been selected.

## Content note

Identity, contact, age groups, capacity and weekday hours were checked against the supplied Oklahoma childcare data/state record. Storybook copy is general and does not assert specific unverified activities or amenities. Original illustrations are conceptual, **not photos of the provider or enrolled children**. Replace the temporary logo with an authorized actual logo when available. The project does not claim to be an approved official website without the provider's permission.
