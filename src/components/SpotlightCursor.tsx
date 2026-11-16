"use client";

import { useEffect, useRef } from "react";
import { useThemePalette } from "@/context/ThemeContext";

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTheme } = useThemePalette();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let rafId = 0;
    let lastX = -1000;
    let lastY = -1000;
    const glowColor1 = currentTheme.particleColors[0] + "0.10)";
    const glowColor2 = currentTheme.particleColors[1] + "0.04)";

    const update = () => {
      rafId = 0;
      if (!ref.current) return;
      ref.current.style.opacity = "1";
      ref.current.style.background = `radial-gradient(620px circle at ${lastX}px ${lastY}px, ${glowColor1}, ${glowColor2} 40%, transparent 80%)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const handleMouseLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [currentTheme]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
    />
  );
}
