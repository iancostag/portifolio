"use client";

import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Layers,
  Sparkles,
  FileDown,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onExploreProjects: () => void;
  onOpenCommand: () => void;
}

export function Hero({ onExploreProjects, onOpenCommand }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-radial-glow pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pesquisador Residente em IA • Instituto Eldorado & UnB</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Engenharia de Software para{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              IA, Dados & Alta Performance
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl pt-2">
            Olá, eu sou <strong className="text-white font-semibold">Ian Costa Guimarães</strong>. 
            Desenvolvo sistemas robustos combinando{" "}
            <span className="text-blue-400 font-medium">orquestração de LLMs/RAG</span>,{" "}
            <span className="text-emerald-400 font-medium">arquitetura de dados</span> e{" "}
            <span className="text-purple-400 font-medium">computação acelerada em GPU (CUDA)</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreProjects}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explorar Projetos & Arquiteturas</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 font-medium text-sm border border-white/10 transition-all hover:-translate-y-0.5 cursor-pointer"
            title="Copiar e-mail"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs">E-mail Copiado!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
                <Copy className="w-3.5 h-3.5 text-zinc-400 ml-1" />
              </>
            )}
          </button>

          <button
            onClick={onOpenCommand}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pressione ⌘K para buscar rapidamente</span>
          </button>
        </div>

        {/* Bento Grid de Destaques Imediatos (Para Recrutador / 15 segundos de leitura) */}
        <div id="destaques" className="mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Destaques de Impacto & Especialidades
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bloco 1: IA & RAG */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-blue-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Agentes & RAG Híbrido</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Pipelines de checagem com NLI, PGVector e classificação estilística via PLN (Projeto Senhora Vera).
              </p>
              <div className="mt-3 text-[11px] font-mono text-blue-400">
                Eldorado • Softex • UnB
              </div>
            </div>

            {/* Bloco 2: Otimização de Produção */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-emerald-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">1h → 5 min no MeuCapilar</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Otimização relacional em PostgreSQL e automação clínica reduzindo drasticamente tempo de laudo em produção.
              </p>
              <div className="mt-3 text-[11px] font-mono text-emerald-400">
                PostgreSQL • Produção Real
              </div>
            </div>

            {/* Bloco 3: GPU & CUDA */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Aceleração GPU / CUDA</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Pesquisa de ponta em TCC para simulação física granular (MPM) com C++, CUDA, Vulkan e OpenMP.
              </p>
              <div className="mt-3 text-[11px] font-mono text-purple-400">
                HPC • C++ • Hardware Paralelo
              </div>
            </div>

            {/* Bloco 4: Liderança & Requisitos */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-amber-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Liderança & Engenharia</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Gestão de 20 engenheiros no projeto Micromouse, coautoria em artigo SBQS e Service Blueprints.
              </p>
              <div className="mt-3 text-[11px] font-mono text-amber-400">
                UnB • SPU-ITRAC • SBQS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
