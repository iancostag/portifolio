"use client";

import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  Brain,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 border-t border-blue-500/15 relative bg-[#030712] overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Foto de Perfil & Badges Flutuantes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group">
              {/* Glow exterior neon */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-indigo-500/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Moldura da Foto */}
              <div className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden border border-blue-500/30 bg-[#060c1c] shadow-2xl">
                <Image
                  src="/avatar.jpg"
                  alt="Ian Costa Guimarães"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />

                {/* Gradiente inferior na foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-85" />

                {/* Legenda embutida na foto */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>Ian Costa Guimarães</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300 mt-0.5">
                    Engenharia de Software • UnB
                  </div>
                </div>
              </div>

              {/* Badge Flutuante Superior Direito */}
              <div className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-black/80 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pesquisador IA</span>
              </div>

              {/* Badge Flutuante Inferior Esquerdo */}
              <div className="absolute -bottom-4 -left-4 px-3.5 py-1.5 rounded-xl bg-[#060c1c]/90 border border-indigo-500/40 text-indigo-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-black/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Brasília, DF</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Narrativa & Filosofia de Engenharia */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              O Engenheiro por Trás do Código
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Construindo software na fronteira entre{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                ciência e produção
              </span>
              .
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              <p>
                Graduando em <strong>Engenharia de Software na Universidade de Brasília (UnB)</strong> e <strong>Pesquisador Residente em Inteligência Artificial no Instituto Eldorado / Softex</strong>, atuo onde algoritmos teóricos encontram restrições severas de latência, custo e escala.
              </p>
              <p>
                Minha abordagem combina a profundidade matemática de pipelines de <strong>RAG híbrido e orquestração de LLMs</strong> com a disciplina de baixo nível da computação gráfica acelerada em <strong>GPU (CUDA/C++)</strong> e a robustez de bancos de dados relacionais em produção real.
              </p>
            </div>

            {/* Quick Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#081126]/90 border border-blue-500/25 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Formação Acadêmica</span>
                </div>
                <div className="font-semibold text-white text-sm">Bacharelado Eng. Software</div>
                <div className="text-xs text-zinc-400 font-mono">UnB (2022–2027)</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#081126]/90 border border-indigo-500/25 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold">
                  <Users className="w-4 h-4" />
                  <span>Liderança de Engenharia</span>
                </div>
                <div className="font-semibold text-white text-sm">Gerente Geral Micromouse</div>
                <div className="text-xs text-zinc-400 font-mono">20 integrantes • Robô Autônomo</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
