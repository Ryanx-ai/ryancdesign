import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { ProjectsNavItem } from "./projects-nav-item";

export function Navigation() {
  return <nav className="nav glass" aria-label="Primary">
    <Link href="/#top" className="brand" aria-label="Return to top"><BrandMark size={30} /></Link>
    <div className="navlinks">
      <Link href="/#portfolio">Portfolio</Link><Link href="/#contact">Contact</Link><ProjectsNavItem />
    </div>
  </nav>;
}
