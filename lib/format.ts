/** 12480 → "12,480" */
export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/** Word label for a rating. */
export function ratingLabel(rating: number): string {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4) return "Great";
  if (rating >= 3) return "Average";
  if (rating >= 2) return "Poor";
  return "Bad";
}
