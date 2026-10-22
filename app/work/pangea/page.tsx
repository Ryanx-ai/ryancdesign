import { permanentRedirect } from "next/navigation";

// The world and companion studies now have one canonical case. Source assets stay intact.
export default function PangeaRedirect() { permanentRedirect("/work/phings"); }
