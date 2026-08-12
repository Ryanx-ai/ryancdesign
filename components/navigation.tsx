import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { BrandingNavItem } from "./branding-nav-item";

export function Navigation() {
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/" className="brand" aria-label="RyanC home"><BrandMark size={30} /></Link>
    <div className="navlinks">
      <Link href="/#portfolio">Projects</Link><Link href="/#contact">Contact</Link><BrandingNavItem />
    </div>
  </nav>;
}
