"use client";

import { X, Printer } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from "@/data/portfolio-data";

interface FastScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastScanModal({ isOpen, onClose }: FastScanModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#050b18] border border-blue-500/35 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#050b18]/95 backdrop-blur-md border-b border-blue-500/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Visão Rápida para Recrutador & Tech Lead
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/35 text-cyan-300 text-xs font-mono border border-blue-500/35 transition-colors cursor-pointer"
              title="Imprimir ou Salvar como PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-200 font-sans text-sm">
          {/* Identificação */}
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {PERSONAL_INFO.name}
            </h2>
            <div className="text-cyan-400 font-mono text-sm mt-1">
              Engenharia de Software (UnB) • Pesquisador Residente em IA (Instituto Eldorado / Softex)
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 mt-3">
              <span>📍 {PERSONAL_INFO.location}</span>
              <span>✉️ {PERSONAL_INFO.email}</span>
              <span>🔗 {PERSONAL_INFO.github}</span>
              <span>💼 {PERSONAL_INFO.linkedin}</span>
            </div>
          </div>

          {/* Resumo Executivo */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Resumo Executivo
            </h3>
            <p className="text-zinc-300 leading-relaxed font-light">
              Engenheiro de Software com foco em <strong>Orquestração de LLMs / RAG</strong>, <strong>Engenharia de Dados (Medalhão & Star Schema)</strong> e <strong>Computação Acelerada em GPU (CUDA / Vulkan)</strong>. Histórico comprovado de impacto: redução de 78% em custos de inferência com pipelines híbridos de IA e otimização de banco de dados em produção real diminuindo tempos de processo de 60 para 5 minutos.
            </p>
          </div>

          {/* Top 4 Projetos com Impacto Mensurável */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Projetos em Destaque & Impactos Mensuráveis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.slice(0, 4).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{p.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300">
                      {p.highlightMetric}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.shortDescription}</p>
                  <div className="text-[10px] font-mono text-zinc-500 pt-1">
                    Stack: {p.technologies.slice(0, 4).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico Profissional */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Trajetória Profissional & Pesquisa
            </h3>
            <div className="space-y-3">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-cyan-500/30 pl-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{exp.role}</span>
                    <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400">{exp.organization}</div>
                  <div className="text-xs text-zinc-300 leading-relaxed">{exp.summary}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Arsenal de Tecnologias */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Competências Técnicas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-white">{cat.title}:</div>
                  <div className="text-zinc-400 font-mono text-[11px] leading-relaxed">
                    {cat.skills.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
