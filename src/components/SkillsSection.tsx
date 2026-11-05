"use client";

import { SKILL_CATEGORIES, PERSONAL_INFO } from "@/data/portfolio-data";
import {
  Brain,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Award,
  Globe2,
  CheckCircle,
} from "lucide-react";

export function SkillsSection() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain":
        return Brain;
      case "Cpu":
        return Cpu;
      case "Database":
        return Database;
      default:
        return Layers;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-blue-500/15 relative bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 px-3.5 py-1 rounded-full bg-blue-950/50 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Competências Técnicas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Arsenal Tecnológico Completo
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-light">
            Especialidades práticas em inteligência artificial, computação de alto desempenho, dados e entrega contínua.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            return (
              <div
                key={category.title}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/20 hover:border-cyan-400/50 hover:shadow-[0_16px_40px_rgba(59,130,246,0.18)] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-blue-950/40 hover:bg-blue-900/40 text-zinc-200 border border-blue-500/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Info: Idiomas e Certificações */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certificações */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Certificações</h3>
            </div>
            <div className="space-y-2.5">
              {PERSONAL_INFO.certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe2 className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Idiomas</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {PERSONAL_INFO.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center gap-2 text-xs"
                >
                  <span className="font-semibold text-white">{lang.name}:</span>
                  <span className="font-mono text-cyan-300">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
