"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  Mail,
  Copy,
  Check,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="py-24 border-t border-blue-500/15 relative bg-[#030712]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Vamos Conversar
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Pronto para construir o próximo desafio técnico?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
          Seja para discutir arquiteturas de agentes de IA, RAG em larga escala, otimização de bancos de dados ou computação paralela em GPU.
        </p>

        {/* Email Box Card */}
        <div className="mt-10 glass-card p-6 sm:p-9 rounded-3xl border border-blue-500/30 max-w-xl mx-auto shadow-2xl shadow-blue-950/50">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-semibold">
            Contato Direto
          </span>

          <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-6 select-all">
            {PERSONAL_INFO.email}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/35 cursor-pointer hover:scale-105"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-cyan-300" />
                  <span>Copiado para a área de transferência!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar E-mail</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-blue-500/30 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Enviar Mensagem</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-500/15 flex items-center justify-center gap-6">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>

            <span className="text-zinc-700">•</span>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-zinc-300" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>

            <span className="text-zinc-700">•</span>

            <div className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Brasília, DF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
