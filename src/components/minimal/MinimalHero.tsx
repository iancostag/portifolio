"use client";

import { useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ArrowDown, Copy, Check, FileText, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface MinimalHeroProps {
  onOpenFastScan: () => void;
}

export function MinimalHero({ onOpenFastScan }: MinimalHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToCases = () => {
    const el = document.getElementById("projetos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#09090b] text-white">
      {/* Sutil iluminação de topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.07] to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
          {/* Lado Esquerdo: Headline & Apresentação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>UnB & Instituto Eldorado / Softex</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Engenharia de Software para{" "}
              <span className="text-zinc-400 font-normal">IA, Dados & Alta Performance</span>.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light max-w-xl">
              Sou <strong className="text-white font-medium">Ian Costa Guimarães</strong>. Pesquisador Residente em IA e Engenheiro de Software focado em orquestração de LLMs com PGVector, arquitetura de dados e paralelismo massivo em GPU (CUDA).
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={scrollToCases}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all hover:bg-zinc-200 cursor-pointer"
              >
                <span>Explorar Projetos</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenFastScan}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>Currículo Resumido</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs border border-white/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">E-mail Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Lado Direito: Retrato com Moldura Minimalista */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl">
              <Image
                src="/avatar.jpg"
                alt="Ian Costa Guimarães"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-105"
                sizes="(max-width: 768px) 256px, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-mono text-zinc-300 block">Brasília, DF • Brasil</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
