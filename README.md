# Vendor Rankings

A clean, Trustpilot-inspired website that ranks vendors in **one category**.
Built with Next.js (App Router), TypeScript and Tailwind CSS. There is no
database, login or user input — **you set all the content in one file**.

| Page            | URL                     |
| --------------- | ----------------------- |
| Landing page    | `/`                     |
| Rankings        | `/rankings`             |
| Vendor profile  | `/vendors/<slug>`       |

---

## 1. Setup & run

You need **Node.js 20.9 or newer** (check with `node -v`).

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser. While `npm run dev` is running,
any file you save reloads the site automatically.

Other commands:

```bash
npm run build      # build an optimised production version
npm run start      # serve the production build (run `npm run build` first)
npm run typecheck  # check the code / data file for type errors
```

---

## 2. Rename the subject (one place)

Open **`config/site.ts`** and change:

```ts
export const CATEGORY_NAME = "[SUBJECT]";   // e.g. "Coffee Bean Suppliers"
export const SITE_NAME = "RankWell";        // your brand name
```

Every headline, page title and description on the site uses these values. The
same file also holds the hero text, button labels and the "last updated" date
(`SITE_COPY`) if you want to tweak the wording.

---

## 3. Edit the vendors

All vendor data lives in **`data/vendors.ts`**. Each vendor is one `{ ... }`
block:

```ts
{
  rank: 1,                                   // 1 = top of the list
  slug: "northwind-supply",                  // page URL: /vendors/northwind-supply
  name: "Northwind Supply Co.",
  shortDescription: "Shown on the rankings card (1–2 sentences).",
  description: [
    "First paragraph of the full profile.",
    "Second paragraph. Add as many as you like.",
  ],
  logo: "/logos/northwind.svg",              // optional
  rating: 4.8,                               // 0–5, decimals OK
  reviewCount: 12480,                        // no commas
  ratingDistribution: { 5: 86, 4: 9, 3: 3, 2: 1, 1: 1 },  // % per star, adds to 100
  highlights: ["Same-day dispatch", "24/7 support"],       // optional
  website: "https://example.com",            // optional
},
```

### Common tasks

- **Re-order the ranking** – change the `rank` numbers. The order of blocks in
  the file doesn't matter; only `rank` does. Keep each rank unique.
- **Add a vendor** – copy a whole block (including the trailing `},`), paste it
  inside the `[ ... ]` list, and change the values. Give it a unique `slug`.
- **Remove a vendor** – delete its whole block.
- **Change a rating** – edit `rating`, `reviewCount` and `ratingDistribution`.
  The star colour updates automatically (green for high ratings through to red
  for low ones), as does the label (Excellent / Great / Average / Poor / Bad).
- **Add a logo** – put the image file in `public/logos/` (SVG, PNG, JPG or
  WEBP; square works best) and set `logo: "/logos/your-file.png"`. You can also
  paste a full `https://...` image URL. Leave `logo` out to show a coloured
  initials badge instead.

### Rules to keep in mind

- Text goes inside double quotes: `"like this"`. If your text contains a double
  quote, use a single-quoted string instead: `'He said "hi"'`.
- Every field line ends with a comma.
- `slug` should be lowercase letters, numbers and dashes only (no spaces).
- `ratingDistribution` values are percentages and should add up to 100.

If you make a mistake (duplicate rank/slug, distribution not adding to 100,
rating outside 0–5), a warning is printed in the terminal running
`npm run dev`. If the site shows an error after editing, run
`npm run typecheck` — it points to the exact line that needs fixing.

---

## 4. Project structure

```
config/site.ts            ← CATEGORY_NAME, site name, landing/rankings text
data/vendors.ts           ← ★ all vendor data (the file you edit)
public/logos/             ← vendor logo images

app/
  layout.tsx              ← shared header/footer, fonts, metadata
  page.tsx                ← landing page (/)
  rankings/page.tsx       ← rankings page (/rankings)
  vendors/[slug]/page.tsx ← vendor profile pages
  not-found.tsx           ← 404 page
  globals.css             ← colour palette / design tokens

components/
  StarRating.tsx          ← Trustpilot-style star boxes (partial fills)
  landing/                ← Hero, TrustStrip, HowItWorks, CtaBand
  vendors/                ← VendorCard, VendorLogo, RatingSummary,
                            RatingDistribution, RankBadge
  layout/                 ← Header, Footer, SiteLogo
  ui/                     ← Container, ButtonLink

lib/
  types.ts                ← the Vendor type (add new fields here first)
  vendors.ts              ← helpers to read/sort vendors
```

## 5. Extending later

Search the code for `TODO` to find the spots intended for expansion, such as:

- **New vendor fields** (pricing, location, pros/cons): add the field to
  `lib/types.ts`, fill it in `data/vendors.ts`, then display it in
  `app/vendors/[slug]/page.tsx` or `components/vendors/VendorCard.tsx`.
- **New pages** (About, Methodology): create `app/<name>/page.tsx` and add a
  link in `components/layout/Header.tsx` and `Footer.tsx`.
- **New landing sections** (FAQ, testimonials): add a component in
  `components/landing/` and drop it into `app/page.tsx`.
- **Colours**: edit the `--color-brand-*` values in `app/globals.css`.
- **Moving data to a CMS/database**: only `lib/vendors.ts` reads the data file,
  so that is the single place to swap the data source.
