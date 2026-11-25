"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const t = locale === "en"
    ? {
        badge: "1-Page Executive CV",
        print: "Print / PDF",
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
        badge: "Resumo Executivo (1 Página)",
        print: "Imprimir / PDF",
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
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.badge}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            data-print-resume
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 6,
              transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
            }}
            className="relative z-10 w-full max-w-4xl max-h-[92dvh] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[var(--foreground)]"
          >
        {/* Pinned Header — wraps gracefully on 390px screens */}
        <div className="sticky top-0 z-20 shrink-0 px-4 sm:px-6 py-3.5 bg-[var(--card)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
            <span className="text-xs font-mono font-semibold text-[var(--foreground)] uppercase tracking-widest truncate">
              {t.badge}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-lg bg-[var(--cta-bg)] text-[var(--cta-fg)] hover:bg-[var(--cta-hover)] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{t.print}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="inline-flex items-center justify-center gap-1 min-h-9 px-2.5 rounded-lg text-xs font-mono text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">[{t.esc}]</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Executive Resume Body — clean editorial rules instead of nested boxes */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-7 space-y-8 font-sans text-sm">
          <header className="border-b border-[var(--border)] pb-5 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {personalInfo.name}
            </h2>
            <p className="text-[var(--accent)] font-mono text-xs sm:text-sm">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-[var(--muted-subtle)] pt-1 break-all">
              <span>{personalInfo.location}</span>
              <span>{personalInfo.email}</span>
              <span>{personalInfo.github}</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          </header>

          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-semibold">
              {t.summaryTitle}
            </h3>
            <p className="text-[var(--muted)] leading-relaxed max-w-[70ch]">
              {t.summaryBody}
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-semibold">
              {t.projectsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="pt-3 border-t border-[var(--border)]/60 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-[var(--foreground)] text-sm">
                      {p.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] shrink-0 font-semibold tabular-nums">
                      {p.shortMetric || p.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {p.shortDescription}
                  </p>
                  <div className="text-xs font-mono text-[var(--muted-subtle)] pt-0.5">
                    {p.technologies.slice(0, 4).join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-semibold">
              {t.expTitle}
            </h3>
            <div className="divide-y divide-[var(--border)]/60">
              {experiences.map((exp, idx) => (
                <div key={idx} className="py-3 first:pt-1 last:pb-0 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="font-semibold text-[var(--foreground)] text-sm">
                      {exp.role}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted-subtle)] shrink-0 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[var(--accent)]">
                    {exp.organization}
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed max-w-[70ch]">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-semibold">
              {t.skillsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="space-y-1">
                  <div className="font-semibold text-[var(--foreground)]">
                    {cat.title}
                  </div>
                  <div className="text-[var(--muted-subtle)] font-mono leading-relaxed">
                    {cat.skills.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
