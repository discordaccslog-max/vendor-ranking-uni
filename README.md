# RankWell — Vendor & Supplier Discovery

A premium homepage for a free vendor and supplier discovery platform: find
reviewed and verified vendors across multiple categories, without paying for
access.

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**.
This version has the **homepage** and a working **vendor report form**. Category pages, vendor profiles,
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
| Report issue types & validation        | `lib/reports/schema.ts`   |
| Where reports are sent                 | `.env.local` → `REPORT_WEBHOOK_URL` (see section 3) |
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
`CONTACT_EMAIL` in `config/site.ts` to your real address.** It's also shown as
a fallback if a report can't be delivered. When you build a submission form,
point `LINKS.submitVendor` at `/submit`.

### Hero stats

`HERO_STATS` in `config/site.ts` controls the three animated numbers under the
hero. They currently show the number of categories, "100% free to browse" and
"$0 access fees" (which counts down from $299). Swap in real platform stats
once you have them, e.g. vendors listed or reviews collected.

---

## 3. Vendor reports (`/report`)

Every "Report a Vendor" button opens the report form at **`/report`**. Visitors
enter the vendor's name, website (optional), category (optional), the type of
issue, a description, and an optional email for follow-up. They then get a
confirmation screen with a reference number like `RPT-7K2M9Q`.

Links can pre-fill the vendor name: `/report?vendor=Acme%20Ltd`.

### Where reports go

Each report is sent to **every destination that's available**:

| Destination | When it's used | How to read reports |
| ----------- | -------------- | ------------------- |
| **Local file** `.data/reports.jsonl` | Always attempted. Works on your own computer or server. | Run `npm run reports` (or `npm run reports -- 5` for the latest 5). |
| **Webhook** | When `REPORT_WEBHOOK_URL` is set. | Reports arrive as messages in your Discord or Slack channel, or as a JSON POST to your own URL. |

> **Hosting on Vercel (or similar)?** Those hosts can't save files, so you
> **must** set `REPORT_WEBHOOK_URL`, otherwise visitors will see "We couldn't
> send your report" (with your contact email as a fallback).

**Set up a Discord webhook (2 minutes):**
1. In Discord: *Channel settings → Integrations → Webhooks → New Webhook → Copy Webhook URL*.
2. Locally: copy `.env.example` to `.env.local` and paste the URL after `REPORT_WEBHOOK_URL=`. Restart `npm run dev`.
3. On Vercel: *Project → Settings → Environment Variables* → add `REPORT_WEBHOOK_URL`, then redeploy.

Slack incoming webhooks work the same way. Any other URL receives
`{"type":"vendor_report","report":{...}}` (e.g. Zapier or Make, to forward to email
or a spreadsheet).

`.data/` is git-ignored because reports can contain people's email addresses.

### Built-in protection
- Validation on the server (required fields, lengths, valid website/email).
- A hidden "honeypot" field that silently discards bot submissions.
- A limit of 5 reports per visitor every 10 minutes.
- Report text can't trigger @everyone/@here pings in Discord.
- The form still works with JavaScript turned off.

### Customising
- Issue types and their descriptions: `REPORT_REASONS` in `lib/reports/schema.ts`.
- Validation rules and limits: `lib/reports/schema.ts`.
- Delivery (e.g. add email via a service like Resend): `lib/reports/store.ts`.
- Form layout: `components/report/ReportForm.tsx`; page copy: `app/report/page.tsx`.

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
  report/page.tsx            ← /report page
  report/actions.ts          ← server action that validates + delivers reports
  globals.css                ← design tokens, keyframes, reveal styles

config/site.ts               ← brand, links, nav, hero stats
data/categories.ts           ← ★ category cards (edit me)

lib/types.ts                 ← data model: Category (used now) plus Vendor,
                               Review, VerificationStatus, VendorSubmission,
                               VendorReport (ready for later)
lib/format.ts                ← number formatting, rating labels
lib/reports/schema.ts        ← report fields, issue types, validation
lib/reports/store.ts         ← report delivery (file + webhook)
scripts/reports.mjs          ← `npm run reports` viewer

components/
  layout/   Header (sticky, mobile menu), Footer, Logo
  home/     Hero, FeaturedCategories, CategoryCard, HowItWorks,
            TrustSection, ReportSection, SubmitSection, FinalCta
  ui/       Button, Container, SectionHeader, Reveal, AnimatedNumber, icons
  report/   ReportFlow, ReportForm, ReportSuccess, form fields
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
| **Submit a vendor**  | Copy the `/report` pattern: `app/submit/page.tsx` + a server action using the `VendorSubmission` type, then set `LINKS.submitVendor` to `/submit`. |
| **Report from a profile** | Link to `/report?vendor=<name>` from vendor pages to pre-fill the form. |
| **Search & filtering** | Add `app/search/page.tsx` and a search input in `Header.tsx`; add the link to `NAV_LINKS`. |
| **New homepage sections** | Add a component in `components/home/` using `SectionHeader` + `Reveal`, and place it in `app/page.tsx`. |

Search the code for `TODO` to find the marked extension points.
