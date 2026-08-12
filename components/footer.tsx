import { BrandMark } from "./brand-mark";

export function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><span className="footer-brand"><BrandMark size={28} /><span><strong>RyanC</strong><br />Designed &amp; built by RyanC</span></span><span><a href="https://www.linkedin.com/in/ryan-chin-1388961a7/" target="_blank" rel="noreferrer">LinkedIn</a> · <a href="https://www.instagram.com/ryanchurros/" target="_blank" rel="noreferrer">Instagram</a> · <a href="mailto:ryanchinqf2@gmail.com">Email</a></span></div></footer>;
}
