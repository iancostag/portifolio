"use client";

import { EXPERIENCES, Experience } from "@/data/portfolio-data";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import {
  EldoradoLogo,
  StudioFlavioLogo,
  SpuItracLogo,
  SingularGovLogo,
  UnbLogo,
} from "@/components/CompanyLogos";

export function MinimalExperience() {
  const getLogo = (logoKey: Experience["logoKey"]) => {
    switch (logoKey) {
      case "eldorado":
        return <EldoradoLogo className="w-8 h-8" />;
      case "flavio":
        return <StudioFlavioLogo className="w-8 h-8" />;
      case "spu":
        return <SpuItracLogo className="w-8 h-8" />;
      case "singular":
        return <SingularGovLogo className="w-8 h-8" />;
      case "unb":
        return <UnbLogo className="w-8 h-8" />;
      default:
        return <EldoradoLogo className="w-8 h-8" />;
    }
  };

  return (
    <section id="experiencias" className="py-20 border-t border-white/10 bg-[#09090b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            Trajetória Profissional
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Pesquisa, Indústria & Liderança
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/25 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3.5">
                  <div className="p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
                    {getLogo(exp.logoKey)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mt-0.5">
                      {exp.organization}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Métrica de Destaque */}
              <div className="my-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-200">
                  ⚡ {exp.highlightMetric}
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light mb-4">
                {exp.summary}
              </p>

              <div className="space-y-1.5 mb-4">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
