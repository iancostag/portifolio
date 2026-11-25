"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import { useFocusTrap } from "@/hooks/useFocusTrap";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);
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

  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).catch(() => {});
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
        navProjects: "Delivered Projects & Outcomes",
        navExp: "Experience & Research",
        navAbout: "About & Engineering Focus",
        navSkills: "Technical Skills",
        navContact: "Contact",
        actionsGroup: "Quick Actions",
        copyEmail: `Copy Email (${personalInfo.email})`,
        copied: "Copied!",
        clickToCopy: "Copy",
        openGithub: "Open GitHub",
        openLinkedin: "Open LinkedIn",
        footerNav: "↑ ↓ to navigate • Enter to select",
        footerEsc: "ESC to close",
      }
    : {
        label: "Menu de Comandos",
        placeholder: "Busque um projeto, skill ou ação... (ex: CUDA, RAG, Contato)",
        close: "Fechar menu de comandos",
        empty: `Nenhum resultado encontrado para "${search}".`,
        projectsGroup: "Projetos & Arquiteturas",
        navGroup: "Navegação Rápida",
        navProjects: "Entregas & Resultados",
        navExp: "Experiência & Pesquisa",
        navAbout: "Visão & Atuação",
        navSkills: "Competências Técnicas",
        navContact: "Contato",
        actionsGroup: "Ações Rápidas",
        copyEmail: `Copiar E-mail (${personalInfo.email})`,
        copied: "Copiado!",
        clickToCopy: "Copiar",
        openGithub: "Abrir GitHub",
        openLinkedin: "Abrir LinkedIn",
        footerNav: "↑ ↓ para navegar • Enter para abrir",
        footerEsc: "ESC para sair",
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-[12vh] px-3 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.label}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.16, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: -4,
              transition: { duration: 0.13, ease: [0.4, 0, 1, 1] },
            }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl text-[var(--foreground)]"
          >
        <Command label={t.label} className="flex flex-col w-full">
          <div className="flex items-center px-3.5 sm:px-4 border-b border-[var(--border)] gap-2">
            <Search className="w-4 h-4 text-[var(--muted-subtle)] shrink-0" aria-hidden="true" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder={t.placeholder}
              className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-[var(--muted-subtle)] text-[var(--foreground)]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="inline-flex items-center justify-center w-9 h-9 -mr-1 rounded-lg text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Command.List className="max-h-[min(380px,60dvh)] overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-8 text-center text-sm text-[var(--muted-subtle)]">
              {t.empty}
            </Command.Empty>

            <Command.Group
              heading={t.projectsGroup}
              className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] px-2 py-1.5"
            >
              {projects.map((proj) => (
                <Command.Item
                  key={proj.id}
                  value={`${proj.title} ${proj.subtitle} ${proj.technologies.join(" ")} ${proj.categoryLabel}`}
                  onSelect={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] transition-colors group data-[selected=true]:bg-[var(--surface-subtle)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FolderGit2 className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <div className="font-medium text-[var(--foreground)] flex items-center gap-2 flex-wrap">
                        <span className="truncate">{proj.title}</span>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--muted)] border border-[var(--border)] shrink-0">
                          {proj.categoryLabel}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--muted-subtle)] line-clamp-1">
                        {proj.shortDescription}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--muted-subtle)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={t.navGroup}
              className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] px-2 py-1.5"
            >
              <Command.Item
                value="projects projetos entregas portfolio"
                onSelect={() => navigateTo("projects")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <FolderGit2 className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>{t.navProjects}</span>
              </Command.Item>

              <Command.Item
                value="experience experiencias carreira eldorado spu singular unb"
                onSelect={() => navigateTo("experience")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <Briefcase className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>{t.navExp}</span>
              </Command.Item>

              <Command.Item
                value="about sobre bio formacao unb eldorado"
                onSelect={() => navigateTo("about")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>{t.navAbout}</span>
              </Command.Item>

              <Command.Item
                value="skills competencias tecnologias ferramentas"
                onSelect={() => navigateTo("skills")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <Layers className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>{t.navSkills}</span>
              </Command.Item>

              <Command.Item
                value="contact contato email recrutador"
                onSelect={() => navigateTo("contact")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>{t.navContact}</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading={t.actionsGroup}
              className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] px-2 py-1.5"
            >
              <Command.Item
                value="copy email copiar iancostag@gmail.com"
                onSelect={copyEmail}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[var(--signal-fg)] shrink-0" aria-hidden="true" />
                  ) : (
                    <Mail className="w-4 h-4 text-[var(--muted-subtle)] shrink-0" aria-hidden="true" />
                  )}
                  <span className="truncate">{t.copyEmail}</span>
                </div>
                <span className="text-xs font-mono text-[var(--signal-fg)] font-semibold shrink-0">
                  {copiedEmail ? t.copied : t.clickToCopy}
                </span>
              </Command.Item>

              <Command.Item
                value="github profile repos"
                onSelect={() => {
                  window.open(personalInfo.github, "_blank", "noopener,noreferrer");
                  onClose();
                }}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <GithubIcon className="w-4 h-4 text-[var(--muted-subtle)] shrink-0" />
                  <span className="truncate">{t.openGithub}</span>
                </div>
                <span className="text-xs font-mono text-[var(--muted-subtle)] shrink-0 hidden sm:inline">
                  github.com/iancostag
                </span>
              </Command.Item>

              <Command.Item
                value="linkedin profile network"
                onSelect={() => {
                  window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer");
                  onClose();
                }}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-[var(--surface-subtle)] data-[selected=true]:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <LinkedinIcon className="w-4 h-4 text-[var(--muted-subtle)] shrink-0" />
                  <span className="truncate">{t.openLinkedin}</span>
                </div>
                <span className="text-xs font-mono text-[var(--muted-subtle)] shrink-0 hidden sm:inline">
                  linkedin.com/in/iancostag
                </span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[var(--surface-subtle)] border-t border-[var(--border)] text-xs text-[var(--muted-subtle)] font-mono">
            <span className="truncate">{t.footerNav}</span>
            <span className="shrink-0">{t.footerEsc}</span>
          </div>
        </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
