"use client";

import { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolio-data";
import {
  Sparkles,
  ArrowUpRight,
  Layers,
  Cpu,
  Brain,
  Database,
  Smartphone,
} from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = "all" | "ai" | "data" | "fullstack" | "systems";

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filterOptions: { id: FilterCategory; label: string; icon: any }[] = [
    { id: "all", label: "Todos os Projetos", icon: Layers },
    { id: "ai", label: "IA & RAG", icon: Brain },
    { id: "data", label: "Engenharia de Dados", icon: Database },
    { id: "fullstack", label: "Fullstack & Produção", icon: Smartphone },
    { id: "systems", label: "Baixo Nível & GPU", icon: Cpu },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projetos" className="py-20 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo de Projetos
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Arquitetura, Código & Impacto
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Clique em qualquer projeto para abrir a gaveta de arquitetura detalhada, desafios técnicos e decisões de engenharia.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => {
              const Icon = f.icon;
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold"
                      : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-blue-500/40"
              >
                {/* Glow subtle hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 group-hover:bg-blue-500/15 rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{project.period}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>

                  <p className="text-xs font-medium text-zinc-400 mt-1">
                    {project.subtitle}
                  </p>

                  {/* Highlight Metric Pill */}
                  <div className="mt-3.5 inline-block">
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-500/30 text-blue-300">
                      ⚡ {project.highlightMetric}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="mt-4 text-sm text-zinc-300 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Footer with Tech Stack */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors pt-1">
                    <span>Ver detalhes técnicos</span>
                    <span className="text-blue-400">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
