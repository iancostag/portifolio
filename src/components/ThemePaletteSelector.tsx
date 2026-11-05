"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import {
  useThemePalette,
  THEME_PALETTES,
  ThemePaletteId,
} from "@/context/ThemeContext";

interface ThemePaletteSelectorProps {
  className?: string;
}

export function ThemePaletteSelector({ className = "" }: ThemePaletteSelectorProps) {
  const { currentTheme, setThemeId } = useThemePalette();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const paletteList = Object.values(THEME_PALETTES);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer group"
        title="Alternar paleta de cores e estilo visual"
        aria-label="Selecionar paleta de cor"
        aria-expanded={isOpen}
      >
        {/* Swatch da cor ativa */}
        <span
          className="w-3 h-3 rounded-full border border-white/40 shadow-sm transition-transform group-hover:scale-110"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <Palette className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
        <span className="hidden sm:inline font-sans text-xs font-medium text-zinc-300 group-hover:text-white">
          {currentTheme.name.split("&")[0].trim()}
        </span>
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl p-2.5 bg-[#09090b]/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-white/10 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-semibold tracking-tight text-white">
                Paleta de Cores
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              Ao Vivo
            </span>
          </div>

          <div className="space-y-1">
            {paletteList.map((palette) => {
              const isSelected = palette.id === currentTheme.id;
              return (
                <button
                  key={palette.id}
                  onClick={() => {
                    setThemeId(palette.id as ThemePaletteId);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border border-white/20 shadow-inner"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Circle Swatch */}
                    <div
                      className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0 shadow-md"
                      style={{
                        background:
                          palette.id === "white"
                            ? "linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)"
                            : palette.primary,
                      }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            palette.id === "white" || palette.id === "amber" || palette.id === "emerald"
                              ? "text-black"
                              : "text-white"
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white tracking-tight">
                        {palette.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {palette.label}
                      </span>
                    </div>
                  </div>

                  {/* Gradient Preview Pill */}
                  <div
                    className={`w-10 h-3 rounded-full bg-gradient-to-r ${palette.previewGradient} opacity-80 border border-white/20`}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 px-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Preferência salva localmente</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
              persist
            </kbd>
          </div>
        </div>
      )}
    </div>
  );
}
