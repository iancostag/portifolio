"use client";

import { useEffect, useState } from "react";
import { useThemePalette } from "@/context/ThemeContext";

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);
  const { currentTheme } = useThemePalette();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const glowColor1 = currentTheme.particleColors[0] + "0.12)";
  const glowColor2 = currentTheme.particleColors[1] + "0.05)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity,
        background: `radial-gradient(620px circle at ${position.x}px ${position.y}px, ${glowColor1}, ${glowColor2} 40%, transparent 80%)`,
      }}
    />
  );
}
