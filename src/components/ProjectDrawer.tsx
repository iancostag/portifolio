"use client";

import { useEffect, useRef } from "react";
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
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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
        esc: "Press [ESC] to close",
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
        esc: "Pressione [ESC] para fechar",
      };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={project.title}>
      <div
        className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <aside ref={panelRef} className="relative z-10 w-full max-w-2xl bg-[var(--card)] border-l border-[var(--border)] shadow-2xl flex flex-col h-full overflow-y-auto text-[var(--foreground)]">
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-full bg-[var(--surface-subtle)] text-[var(--muted)] border border-[var(--border)]">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-[var(--muted-subtle)]">{project.period}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
            aria-label={t.closeLabel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 flex-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-sm md:text-base text-[var(--muted-subtle)] font-mono">{project.subtitle}</p>

            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] text-sm font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t.highlight}: {project.highlightMetric}</span>
            </div>
          </div>

          <ProjectArchitectureDiagram projectId={project.id} locale={locale} />

          <section className="space-y-2.5">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--muted-subtle)] font-bold">
              {t.overview}
            </h3>
            <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
              {project.overview}
            </p>
          </section>

          <section className="p-4 md:p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--foreground)] font-semibold">
              {t.challenge}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{project.challenge}</p>
          </section>

          <section className="p-4 md:p-5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--accent)] font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              {t.solution}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{project.solution}</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--muted-subtle)] font-bold">
              {t.decisions}
            </h3>
            <ul className="space-y-2.5">
              {project.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--signal-fg)] mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-[var(--muted-subtle)] font-bold">
              {t.stack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 p-6 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface-subtle)] hover:opacity-90 text-[var(--foreground)] text-sm font-medium transition-opacity border border-[var(--border)]"
              >
                <GithubIcon className="w-4 h-4" />
                {t.repo}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t.live}
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-[var(--muted-subtle)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            {t.esc}
          </button>
        </div>
      </aside>
    </div>
  );
}
