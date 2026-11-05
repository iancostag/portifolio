"use client";

import { useEffect } from "react";
import { Project } from "@/data/portfolio-data";
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-2xl bg-[#040816] border-l border-blue-500/30 shadow-2xl flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-[#040816]/95 backdrop-blur-md border-b border-blue-500/25">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/30">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-zinc-400">{project.period}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar gaveta de detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-base text-zinc-400 font-mono">{project.subtitle}</p>

            {/* Destaque principal */}
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-950/60 text-cyan-300 border border-blue-500/40 text-sm font-semibold shadow-lg shadow-blue-950/50">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Destaque: {project.highlightMetric}</span>
            </div>
          </div>

          {/* Visão Geral */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold">
              Visão Geral
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {project.overview}
            </p>
          </section>

          {/* O Desafio Técnico */}
          <section className="p-4 md:p-5 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-red-400 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              O Desafio Técnico
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{project.challenge}</p>
          </section>

          {/* A Solução & Arquitetura */}
          <section className="p-4 md:p-5 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Solução & Arquitetura Adotada
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{project.solution}</p>
          </section>

          {/* Pontos-Chave */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold">
              Decisões de Engenharia & Impactos
            </h3>
            <ul className="space-y-2.5">
              {project.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tecnologias */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-bold">
              Stack & Ferramentas Utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 p-6 bg-[#040816]/95 backdrop-blur-md border-t border-blue-500/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10"
              >
                <GithubIcon className="w-4 h-4" />
                Repositório GitHub
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-600/30"
              >
                <ExternalLink className="w-4 h-4" />
                Acessar Projeto
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Pressione [ESC] para fechar
          </button>
        </div>
      </aside>
    </div>
  );
}
