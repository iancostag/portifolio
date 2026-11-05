"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project, PROJECTS } from "@/data/portfolio-data";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu,
  Brain,
  Database,
  CheckCircle2,
  Activity,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface CaseStudiesSectionProps {
  onSelectProject: (project: Project) => void;
}

export function CaseStudiesSection({ onSelectProject }: CaseStudiesSectionProps) {
  const [tabVera, setTabVera] = useState<"sim" | "code">("sim");
  const [tabCapilar, setTabCapilar] = useState<"bench" | "code">("bench");
  const [tabGpu, setTabGpu] = useState<"bench" | "code">("bench");
  const [tabDw, setTabDw] = useState<"schema" | "code">("schema");

  const senhoraVera = PROJECTS.find((p) => p.id === "senhora-vera")!;
  const meuCapilar = PROJECTS.find((p) => p.id === "meucapilar")!;
  const gpuMpm = PROJECTS.find((p) => p.id === "gpu-mpm")!;
  const dwVoos = PROJECTS.find((p) => p.id === "data-warehouse-voos")!;

  const otherProjects = PROJECTS.filter(
    (p) => !["senhora-vera", "meucapilar", "gpu-mpm", "data-warehouse-voos"].includes(p.id)
  );

  return (
    <section id="case-studies" className="py-24 border-t border-emerald-500/10 relative overflow-hidden bg-[#030508]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header (Inspired by ejosue.com "Case Studies:") */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia & Impacto Mensurável
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            Estudos de Caso:
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-3 max-w-2xl font-light">
            Arquiteturas de alto nível, decisões técnicas e métricas reais de performance e negócio.
          </p>
        </motion.div>

        {/* ========================================================
            CASE STUDY 1: SENHORA VERA (-75% Tokens / <180ms)
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="mb-20 glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story / Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {senhoraVera.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">• Out/2026</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {senhoraVera.title}
              </h3>
              <p className="text-sm font-mono text-emerald-300">
                Instituto Eldorado, Softex & UnB — Agente Híbrido de Fact-Checking
              </p>

              {/* KPI Stat Callouts (Opção 1: Números Gigantes de Impacto Imediato) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-emerald-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    -78%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Custo de Tokens
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500/80 block mt-0.5">Triagem TF-IDF</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-cyan-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-tight">
                    &lt; 180ms
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Latência Média
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block mt-0.5">Antes: 3 a 5 seg</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#04060a] border border-teal-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-teal-300 font-mono tracking-tight">
                    94.7%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Precisão NLI
                  </div>
                  <span className="text-[9px] font-mono text-teal-400/80 block mt-0.5">PGVector + LLMs</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Desenvolvido no contexto de pesquisa aplicada no <strong>Instituto Eldorado & Softex</strong>. A triagem estatística prévia com TF-IDF descarta ruídos em microssegundos, acionando o pipeline vetorial (PGVector) e inferência NLI apenas nos casos complexos.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {senhoraVera.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-emerald-500/20 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={() => onSelectProject(senhoraVera)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/25 cursor-pointer hover:scale-105"
                >
                  <span>Ver Detalhes do Projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {senhoraVera.repoUrl && (
                  <a
                    href={senhoraVera.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono border border-white/10 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Visual Simulator & Real Code Tabs */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#04060a] border border-emerald-500/20 overflow-hidden shadow-2xl font-mono text-xs">
                {/* Tabs Header */}
                <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-emerald-500/20 text-[11px]">
                    <button
                      onClick={() => setTabVera("sim")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabVera === "sim"
                          ? "bg-emerald-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Simulador
                    </button>
                    <button
                      onClick={() => setTabVera("code")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabVera === "code"
                          ? "bg-emerald-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Código Python
                    </button>
                  </div>
                </div>

                {/* Content */}
                {tabVera === "sim" ? (
                  <div className="p-5 space-y-3.5 text-zinc-300">
                    <div className="text-zinc-500 flex items-center gap-2">
                      <span className="text-emerald-400">$</span> python3 orchestrator.py --eval-claim
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-zinc-200">
                      <span className="text-cyan-400 font-semibold">[Claim]</span> &quot;Alegação estatística factual submetida&quot;
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <div className="text-emerald-400 flex items-center justify-between">
                        <span>✓ Triagem TF-IDF / Reg. Logística:</span>
                        <strong className="text-emerald-300 font-mono">0.88 (PASS - 8ms)</strong>
                      </div>
                      <div className="text-cyan-400 flex items-center justify-between">
                        <span>✓ PGVector Cosine Distance:</span>
                        <strong className="text-cyan-300 font-mono">0.142 (Top 3 Chunks)</strong>
                      </div>
                      <div className="text-teal-400 flex items-center justify-between">
                        <span>✓ NLI Entailment Confidence:</span>
                        <strong className="text-teal-300 font-mono">94.7% VERIFIED</strong>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-500/20 text-emerald-300 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        ECONOMIA DE TOKENS: 78%
                      </span>
                      <span className="text-zinc-400 font-mono text-[10px]">Total: 142ms</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2 text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                    <div className="text-zinc-500 font-mono"># Pipeline Híbrido: TF-IDF + PGVector</div>
                    <pre className="text-emerald-300 font-mono">
{`# 1. Triagem rápida em microssegundos
score = tfidf_classifier.predict_proba([claim])[0][1]
if score < 0.35:
    return {"status": "DISCARDED_NOISE", "cost": 0.0}

# 2. Busca Semântica em PostgreSQL PGVector
emb = embed_model.encode(claim).tolist()
res = session.execute(
    text("""SELECT chunk, 1 - (vec <=> :e) AS sim
            FROM factual_chunks 
            ORDER BY sim DESC LIMIT 3"""),
    {"e": emb}
).fetchall()`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CASE STUDY 2: MEUCAPILAR (60 min → 5 min / -91.6%)
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="mb-20 glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story / Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {meuCapilar.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">• Produção Real</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {meuCapilar.title}
              </h3>
              <p className="text-sm font-mono text-cyan-300">
                Studio Flávio Rabello — Otimização Clínica Crítica
              </p>

              {/* KPI Stat Callouts (Opção 1: Números Gigantes de Impacto Imediato) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-cyan-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-tight">
                    -91.6%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Tempo Operacional
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block mt-0.5">Ganho Direto</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-emerald-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    5 min
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Emissão de Laudo
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500/80 block mt-0.5">Antes: 60 minutos</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#04060a] border border-teal-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-teal-300 font-mono tracking-tight">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Produção Real
                  </div>
                  <span className="text-[9px] font-mono text-teal-400/80 block mt-0.5">Studio Flávio Rabello</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Manutenção de infraestrutura e reestruturação completa da plataforma médica. Redução drástica através de normalização relacional em PostgreSQL, índices compostos e automação de regras de negócio validadas por testes automatizados.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {meuCapilar.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-cyan-500/20 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="pt-3">
                <button
                  onClick={() => onSelectProject(meuCapilar)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-105"
                >
                  <span>Ver Detalhes do Projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Performance Visualizer Card & SQL Tabs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl bg-[#04060a] border border-cyan-500/20 overflow-hidden shadow-2xl font-mono text-xs">
                {/* Tabs Header */}
                <div className="px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-cyan-500/20 text-[11px]">
                    <button
                      onClick={() => setTabCapilar("bench")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabCapilar === "bench"
                          ? "bg-cyan-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Benchmark
                    </button>
                    <button
                      onClick={() => setTabCapilar("code")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabCapilar === "code"
                          ? "bg-cyan-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      SQL Otimizado
                    </button>
                  </div>
                </div>

                {/* Content */}
                {tabCapilar === "bench" ? (
                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-cyan-500/20 pb-3">
                      <span className="text-cyan-400 font-bold">BENCHMARK DE PRODUTIVIDADE</span>
                      <span className="text-emerald-400 font-bold">-91.6% TEMPO</span>
                    </div>

                    {/* Antes */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">Antes (Geração Manual / Gargalo):</span>
                        <span className="text-red-400 font-bold">60 minutos</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-red-500/80 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Depois */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-200">Depois (MeuCapilar Otimizado):</span>
                        <span className="text-emerald-400 font-bold">5 minutos</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "8.3%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] font-mono text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>PostgreSQL Normalizado com Índices Compostos</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Geração de laudos clínicos em segundos</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2 text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                    <div className="text-zinc-500 font-mono">-- Otimização Relacional de Anamnese</div>
                    <pre className="text-cyan-300 font-mono">
{`-- Índice composto para busca instantânea de laudo
CREATE INDEX CONCURRENTLY idx_laudos_paciente_data
ON laudos_clinicos (paciente_id, data_criacao DESC)
INCLUDE (status, score_densidade);

-- Consulta analítica com plano de execução < 4ms
SELECT l.id, p.nome_completo, l.diagnostico_json
FROM laudos_clinicos l
JOIN pacientes p ON p.id = l.paciente_id
WHERE l.status = 'CONCLUIDO'
ORDER BY l.data_criacao DESC LIMIT 1;`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CASE STUDY 3: GPU MPM (~20x Speedup em CUDA)
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="mb-20 glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition-all" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story / Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {gpuMpm.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">• TCC UnB 2026</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {gpuMpm.title}
              </h3>
              <p className="text-sm font-mono text-teal-300">
                Aceleração em GPU para Simulação Física Granular (CUDA & Vulkan)
              </p>

              {/* KPI Stat Callouts (Opção 1: Números Gigantes de Impacto Imediato) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-teal-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-teal-300 font-mono tracking-tight">
                    ~20x
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Speedup vs CPU
                  </div>
                  <span className="text-[9px] font-mono text-teal-400/80 block mt-0.5">CUDA vs OpenMP (8T)</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-emerald-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    CUDA Dedicado
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500/80 block mt-0.5">Memória Coalescida</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#04060a] border border-cyan-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-tight">
                    &lt; 2ms
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Passo de Tempo
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block mt-0.5">P2G + G2P Kernels</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Pesquisa avançada em computação de alto desempenho no <em>Material Point Method</em> (MPM). Kernels customizados em C++ e CUDA explorando memória compartilhada (shared memory), coalescência de acessos e eliminação de gargalos atômicos.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {gpuMpm.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-teal-500/20 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="pt-3">
                <button
                  onClick={() => onSelectProject(gpuMpm)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-teal-500/25 cursor-pointer hover:scale-105"
                >
                  <span>Ver Detalhes do Projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CUDA Benchmark & Code Tabs */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#04060a] border border-teal-500/20 overflow-hidden shadow-2xl font-mono text-xs">
                {/* Tabs Header */}
                <div className="px-4 py-2.5 bg-teal-950/40 border-b border-teal-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-teal-500/20 text-[11px]">
                    <button
                      onClick={() => setTabGpu("bench")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabGpu === "bench"
                          ? "bg-teal-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Throughput
                    </button>
                    <button
                      onClick={() => setTabGpu("code")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabGpu === "code"
                          ? "bg-teal-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Kernel CUDA
                    </button>
                  </div>
                </div>

                {/* Content */}
                {tabGpu === "bench" ? (
                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-teal-500/20 pb-3">
                      <span className="text-teal-400 font-bold">THROUGHPUT RELATIVO</span>
                      <span className="text-emerald-400 font-bold">~20x SPEEDUP</span>
                    </div>

                    <div className="space-y-4">
                      {/* CPU Baseline */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-zinc-400">CPU OpenMP (8 Threads Multi-core):</span>
                          <span className="text-zinc-400">1.0x (Baseline)</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "5%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="h-full bg-zinc-600 rounded-full"
                          />
                        </div>
                      </div>

                      {/* GPU CUDA Speedup */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-emerald-300 font-bold">NVIDIA GPU (CUDA Kernels Otimizados):</span>
                          <span className="text-emerald-400 font-bold">~20.0x Speedup</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-zinc-400 space-y-1 border-t border-teal-500/10">
                      <div>• Kernel P2G com Shared Memory Coalescida</div>
                      <div>• Atualização de grade sem divergência de warps</div>
                      <div>• UnB Ciência da Computação (Pesquisa TCC)</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2 text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                    <div className="text-zinc-500 font-mono">// Kernel de Transferência Partícula-Grade (P2G)</div>
                    <pre className="text-teal-300 font-mono">
{`__global__ void p2g_kernel(
    const Particle* __restrict__ p,
    GridCell* __restrict__ grid,
    int num_particles
) {
    int tid = blockIdx.x * blockDim.x + threadIdx.x;
    if (tid >= num_particles) return;

    __shared__ float s_mass[BLOCK_SIZE];
    // Interpolação ponderada B-Spline e momento
    float w = compute_bspline_weight(p[tid].pos);
    atomicAdd(&grid[p[tid].cell_idx].mass, p[tid].mass * w);
    __syncthreads();
}`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CASE STUDY 4: DATA WAREHOUSE ATRASOS DE VOOS
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="mb-24 glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story / Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {dwVoos.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">• Jan/2026</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {dwVoos.title}
              </h3>
              <p className="text-sm font-mono text-emerald-300">
                Pipeline Medalhão com Docker, PostgreSQL e Power BI
              </p>

              {/* KPI Stat Callouts (Opção 1: Números Gigantes de Impacto Imediato) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-emerald-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                    Milhões
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Registros / Minuto
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500/80 block mt-0.5">Pipeline em Batch</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#04060a] border border-cyan-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-tight">
                    3 Níveis
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Medalhão ETL
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400/80 block mt-0.5">Bronze, Silver & Gold</span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#04060a] border border-teal-500/35 shadow-lg shadow-black/60 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-4xl font-black text-teal-300 font-mono tracking-tight">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
                    Dockerizado
                  </div>
                  <span className="text-[9px] font-mono text-teal-400/80 block mt-0.5">PostgreSQL + Power BI</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Ingestão, sanitização e modelagem dimensional em Star Schema de grandes volumes de tráfego aéreo. Pipeline completo em Python com persistência transacional por chunks e integração analítica direta no Power BI.
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {dwVoos.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-emerald-500/20 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 pt-3">
                <button
                  onClick={() => onSelectProject(dwVoos)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/25 cursor-pointer hover:scale-105"
                >
                  <span>Ver Detalhes do Projeto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {dwVoos.repoUrl && (
                  <a
                    href={dwVoos.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono border border-white/10 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Dimensional Model Card & ETL Code Tabs */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#04060a] border border-emerald-500/20 overflow-hidden shadow-2xl font-mono text-xs">
                {/* Tabs Header */}
                <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-emerald-500/20 text-[11px]">
                    <button
                      onClick={() => setTabDw("schema")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabDw === "schema"
                          ? "bg-emerald-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Star Schema
                    </button>
                    <button
                      onClick={() => setTabDw("code")}
                      className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                        tabDw === "code"
                          ? "bg-emerald-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Pipeline ETL
                    </button>
                  </div>
                </div>

                {/* Content */}
                {tabDw === "schema" ? (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-zinc-400 border-b border-emerald-500/20 pb-3">
                      <span className="text-emerald-400 font-bold">STAR SCHEMA DIMENSIONAL</span>
                      <span className="text-cyan-400">POWER BI READY</span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                        FACT_FLIGHT_DELAYS
                        <div className="text-[10px] font-normal text-zinc-400 mt-0.5">
                          tempo_atraso, atraso_clima, atraso_segurança, id_voo
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded bg-white/5 border border-emerald-500/20 text-zinc-300">
                          DIM_AEROPORTOS
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-emerald-500/20 text-zinc-300">
                          DIM_COMPANHIAS
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-emerald-500/20 text-zinc-300">
                          DIM_TEMPO_CALENDARIO
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-emerald-500/20 text-zinc-300">
                          DIM_AERONAVES
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/20 text-zinc-400 text-[10px] flex justify-between">
                      <span>Python ETL + SQLAlchemy</span>
                      <span className="text-emerald-400 font-bold">100% Docker</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2 text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                    <div className="text-zinc-500 font-mono"># Pipeline Medalhão: Silver -&gt; Gold</div>
                    <pre className="text-emerald-300 font-mono">
{`# Extração e normalização de fatos e dimensões
dim_aeroportos = df_silver[['origem_iata', 'aeroporto_nome']].drop_duplicates()
dim_aeroportos.to_sql('dim_aeroportos', engine, if_exists='append', index=False)

# Carga massiva por batches no PostgreSQL
fact_voos = df_silver.merge(dim_aeroportos, on='origem_iata')
fact_voos.to_sql(
    'fact_flight_delays', 
    engine, 
    if_exists='append', 
    chunksize=10000, 
    method='multi'
)`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            DEMAIS PROJETOS EM GRID MODERNO ANIMADO
        ======================================================== */}
        <div>
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Outros Projetos & Experimentos
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Aplicações desktop nativas, PWA acessível e lógicas procedurais em banco de dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectProject(p)}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-emerald-500/15 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] flex flex-col justify-between cursor-pointer group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      {p.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{p.period}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">{p.subtitle}</p>

                  <div className="mt-3 inline-block">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                      ⚡ {p.highlightMetric}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
