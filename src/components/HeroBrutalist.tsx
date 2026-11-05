"use client";

import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import {
  ArrowDown,
  Sparkles,
  Brain,
  Cpu,
  Database,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

interface HeroBrutalistProps {
  onOpenCommand: () => void;
}

const ROTATING_TEXTS = [
  "Pipelines de RAG & LLMs Híbridos (-78% Tokens)",
  "Aceleração Numérica em GPU (~20x Speedup em CUDA)",
  "Otimizações Clínicas Reais (60 min → 5 min)",
  "Data Warehouses Medalhão (Milhões de Registros no Docker)",
];

export function HeroBrutalist({ onOpenCommand }: HeroBrutalistProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        setFade(true);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToCaseStudies = () => {
    const el = document.getElementById("case-studies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden bg-[#030712]">
      {/* Background Interactive Particle Network */}
      <ParticleNetwork />

      {/* Midnight Glow Radial Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Status Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30 text-xs font-mono text-blue-300 mb-8 backdrop-blur-md shadow-lg shadow-blue-950/60">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Ian Costa Guimarães • UnB & Instituto Eldorado</span>
        </div>

        {/* Monumental Brutalist Title (Inspired by ejosue.com) */}
        <h1 className="flex flex-col items-center font-extrabold tracking-tighter uppercase leading-[0.92] select-none text-zinc-100">
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-zinc-400">
            NOT YOUR
          </span>
          <span className="relative text-5xl sm:text-8xl md:text-9xl lg:text-[10.5rem] bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent my-1 sm:my-2">
            AVERAGE
            {/* Strikethrough Neon Laser Line */}
            <span className="absolute top-1/2 left-0 w-full h-1.5 sm:h-2.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 -translate-y-1/2 rounded shadow-[0_0_22px_rgba(59,130,246,0.95)]" />
          </span>
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white">
            SOFTWARE
          </span>
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-zinc-400">
            ENGINEER.
          </span>
        </h1>

        {/* Rotating Dynamic Subtitle */}
        <div className="mt-8 sm:mt-10 max-w-2xl text-center">
          <p className="text-base sm:text-xl text-zinc-300 font-light flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>Pronto para transformar</span>
            <span
              className={`font-semibold text-cyan-300 px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 transition-all duration-300 shadow-[0_0_18px_rgba(59,130,246,0.25)] ${
                fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {ROTATING_TEXTS[textIndex]}
            </span>
            <span>em realidade.</span>
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl text-left">
          {/* Pillar 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081126]/90 border border-blue-500/25 backdrop-blur-md hover:border-cyan-400/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] hover:-translate-y-1 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Agentes & RAG</h4>
            <p className="text-xs text-zinc-400 mt-1">
              -78% tokens e inferência semântica ultrarrápida com PGVector.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081126]/90 border border-cyan-500/25 backdrop-blur-md hover:border-cyan-400/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] hover:-translate-y-1 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Aceleração GPU</h4>
            <p className="text-xs text-zinc-400 mt-1">
              ~20x speedup em CUDA vs CPU multi-core em simulação numérica.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081126]/90 border border-indigo-500/25 backdrop-blur-md hover:border-indigo-400/60 hover:shadow-[0_0_22px_rgba(99,102,241,0.25)] hover:-translate-y-1 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Data Warehouses</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Milhões de linhas processadas em minutos no Docker com Star Schema.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#081126]/90 border border-blue-500/25 backdrop-blur-md hover:border-cyan-400/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.25)] hover:-translate-y-1 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">1h → 5 min</h4>
            <p className="text-xs text-zinc-400 mt-1">
              -91.6% de tempo de laudo clínico em produção real (MeuCapilar).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToCaseStudies}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Ver Estudos de Caso</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 font-medium text-sm border border-blue-500/25 hover:border-cyan-400/50 transition-all hover:scale-105 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-xs font-bold">E-mail Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span className="font-mono text-xs">{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCommand}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-cyan-300 font-mono text-xs border border-white/10 transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Pressione ⌘K para comandos rápidos</span>
          </button>
        </div>
      </div>
    </section>
  );
}
