"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { Project } from "@/data/portfolio-data";
import { getPortfolioData } from "@/data/portfolio-i18n";
import { useLocale } from "@/context/LocaleContext";
import { useThemePalette } from "@/context/ThemeContext";
import {
  ArrowUpRight,
  Command as CommandIcon,
  FileText,
  Clock,
  MapPin,
  Globe,
  Mail,
  Check,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Download,
  CheckCircle2,
  Hourglass,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/SocialIcons";
import {
  EldoradoLogo,
  StudioFlavioLogo,
  SpuItracLogo,
  SingularGovLogo,
  UnbLogo,
} from "@/components/CompanyLogos";
import { SpotlightCursor } from "@/components/SpotlightCursor";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { CommandPalette } from "@/components/CommandPalette";
import { FastScanModal } from "@/components/FastScanModal";

type TrackFilter = "all" | "qa" | "ai" | "data" | "fullstack" | "systems";

const VALID_TRACKS: readonly TrackFilter[] = ["all", "qa", "ai", "data", "fullstack", "systems"];
const SECTION_IDS = ["projects", "experience", "about", "skills", "contact"] as const;
const URL_STATE_EVENT = "portfolio-url-state-change";
const SBQS_ARTICLE_URL = "https://sol.sbc.org.br/index.php/sbqs/article/view/47817";

interface KpiItem {
  value: string;
  label: string;
  href?: string;
}

function subscribeUrlState(callback: () => void) {
  window.addEventListener(URL_STATE_EVENT, callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(URL_STATE_EVENT, callback);
    window.removeEventListener("popstate", callback);
  };
}

function getSearchSnapshot(): string {
  return window.location.search;
}

export default function Home() {
  const { locale, setLocale } = useLocale();
  const { colorMode, toggleColorMode } = useThemePalette();
  const { personalInfo, projects, experiences, skillCategories } = getPortfolioData(locale);

  const searchString = useSyncExternalStore(subscribeUrlState, getSearchSnapshot, () => "");
  const urlParams = new URLSearchParams(searchString);
  const urlProjectId = urlParams.get("project");
  const rawTrack = urlParams.get("track") as TrackFilter | null;
  const activeTrack: TrackFilter =
    rawTrack && VALID_TRACKS.includes(rawTrack) ? rawTrack : "all";
  const selectedProject = urlProjectId
    ? projects.find((p) => p.id === urlProjectId) ?? null
    : null;

  const [activeSection, setActiveSection] = useState<string>("projects");
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isFastScanOpen, setIsFastScanOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const updateUrlParam = (key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event(URL_STATE_EVENT));
  };

  const selectProject = (project: Project | null) => {
    updateUrlParam("project", project ? project.id : null);
  };

  const selectTrack = (track: TrackFilter) => {
    updateUrlParam("track", track === "all" ? null : track);
    setShowAllProjects(false);
  };

  // Real-time Brasília clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(locale === "en" ? "en-US" : "pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  // Scrollspy using viewport coordinates + bottom-of-page fallback
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }

      const threshold = 180;
      let current: string = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCompanyLogo = (key: string) => {
    switch (key) {
      case "eldorado":
        return <EldoradoLogo className="w-5 h-5 shrink-0" />;
      case "flavio":
        return <StudioFlavioLogo className="w-5 h-5 shrink-0" />;
      case "spu":
        return <SpuItracLogo className="w-5 h-5 shrink-0" />;
      case "singular":
        return <SingularGovLogo className="w-5 h-5 shrink-0" />;
      case "unb":
        return <UnbLogo className="w-5 h-5 shrink-0" />;
      default:
        return <div className="w-5 h-5 rounded bg-[var(--surface-subtle)] shrink-0" />;
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = personalInfo.email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const trackFiltered =
    activeTrack === "all"
      ? projects
      : projects.filter((p) => p.category === activeTrack);

  const visibleProjects =
    activeTrack === "all" && !showAllProjects
      ? trackFiltered.filter((p) => p.featured).slice(0, 4)
      : trackFiltered;

  const hiddenCount =
    activeTrack === "all" ? trackFiltered.length - visibleProjects.length : 0;

  const ui =
    locale === "en"
      ? {
          skipToContent: "Skip to main content",
          emptyTrack: "No projects found in this track.",
          available: "Available for Software Engineering, QA Automation & Data/AI roles",
          location: "Brasília, Brazil",
          positioning:
            "Building reliable production systems, automated E2E/API test suites (Robot Framework & Python), data pipelines, and LLM guardrails.",
          kpisLabel: "Verified engineering outcomes",
          kpis: [
            { value: "-75%", label: "RAG Token Cost" },
            { value: "1h → 5m", label: "Prod. Clinical Reports" },
            { value: "SBQS", label: "Accepted Paper (SW Quality)", href: SBQS_ARTICLE_URL },
            { value: "+3 Yrs", label: "Software Engineering" },
          ] as KpiItem[],
          searchBtn: "Search",
          cvBtn: "1-Page CV",
          pdfBtn: "PDF",
          pdfTitle: "Print or Save 1-Page CV as PDF",
          modeTitle: colorMode === "light" ? "Switch to dark mode" : "Switch to light mode",
          nav: [
            { id: "projects", label: "Delivered Work" },
            { id: "experience", label: "Experience" },
            { id: "about", label: "About & Focus" },
            { id: "skills", label: "Tech Stack" },
            { id: "contact", label: "Contact" },
          ],
          aboutHeading: "About & Focus",
          aboutP1: (
            <>
              With over <strong className="text-[var(--foreground)] font-semibold">3 years of hands-on engineering experience</strong> and applied AI research, I am a Software Engineering undergraduate at the{" "}
              <strong className="text-[var(--foreground)] font-semibold">University of Brasília (UnB)</strong> and a Resident AI Researcher at{" "}
              <strong className="text-[var(--foreground)] font-semibold">Instituto Eldorado / Softex</strong>.
            </>
          ),
          aboutP2: (
            <>
              My work sits at the intersection of <strong className="text-[var(--foreground)] font-semibold">rigorous data & software engineering</strong> and{" "}
              <strong className="text-[var(--foreground)] font-semibold">production AI</strong>: Medallion ETL pipelines, hierarchical RAG on PostgreSQL/PGVector, and GPU-accelerated computing in{" "}
              <strong className="text-[var(--foreground)] font-semibold">CUDA / C++</strong>.
            </>
          ),
          aboutP3: (
            <>
              I build beyond notebook prototypes—focusing on factual guardrails against LLM hallucinations, cutting inference token costs by{" "}
              <span className="text-[var(--signal-fg)] font-mono font-semibold">-75% in Senhora Vera (Eldorado)</span>, and optimizing production clinical reports from{" "}
              <span className="text-[var(--signal-fg)] font-mono font-semibold">60m to 5m in MeuCapilar</span>.
            </>
          ),
          aboutP4: (
            <>
              My background building production systems and data pipelines shaped a strong focus on{" "}
              <strong className="text-[var(--foreground)] font-semibold">defect prevention, relational data integrity (SQL), traceable acceptance criteria, and automated testing</strong>.{" "}
              Currently finalizing my <strong className="text-[var(--foreground)] font-semibold">ISTQB® CTFL v4.0</strong> certification (exam scheduled for Dec 2026) and building modular Web/API test automation architectures.
            </>
          ),
          expHeading: "Experience",
          projHeading: "Delivered Work",
          projCount: `${visibleProjects.length} of ${projects.length}`,
          tracks: [
            { id: "all" as TrackFilter, label: "Featured" },
            { id: "qa" as TrackFilter, label: "QA & Automation" },
            { id: "ai" as TrackFilter, label: "AI & RAG" },
            { id: "data" as TrackFilter, label: "Data Eng" },
            { id: "fullstack" as TrackFilter, label: "Fullstack" },
            { id: "systems" as TrackFilter, label: "GPU & Systems" },
          ],
          viewDetails: "Case Study",
          impactPrefix: "Outcome:",
          showMore: `Show all ${projects.length} projects (+${hiddenCount} more)`,
          showLess: "Show featured only",
          skillsHeading: "Tech Stack",
          certsHeading: "Certifications & Languages",
          contactHeading: "Get in Touch",
          contactLead:
            "Open to QA Automation, Software Engineering, and Data/AI roles in Brasília (Hybrid/Remote) and internationally.",
          copyEmail: "Copy Email",
          copiedEmail: "Copied!",
          backToTop: "Back to top ↑",
          footerNote:
            "Engineered by Ian Costa Guimarães with Next.js 16, React 19, and Tailwind CSS.",
        }
      : {
          skipToContent: "Pular para o conteúdo principal",
          emptyTrack: "Nenhum projeto encontrado nesta trilha.",
          available: "Disponível para Engenharia de Software, Automação de QA & Dados/IA",
          location: "Brasília, DF",
          positioning:
            "Construindo sistemas confiáveis em produção, suítes automatizadas de testes E2E/API (Robot Framework & Python), pipelines de dados e guardrails para LLMs.",
          kpisLabel: "Resultados comprovados de engenharia",
          kpis: [
            { value: "-75%", label: "Custo de Tokens (RAG)" },
            { value: "1h → 5m", label: "Laudos em Produção" },
            { value: "SBQS", label: "Artigo Aceito (Qualidade)", href: SBQS_ARTICLE_URL },
            { value: "+3 Anos", label: "Engenharia de Software" },
          ] as KpiItem[],
          searchBtn: "Buscar",
          cvBtn: "1-Pág CV",
          pdfBtn: "PDF",
          pdfTitle: "Imprimir ou salvar currículo em PDF",
          modeTitle: colorMode === "light" ? "Mudar para modo escuro" : "Mudar para modo claro",
          nav: [
            { id: "projects", label: "Entregas" },
            { id: "experience", label: "Experiência" },
            { id: "about", label: "Visão & Atuação" },
            { id: "skills", label: "Competências" },
            { id: "contact", label: "Contato" },
          ],
          aboutHeading: "Visão & Atuação",
          aboutP1: (
            <>
              Com mais de <strong className="text-[var(--foreground)] font-semibold">3 anos de experiência prática</strong> em engenharia de software e pesquisa aplicada em Inteligência Artificial, sou graduando em{" "}
              <strong className="text-[var(--foreground)] font-semibold">Engenharia de Software pela Universidade de Brasília (UnB)</strong> e pesquisador residente no{" "}
              <strong className="text-[var(--foreground)] font-semibold">Instituto Eldorado / Softex</strong>.
            </>
          ),
          aboutP2: (
            <>
              Meu foco é a intersecção entre <strong className="text-[var(--foreground)] font-semibold">engenharia de dados rigorosa</strong> e{" "}
              <strong className="text-[var(--foreground)] font-semibold">IA em produção</strong>: arquiteturas ETL Medalhão, pipelines RAG hierárquicos no PostgreSQL/PGVector e computação acelerada em GPU com{" "}
              <strong className="text-[var(--foreground)] font-semibold">CUDA / C++</strong>.
            </>
          ),
          aboutP3: (
            <>
              Vou além de protótipos em notebooks — foco em <em>guardrails</em> factuais contra alucinações, redução de{" "}
              <span className="text-[var(--signal-fg)] font-mono font-semibold">-75% no custo de tokens na Senhora Vera (Eldorado)</span> e otimização de laudos clínicos em produção de{" "}
              <span className="text-[var(--signal-fg)] font-mono font-semibold">60m para 5m no MeuCapilar</span>.
            </>
          ),
          aboutP4: (
            <>
              Minha experiência construindo sistemas em produção e pipelines de dados consolidou um foco forte em{" "}
              <strong className="text-[var(--foreground)] font-semibold">prevenção de falhas, integridade relacional (SQL), critérios de aceite rastreáveis e testes automatizados</strong>.{" "}
              Atualmente na reta final para a certificação <strong className="text-[var(--foreground)] font-semibold">ISTQB® CTFL v4.0</strong> (exame marcado para Dez/2026) e estruturando arquiteturas modulares de automação de testes Web e API.
            </>
          ),
          expHeading: "Experiência",
          projHeading: "Entregas & Resultados",
          projCount: `${visibleProjects.length} de ${projects.length}`,
          tracks: [
            { id: "all" as TrackFilter, label: "Destaques" },
            { id: "qa" as TrackFilter, label: "QA & Automação" },
            { id: "ai" as TrackFilter, label: "IA & RAG" },
            { id: "data" as TrackFilter, label: "Dados" },
            { id: "fullstack" as TrackFilter, label: "Fullstack" },
            { id: "systems" as TrackFilter, label: "GPU & Sistemas" },
          ],
          viewDetails: "Ver Caso",
          impactPrefix: "Resultado:",
          showMore: `Ver todos os ${projects.length} projetos (+${hiddenCount})`,
          showLess: "Mostrar apenas destaques",
          skillsHeading: "Competências Técnicas",
          certsHeading: "Certificações & Idiomas",
          contactHeading: "Contato",
          contactLead:
            "Disponível para posições em Automação de QA, Engenharia de Software e Dados/IA em Brasília (Híbrido/Remoto) e exterior.",
          copyEmail: "Copiar E-mail",
          copiedEmail: "Copiado!",
          backToTop: "Voltar ao topo ↑",
          footerNote:
            "Desenvolvido por Ian Costa Guimarães com Next.js 16, React 19 e Tailwind CSS.",
        };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[var(--cta-bg)] focus:text-[var(--cta-fg)] focus:font-mono focus:text-xs focus:font-semibold focus:shadow-lg"
      >
        {ui.skipToContent}
      </a>
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-radial-glow" />
      <SpotlightCursor />

      <FastScanModal
        isOpen={isFastScanOpen}
        onClose={() => setIsFastScanOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onOpen={() => setIsCommandOpen(true)}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(p) => selectProject(p)}
      />

      <ProjectDrawer
        project={selectedProject}
        onClose={() => selectProject(null)}
      />

      {/* MAIN TWO-COLUMN SHELL */}
      <div className="mx-auto min-h-screen max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="lg:grid lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* LEFT ANCHOR RAIL (STICKY ON DESKTOP, FITS 100VH WITHOUT INTERNAL SCROLL) */}
          <header className="pt-6 pb-8 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-10">
            <div className="space-y-5">
              {/* Row 1: Location/Time + Language & Theme Controls */}
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted-subtle)] tabular-nums min-w-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{ui.location}</span>
                  <span aria-hidden="true">•</span>
                  <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span className="shrink-0">{currentTime || "12:00"} BRT</span>
                </p>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className="inline-flex items-center rounded-lg bg-[var(--card)] border border-[var(--border)] p-0.5"
                    role="group"
                    aria-label="Language switcher"
                  >
                    <Globe className="w-3.5 h-3.5 text-[var(--muted-subtle)] ml-2 mr-1 hidden sm:block" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      aria-pressed={locale === "en"}
                      className={`relative min-h-8 px-2.5 text-xs font-mono font-semibold rounded-md transition-colors duration-150 cursor-pointer ${
                        locale === "en"
                          ? "text-[var(--cta-fg)]"
                          : "text-[var(--muted-subtle)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {locale === "en" && (
                        <motion.span
                          layoutId="locale-pill"
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 rounded-md bg-[var(--cta-bg)]"
                        />
                      )}
                      <span className="relative z-10">EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale("pt")}
                      aria-pressed={locale === "pt"}
                      className={`relative min-h-8 px-2.5 text-xs font-mono font-semibold rounded-md transition-colors duration-150 cursor-pointer ${
                        locale === "pt"
                          ? "text-[var(--cta-fg)]"
                          : "text-[var(--muted-subtle)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {locale === "pt" && (
                        <motion.span
                          layoutId="locale-pill"
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 rounded-md bg-[var(--cta-bg)]"
                        />
                      )}
                      <span className="relative z-10">PT-BR</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={toggleColorMode}
                    title={ui.modeTitle}
                    aria-label={ui.modeTitle}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted-subtle)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    {colorMode === "light" ? (
                      <Moon className="w-4 h-4" />
                    ) : (
                      <Sun className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Row 2: Identity Lockup + Full Availability Status */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                    <Image
                      src="/avatar.jpg"
                      alt={personalInfo.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                      {personalInfo.name}
                    </h1>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs font-mono text-[var(--accent)] font-medium leading-snug">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--signal-fg)] shrink-0" aria-hidden="true" />
                  <span>{ui.available}</span>
                </div>

                <p className="text-sm sm:text-[15px] font-medium text-[var(--foreground)]/90 leading-snug">
                  {personalInfo.role}
                </p>

                <p className="text-sm leading-relaxed text-[var(--muted)] max-w-[44ch]">
                  {ui.positioning}
                </p>
              </div>

              {/* Row 3: Primary Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsFastScanOpen(true)}
                  className="inline-flex items-center gap-1.5 min-h-10 px-4 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] font-semibold text-xs font-mono transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{ui.cvBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFastScanOpen(true);
                    setTimeout(() => window.print(), 150);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-10 px-3.5 rounded-xl bg-[var(--card)] hover:bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors cursor-pointer"
                  title={ui.pdfTitle}
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                  <span>{ui.pdfBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  className="inline-flex items-center gap-2 min-h-10 px-3.5 rounded-xl bg-[var(--card)] hover:bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  <CommandIcon className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                  <span>{ui.searchBtn}</span>
                  <kbd className="px-1.5 py-0.5 text-[11px] rounded bg-[var(--surface-subtle)] text-[var(--muted-subtle)] border border-[var(--border)]">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* Row 4: Desktop Section Wayfinding */}
              <nav className="hidden lg:block pt-2" aria-label="Section navigation">
                <ul className="space-y-1">
                  {ui.nav.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(item.id)}
                          aria-current={isActive ? "location" : undefined}
                          className="group flex items-center py-2 w-full text-left transition-colors cursor-pointer"
                        >
                          <span
                            className={`mr-3.5 h-px transition-all duration-200 group-hover:w-12 group-hover:bg-[var(--accent)] ${
                              isActive
                                ? "w-12 bg-[var(--accent)]"
                                : "w-6 bg-[var(--border)]"
                            }`}
                          />
                          <span
                            className={`text-xs font-mono uppercase tracking-widest transition-colors group-hover:text-[var(--foreground)] ${
                              isActive
                                ? "text-[var(--foreground)] font-semibold"
                                : "text-[var(--muted-subtle)] font-medium"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="mt-8 lg:mt-6 flex items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-1 text-[var(--muted-subtle)]">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="Email"
                >
                  <MailIcon className="w-[18px] h-[18px]" />
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-live="polite"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted-subtle)] hover:text-[var(--foreground)] transition-colors py-2 px-2 rounded-md cursor-pointer truncate"
                title={ui.copyEmail}
              >
                {copiedEmail && (
                  <Check className="w-3.5 h-3.5 text-[var(--signal-fg)] shrink-0" aria-hidden="true" />
                )}
                <span className={copiedEmail ? "text-[var(--signal-fg)] font-semibold" : ""}>
                  {copiedEmail ? ui.copiedEmail : personalInfo.email}
                </span>
              </button>
            </div>
          </header>

          {/* MOBILE / TABLET STICKY SECTION JUMP BAR */}
          <nav
            className="lg:hidden sticky top-0 z-30 -mx-5 sm:-mx-8 md:-mx-12 px-5 sm:px-8 md:px-12 py-2.5 bg-[var(--background)]/92 backdrop-blur-md border-y border-[var(--border)] overflow-x-auto no-scrollbar"
            aria-label="Mobile section navigation"
          >
            <ul className="flex items-center gap-1.5 w-max">
              {ui.nav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative min-h-9 px-3 rounded-lg text-xs font-mono whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? "text-[var(--cta-fg)] font-semibold"
                          : "text-[var(--muted-subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-pill"
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 rounded-lg bg-[var(--cta-bg)]"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT CONTENT STAGE */}
          <main id="main-content" className="pt-8 pb-16 lg:py-12 space-y-20 lg:space-y-24 min-w-0">
            {/* TOP VERIFIED OUTCOMES STRIP — Hairline-divided, zero nested cards */}
            <section aria-label={ui.kpisLabel}>
              <dl className="grid grid-cols-2 sm:grid-cols-4 border-y border-[var(--border)] sm:divide-x sm:divide-[var(--border)]">
                {ui.kpis.map((kpi, idx) => (
                  <div
                    key={kpi.label}
                    className={`py-4 px-3 sm:px-4 ${
                      idx === 0 ? "pl-0 sm:pl-0" : ""
                    } ${idx === 2 ? "pl-0 sm:pl-4" : ""} ${
                      idx >= 2 ? "border-t sm:border-t-0 border-[var(--border)]" : ""
                    } ${idx % 2 === 1 ? "border-l sm:border-l-0 border-[var(--border)]" : ""}`}
                  >
                    <dt className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-subtle)]">
                      {kpi.label}
                    </dt>
                    <dd className="mt-1 text-xl sm:text-2xl font-bold text-[var(--signal-fg)] font-mono tracking-tight tabular-nums">
                      {kpi.href ? (
                        <a
                          href={kpi.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/kpi inline-flex items-center gap-1 underline decoration-[var(--signal-fg)]/45 underline-offset-4 hover:decoration-[var(--signal-fg)] transition-colors"
                        >
                          <span>{kpi.value}</span>
                          <ArrowUpRight
                            className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/kpi:translate-x-0.5 group-hover/kpi:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        kpi.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* SECTION 1: DELIVERED WORK (ARTIFACT-FIRST FOR 15-SECOND SCAN) */}
            <section
              id="projects"
              className="scroll-mt-20 lg:scroll-mt-12"
              aria-label={ui.projHeading}
            >
              <div className="pb-4 border-b border-[var(--border)] space-y-3.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)] font-semibold">
                    {ui.projHeading}
                  </h2>
                  <span className="text-xs font-mono text-[var(--muted-subtle)] tabular-nums">
                    {ui.projCount}
                  </span>
                </div>

                {/* Track Filter Tabs on their own dedicated row — never fights the heading */}
                <div
                  className="flex flex-wrap gap-1.5"
                  role="tablist"
                  aria-label="Project tracks"
                >
                  {ui.tracks.map((track) => {
                    const isSelected = activeTrack === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls="projects-panel"
                        onClick={() => selectTrack(track.id)}
                        className={`relative min-h-9 px-3 rounded-lg text-xs font-mono transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? "text-[var(--cta-fg)] font-semibold"
                            : "bg-transparent text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="active-track-pill"
                            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 rounded-lg bg-[var(--cta-bg)]"
                          />
                        )}
                        <span className="relative z-10">{track.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Project Artifacts — elevated interactive surfaces distinct from timeline */}
              <div id="projects-panel" role="tabpanel" className="mt-5 space-y-4">
                {visibleProjects.length === 0 ? (
                  <p className="py-8 text-center text-sm font-mono text-[var(--muted-subtle)] border border-dashed border-[var(--border)] rounded-xl">
                    {ui.emptyTrack}
                  </p>
                ) : visibleProjects.map((project) => {
                  const isSignalMetric = [
                    "iris-pedagogical-ai",
                    "senhora-vera",
                    "meucapilar",
                    "data-warehouse-voos",
                    "meu-amigo-broto",
                  ].includes(project.id);

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => selectProject(project)}
                      className="w-full text-left group/item block p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
                    >
                      {/* Top Metadata Row: Metric badge + Period on left, Case Study affordance on right */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold border tabular-nums ${
                              isSignalMetric
                                ? "bg-[var(--signal-bg)] text-[var(--signal-fg)] border-[var(--signal-border)]"
                                : "bg-[var(--surface-subtle)] text-[var(--muted)] border-[var(--border)]"
                            }`}
                          >
                            {project.shortMetric || project.categoryLabel}
                          </span>
                          <span className="text-xs font-mono text-[var(--muted-subtle)] tabular-nums">
                            {project.period}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] font-medium">
                          <span>{ui.viewDetails}</span>
                          <ArrowUpRight
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-semibold text-base sm:text-lg text-[var(--foreground)] tracking-tight group-hover/item:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed max-w-[65ch]">
                        {project.shortDescription}
                      </p>

                      {/* Verified Outcome Line */}
                      <p className="mt-3 text-xs font-mono text-[var(--signal-fg)] font-medium">
                        <span className="text-[var(--muted-subtle)] mr-1.5 font-normal">
                          {ui.impactPrefix}
                        </span>
                        {project.highlightMetric}
                      </p>

                      {/* Technology Stack */}
                      <ul
                        className="mt-3.5 pt-3 border-t border-[var(--border)]/60 flex flex-wrap gap-1.5"
                        aria-label="Project technologies"
                      >
                        {project.technologies.slice(0, 6).map((tech, tIdx) => (
                          <li
                            key={tIdx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2 py-0.5 text-xs font-mono text-[var(--muted)]"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              {activeTrack === "all" && (
                <button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="mt-4 w-full min-h-11 px-4 rounded-xl bg-transparent border border-[var(--border)] hover:bg-[var(--surface-subtle)] hover:border-[var(--border-hover)] text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {showAllProjects ? (
                    <>
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      <span>{ui.showLess}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      <span>{ui.showMore}</span>
                    </>
                  )}
                </button>
              )}
            </section>

            {/* SECTION 2: EXPERIENCE (EDITORIAL TIMELINE — NO CARD SOUP) */}
            <section
              id="experience"
              className="scroll-mt-20 lg:scroll-mt-12"
              aria-label={ui.expHeading}
            >
              <div className="pb-4 border-b border-[var(--border)]">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)] font-semibold">
                  {ui.expHeading}
                </h2>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {experiences.map((exp, index) => (
                  <article
                    key={index}
                    className="py-7 first:pt-6 last:pb-0 grid grid-cols-1 sm:grid-cols-[136px_minmax(0,1fr)] gap-3 sm:gap-6"
                  >
                    {/* Left Date Rail */}
                    <div className="text-xs font-mono uppercase tracking-wide text-[var(--muted-subtle)] sm:pt-1 tabular-nums">
                      {exp.period}
                    </div>

                    {/* Right Entry Content */}
                    <div className="space-y-3 min-w-0">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">{getCompanyLogo(exp.logoKey)}</div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base text-[var(--foreground)] leading-snug">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-[var(--muted)] mt-0.5">
                            {exp.organization}
                          </p>
                        </div>
                      </div>

                      {exp.highlightMetric && (
                        exp.highlightUrl ? (
                          <a
                            href={exp.highlightUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/metric inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] hover:border-[var(--signal-fg)] font-semibold text-xs font-mono underline decoration-[var(--signal-fg)]/45 underline-offset-4 hover:decoration-[var(--signal-fg)] transition-colors"
                          >
                            <span>{exp.highlightMetric}</span>
                            <ArrowUpRight
                              className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/metric:translate-x-0.5 group-hover/metric:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] font-semibold text-xs font-mono">
                            {exp.highlightMetric}
                          </div>
                        )
                      )}

                      <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[65ch]">
                        {exp.summary}
                      </p>

                      <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Skills used">
                        {exp.skills.map((skill, sIdx) => (
                          <li
                            key={sIdx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-0.5 text-xs font-mono text-[var(--foreground)] border border-[var(--border)]/70"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* SECTION 3: ABOUT & FOCUS (FOCUSED 65CH EDITORIAL MEASURE) */}
            <section
              id="about"
              className="scroll-mt-20 lg:scroll-mt-12"
              aria-label={ui.aboutHeading}
            >
              <div className="pb-4 border-b border-[var(--border)]">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)] font-semibold">
                  {ui.aboutHeading}
                </h2>
              </div>

              <div className="mt-5 space-y-4 max-w-[65ch] text-sm sm:text-[15px] text-[var(--muted)] leading-[1.7]">
                <p>{ui.aboutP1}</p>
                <p>{ui.aboutP2}</p>
                <p>{ui.aboutP3}</p>
                <p>{ui.aboutP4}</p>
              </div>
            </section>

            {/* SECTION 4: TECH STACK & CERTIFICATIONS (RULED TAXONOMY — NO REPETITIVE BOXES) */}
            <section
              id="skills"
              className="scroll-mt-20 lg:scroll-mt-12"
              aria-label={ui.skillsHeading}
            >
              <div className="pb-4 border-b border-[var(--border)]">
                <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)] font-semibold">
                  {ui.skillsHeading}
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-[var(--border)]/60">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] font-semibold">
                        {cat.title}
                      </h3>
                      <span className="text-xs font-mono text-[var(--muted-subtle)] tabular-nums">
                        {cat.skills.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--foreground)] text-xs font-mono border border-[var(--border)]/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications & Languages — clean ruled block */}
              <div className="mt-10 pt-6 border-t border-[var(--border)] space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] font-semibold">
                  {ui.certsHeading}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 text-sm text-[var(--muted)]">
                  <ul className="space-y-2.5">
                    {personalInfo.certifications.map((cert, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 leading-snug">
                        {cert.inProgress ? (
                          <Hourglass
                            className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckCircle2
                            className="w-4 h-4 text-[var(--signal-fg)] mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-[var(--foreground)] text-xs sm:text-sm">
                          {cert.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <dl className="space-y-2 sm:border-l sm:border-[var(--border)] sm:pl-6">
                    {personalInfo.languages.map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between gap-4 text-xs sm:text-sm"
                      >
                        <dt className="text-[var(--foreground)] font-medium">{lang.name}</dt>
                        <dd className="font-mono text-xs text-[var(--muted-subtle)]">
                          {lang.level}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>

            {/* SECTION 5: CONTACT CTA — Single distinct closing surface */}
            <section
              id="contact"
              className="scroll-mt-20 lg:scroll-mt-12 p-6 sm:p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4"
              aria-label={ui.contactHeading}
            >
              <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)] font-semibold">
                {ui.contactHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed max-w-[60ch]">
                {ui.contactLead}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] font-semibold text-xs font-mono transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {copiedEmail ? ui.copiedEmail : `${ui.copyEmail} (${personalInfo.email})`}
                  </span>
                </button>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl bg-[var(--surface-subtle)] hover:bg-[var(--card)] hover:border-[var(--border-hover)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 shrink-0" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-11 px-4 rounded-xl bg-[var(--surface-subtle)] hover:bg-[var(--card)] hover:border-[var(--border-hover)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4 shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-6 border-t border-[var(--border)] text-xs text-[var(--muted-subtle)] flex flex-wrap items-center justify-between gap-4">
              <p>{ui.footerNote}</p>
              <button
                type="button"
                onClick={() => {
                  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
                }}
                className="min-h-10 px-2 -mr-2 inline-flex items-center hover:text-[var(--foreground)] transition-colors cursor-pointer font-mono"
              >
                {ui.backToTop}
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
