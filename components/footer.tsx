import { BrandMark } from "./brand-mark";
import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div className="footer-signature"><Link href="/#top" className="footer-mark" aria-label="Return to top"><BrandMark size={28} /></Link><span>Designed &amp; Built by RyanC<br /><small>Version 3.0.0 | Updated 2026</small></span></div><span><a href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">LinkedIn</a> · <a href="https://www.instagram.com/ryanchurros/" target="_blank" rel="noreferrer">Instagram</a> · <a href="mailto:ryanchinqf2@gmail.com">Email</a></span></div></footer>;
}
