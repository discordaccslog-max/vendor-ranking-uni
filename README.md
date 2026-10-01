# Vendor Rankings

A one-page website that ranks vendors in **one category**: a hero ("View the
current vendor rankings" + last-updated date) followed by an interactive
rankings section (sort by rank / rating / reviews, click a vendor to expand its
details and rating breakdown). Built with
Next.js (App Router), TypeScript and Tailwind CSS. There is no database, login
or user input — **you set all the content in one file**.

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
any file you save reloads the page automatically.

Other commands:

```bash
npm run build      # build an optimised production version
npm run start      # serve the production build (run `npm run build` first)
npm run typecheck  # check the code / data file for mistakes
```

---

## 2. Rename the subject (one place)

Open **`config/site.ts`** and change:

```ts
export const CATEGORY_NAME = "[SUBJECT]";   // e.g. "Coffee Bean Suppliers"
export const SITE_NAME = "RankWell";        // name in the header and footer
export const HERO_HEADLINE = "View the current vendor rankings";
export const INTRO = `...`;                 // sentence under the rankings heading
```

---

## 3. Edit the vendors and the "last updated" date

Everything lives in **`data/vendors.ts`**.

At the top of the file:

```ts
export const LAST_UPDATED = "September 18";   // shown in the hero and above the rankings
```

Then each vendor is one `{ ... }` block:

```ts
{
  rank: 1,                                  // 1 = top of the list
  name: "Northwind Supply Co.",
  description: "1–2 sentences shown on the card.",
  details: "Longer text shown when the card is opened.",       // optional
  highlights: ["Same-day dispatch", "24/7 support"],            // optional
  logo: "/logos/northwind.svg",             // optional
  rating: 4.8,                              // 0–5, decimals OK
  reviewCount: 12480,                       // no commas
  ratingDistribution: { 5: 86, 4: 9, 3: 3, 2: 1, 1: 1 },       // % per star, adds to 100
  website: "https://example.com",           // optional, adds a "Visit website" button
},
```

### Common tasks

- **Re-order the ranking** – change the `rank` numbers. The order of blocks in
  the file doesn't matter; only `rank` does. Keep each rank unique.
- **Add a vendor** – copy a whole block (including the trailing `},`), paste it
  inside the `[ ... ]` list, and change the values.
- **Remove a vendor** – delete its whole block.
- **Add a logo** – put the image in `public/logos/` (SVG, PNG, JPG or WEBP;
  square works best) and set `logo: "/logos/your-file.png"`, or paste a full
  `https://...` image URL. Leave `logo` out to show the vendor's initials.
- **Update the date** – change `LAST_UPDATED` whenever you change the rankings.

### Rules to keep in mind

- Text goes inside double quotes: `"like this"`. If your text contains a double
  quote, use single quotes instead: `'He said "hi"'`.
- Every field line ends with a comma.

If you make a mistake (duplicate rank, rating outside 0–5, distribution not
adding up to 100), a warning appears
in the terminal running `npm run dev`. If the page shows an error after editing,
run `npm run typecheck` — it points to the exact line to fix.

---

## 4. Project structure

```
config/site.ts                         ← CATEGORY_NAME, site name, headline, intro
data/vendors.ts                        ← ★ vendor data + LAST_UPDATED (the file you edit)
public/logos/                          ← vendor logo images

app/page.tsx                           ← the homepage (hero + rankings + footer)
app/layout.tsx                         ← page title / font
app/globals.css                        ← colours and fonts

components/home/Hero.tsx               ← top section with headline + last updated
components/home/RankingsSection.tsx    ← rankings heading + sort buttons + list
components/home/Footer.tsx
components/vendors/VendorCard.tsx      ← one vendor (click to expand)
components/vendors/RatingBreakdown.tsx ← 5-star → 1-star bars
components/vendors/VendorLogo.tsx      ← logo or initials
components/StarRating.tsx              ← star boxes (partial fills)

lib/types.ts                           ← the Vendor type (add new fields here first)
lib/vendors.ts                         ← sorts vendors by rank
lib/format.ts                          ← number formatting, rating labels
```

## 5. Extending later

- **New vendor fields** (price range, location): add the field to
  `lib/types.ts`, fill it in `data/vendors.ts`, and show it in
  `components/vendors/VendorCard.tsx`.
- **More homepage sections** (FAQ, methodology): add a component in
  `components/home/` and drop it into `app/page.tsx`.
- **Colours / fonts**: edit the values at the top of `app/globals.css`.
- **More pages**: create `app/<name>/page.tsx`.
