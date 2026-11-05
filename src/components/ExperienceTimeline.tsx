"use client";

import { motion } from "framer-motion";
import { EXPERIENCES, Experience } from "@/data/portfolio-data";
import { Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import {
  EldoradoLogo,
  StudioFlavioLogo,
  SpuItracLogo,
  SingularGovLogo,
  UnbLogo,
} from "@/components/CompanyLogos";

export function ExperienceTimeline() {
  const getLogo = (logoKey: Experience["logoKey"]) => {
    switch (logoKey) {
      case "eldorado":
        return <EldoradoLogo className="w-10 h-10 shadow-lg shadow-blue-500/20" />;
      case "flavio":
        return <StudioFlavioLogo className="w-10 h-10 shadow-lg shadow-cyan-500/20" />;
      case "spu":
        return <SpuItracLogo className="w-10 h-10 shadow-lg shadow-indigo-500/20" />;
      case "singular":
        return <SingularGovLogo className="w-10 h-10 shadow-lg shadow-blue-500/20" />;
      case "unb":
        return <UnbLogo className="w-10 h-10 shadow-lg shadow-cyan-500/20" />;
      default:
        return <EldoradoLogo className="w-10 h-10" />;
    }
  };

  return (
    <section id="experiencias" className="py-24 border-t border-blue-500/15 relative bg-[#030712] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Trajetória Profissional & Pesquisa
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Experiência em IA, Dados & Sistemas
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-light">
            Atuação na interseção entre institutos de inovação científica, órgãos públicos e produtos em ambiente de produção.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-blue-500/25 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-6 sm:pl-12 group"
            >
              {/* Timeline Bullet with Logo Glow */}
              <div
                className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  exp.current
                    ? "bg-[#030712] border-cyan-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
                    : "bg-[#030712] border-blue-500/40 group-hover:border-cyan-400 group-hover:scale-110"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    exp.current ? "bg-cyan-400 animate-ping" : "bg-blue-400"
                  }`}
                />
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/20 hover:border-cyan-400/50 hover:shadow-[0_16px_40px_rgba(59,130,246,0.2)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  {/* Company Logo + Role Title */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-1 rounded-2xl bg-black/40 border border-blue-500/30 group-hover:scale-105 transition-transform">
                      {getLogo(exp.logoKey)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-blue-400 font-mono mt-0.5">
                        {exp.organization}
                      </div>
                    </div>
                  </div>

                  {/* Period & Location Pills */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlight Metric Pill (Métrica de Destaque) */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold mb-4 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Destaque: {exp.highlightMetric}</span>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5 font-light">
                  {exp.summary}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-2.5 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-950/50 text-cyan-200 border border-blue-500/25"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
