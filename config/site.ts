/**
 * ============================================================================
 *  SITE CONFIG — rename the site's subject in ONE place
 * ============================================================================
 *
 *  CATEGORY_NAME is used everywhere on the site (headlines, page titles,
 *  descriptions, footer). Change it here and the whole site updates.
 *
 *  Example: CATEGORY_NAME = "Coffee Bean Suppliers"
 */
export const CATEGORY_NAME = "[SUBJECT]";

/** The brand name shown in the header, footer and browser tab. */
export const SITE_NAME = "RankWell";

/**
 * Text used across the site. Most strings reference CATEGORY_NAME so you
 * rarely need to touch these — but you can tweak the wording freely.
 */
export const SITE_COPY = {
  heroEyebrow: `Independent ${CATEGORY_NAME} rankings`,
  heroHeadline: "View current rankings among vendors",
  heroTagline: `We compare the leading ${CATEGORY_NAME} vendors on quality, reliability and customer satisfaction — so you can choose with confidence.`,
  heroCta: "View the rankings",
  rankingsTitle: `Top ${CATEGORY_NAME} Vendors`,
  rankingsIntro: `Our current ranking of ${CATEGORY_NAME} vendors, ordered by overall performance. Select a vendor to see its full profile and rating breakdown.`,
  // TODO: replace with your own "last updated" date whenever you re-rank vendors.
  lastUpdated: "October 2026",
} as const;

/** Short description used for SEO / link previews. */
export const SITE_DESCRIPTION = `Current rankings of the best ${CATEGORY_NAME} vendors, with ratings and review breakdowns.`;
