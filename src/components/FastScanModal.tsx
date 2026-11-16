"use client";

import { X, Printer } from "lucide-react";
import { getPortfolioData } from "@/data/portfolio-i18n";
import { useLocale } from "@/context/LocaleContext";

interface FastScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastScanModal({ isOpen, onClose }: FastScanModalProps) {
  const { locale } = useLocale();
  const { personalInfo, projects, experiences, skillCategories } = getPortfolioData(locale);

  if (!isOpen) return null;

  const t = locale === "en"
    ? {
        badge: "1-Page Executive Summary",
        print: "Print / Save PDF",
        close: "Close summary",
        subtitle: "Software Engineering (UnB) • Resident AI Researcher (Instituto Eldorado / Softex)",
        summaryTitle: "Executive Summary",
        summaryBody:
          "Software Engineer focused on LLM/RAG Orchestration, Medallion & Star Schema Data Engineering, and GPU-Accelerated Computing (CUDA / Vulkan). Proven production impact: 78% LLM token reduction on hybrid RAG pipelines (Senhora Vera / Eldorado), 60m → 5m clinical report automation in production (MeuCapilar), and ~20x CUDA speedup.",
        projectsTitle: "Featured Projects & Measurable Outcomes",
        expTitle: "Experience & Research",
        skillsTitle: "Technical Competencies",
      }
    : {
        badge: "Visão Rápida para Recrutador & Tech Lead",
        print: "Imprimir / Salvar PDF",
        close: "Fechar resumo",
        subtitle: "Engenharia de Software (UnB) • Pesquisador Residente em IA (Instituto Eldorado / Softex)",
        summaryTitle: "Resumo Executivo",
        summaryBody:
          "Engenheiro de Software com foco em Orquestração de LLMs/RAG, Engenharia de Dados (Medalhão & Star Schema) e Computação Acelerada em GPU (CUDA / Vulkan). Impacto comprovado: redução de 78% no custo de tokens com RAG híbrido (Senhora Vera / Eldorado), redução de laudos clínicos de 60 para 5 minutos em produção (MeuCapilar) e speedup de ~20x em CUDA.",
        projectsTitle: "Projetos em Destaque & Impactos Mensuráveis",
        expTitle: "Trajetória Profissional & Pesquisa",
        skillsTitle: "Competências Técnicas",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.badge}>
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="sticky top-0 z-20 px-6 py-4 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              {t.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-mono border border-emerald-500/30 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.print}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-200 font-sans text-sm">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {personalInfo.name}
            </h2>
            <div className="text-emerald-400 font-mono text-sm mt-1">
              {t.subtitle}
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3">
              <span>{personalInfo.location}</span>
              <span>{personalInfo.email}</span>
              <span>{personalInfo.github}</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {t.summaryTitle}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.summaryBody}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {t.projectsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">{p.title}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 shrink-0">
                      {p.shortMetric || p.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.shortDescription}</p>
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    Stack: {p.technologies.slice(0, 4).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {t.expTitle}
            </h3>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="border-l border-emerald-500/40 pl-3.5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-sm">{exp.role}</span>
                    <span className="text-xs font-mono text-slate-400 shrink-0">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400">{exp.organization}</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{exp.summary}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {t.skillsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="font-semibold text-white">{cat.title}</div>
                  <div className="text-slate-400 font-mono text-xs leading-relaxed">
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
