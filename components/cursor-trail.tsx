"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; born: number };

export function CursorTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current; const context = node?.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || !context || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const ctx = context; const points: TrailPoint[] = [];
    let width = 0, height = 0, frame = 0; const visible = true;
    const resize = () => { const ratio = Math.min(devicePixelRatio || 1, 2); width = innerWidth; height = innerHeight; node.width = Math.round(width * ratio); node.height = Math.round(height * ratio); node.style.width = `${width}px`; node.style.height = `${height}px`; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const move = (event: PointerEvent) => { const point = { x: event.clientX, y: event.clientY, born: performance.now() }; const previous = points.at(-1); if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) > 3) points.push(point); if (points.length > 18) points.splice(0, points.length - 18); if (!frame) frame = requestAnimationFrame(draw); };
    function draw(now: number) { frame = 0; ctx.clearRect(0, 0, width, height); while (points.length && now - points[0].born > 430) points.shift(); if (!visible || document.hidden || points.length < 2) return; ctx.lineCap = "round"; ctx.lineJoin = "round"; for (let index = 1; index < points.length; index++) { const previous = points[index - 1]; const point = points[index]; const age = Math.max(0, 1 - (now - point.born) / 430); const taper = index / points.length; ctx.strokeStyle = `rgba(62,245,255,${age * taper * .24})`; ctx.lineWidth = .8 + taper * 2.8; ctx.shadowColor = "rgba(62,245,255,.42)"; ctx.shadowBlur = 9; ctx.beginPath(); ctx.moveTo(previous.x, previous.y); ctx.lineTo(point.x, point.y); ctx.stroke(); } ctx.shadowBlur = 0; if (points.length) frame = requestAnimationFrame(draw); }
    resize(); window.addEventListener("resize", resize); window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={canvas} className="cursor-trail" aria-hidden="true" />;
}
