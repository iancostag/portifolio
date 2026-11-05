"use client";

import { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolio-data";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface MinimalProjectsProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = "all" | "ai" | "data" | "fullstack" | "systems";

export function MinimalProjects({ onSelectProject }: MinimalProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filterOptions: { id: FilterCategory; label: string }[] = [
    { id: "all", label: "Todos" },
    { id: "ai", label: "IA & RAG" },
    { id: "data", label: "Engenharia de Dados" },
    { id: "fullstack", label: "Fullstack & Produção" },
    { id: "systems", label: "Baixo Nível & GPU" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projetos" className="py-20 border-t border-white/10 bg-[#09090b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              Projetos & Arquiteturas
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Engenharia Aplicada & Estudos de Caso
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-zinc-900 border border-white/10">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/25 hover:bg-zinc-900/70 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">• {project.period}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className="text-xs font-normal text-zinc-400 font-sans hidden sm:inline">— {project.subtitle}</span>
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lado Direito: Métrica & Botão */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
                    ⚡ {project.highlightMetric}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>Ver arquitetura</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
