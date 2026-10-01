import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { SmokeBackground } from "@/components/effects/SmokeBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${instrument.variable}`}>
      <head>
        {/* Without JavaScript, show scroll-reveal content immediately. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <SmokeBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
