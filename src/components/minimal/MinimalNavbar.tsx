"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Command as CommandIcon, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ThemePaletteSelector } from "@/components/ThemePaletteSelector";

interface MinimalNavbarProps {
  onOpenCommand: () => void;
}

export function MinimalNavbar({ onOpenCommand }: MinimalNavbarProps) {
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
        className={`max-w-5xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-300 rounded-full px-5 py-3 border ${
          scrolled
            ? "bg-[#09090b]/90 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/90"
            : "bg-[#09090b]/60 backdrop-blur-md border-white/10"
        }`}
      >
        {/* Brand: Foto + Nome */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="Ir para o topo"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 ring-1 ring-white/10 group-hover:scale-105 transition-all">
            <Image
              src="/avatar.jpg"
              alt="Ian Costa Guimarães"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-zinc-300 transition-colors">
              Ian Costa Guimarães
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              Software Engineer • UnB
            </span>
          </div>
        </a>

        {/* Links Centrais */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a href="#destaques" className="hover:text-white transition-colors">
            Destaques
          </a>
          <a href="#projetos" className="hover:text-white transition-colors">
            Estudos de Caso
          </a>
          <a href="#experiencias" className="hover:text-white transition-colors">
            Trajetória
          </a>
          <a href="#contato" className="hover:text-white transition-colors">
            Contato
          </a>
        </nav>

        {/* Actions & Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Seletor de Paleta */}
          <ThemePaletteSelector />

          {/* Switcher para Versão Midnight Brutalist */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 text-[11px] font-mono text-cyan-300 transition-all hover:scale-105"
            title="Ver versão Midnight Brutalist"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Versão Midnight</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            title="Buscar (Cmd+K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-zinc-400" />
            <kbd className="text-[10px] text-zinc-400">⌘K</kbd>
          </button>

          {/* Social Links */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
