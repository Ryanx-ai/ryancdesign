import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function Navigation() {
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/" className="brand"><BrandMark size={30} /><span>RyanC</span></Link>
    <div className="navlinks">
      <Link href="/#work">Portfolio</Link><Link href="/#contact">Contact</Link>
    </div>
  </nav>;
}
