/** Options for the vendor report form. Edit the labels/descriptions freely. */
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
