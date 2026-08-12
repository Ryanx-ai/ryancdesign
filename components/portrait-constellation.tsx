"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; phase: number; group: number };

export function PortraitConstellation() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const frameElement = node.parentElement;
    const context = node.getContext("2d");
    if (!frameElement || !context) return;
    const ctx = context;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const points: Point[] = [];
    const addArc = (cx: number, cy: number, rx: number, ry: number, start: number, end: number, count: number, group: number) => {
      for (let index = 0; index < count; index++) {
        const angle = start + (end - start) * index / Math.max(1, count - 1);
        points.push({ x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry, phase: index * .73 + group, group });
      }
    };
    addArc(.51, .28, .17, .18, -.9 * Math.PI, .92 * Math.PI, 22, 0);
    addArc(.52, .68, .34, .42, -1.02 * Math.PI, .04 * Math.PI, 25, 1);
    addArc(.5, .76, .28, .31, .05 * Math.PI, .94 * Math.PI, 17, 2);

    let width = 0, height = 0, frame = 0, hover = 0, target = 0, visible = true;
    const resize = () => {
      const rect = frameElement.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height; node.width = Math.round(width * ratio); node.height = Math.round(height * ratio);
      node.style.width = `${width}px`; node.style.height = `${height}px`; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !frame) frame = requestAnimationFrame(draw); }, { threshold: .01 });
    function draw(now: number) {
      frame = 0; if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, width, height); hover += (target - hover) * .055;
      const time = now * .001;
      const rendered = points.map((point) => {
        const disperse = reduced ? 0 : hover * (5 + point.group * 2);
        return { x: point.x * width + Math.cos(point.phase * 2.1) * disperse, y: point.y * height + Math.sin(point.phase * 1.7) * disperse, point };
      });
      ctx.lineWidth = .55;
      for (let index = 1; index < rendered.length; index++) {
        if (rendered[index].point.group !== rendered[index - 1].point.group) continue;
        ctx.strokeStyle = `rgba(62,245,255,${.10 + hover * .07})`; ctx.beginPath();
        ctx.moveTo(rendered[index - 1].x, rendered[index - 1].y); ctx.lineTo(rendered[index].x, rendered[index].y); ctx.stroke();
      }
      rendered.forEach(({ x, y, point }) => {
        const pulse = reduced ? 1 : .8 + Math.sin(time * 1.2 + point.phase) * .2;
        ctx.fillStyle = `rgba(170,251,255,${(.18 + hover * .18) * pulse})`; ctx.beginPath();
        ctx.arc(x, y, point.group === 0 ? 1.1 : .85, 0, Math.PI * 2); ctx.fill();
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    }
    const enter = () => { target = 1; }; const leave = () => { target = 0; };
    resize(); observer.observe(frameElement); window.addEventListener("resize", resize);
    if (fine && !reduced) { frameElement.addEventListener("pointerenter", enter); frameElement.addEventListener("pointerleave", leave); }
    draw(0);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize); frameElement.removeEventListener("pointerenter", enter); frameElement.removeEventListener("pointerleave", leave); };
  }, []);

  return <canvas ref={canvas} className="portrait-constellation" aria-hidden="true" />;
}
