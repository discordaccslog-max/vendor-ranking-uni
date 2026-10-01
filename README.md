# RankWell — Vendor & Supplier Discovery

A premium homepage for a free vendor and supplier discovery platform: find
reviewed and verified vendors across multiple categories, without paying for
access.

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**.
This version has the **homepage** and a **vendor report form** (front-end only for now). Category pages, vendor profiles,
rankings, reviews, search, and the vendor submission form come later; the code is
laid out so each slots in without reworking the homepage (see section 5).

---

## 1. Setup & run

You need **Node.js 20.9 or newer** (check with `node -v`).

```bash
npm install      # first time only
npm run dev      # start the dev server
```

Open **http://localhost:3000**. Saving any file reloads the page.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # check for type errors
```

The fonts (Instrument Serif + Geist) are downloaded from Google Fonts during
the build, so the first build needs an internet connection.

---

## 2. Edit the content

| What                                   | Where                      |
| -------------------------------------- | -------------------------- |
| Brand name, contact email, nav links   | `config/site.ts`           |
| Button destinations (submit, report)   | `config/site.ts` → `LINKS` |
| Report issue types                     | `lib/reports/schema.ts`   |
| Hero stats (animated numbers)          | `config/site.ts` → `HERO_STATS` |
| The 3 category cards                   | `data/categories.ts`       |
| Section copy                           | `components/home/*.tsx`    |
| Colours, fonts, animation timing       | `app/globals.css`          |

### Categories

`data/categories.ts` holds the category cards. The three included are
placeholders. Replace them, or add more (the grid wraps automatically):

```ts
{
  slug: "technology-software",          // future URL: /categories/technology-software
  name: "Technology & Software",
  description: "Vendors, platforms, agencies, and technology providers.",
  examples: ["SaaS platforms", "Dev agencies", "IT services"],   // small tags
  icon: "technology",   // technology | manufacturing | marketing | logistics | finance | generic
  // live: true,        // set once the category page exists → card becomes a link
},
```

Cards are numbered 01, 02, 03… in list order. Until `live: true`, a card shows
"Rankings coming soon".

### Submit button

For now, "Submit a Vendor" opens an email to `CONTACT_EMAIL`. **Change
`CONTACT_EMAIL` in `config/site.ts` to your real address.** When you build a submission form,
point `LINKS.submitVendor` at `/submit`.

### Hero stats

`HERO_STATS` in `config/site.ts` controls the three animated numbers under the
hero. They currently show the number of categories, "100% free to browse" and
"$0 access fees" (which counts down from $299). Swap in real platform stats
once you have them, e.g. vendors listed or reviews collected.

---

## 3. Vendor reports (`/report`)

Every "Report a Vendor" button opens the report form at **`/report`**. The form
is **front-end only**: submitting it shows a "Thank you for your submission"
message, and nothing is sent or saved.

- Issue types: `REPORT_REASONS` in `lib/reports/schema.ts`.
- Form layout: `components/report/ReportForm.tsx`; thank-you message:
  `components/report/ReportSuccess.tsx`; page copy: `app/report/page.tsx`.
- Links can pre-fill the vendor name: `/report?vendor=Acme%20Ltd`.

---

## 4. Design system

- **Palette**: near-black charcoal (`ink-*`), warm whites (`bone`, `sand-*`),
  champagne gold accent (`gold-*`), muted emerald for the logo and "verified"
  marks (`jade-*`). All defined in `app/globals.css`.
- **Type**: *Instrument Serif* for headlines, *Geist* for body and UI.
- **Animation**
  - Hero: staggered fade/slide-in on load, slowly drifting light, a light
    sweep, and a shimmer on the gold text.
  - Sections fade/slide in as they enter the viewport (`<Reveal>`).
  - Category cards lift on hover, with a soft light that follows the cursor.
  - Buttons have a light sweep on hover.
  - Stats count up (`<AnimatedNumber>`).
  - Everything is disabled for visitors who have reduced motion turned on in
    their system settings.

---

## 5. Project structure

```
app/
  layout.tsx                 ← fonts, metadata, header + footer
  page.tsx                   ← homepage: lists the sections in order
  report/page.tsx            ← /report page (form is front-end only)
  globals.css                ← design tokens, keyframes, reveal styles

config/site.ts               ← brand, links, nav, hero stats
data/categories.ts           ← ★ category cards (edit me)

lib/types.ts                 ← data model: Category (used now) plus Vendor,
                               Review, VerificationStatus, VendorSubmission,
                               VendorReport (ready for later)
lib/format.ts                ← number formatting, rating labels
lib/reports/schema.ts        ← report issue types

components/
  layout/   Header (sticky, mobile menu), Footer, Logo
  home/     Hero, FeaturedCategories, CategoryCard, HowItWorks,
            TrustSection, ReportSection, SubmitSection, FinalCta
  ui/       Button, Container, SectionHeader, Reveal, AnimatedNumber, icons
  report/   ReportForm, ReportSuccess, form fields
  reviews/  StarRating, RatingBreakdown (for vendor profiles later)
```

---

## 6. Building the next features

The homepage is built to grow into the full platform:

| Feature              | How to add it |
| -------------------- | ------------- |
| **Category pages**   | Create `app/categories/[slug]/page.tsx` that reads `data/categories.ts`, then set `live: true` on each category. |
| **Vendors / rankings** | Add `data/vendors.ts` using the `Vendor` type in `lib/types.ts` (it already has `category`, `rank`, `verification`, `rating`, `reviewCount`, `ratingDistribution`). |
| **Vendor profiles**  | `app/vendors/[slug]/page.tsx`, using `StarRating` and `RatingBreakdown` from `components/reviews/`. |
| **Reviews**          | Use the `Review` type; render with `StarRating`. |
| **Verification**     | `Vendor.verification` is `"unverified" \| "reviewed" \| "verified"`; reuse the jade "Verified" badge style from `TrustSection`. |
| **Submit a vendor**  | Copy the `/report` pattern into `app/submit/page.tsx`, then set `LINKS.submitVendor` to `/submit`. |
| **Report from a profile** | Link to `/report?vendor=<name>` from vendor pages to pre-fill the form. |
| **Search & filtering** | Add `app/search/page.tsx` and a search input in `Header.tsx`; add the link to `NAV_LINKS`. |
| **New homepage sections** | Add a component in `components/home/` using `SectionHeader` + `Reveal`, and place it in `app/page.tsx`. |

Search the code for `TODO` to find the marked extension points.
