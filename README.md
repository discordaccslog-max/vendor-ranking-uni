# Verified Vendors & Suppliers — Free Of Charge

A dark, "aurora"-style site for browsing verified vendors and suppliers by
category, free of charge. Built with **Next.js (App Router)**, **TypeScript**
and **Tailwind CSS v4**.

**Pages**
- `/`: hero, vendors by category, accountability/report call-out, "For
  vendors" section, final call-to-action, and an "Our Mission" pop-up after 2
  seconds.
- `/report`: the report-a-vendor form.

The report form and the "Leave feedback" form are **front-end only**: they
show a thank-you message, and nothing is sent or saved.

---

## 1. Setup & run

You need **Node.js 20.9 or newer** (check with `node -v`).

```bash
npm install      # first time only
npm run dev      # start the dev server → http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # check for type errors
```

The fonts are downloaded from Google Fonts during the build, so the first build
needs an internet connection.

---

## 2. Edit the content

| What                                   | Where                              |
| -------------------------------------- | ---------------------------------- |
| **Vendors** (ratings, reviews, reports) | `data/vendors.ts`                  |
| **Categories**                         | `data/categories.ts`               |
| Contact email, button links, nav      | `config/site.ts`                   |
| Mission pop-up text and timing         | `components/home/MissionPopup.tsx` |
| Section copy (incl. the hero badge)    | `components/home/*.tsx`            |
| Report form issue types                | `lib/reports/schema.ts`            |
| Colours and fonts                      | `app/globals.css`                  |
| Background smoke colours / speed       | `components/effects/SmokeBackground.tsx` |

### Vendors

`data/vendors.ts` holds every vendor. **The included vendors and all their
numbers are placeholders.** Replace them with real data before launch:

```ts
{
  slug: "atelier-nova",               // unique id
  name: "Atelier Nova",
  category: "fashion-clothes",        // a slug from data/categories.ts
  description: "Cut-and-sew manufacturer for premium basics…",
  tags: ["Private label", "Basics", "Low MOQ"],
  trustpilotRating: 4.8,              // TrustScore 0–5
  trustpilotReviews: 2314,
  trustpilotUrl: "https://www.trustpilot.com/review/…",  // optional, makes the rating a link
  recentReports: 0,                   // bad-feedback reports in the past 6 months
  website: "https://…",               // the "View site" button
},
```

Vendors are ranked in the order they appear in the file within their
category. All placeholder websites are `https://example.com`.

**Leading vendor note.** Add `leading: true` to a vendor to show a small
"Leading vendor" note above its name (currently set on PureServe Packaging in
Disposables).

The reports figure is coloured automatically: green for 0, amber for 1–3,
red for 4 or more.

### Categories

`data/categories.ts` has the three category tabs (Fashion & Clothes,
Disposables, Electronics). Add one by adding an entry with a new `slug`, then
give vendors that `category`. Icons available: `fashion`, `disposables`,
`electronics`, `generic`.

### Links

- **"View Vendors"** scrolls to the category tabs (`#vendors`).
- **"Submit a Vendor"** opens an email to `CONTACT_EMAIL`. Change it in
  `config/site.ts`.
- **"Report a Vendor"** opens `/report`. Each vendor's **Report** button
  pre-fills the vendor name (`/report?vendor=Name`).

---

## 3. Design

- **Palette:** deep violet-black (`night-*`), light text (`mist-*`), and
  violet → pink → cyan accents. Defined in `app/globals.css`.
- **Type:** *Instrument Serif* for headlines, *Geist* for everything else.
- **Background:** colourful smoke (violet, pink, cyan, blue) flowing behind
  the whole site (`components/effects/SmokeBackground.tsx`). It's decorative
  only and doesn't react to the mouse. Change `SPEED`, `BRIGHTNESS` or the
  colours in `palette()` there. If WebGL isn't available it falls back to a
  static gradient, and it shows a still frame for visitors who have reduced
  motion turned on.
- **Motion:** the hero fades in, sections reveal on scroll, and the vendor
  list animates in when you switch category. Pop-ups ease in.

---

## 4. Project structure

```
app/
  layout.tsx                 ← fonts, metadata, smoke background, header, footer
  page.tsx                   ← homepage: lists the sections in order
  report/page.tsx            ← /report page
  globals.css                ← colours, fonts, animations

config/site.ts               ← links, nav, hero stats, contact email
data/categories.ts           ← ★ category tabs
data/vendors.ts              ← ★ vendors (placeholders)
lib/types.ts                 ← Category and Vendor types
lib/reports/schema.ts        ← report form issue types

components/
  effects/  SmokeBackground
  layout/   Header, Footer
  home/     Hero, VendorsSection, ReportSection, SubmitSection, FinalCta, MissionPopup
  vendors/  VendorRow, VendorActions (View site / Feedback / Report),
            FeedbackModal, parts (monogram, verified badge, reports)
  reviews/  TrustpilotRating (logo + star squares + score)
  report/   ReportForm, ReportSuccess, form fields
  ui/       Button, Container, SectionHeader, Modal, Reveal, icons
```
