"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemePaletteId = "white" | "blue" | "violet" | "amber" | "emerald";

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  label: string;
  primary: string;
  secondary: string;
  bg: string;
  cardBg: string;
  glow: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  btnBg: string;
  btnText: string;
  previewGradient: string;
  particleColors: string[];
}

export const THEME_PALETTES: Record<ThemePaletteId, ThemePalette> = {
  white: {
    id: "white",
    name: "Pure White & Titanium",
    label: "Apple Pro / Leica",
    primary: "#ffffff",
    secondary: "#e4e4e7",
    bg: "#000000",
    cardBg: "rgba(18, 18, 20, 0.8)",
    glow: "rgba(255, 255, 255, 0.14)",
    border: "rgba(255, 255, 255, 0.18)",
    badgeBg: "rgba(255, 255, 255, 0.1)",
    badgeText: "#ffffff",
    btnBg: "#ffffff",
    btnText: "#000000",
    previewGradient: "from-white via-zinc-200 to-zinc-400",
    particleColors: [
      "rgba(255, 255, 255, ",
      "rgba(228, 228, 231, ",
      "rgba(212, 212, 216, ",
      "rgba(244, 244, 245, ",
    ],
  },
  blue: {
    id: "blue",
    name: "Midnight Ocean & Blue",
    label: "Stripe / GitHub",
    primary: "#38bdf8",
    secondary: "#3b82f6",
    bg: "#030712",
    cardBg: "rgba(8, 15, 32, 0.8)",
    glow: "rgba(59, 130, 246, 0.16)",
    border: "rgba(59, 130, 246, 0.2)",
    badgeBg: "rgba(59, 130, 246, 0.12)",
    badgeText: "#38bdf8",
    btnBg: "#2563eb",
    btnText: "#ffffff",
    previewGradient: "from-blue-500 via-cyan-400 to-indigo-400",
    particleColors: [
      "rgba(59, 130, 246, ",
      "rgba(56, 189, 248, ",
      "rgba(37, 99, 235, ",
      "rgba(96, 165, 250, ",
    ],
  },
  violet: {
    id: "violet",
    name: "Electric Violet & Lavanda",
    label: "Linear / Raycast",
    primary: "#c084fc",
    secondary: "#8b5cf6",
    bg: "#08070e",
    cardBg: "rgba(14, 11, 24, 0.8)",
    glow: "rgba(139, 92, 246, 0.16)",
    border: "rgba(139, 92, 246, 0.2)",
    badgeBg: "rgba(139, 92, 246, 0.12)",
    badgeText: "#c084fc",
    btnBg: "#7c3aed",
    btnText: "#ffffff",
    previewGradient: "from-purple-500 via-violet-400 to-indigo-400",
    particleColors: [
      "rgba(139, 92, 246, ",
      "rgba(192, 132, 252, ",
      "rgba(168, 85, 247, ",
      "rgba(99, 102, 241, ",
    ],
  },
  amber: {
    id: "amber",
    name: "Sunset Amber & Laranja",
    label: "Rust / Datadog",
    primary: "#fbbf24",
    secondary: "#f59e0b",
    bg: "#08080a",
    cardBg: "rgba(18, 14, 10, 0.8)",
    glow: "rgba(245, 158, 11, 0.16)",
    border: "rgba(245, 158, 11, 0.2)",
    badgeBg: "rgba(245, 158, 11, 0.12)",
    badgeText: "#fbbf24",
    btnBg: "#f59e0b",
    btnText: "#000000",
    previewGradient: "from-amber-400 via-orange-500 to-yellow-300",
    particleColors: [
      "rgba(245, 158, 11, ",
      "rgba(251, 191, 36, ",
      "rgba(249, 115, 22, ",
      "rgba(253, 224, 71, ",
    ],
  },
  emerald: {
    id: "emerald",
    name: "Cyber Emerald & Mint",
    label: "Supabase / Matrix",
    primary: "#34d399",
    secondary: "#10b981",
    bg: "#030508",
    cardBg: "rgba(6, 12, 18, 0.8)",
    glow: "rgba(16, 185, 129, 0.16)",
    border: "rgba(16, 185, 129, 0.2)",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeText: "#34d399",
    btnBg: "#10b981",
    btnText: "#000000",
    previewGradient: "from-emerald-400 via-teal-300 to-cyan-400",
    particleColors: [
      "rgba(16, 185, 129, ",
      "rgba(52, 211, 153, ",
      "rgba(6, 182, 212, ",
      "rgba(0, 245, 160, ",
    ],
  },
};

interface ThemeContextType {
  currentTheme: ThemePalette;
  setThemeId: (id: ThemePaletteId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: THEME_PALETTES.white,
  setThemeId: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemePaletteId>("white");

  useEffect(() => {
    const saved = localStorage.getItem("ian-portfolio-theme") as ThemePaletteId;
    if (saved && THEME_PALETTES[saved]) {
      setThemeIdState(saved);
      document.documentElement.dataset.palette = saved;
    } else {
      document.documentElement.dataset.palette = "white";
    }
  }, []);

  const setThemeId = (id: ThemePaletteId) => {
    setThemeIdState(id);
    localStorage.setItem("ian-portfolio-theme", id);
    document.documentElement.dataset.palette = id;
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: THEME_PALETTES[themeId] || THEME_PALETTES.white,
        setThemeId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePalette() {
  return useContext(ThemeContext);
}
