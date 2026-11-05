"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 py-10 bg-[#07080c] text-xs font-mono text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-zinc-300 font-medium">Ian Costa Guimarães</span>
          <span className="mx-2 text-zinc-700">•</span>
          <span>Engenharia de Software (UnB) & Pesquisa em IA</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-400">Desenvolvido com Next.js & Tailwind</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
            title="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
