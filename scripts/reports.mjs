#!/usr/bin/env node
/**
 * Lists vendor reports saved to .data/reports.jsonl (newest first).
 *
 *   npm run reports           show all reports
 *   npm run reports -- 5      show the 5 most recent
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), ".data", "reports.jsonl");
const limit = Number(process.argv[2]) || Infinity;

const REASONS = {
  "misleading-information": "Misleading information",
  "poor-service": "Poor service",
  "suspicious-activity": "Suspicious activity",
  other: "Another issue",
};

let text;
try {
  text = await readFile(file, "utf8");
} catch {
  console.log("No reports yet. (Looked in .data/reports.jsonl)");
  process.exit(0);
}

const reports = text
  .split("\n")
  .filter(Boolean)
  .flatMap((line) => {
    try {
      return [JSON.parse(line)];
    } catch {
      return [];
    }
  })
  .reverse();

console.log(`\n${reports.length} report${reports.length === 1 ? "" : "s"} in .data/reports.jsonl\n`);

for (const r of reports.slice(0, limit)) {
  console.log("─".repeat(60));
  console.log(`${r.id}   ${new Date(r.createdAt).toLocaleString()}`);
  console.log(`Vendor:    ${r.vendorName}${r.vendorWebsite ? `  (${r.vendorWebsite})` : ""}`);
  console.log(`Issue:     ${REASONS[r.reason] ?? r.reason}`);
  if (r.category) console.log(`Category:  ${r.category}`);
  console.log(`Reporter:  ${r.contactEmail ?? "(no email given)"}`);
  console.log("");
  console.log(r.details.replace(/^/gm, "  "));
  console.log("");
}
