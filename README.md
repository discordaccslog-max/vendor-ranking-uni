# Vendor Rankings

A simple one-page website that ranks vendors in **one category**. Built with
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
export const SITE_NAME = "RankWell";        // name at the top of the page
export const INTRO = `...`;                 // sentence under the heading
```

---

## 3. Edit the vendors and the "last updated" date

Everything lives in **`data/vendors.ts`**.

At the top of the file:

```ts
export const LAST_UPDATED = "1 October 2026";   // shown under the heading
```

Then each vendor is one `{ ... }` block:

```ts
{
  rank: 1,                                  // 1 = top of the list
  name: "Northwind Supply Co.",
  description: "1–2 sentences shown under the name.",
  logo: "/logos/northwind.svg",             // optional
  rating: 4.8,                              // 0–5, decimals OK
  reviewCount: 12480,                       // no commas
  website: "https://example.com",           // optional, adds a "Visit site" link
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

If you make a mistake (duplicate rank, rating outside 0–5), a warning appears
in the terminal running `npm run dev`. If the page shows an error after editing,
run `npm run typecheck` — it points to the exact line to fix.

---

## 4. Project structure

```
config/site.ts                   ← CATEGORY_NAME, site name, intro sentence
data/vendors.ts                  ← ★ vendor data + LAST_UPDATED (the file you edit)
public/logos/                    ← vendor logo images

app/page.tsx                     ← the page
app/layout.tsx                   ← page title / metadata
app/globals.css                  ← colours and fonts

components/StarRating.tsx        ← star boxes (partial fills)
components/vendors/VendorRow.tsx ← one vendor in the list
components/vendors/VendorLogo.tsx← logo or initials

lib/types.ts                     ← the Vendor type (add new fields here first)
lib/vendors.ts                   ← sorts vendors by rank
```

## 5. Extending later

- **New vendor fields** (price range, location): add the field to
  `lib/types.ts`, fill it in `data/vendors.ts`, and show it in
  `components/vendors/VendorRow.tsx`.
- **Colours / fonts**: edit the values at the top of `app/globals.css`.
- **More pages**: create `app/<name>/page.tsx`.
