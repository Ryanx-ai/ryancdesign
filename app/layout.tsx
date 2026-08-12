import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ryanc.design"),
  title: { default: "RyanC — Product Designer, Strategist & Builder", template: "%s — RyanC" },
  description: "RyanC designs products, builds ventures, and creates experiences that connect people.",
  openGraph: { title: "RyanC — Product Designer, Strategist & Builder", description: "Product design, strategy, entrepreneurship and education.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll /><Navigation />{children}<Footer /><Analytics /><SpeedInsights /></body></html>;
}
