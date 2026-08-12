"use client";

import { useState } from "react";

export function BrandingNavItem() {
  const [open, setOpen] = useState(false);
  return <button type="button" className="branding-link" data-tooltip="Coming Soon" data-open={open || undefined} onClick={() => setOpen((value) => !value)} onBlur={() => setOpen(false)} aria-label="Branding — coming soon">Branding</button>;
}
