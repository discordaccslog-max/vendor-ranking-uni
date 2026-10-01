/**
 * ============================================================================
 *  REPORT DELIVERY (server only)
 * ============================================================================
 *  Each submitted report goes to every destination that's available:
 *
 *  1. Webhook — if REPORT_WEBHOOK_URL is set (Discord, Slack, or any URL that
 *     accepts a JSON POST). Use this in production: hosts like Vercel can't
 *     save files.
 *  2. Local file — appended to .data/reports.jsonl (one JSON report per line).
 *     Works when running on your own computer/server. View with `npm run reports`.
 *
 *  A report counts as received if at least one destination succeeds.
 */
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SITE_NAME } from "@/config/site";
import { categories } from "@/data/categories";
import { reasonLabel, type VendorReport } from "@/lib/reports/schema";

export const REPORTS_FILE = path.join(process.cwd(), ".data", "reports.jsonl");

/** Short, readable reference like "RPT-7K2M9Q". */
export function createReportId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "RPT-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function categoryName(slug?: string): string {
  if (!slug) return "Not specified";
  if (slug === "other") return "Other / not sure";
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

async function saveToFile(report: VendorReport): Promise<void> {
  await mkdir(path.dirname(REPORTS_FILE), { recursive: true });
  await appendFile(REPORTS_FILE, JSON.stringify(report) + "\n", "utf8");
}

/** Builds the right message shape for Discord, Slack, or a generic webhook. */
function webhookBody(url: string, report: VendorReport): unknown {
  const host = new URL(url).hostname;

  if (host.endsWith("discord.com") || host.endsWith("discordapp.com")) {
    return {
      username: `${SITE_NAME} Reports`,
      allowed_mentions: { parse: [] }, // never let report text ping @everyone
      embeds: [
        {
          title: `Vendor report · ${report.id}`,
          description: report.details.slice(0, 4000),
          color: 0xb8955a,
          timestamp: report.createdAt,
          fields: [
            { name: "Vendor", value: report.vendorName.slice(0, 1000), inline: true },
            { name: "Issue", value: reasonLabel(report.reason), inline: true },
            { name: "Category", value: categoryName(report.category), inline: true },
            { name: "Website", value: report.vendorWebsite ?? "Not provided", inline: true },
            { name: "Reporter email", value: report.contactEmail ?? "Not provided", inline: true },
          ],
        },
      ],
    };
  }

  if (host === "hooks.slack.com") {
    return {
      text: [
        `*Vendor report ${report.id}*`,
        `*Vendor:* ${report.vendorName}`,
        `*Issue:* ${reasonLabel(report.reason)}`,
        `*Category:* ${categoryName(report.category)}`,
        `*Website:* ${report.vendorWebsite ?? "Not provided"}`,
        `*Reporter email:* ${report.contactEmail ?? "Not provided"}`,
        "",
        report.details,
      ].join("\n"),
    };
  }

  return { type: "vendor_report", report };
}

async function sendToWebhook(url: string, report: VendorReport): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(webhookBody(url, report)),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/** Deliver a report. Returns true if at least one destination accepted it. */
export async function deliverReport(report: VendorReport): Promise<boolean> {
  const webhookUrl = process.env.REPORT_WEBHOOK_URL?.trim();
  const attempts: Promise<void>[] = [saveToFile(report)];
  if (webhookUrl) attempts.push(sendToWebhook(webhookUrl, report));

  const results = await Promise.allSettled(attempts);
  for (const r of results) {
    if (r.status === "rejected") console.error(`[reports] Delivery failed for ${report.id}:`, r.reason);
  }
  return results.some((r) => r.status === "fulfilled");
}
