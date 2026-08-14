import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroEnvironment } from "@/components/hero-environment";
import { CursorTrail } from "@/components/cursor-trail";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ryanc.design"),
  title: { default: "RyanC | Design", template: "%s | RyanC" },
  description: "The design portfolio and evolving project ecosystem of RyanC.",
  alternates: { canonical: "/" },
  openGraph: { title: "RyanC | Design", description: "Design work, products, ventures and experiments by RyanC.", type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={instrumentSerif.variable}><body><LanguageProvider><SmoothScroll /><div className="site-atmosphere" aria-hidden="true"><div className="stars" /><HeroEnvironment /></div><CursorTrail /><Navigation />{children}<Footer /><Analytics /><SpeedInsights /></LanguageProvider></body></html>;
}
