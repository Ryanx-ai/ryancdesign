"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const titles = ["Designer", "Programmer", "Innovator", "Entrepreneur", "Educator", "Builder", "Strategist"];

export function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % titles.length), 2500);
    return () => window.clearInterval(timer);
  }, [reduced]);
  return <span className="rotating-title" aria-live="polite"><AnimatePresence mode="wait"><motion.span key={index} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -8 }} transition={{ duration: .35 }}>{titles[index]}</motion.span></AnimatePresence></span>;
}
