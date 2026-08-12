"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; depth: number; phase: number; pull: number; kind: "tiny" | "medium" | "hero"; duration: number };

const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 9283.31 + salt * 77.17) * 43758.5453;
  return value - Math.floor(value);
};

export function HeroEnvironment() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvas.current;
    const hero = node?.closest<HTMLElement>(".hero");
    if (!node || !hero) return;
    const context = node.getContext("2d");
    if (!context) return;
    const ctx = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lowPower = navigator.hardwareConcurrency <= 4 || connection?.saveData === true;
    const animated = !reduced && !lowPower;
    const stars: Star[] = Array.from({ length: 76 }, (_, index) => ({
      x: seeded(index, 1), y: seeded(index, 2), depth: .35 + seeded(index, 3) * .9,
      phase: seeded(index, 4) * Math.PI * 2, pull: seeded(index, 5) > .46 ? 1 : -.55,
      kind: index % 23 === 0 ? "hero" : index % 5 === 0 ? "medium" : "tiny",
      duration: 2700 + seeded(index, 6) * 10400,
    }));
    let width = 0, height = 0, frame = 0, visible = true, rolePulse = 0;
    let sparkleIndex = -1, sparkleStart = 0, nextSparkle = 7000 + seeded(9, 8) * 6000;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      node.width = Math.round(width * ratio); node.height = Math.round(height * ratio);
      node.style.width = `${width}px`; node.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const roleChange = () => { rolePulse = 1; };
    const visibilityChange = () => { if (!document.hidden && visible && !frame && animated) frame = requestAnimationFrame(draw); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !frame) frame = requestAnimationFrame(draw); }, { threshold: .01 });

    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, width, height);
      const time = now * .001;
      rolePulse *= .975;
      if (animated && now > nextSparkle) {
        const heroStars = stars.map((star, index) => ({ star, index })).filter(({ star }) => star.kind === "hero");
        sparkleIndex = heroStars[Math.floor(seeded(Math.floor(now / 1000), 9) * heroStars.length)]?.index ?? -1;
        sparkleStart = now;
        nextSparkle = now + 7500 + seeded(Math.floor(now), 10) * 7500;
      }
      const positions = stars.map((star) => {
        const baseX = star.x * width + Math.sin(time * .022 * star.depth + star.phase) * .38 * star.depth;
        const baseY = star.y * height + Math.cos(time * .018 * star.depth + star.phase) * .28 * star.depth;
        return { x: baseX, y: baseY, star };
      });

      ctx.lineWidth = .65;
      const lineBreath = .82 + Math.sin(time * .19) * .1;
      for (let index = 0; index < positions.length; index++) {
        const a = positions[index];
        for (let next = index + 1; next < positions.length; next++) {
          const b = positions[next];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const threshold = 92 + rolePulse * 22;
          if (distance < threshold && (index + next) % 4 === 0) {
            ctx.strokeStyle = `rgba(62,245,255,${((.056 * lineBreath) * (1 - distance / threshold) + rolePulse * .018).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            const bend = Math.sin(time * .12 + index) * .35;
            ctx.quadraticCurveTo((a.x + b.x) / 2 + bend, (a.y + b.y) / 2 - bend, b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (let index = 0; index < positions.length; index++) {
        const { x, y, star } = positions[index];
        const cycle = animated ? Math.sin((now / star.duration) * Math.PI * 2 + star.phase) : 0;
        const range = star.kind === "tiny" ? .035 : star.kind === "medium" ? .065 : .085;
        const baseOpacity = star.kind === "tiny" ? .16 : star.kind === "medium" ? .22 : .28;
        const sparkleAge = index === sparkleIndex ? now - sparkleStart : 999;
        const sparkle = sparkleAge >= 0 && sparkleAge < 220 ? Math.sin(sparkleAge / 220 * Math.PI) : 0;
        const opacity = baseOpacity + cycle * range + rolePulse * .025 + sparkle * .18;
        const radius = star.kind === "tiny" ? .62 : star.kind === "medium" ? .92 : 1.22;
        if (star.kind === "hero" || sparkle > 0) {
          const bloom = ctx.createRadialGradient(x, y, 0, x, y, radius * (sparkle > 0 ? 5 : 3.4));
          bloom.addColorStop(0, `rgba(112,248,255,${opacity * .38})`); bloom.addColorStop(1, "rgba(62,245,255,0)");
          ctx.fillStyle = bloom; ctx.beginPath(); ctx.arc(x, y, radius * (sparkle > 0 ? 5 : 3.4), 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = star.kind === "hero" ? `rgba(170,251,255,${opacity})` : `rgba(255,255,255,${opacity})`;
        ctx.beginPath(); ctx.arc(x, y, radius + sparkle * .35, 0, Math.PI * 2); ctx.fill();
        if (sparkle > 0) {
          ctx.strokeStyle = `rgba(190,253,255,${sparkle * .28})`; ctx.lineWidth = .55; ctx.beginPath();
          ctx.moveTo(x - 4 * sparkle, y); ctx.lineTo(x + 4 * sparkle, y); ctx.moveTo(x, y - 4 * sparkle); ctx.lineTo(x, y + 4 * sparkle); ctx.stroke();
        }
      }
      if (animated) frame = requestAnimationFrame(draw);
    }

    resize(); observer.observe(hero); window.addEventListener("resize", resize);
    window.addEventListener("hero-role-change", roleChange);
    document.addEventListener("visibilitychange", visibilityChange);
    draw(0);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize);
      window.removeEventListener("hero-role-change", roleChange);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  return <><canvas ref={canvas} className="hero-space-canvas" aria-hidden="true" /><div className="hero-environment" aria-hidden="true"><i /><i /><i /></div></>;
}
