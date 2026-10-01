"use client";

import { useState } from "react";
import { ReportForm } from "@/components/report/ReportForm";

/** Wraps the form so "Report another vendor" can start a fresh, empty form. */
export function ReportFlow({ defaultVendor }: { defaultVendor?: string }) {
  const [round, setRound] = useState(0);
  return (
    <ReportForm
      key={round}
      defaultVendor={round === 0 ? defaultVendor : ""}
      onReset={() => {
        setRound((r) => r + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
}
