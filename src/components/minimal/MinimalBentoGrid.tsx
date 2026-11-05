"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Database, CheckCircle2, ArrowUpRight } from "lucide-react";
import { PROJECTS, Project } from "@/data/portfolio-data";

interface MinimalBentoGridProps {
  onSelectProject: (project: Project) => void;
}

export function MinimalBentoGrid({ onSelectProject }: MinimalBentoGridProps) {
  const senhoraVera = PROJECTS.find((p) => p.id === "senhora-vera")!;
  const meuCapilar = PROJECTS.find((p) => p.id === "meucapilar")!;
  const gpuMpm = PROJECTS.find((p) => p.id === "gpu-mpm")!;
  const dwVoos = PROJECTS.find((p) => p.id === "data-warehouse-voos")!;

  return (
    <section id="destaques" className="py-16 border-t border-white/10 bg-[#09090b]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              Métricas Chave de Impacto
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-white mt-1">
              Resultados de Engenharia em Números
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Senhora Vera */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectProject(senhoraVera)}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <Brain className="w-5 h-5 text-zinc-300" />
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                -78%
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                Custo de Tokens LLM
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Triagem em TF-IDF com busca vetorial no PGVector e NLI.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5 mt-4">
              Senhora Vera • Eldorado
            </div>
          </motion.div>

          {/* Card 2: MeuCapilar */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectProject(meuCapilar)}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-300" />
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                -91.6%
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                Tempo Operacional
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Emissão de laudo clínico reduzida de 60 para 5 minutos.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5 mt-4">
              MeuCapilar • Produção Real
            </div>
          </motion.div>

          {/* Card 3: GPU MPM */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectProject(gpuMpm)}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <Cpu className="w-5 h-5 text-zinc-300" />
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                ~20x
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                Speedup em GPU CUDA
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Simulação física granular contra CPU multi-core OpenMP.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5 mt-4">
              TCC UnB • Computação Gráfica
            </div>
          </motion.div>

          {/* Card 4: DW Voos */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onSelectProject(dwVoos)}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <Database className="w-5 h-5 text-zinc-300" />
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                Milhões
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                Linhas em Minutos
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Data Warehouse Medalhão com Star Schema 100% Docker.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5 mt-4">
              ETL • PostgreSQL & Power BI
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
