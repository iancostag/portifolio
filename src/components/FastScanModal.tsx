"use client";

import { useEffect, useRef } from "react";
import { X, Printer } from "lucide-react";
import { getPortfolioData } from "@/data/portfolio-i18n";
import { useLocale } from "@/context/LocaleContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface FastScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastScanModal({ isOpen, onClose }: FastScanModalProps) {
  const { locale } = useLocale();
  const { personalInfo, projects, experiences, skillCategories } = getPortfolioData(locale);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = locale === "en"
    ? {
        badge: "1-Page Executive Summary",
        print: "Print / Save PDF",
        close: "Close summary",
        esc: "ESC",
        subtitle: "Data Engineering & AI (Instituto Eldorado / Softex) • Software Engineering (UnB)",
        summaryTitle: "Executive Summary",
        summaryBody:
          "Data & AI Engineer focused on Medallion & Star Schema Data Engineering, LLM/RAG Orchestration, and GPU-Accelerated Computing (CUDA / Vulkan). Proven production impact: 75% LLM token reduction on hybrid RAG pipelines (Senhora Vera / Eldorado), 60m → 5m clinical report automation in production (MeuCapilar), and parallel MPM simulation in CUDA / C++.",
        projectsTitle: "Featured Projects & Measurable Outcomes",
        expTitle: "Experience & Research",
        skillsTitle: "Technical Competencies",
      }
    : {
        badge: "Visão Rápida para Recrutador & Tech Lead",
        print: "Imprimir / Salvar PDF",
        close: "Fechar resumo",
        esc: "ESC",
        subtitle: "Engenharia de Dados & IA (Instituto Eldorado / Softex) • Engenharia de Software (UnB)",
        summaryTitle: "Resumo Executivo",
        summaryBody:
          "Engenheiro de Dados & IA com foco em Engenharia de Dados (Medalhão & Star Schema), Orquestração de LLMs/RAG e Computação Acelerada em GPU (CUDA / Vulkan). Impacto comprovado: redução de 75% no custo de tokens com RAG híbrido (Senhora Vera / Eldorado), redução de laudos clínicos de 60 para 5 minutos em produção (MeuCapilar) e simulação paralela MPM em CUDA / C++.",
        projectsTitle: "Projetos em Destaque & Impactos Mensuráveis",
        expTitle: "Trajetória Profissional & Pesquisa",
        skillsTitle: "Competências Técnicas",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.badge}>
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        data-print-resume
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[var(--foreground)]"
      >
        <div className="sticky top-0 z-20 px-6 py-4 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono font-bold text-[var(--foreground)] uppercase tracking-widest">
              {t.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--cta-bg)] text-[var(--cta-fg)] hover:bg-[var(--cta-hover)] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.print}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="px-2 py-1 rounded-lg text-xs font-mono text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>[{t.esc}]</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-sm">
          <div className="border-b border-[var(--border)] pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              {personalInfo.name}
            </h2>
            <div className="text-[var(--accent)] font-mono text-sm mt-1">
              {t.subtitle}
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--muted-subtle)] mt-3">
              <span>{personalInfo.location}</span>
              <span>{personalInfo.email}</span>
              <span>{personalInfo.github}</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] font-bold">
              {t.summaryTitle}
            </h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.summaryBody}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] font-bold">
              {t.projectsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[var(--foreground)] text-sm">{p.title}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] shrink-0 font-semibold">
                      {p.shortMetric || p.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{p.shortDescription}</p>
                  <div className="text-xs font-mono text-[var(--muted-subtle)] pt-1">
                    Stack: {p.technologies.slice(0, 4).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] font-bold">
              {t.expTitle}
            </h3>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-[var(--border)] pl-3.5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[var(--foreground)] text-sm">{exp.role}</span>
                    <span className="text-xs font-mono text-[var(--muted-subtle)] shrink-0">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-[var(--accent)]">{exp.organization}</div>
                  <div className="text-xs text-[var(--muted)] leading-relaxed">{exp.summary}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] font-bold">
              {t.skillsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] space-y-1">
                  <div className="font-semibold text-[var(--foreground)]">{cat.title}</div>
                  <div className="text-[var(--muted-subtle)] font-mono text-xs leading-relaxed">
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
