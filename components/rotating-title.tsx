"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const titles = ["Designer", "Programmer", "Innovator", "Entrepreneur", "Builder"];

export function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % titles.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduced]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("hero-role-change", { detail: titles[index] }));
  }, [index]);
  const title = titles[index];
  const tracking = title.length <= 8 ? ".23em" : title.length <= 10 ? ".15em" : ".075em";
  const trackingClass = title.length <= 8 ? "role-short" : title.length <= 10 ? "role-medium" : "role-long";
  return <span className="rotating-title" aria-live="polite"><AnimatePresence mode="wait"><motion.span className={trackingClass} key={index} initial={reduced ? false : { opacity: 0, y: 7, x: -5, filter: "blur(5px)", letterSpacing: `calc(${tracking} + .09em)` }} animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)", letterSpacing: tracking }} exit={reduced ? {} : { opacity: 0, y: -5, x: 5, filter: "blur(4px)", letterSpacing: `calc(${tracking} + .11em)` }} transition={{ duration: .5, ease: [.22, 1, .36, 1] }}>{title}</motion.span></AnimatePresence></span>;
}
