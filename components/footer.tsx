import { BrandMark } from "./brand-mark";
import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div className="footer-signature"><Link href="/#top" className="footer-mark" aria-label="Return to top"><BrandMark size={28} /></Link><span>Designed &amp; Built by RyanC<br /><small>Version 3.0.1 | Updated 2026</small></span></div></div></footer>;
}
