import type { Metadata } from "next";
import { CATEGORY_NAME, INTRO, SITE_NAME } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${CATEGORY_NAME} Vendor Rankings | ${SITE_NAME}`,
  description: INTRO,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
