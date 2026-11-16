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
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { Project } from "@/data/portfolio-data";
import { getPortfolioData } from "@/data/portfolio-i18n";
import { useLocale } from "@/context/LocaleContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function CommandPalette({ isOpen, onOpen, onClose, onSelectProject }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { locale } = useLocale();
  const { projects, personalInfo } = getPortfolioData(locale);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else if (onOpen) {
          onOpen();
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
  }, [isOpen, onOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 900);
  };

  const t = locale === "en"
    ? {
        label: "Command Menu",
        placeholder: "Search projects, skills, or actions... (e.g. CUDA, RAG, Contact)",
        close: "Close command menu",
        empty: `No results found for "${search}".`,
        projectsGroup: "Projects & Architectures",
        navGroup: "Quick Navigation",
        navAbout: "About & Engineering Focus",
        navExp: "Experience & Research",
        navProjects: "Delivered Projects & Outcomes",
        navSkills: "Technical Skills",
        navContact: "Contact",
        actionsGroup: "Quick Actions",
        copyEmail: `Copy Email (${personalInfo.email})`,
        copied: "Copied!",
        clickToCopy: "Copy",
        openGithub: "Open GitHub",
        openLinkedin: "Open LinkedIn",
        footerNav: "Use ↑ ↓ arrows and Enter",
        footerEsc: "ESC to close",
      }
    : {
        label: "Menu de Comandos",
        placeholder: "Busque um projeto, skill ou ação... (ex: CUDA, RAG, Contato)",
        close: "Fechar menu de comandos",
        empty: `Nenhum resultado encontrado para "${search}".`,
        projectsGroup: "Projetos & Arquiteturas",
        navGroup: "Navegação Rápida",
        navAbout: "Visão & Atuação",
        navExp: "Experiência & Pesquisa",
        navProjects: "Entregas & Resultados",
        navSkills: "Competências Técnicas",
        navContact: "Contato",
        actionsGroup: "Ações Rápidas",
        copyEmail: `Copiar E-mail (${personalInfo.email})`,
        copied: "Copiado!",
        clickToCopy: "Copiar",
        openGithub: "Abrir GitHub",
        openLinkedin: "Abrir LinkedIn",
        footerNav: "Navegue com as setas ↑ ↓ e pressione Enter",
        footerEsc: "ESC para sair",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" role="dialog" aria-modal="true" aria-label={t.label}>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl">
        <Command
          label={t.label}
          className="flex flex-col w-full text-slate-100"
        >
          <div className="flex items-center px-4 border-b border-[var(--border)]">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder={t.placeholder}
              className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400 text-white"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="p-1.5 rounded text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-8 text-center text-sm text-slate-400">
              {t.empty}
            </Command.Empty>

            <Command.Group
              heading={t.projectsGroup}
              className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 py-1.5"
            >
              {projects.map((proj) => (
                <Command.Item
                  key={proj.id}
                  value={`${proj.title} ${proj.subtitle} ${proj.technologies.join(" ")} ${proj.categoryLabel}`}
                  onSelect={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 transition-colors group data-[selected=true]:bg-emerald-500/15 data-[selected=true]:border data-[selected=true]:border-emerald-500/30"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-white flex items-center gap-2 flex-wrap">
                        <span>{proj.title}</span>
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-200">
                          {proj.categoryLabel}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {proj.shortDescription}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={t.navGroup}
              className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 py-1.5"
            >
              <Command.Item
                value="about sobre bio formacao unb eldorado"
                onSelect={() => navigateTo("about")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t.navAbout}</span>
              </Command.Item>

              <Command.Item
                value="experience experiencias carreira eldorado spu singular unb"
                onSelect={() => navigateTo("experience")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>{t.navExp}</span>
              </Command.Item>

              <Command.Item
                value="projects projetos entregas portfolio"
                onSelect={() => navigateTo("projects")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>{t.navProjects}</span>
              </Command.Item>

              <Command.Item
                value="skills competencias tecnologias ferramentas"
                onSelect={() => navigateTo("skills")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{t.navSkills}</span>
              </Command.Item>

              <Command.Item
                value="contact contato email recrutador"
                onSelect={() => navigateTo("contact")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{t.navContact}</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading={t.actionsGroup}
              className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 py-1.5"
            >
              <Command.Item
                value="copy email copiar iancostag@gmail.com"
                onSelect={copyEmail}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400" />
                  )}
                  <span>{t.copyEmail}</span>
                </div>
                <span className="text-xs font-mono text-emerald-300">
                  {copiedEmail ? t.copied : t.clickToCopy}
                </span>
              </Command.Item>

              <Command.Item
                value="github profile repos"
                onSelect={() => {
                  window.open(personalInfo.github, "_blank");
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-slate-400" />
                  <span>{t.openGithub}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">github.com/iancostag</span>
              </Command.Item>

              <Command.Item
                value="linkedin profile network"
                onSelect={() => {
                  window.open(personalInfo.linkedin, "_blank");
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-slate-400" />
                  <span>{t.openLinkedin}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">linkedin.com/in/iancostag</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-t border-[var(--border)] text-xs text-slate-400 font-mono">
            <span>{t.footerNav}</span>
            <span>{t.footerEsc}</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
