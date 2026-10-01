/**
 * ============================================================================
 *  VENDOR REPORTS — fields, reasons and validation
 * ============================================================================
 *  Shared by the report form (browser) and the server action, so the rules
 *  are defined once. Safe to import from client components.
 */

/** Reasons someone can pick. Edit the labels/descriptions freely. */
export const REPORT_REASONS = [
  {
    value: "misleading-information",
    label: "Misleading information",
    description: "Listing details, pricing or claims that aren't accurate.",
  },
  {
    value: "poor-service",
    label: "Poor service",
    description: "Missed deadlines, low quality, or unresolved problems.",
  },
  {
    value: "suspicious-activity",
    label: "Suspicious activity",
    description: "Possible scams, fake reviews, or impersonation.",
  },
  {
    value: "other",
    label: "Another issue",
    description: "Something else our team should look at.",
  },
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number]["value"];

export const LIMITS = {
  vendorName: { min: 2, max: 120 },
  vendorWebsite: { max: 300 },
  details: { min: 20, max: 2000 },
  email: { max: 254 },
} as const;

/** A validated report, as stored / sent to the team. */
export type VendorReport = {
  id: string;
  createdAt: string;
  vendorName: string;
  vendorWebsite?: string;
  /** Category slug, "other", or undefined if not given. */
  category?: string;
  reason: ReportReason;
  details: string;
  contactEmail?: string;
};

/** Raw text values from the form (kept so the form can be refilled after an error). */
export type ReportFormValues = {
  vendorName: string;
  vendorWebsite: string;
  category: string;
  reason: string;
  details: string;
  contactEmail: string;
  confirm: boolean;
};

export type ReportFieldErrors = Partial<Record<keyof ReportFormValues, string>>;

export const EMPTY_VALUES: ReportFormValues = {
  vendorName: "",
  vendorWebsite: "",
  category: "",
  reason: "",
  details: "",
  contactEmail: "",
  confirm: false,
};

/** Trim and remove control characters (keeps normal line breaks). */
function clean(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export function readFormValues(formData: FormData): ReportFormValues {
  return {
    vendorName: clean(formData.get("vendorName")),
    vendorWebsite: clean(formData.get("vendorWebsite")),
    category: clean(formData.get("category")),
    reason: clean(formData.get("reason")),
    details: clean(formData.get("details")).replace(/\r\n/g, "\n"),
    contactEmail: clean(formData.get("contactEmail")),
    confirm: formData.get("confirm") === "on",
  };
}

/** "example.com" → "https://example.com". Returns undefined if it isn't a usable http(s) URL. */
function normalizeUrl(input: string): string | undefined {
  const withProtocol = /^[a-z][a-z0-9+.-]*:/i.test(input) ? input : `https://${input}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    if (!url.hostname.includes(".")) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate form values. `categorySlugs` are the allowed category values
 * (plus "other"). Returns either the cleaned data or per-field errors.
 */
export function validateReport(
  v: ReportFormValues,
  categorySlugs: string[],
):
  | { ok: true; data: Omit<VendorReport, "id" | "createdAt"> }
  | { ok: false; errors: ReportFieldErrors } {
  const errors: ReportFieldErrors = {};

  if (v.vendorName.length < LIMITS.vendorName.min) errors.vendorName = "Please enter the vendor's name.";
  else if (v.vendorName.length > LIMITS.vendorName.max)
    errors.vendorName = `Please keep this under ${LIMITS.vendorName.max} characters.`;

  let vendorWebsite: string | undefined;
  if (v.vendorWebsite) {
    vendorWebsite = v.vendorWebsite.length <= LIMITS.vendorWebsite.max ? normalizeUrl(v.vendorWebsite) : undefined;
    if (!vendorWebsite) errors.vendorWebsite = "Please enter a valid website, e.g. example.com.";
  }

  if (v.category && v.category !== "other" && !categorySlugs.includes(v.category))
    errors.category = "Please choose a category from the list.";

  if (!REPORT_REASONS.some((r) => r.value === v.reason)) errors.reason = "Please choose what the issue is about.";

  if (v.details.length < LIMITS.details.min)
    errors.details = `Please describe what happened (at least ${LIMITS.details.min} characters).`;
  else if (v.details.length > LIMITS.details.max)
    errors.details = `Please keep this under ${LIMITS.details.max} characters.`;

  if (v.contactEmail && (v.contactEmail.length > LIMITS.email.max || !EMAIL_RE.test(v.contactEmail)))
    errors.contactEmail = "Please enter a valid email address, or leave it blank.";

  if (!v.confirm) errors.confirm = "Please confirm this before submitting.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      vendorName: v.vendorName,
      vendorWebsite,
      category: v.category || undefined,
      reason: v.reason as ReportReason,
      details: v.details,
      contactEmail: v.contactEmail || undefined,
    },
  };
}

export function reasonLabel(value: string): string {
  return REPORT_REASONS.find((r) => r.value === value)?.label ?? value;
}
