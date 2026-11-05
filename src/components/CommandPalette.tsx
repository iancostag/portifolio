"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Search,
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { PROJECTS, PERSONAL_INFO, Project } from "@/data/portfolio-data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectProject }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    alert("E-mail copiado com sucesso!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-[#0e111a] border border-white/15 shadow-2xl">
        <Command
          label="Menu de Comandos"
          className="flex flex-col w-full text-zinc-100"
        >
          {/* Input Bar */}
          <div className="flex items-center px-4 border-b border-white/10">
            <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Digite um projeto, skill ou comando... (ex: CUDA, RAG, Contato)"
              className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-zinc-500 text-white"
            />
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-8 text-center text-sm text-zinc-400">
              Nenhum resultado encontrado para &ldquo;{search}&rdquo;.
            </Command.Empty>

            {/* Projetos */}
            <Command.Group
              heading="Projetos & Arquiteturas"
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-2 py-1.5"
            >
              {PROJECTS.map((proj) => (
                <Command.Item
                  key={proj.id}
                  value={`${proj.title} ${proj.subtitle} ${proj.technologies.join(" ")} ${proj.categoryLabel}`}
                  onSelect={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 transition-colors group data-[selected=true]:bg-blue-600/20 data-[selected=true]:border data-[selected=true]:border-blue-500/30"
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {proj.title}
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                          {proj.categoryLabel}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1">
                        {proj.shortDescription}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Command.Item>
              ))}
            </Command.Group>

            {/* Seções */}
            <Command.Group
              heading="Navegação Rápida"
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-2 py-1.5"
            >
              <Command.Item
                value="projetos catálogo portfolio case studies estudos de caso"
                onSelect={() => navigateTo("case-studies")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Ver Estudos de Caso</span>
              </Command.Item>

              <Command.Item
                value="sobre mim bio formacao unb eldorado autorian"
                onSelect={() => navigateTo("sobre")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Sobre Mim & Filosofia de Engenharia</span>
              </Command.Item>

              <Command.Item
                value="experiencias trajetória carreira eldorado spu singular unb"
                onSelect={() => navigateTo("experiencias")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Trajetória & Pesquisa (Eldorado, SPU, Singular)</span>
              </Command.Item>

              <Command.Item
                value="skills arsenal tecnologias ferramentas"
                onSelect={() => navigateTo("skills")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Arsenal Tecnológico & Hard Skills</span>
              </Command.Item>

              <Command.Item
                value="contato falar email recrutador"
                onSelect={() => navigateTo("contato")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Informações de Contato</span>
              </Command.Item>
            </Command.Group>

            {/* Ações Rápidas */}
            <Command.Group
              heading="Ações Rápidas"
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 px-2 py-1.5"
            >
              <Command.Item
                value="copiar email iancostag@gmail.com"
                onSelect={copyEmail}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span>Copiar E-mail ({PERSONAL_INFO.email})</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">Clique para copiar</span>
              </Command.Item>

              <Command.Item
                value="github perfil repositorios"
                onSelect={() => {
                  window.open(PERSONAL_INFO.github, "_blank");
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span>Abrir GitHub</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">github.com/iancostag</span>
              </Command.Item>

              <Command.Item
                value="linkedin conexao networking"
                onSelect={() => {
                  window.open(PERSONAL_INFO.linkedin, "_blank");
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-zinc-400" />
                  <span>Abrir LinkedIn</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">linkedin.com/in/iancostag</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Info */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-t border-white/10 text-xs text-zinc-400 font-mono">
            <span>Navegue com as setas ↑ ↓ e pressione Enter</span>
            <span>ESC para sair</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
