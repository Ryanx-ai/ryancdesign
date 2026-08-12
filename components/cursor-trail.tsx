"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type TrailPoint = { x: number; y: number; born: number };
type Ripple = { x: number; y: number; born: number };

export function CursorTrail() {
  const pathname = usePathname();
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const node = canvas.current; const context = node?.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || !context || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const ctx = context; const points: TrailPoint[] = []; const ripples: Ripple[] = [];
    let width = 0, height = 0, frame = 0; const visible = true;
    const resize = () => { const ratio = Math.min(devicePixelRatio || 1, 2); width = innerWidth; height = innerHeight; node.width = Math.round(width * ratio); node.height = Math.round(height * ratio); node.style.width = `${width}px`; node.style.height = `${height}px`; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const move = (event: PointerEvent) => { const point = { x: event.clientX, y: event.clientY, born: performance.now() }; const previous = points.at(-1); if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) > 3) points.push(point); if (points.length > 18) points.splice(0, points.length - 18); if (!frame) frame = requestAnimationFrame(draw); };
    const click = (event: PointerEvent) => { if (event.pointerType === "touch") return; ripples.push({ x: event.clientX, y: event.clientY, born: performance.now() }); if (!frame) frame = requestAnimationFrame(draw); };
    function draw(now: number) { frame = 0; ctx.clearRect(0, 0, width, height); while (points.length && now - points[0].born > 430) points.shift(); while (ripples.length && now - ripples[0].born > 620) ripples.shift(); if (!visible || document.hidden) return; ctx.lineCap = "round"; ctx.lineJoin = "round"; for (let index = 1; index < points.length; index++) { const previous = points[index - 1]; const point = points[index]; const age = Math.max(0, 1 - (now - point.born) / 430); const taper = index / points.length; ctx.strokeStyle = `rgba(62,245,255,${age * taper * .24})`; ctx.lineWidth = .8 + taper * 2.8; ctx.shadowColor = "rgba(62,245,255,.42)"; ctx.shadowBlur = 9; ctx.beginPath(); ctx.moveTo(previous.x, previous.y); ctx.lineTo(point.x, point.y); ctx.stroke(); } for (const ripple of ripples) { const progress = Math.min(1, (now - ripple.born) / 620); ctx.strokeStyle = `rgba(62,245,255,${(1 - progress) * .34})`; ctx.lineWidth = Math.max(.45, 1.8 - progress * 1.25); ctx.shadowColor = "rgba(62,245,255,.34)"; ctx.shadowBlur = 7 * (1 - progress); ctx.beginPath(); ctx.arc(ripple.x, ripple.y, 4 + progress * 36, 0, Math.PI * 2); ctx.stroke(); if (progress < .12) { ctx.fillStyle = `rgba(160,252,255,${.5 * (1 - progress / .12)})`; ctx.beginPath(); ctx.arc(ripple.x, ripple.y, 2.2, 0, Math.PI * 2); ctx.fill(); } } ctx.shadowBlur = 0; if (points.length || ripples.length) frame = requestAnimationFrame(draw); }
    resize(); window.addEventListener("resize", resize); window.addEventListener("pointermove", move); window.addEventListener("pointerdown", click);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", click); };
  }, [pathname]);
  if (pathname.startsWith("/admin")) return null;
  return <canvas ref={canvas} className="cursor-trail" aria-hidden="true" />;
}
