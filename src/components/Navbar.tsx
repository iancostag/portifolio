"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Command as CommandIcon, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ThemePaletteSelector } from "@/components/ThemePaletteSelector";

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenFastScan?: () => void;
  currentRoute?: string;
}

export function Navbar({ onOpenCommand, onOpenFastScan, currentRoute = "/" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 rounded-2xl px-4 sm:px-6 py-3 border ${
          scrolled
            ? "bg-[#030712]/90 backdrop-blur-xl border-blue-500/25 shadow-2xl shadow-black/80"
            : "bg-[#040816]/65 backdrop-blur-md border-white/10"
        }`}
      >
        {/* Brand: Foto Real do Ian + Nome & Tagline */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="Ir para o topo"
        >
          {/* Foto circular com ring luminoso */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-400/50 ring-2 ring-blue-500/30 group-hover:ring-cyan-400/70 group-hover:scale-105 transition-all">
            <Image
              src="/avatar.jpg"
              alt="Ian Costa Guimarães"
              fill
              className="object-cover"
              sizes="36px"
            />
            {/* Online Status Dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#030712] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Ian Costa Guimarães
            </span>
            <span className="text-[11px] font-mono text-zinc-400 group-hover:text-blue-300 transition-colors">
              Engenharia de Software • UnB
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
          <a
            href="#case-studies"
            className="hover:text-cyan-300 transition-colors"
          >
            Estudos de Caso
          </a>
          <a
            href="#sobre"
            className="hover:text-cyan-300 transition-colors"
          >
            Sobre
          </a>
          <a
            href="#experiencias"
            className="hover:text-cyan-300 transition-colors"
          >
            Trajetória
          </a>
          <a
            href="#skills"
            className="hover:text-cyan-300 transition-colors"
          >
            Arsenal
          </a>
          <a
            href="#contato"
            className="hover:text-cyan-300 transition-colors"
          >
            Contato
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Palette Live Selector */}
          <ThemePaletteSelector />

          {/* Switcher de Versão */}
          {currentRoute === "/minimal" ? (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-300 hover:text-white transition-all hover:scale-105"
              title="Voltar para a Versão Principal Split 50/50"
            >
              <Sparkles className="w-3 h-3 text-zinc-400" />
              <span className="hidden sm:inline">Versão 50/50 Split</span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
            </Link>
          ) : (
            <Link
              href="/minimal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/25 text-[11px] font-mono text-cyan-300 hover:text-white transition-all hover:scale-105"
              title="Ver Versão Monumental Brutalista"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Modo Monumental</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {/* Fast Scan Button */}
          {onOpenFastScan && (
            <button
              onClick={onOpenFastScan}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-950/40 hover:bg-blue-950/80 border border-blue-500/25 hover:border-cyan-400/40 text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Resumo de 1 Página para Recrutador"
            >
              <span>1-Pág CV</span>
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 hover:bg-blue-950/80 border border-blue-500/30 text-xs font-mono text-blue-300 transition-colors cursor-pointer"
            title="Abrir busca rápida (Cmd+K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Buscar</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Social Icons */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-blue-950/40 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-blue-950/40 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
