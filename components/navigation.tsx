import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function Navigation() {
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/" className="brand"><BrandMark size={30} /><span>RyanC</span></Link>
    <div className="navlinks">
      <Link href="/#about">About</Link><Link href="/#experience">Experience</Link><Link href="/#work">Projects</Link><Link href="/#contact">Contact</Link>
    </div>
  </nav>;
}
