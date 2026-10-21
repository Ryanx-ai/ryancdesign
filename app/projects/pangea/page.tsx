import { permanentRedirect } from "next/navigation";

// Preserve the published URL after its move into Portfolio.
export default function PangeaRedirect() { permanentRedirect("/work/pangea"); }
