"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-cyan-300">
          <div>IanOS Terminal v2.4 (UnB & Instituto Eldorado Edition)</div>
          <div className="text-zinc-400 text-[11px]">
            Digite <span className="text-white font-bold">&apos;help&apos;</span> para listar os comandos ou <span className="text-cyan-400 font-bold">&apos;sudo hire&apos;</span> para entrar em contato.
          </div>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [matrixActive, setMatrixActive] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-zinc-300">
            <div className="text-cyan-400 font-bold">Comandos disponíveis:</div>
            <div>• <strong className="text-white">projects</strong> - Lista os principais estudos de caso e métricas</div>
            <div>• <strong className="text-white">skills</strong> - Exibe linguagens, IA e ferramentas de DevOps</div>
            <div>• <strong className="text-white">cat bio.txt</strong> - Resumo de formação acadêmica na UnB e pesquisa</div>
            <div>• <strong className="text-white">run senhora-vera</strong> - Executa simulação do pipeline de fact-checking</div>
            <div>• <strong className="text-white">sudo hire</strong> - Iniciar contato direto de contratação</div>
            <div>• <strong className="text-white">matrix</strong> - Alternar modo Matrix de dados</div>
            <div>• <strong className="text-white">clear</strong> - Limpar a tela do terminal</div>
            <div>• <strong className="text-white">exit</strong> - Fechar o terminal</div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-zinc-300">
            {PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/40 pl-2">
                <span className="text-cyan-300 font-bold">{p.title}</span>: {p.subtitle}
                <div className="text-zinc-400 text-[10px]">⚡ {p.highlightMetric} | Stack: {p.technologies.slice(0, 4).join(", ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 text-zinc-300">
            <div><span className="text-cyan-400 font-bold">Linguagens:</span> Python, SQL (PL/pgSQL), TypeScript, C/C++ (CUDA), Ruby</div>
            <div><span className="text-blue-400 font-bold">IA & Dados:</span> RAG, PGVector, LLM Orchestration, NLI, TF-IDF, Star Schema, Pandas</div>
            <div><span className="text-indigo-400 font-bold">Infra & DevOps:</span> Docker, PostgreSQL, AWS, Linux (Debian), Git, Makefiles</div>
          </div>
        );
        break;

      case "cat bio.txt":
      case "bio":
        output = (
          <div className="space-y-1 text-zinc-300">
            <div><strong className="text-white">Nome:</strong> {PERSONAL_INFO.name}</div>
            <div><strong className="text-white">Formação:</strong> {PERSONAL_INFO.bio}</div>
            <div><strong className="text-white">Pesquisa:</strong> Instituto Eldorado & Softex (IA Residente)</div>
            <div><strong className="text-white">Liderança:</strong> Gerente Geral Micromouse UnB (20 integrantes)</div>
          </div>
        );
        break;

      case "run senhora-vera":
        output = (
          <div className="space-y-1 font-mono text-[11px] text-zinc-200 bg-black/40 p-3 rounded-lg border border-blue-500/30">
            <div className="text-cyan-400">[1/3] Triagem estilística TF-IDF: 8ms (Classificado com suspeita de viés)</div>
            <div className="text-blue-400">[2/3] Busca vetorial PGVector: 3 chunks mais relevantes resgatados (dist: 0.14)</div>
            <div className="text-indigo-300">[3/3] Inferência NLI: ENTAILMENT confirmado (94.7% confiança)</div>
            <div className="text-cyan-300 font-bold">Resultado: Alegação validada em 142ms (-78% custo de tokens)</div>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        output = (
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-2">
            <div className="text-cyan-400 font-bold">🚀 Parabéns! Você encontrou o comando de contratação.</div>
            <div className="text-xs text-zinc-200">
              Estou disponível para posições de Engenharia de Software, IA e Sistemas de Alta Performance.
            </div>
            <div className="text-xs font-mono text-cyan-300">
              E-mail direto: <strong className="text-white">{PERSONAL_INFO.email}</strong>
            </div>
          </div>
        );
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        output = (
          <div className="text-cyan-400 font-bold">
            Modo Matrix {matrixActive ? "desativado" : "ativado"} no fundo da página!
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        output = (
          <div className="text-red-400">
            Comando não reconhecido: &apos;{trimmed}&apos;. Digite <span className="text-white font-bold">&apos;help&apos;</span> para a lista.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#040816]/90 hover:bg-blue-950/80 border border-blue-500/40 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-2xl shadow-black/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer hover:scale-105"
          title="Abrir terminal interativo"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="font-bold">Terminal IanOS</span>
        </button>
      </div>

      {/* Terminal Window Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 font-mono text-xs shadow-2xl flex flex-col ${
            isMaximized
              ? "inset-4 sm:inset-10 rounded-2xl"
              : "bottom-20 right-4 sm:right-6 w-full max-w-lg h-[430px] rounded-2xl"
          } bg-[#040816]/95 backdrop-blur-2xl border border-blue-500/35 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]`}
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-blue-950/40 border-b border-blue-500/20 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
              <span className="text-zinc-400 text-[11px] font-bold ml-2">ian@unb-eldorado: ~</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:text-white transition-colors"
                title="Maximizar"
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal History Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono">
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Prompt Input Line */}
          <div className="px-4 py-3 bg-black/60 border-t border-blue-500/20 flex items-center gap-2">
            <span className="text-cyan-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="digite um comando (ex: 'help', 'sudo hire')..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600 font-mono text-xs"
            />
            <span className="text-[10px] text-zinc-500 font-mono">Enter ↵</span>
          </div>
        </div>
      )}
    </>
  );
}
