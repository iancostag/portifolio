"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles, FileText } from "lucide-react";

interface LiveStatusWidgetProps {
  onOpenFastScan: () => void;
}

export function LiveStatusWidget({ onOpenFastScan }: LiveStatusWidgetProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 border-t border-blue-500/15 bg-[#02050f] text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#060c1d] border border-blue-500/25 shadow-xl items-center">
          {/* Horário de Brasília */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Horário Local (Brasília)</div>
              <div className="text-white font-bold">{time || "12:00:00"} (UTC-3)</div>
            </div>
          </div>

          {/* Foco Atual */}
          <div className="md:col-span-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-300 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Foco Atual de Pesquisa</div>
              <div className="text-zinc-200 line-clamp-1 font-sans">
                RAG Híbrido & PGVector (Eldorado) • Kernels CUDA (TCC UnB)
              </div>
            </div>
          </div>

          {/* Ação: Modo Recrutador / Currículo */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onOpenFastScan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 font-bold border border-blue-500/35 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-blue-500/10"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Modo Recrutador (1-Página)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
