"use client";

import { useEffect } from "react";
import { Project } from "@/data/portfolio-data";
import { useLocale } from "@/context/LocaleContext";
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const { locale } = useLocale();

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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <aside className="relative z-10 w-full max-w-2xl bg-[var(--card)] border-l border-[var(--border)] shadow-2xl flex flex-col h-full overflow-y-auto">
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-full badge-theme">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.period}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={t.closeLabel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 flex-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-sm md:text-base text-slate-400 font-mono">{project.subtitle}</p>

            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-500/30 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.highlight}: {project.highlightMetric}</span>
            </div>
          </div>

          <section className="space-y-2.5">
            <h3 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
              {t.overview}
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {project.overview}
            </p>
          </section>

          <section className="p-4 md:p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-amber-300 font-semibold">
              {t.challenge}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.challenge}</p>
          </section>

          <section className="p-4 md:p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-emerald-300 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              {t.solution}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
              {t.decisions}
            </h3>
            <ul className="space-y-2.5">
              {project.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
              {t.stack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-slate-200"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors border border-white/15"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t.live}
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {t.esc}
          </button>
        </div>
      </aside>
    </div>
  );
}
