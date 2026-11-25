"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/data/portfolio-data";
import { useLocale } from "@/context/LocaleContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectArchitectureDiagram } from "@/components/ProjectArchitectureDiagram";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const { locale } = useLocale();
  const panelRef = useRef<HTMLElement>(null);
  useFocusTrap(panelRef, Boolean(project));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const t = locale === "en"
    ? {
        closeLabel: "Close project details",
        highlight: "Outcome",
        overview: "Overview",
        challenge: "Technical Challenge",
        solution: "Solution & Architecture",
        decisions: "Engineering Decisions & Impact",
        stack: "Stack & Tools",
        repo: "GitHub Repository",
        live: "Live Project",
        esc: "ESC to close",
      }
    : {
        closeLabel: "Fechar gaveta de detalhes",
        highlight: "Impacto",
        overview: "Visão Geral",
        challenge: "O Desafio Técnico",
        solution: "Solução & Arquitetura Adotada",
        decisions: "Decisões de Engenharia & Impactos",
        stack: "Stack & Ferramentas Utilizadas",
        repo: "Repositório GitHub",
        live: "Acessar Projeto",
        esc: "ESC para fechar",
      };

  return (
    <AnimatePresence>
      {project && (
        <div
          key={project.id}
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.22, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.16, ease: "easeIn" } }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ x: "100%", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            className="relative z-10 w-full max-w-2xl h-dvh bg-[var(--card)] border-l border-[var(--border)] shadow-2xl flex flex-col overflow-hidden text-[var(--foreground)]"
          >
            {/* Pinned Header */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-[var(--card)] border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-md bg-[var(--surface-subtle)] text-[var(--muted)] border border-[var(--border)]">
                  {project.categoryLabel}
                </span>
                <span className="text-xs font-mono text-[var(--muted-subtle)] tabular-nums">
                  {project.period}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer shrink-0"
                aria-label={t.closeLabel}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Case Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-7 space-y-8">
              <header className="space-y-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--muted-subtle)] font-mono">
                    {project.subtitle}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] text-xs sm:text-sm font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {t.highlight}: {project.highlightMetric}
                  </span>
                </div>
              </header>

              <ProjectArchitectureDiagram projectId={project.id} locale={locale} />

              <section className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest font-mono text-[var(--muted-subtle)] font-semibold">
                  {t.overview}
                </h3>
                <p className="text-[var(--muted)] leading-[1.7] text-sm sm:text-[15px] max-w-[65ch]">
                  {project.overview}
                </p>
              </section>

              {/* Problem vs. Architecture Contrast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--border)]">
                <section className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest font-mono text-[var(--foreground)] font-semibold">
                    {t.challenge}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </section>

                <section className="space-y-2 md:border-l md:border-[var(--border)] md:pl-6">
                  <h3 className="text-xs uppercase tracking-widest font-mono text-[var(--accent)] font-semibold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{t.solution}</span>
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </section>
              </div>

              <section className="pt-6 border-t border-[var(--border)] space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-mono text-[var(--muted-subtle)] font-semibold">
                  {t.decisions}
                </h3>
                <ul className="space-y-2.5">
                  {project.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm text-[var(--muted)] leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[var(--signal-fg)] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pt-6 border-t border-[var(--border)] space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-mono text-[var(--muted-subtle)] font-semibold">
                  {t.stack}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--surface-subtle)] border border-[var(--border)]/70 text-[var(--foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Pinned Footer */}
            <div className="shrink-0 px-5 sm:px-8 py-4 bg-[var(--card)] border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-10 px-4 rounded-lg bg-[var(--surface-subtle)] hover:border-[var(--border-hover)] text-[var(--foreground)] text-xs sm:text-sm font-medium transition-colors border border-[var(--border)]"
                  >
                    <GithubIcon className="w-4 h-4 shrink-0" />
                    <span>{t.repo}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-10 px-4 rounded-lg bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{t.live}</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-10 px-2 text-xs font-mono text-[var(--muted-subtle)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                {t.esc}
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
