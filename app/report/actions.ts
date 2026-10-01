"use server";

import { headers } from "next/headers";
import { categories } from "@/data/categories";
import { CONTACT_EMAIL } from "@/config/site";
import {
  readFormValues,
  validateReport,
  type ReportFieldErrors,
  type ReportFormValues,
} from "@/lib/reports/schema";
import { createReportId, deliverReport } from "@/lib/reports/store";

export type ReportFormState =
  | { status: "idle"; values: ReportFormValues; attempt: number }
  | { status: "error"; message: string; errors: ReportFieldErrors; values: ReportFormValues; attempt: number }
  | { status: "success"; reportId: string };

/* Simple in-memory rate limit: max 5 reports per IP every 10 minutes.
   (Per server instance — enough to stop casual spam.) */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  return false;
}

export async function submitReport(prev: ReportFormState, formData: FormData): Promise<ReportFormState> {
  const attempt = prev.status === "success" ? 1 : prev.attempt + 1;

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (formData.get("company_website")) {
    return { status: "success", reportId: createReportId() };
  }

  const values = readFormValues(formData);
  const result = validateReport(
    values,
    categories.map((c) => c.slug),
  );
  if (!result.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: result.errors,
      values,
      attempt,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent several reports in a short time. Please wait a few minutes and try again.",
      errors: {},
      values,
      attempt,
    };
  }

  const report = { id: createReportId(), createdAt: new Date().toISOString(), ...result.data };
  const delivered = await deliverReport(report);
  if (!delivered) {
    return {
      status: "error",
      message: `We couldn't send your report just now. Please try again in a moment, or email us at ${CONTACT_EMAIL}.`,
      errors: {},
      values,
      attempt,
    };
  }

  return { status: "success", reportId: report.id };
}
