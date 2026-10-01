import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CATEGORY_NAME, INTRO, SITE_NAME } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `${CATEGORY_NAME} Vendor Rankings | ${SITE_NAME}`,
  description: INTRO,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
