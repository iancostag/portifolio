"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolio-data";
import { getPortfolioData } from "@/data/portfolio-i18n";
import { useLocale } from "@/context/LocaleContext";
import { useThemePalette } from "@/context/ThemeContext";
import {
  ArrowUpRight,
  Sparkles,
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

type TrackFilter = "all" | "ai" | "data" | "fullstack" | "systems";

export default function Home() {
  const { locale, setLocale } = useLocale();
  const { colorMode, toggleColorMode } = useThemePalette();
  const { personalInfo, projects, experiences, skillCategories } = getPortfolioData(locale);

  const [activeSection, setActiveSection] = useState<string>("about");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isFastScanOpen, setIsFastScanOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("all");
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Open project drawer from ?project=<id> query param
  useEffect(() => {
    const projectId = new URLSearchParams(window.location.search).get("project");
    if (projectId) {
      const match = projects.find((p) => p.id === projectId);
      if (match) setSelectedProject(match);
    }
  }, [locale]);

  const selectProject = (project: Project | null) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    if (project) {
      url.searchParams.set("project", project.id);
    } else {
      url.searchParams.delete("project");
    }
    window.history.replaceState({}, "", url.toString());
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

  // Scrollspy for left navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

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
        return <div className="w-5 h-5 rounded bg-[var(--surface-subtle)]" />;
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).catch(() => {});
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
          available: "Available for Data & AI Engineering roles",
          location: "Brasília, Brazil",
          positioning:
            "Building production data pipelines (Medallion & Star Schema), LLM/RAG orchestration, and GPU-accelerated systems (CUDA/C++).",
          kpis: [
            { value: "Millions", label: "DW Rows (ETL)" },
            { value: "-75%", label: "RAG Token Cost" },
            { value: "1h → 5m", label: "SQL & Prod. Reports" },
            { value: "+3 Yrs", label: "Data & AI Eng." },
          ],
          searchBtn: "Search",
          cvBtn: "1-Page CV",
          pdfBtn: "PDF",
          pdfTitle: "Print or Save 1-Page CV as PDF",
          modeTitle: colorMode === "light" ? "Switch to dark mode" : "Switch to light mode",
          nav: [
            { id: "about", label: "About & Focus" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Delivered Work" },
            { id: "skills", label: "Tech Stack" },
            { id: "contact", label: "Contact" },
          ],
          minimalLink: "Interactive Canvas View",
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
          expHeading: "Experience",
          projHeading: "Delivered Work",
          tracks: [
            { id: "all" as TrackFilter, label: "Featured" },
            { id: "ai" as TrackFilter, label: "AI & RAG" },
            { id: "data" as TrackFilter, label: "Data Eng" },
            { id: "fullstack" as TrackFilter, label: "Fullstack" },
            { id: "systems" as TrackFilter, label: "GPU & Systems" },
          ],
          viewDetails: "Details",
          impactPrefix: "Outcome:",
          showMore: `Show all ${projects.length} projects (+${hiddenCount} more)`,
          showLess: "Show featured only",
          skillsHeading: "Tech Stack",
          certsHeading: "Certifications & Languages",
          contactHeading: "Get in Touch",
          contactLead:
            "Open to Data Engineering, AI/RAG Engineering, and Software Engineering roles in Brazil and internationally.",
          copyEmail: "Copy Email",
          copiedEmail: "Copied!",
          backToTop: "Back to top ↑",
          footerNote:
            "Engineered by Ian Costa Guimarães with Next.js 16, React 19, and Tailwind CSS.",
        }
      : {
          available: "Disponível para vagas de Engenharia de Dados & IA",
          location: "Brasília, DF",
          positioning:
            "Construindo pipelines de dados em produção (Medalhão & Star Schema), orquestrações de LLMs/RAG e sistemas acelerados em GPU (CUDA/C++).",
          kpis: [
            { value: "Milhões", label: "Linhas em DW (ETL)" },
            { value: "-75%", label: "Tokens (RAG)" },
            { value: "1h → 5m", label: "SQL & Laudos Prod." },
            { value: "+3 Anos", label: "Eng. Dados & IA" },
          ],
          searchBtn: "Buscar",
          cvBtn: "1-Pág CV",
          pdfBtn: "PDF",
          pdfTitle: "Imprimir ou salvar currículo em PDF",
          modeTitle: colorMode === "light" ? "Mudar para modo escuro" : "Mudar para modo claro",
          nav: [
            { id: "about", label: "Visão & Atuação" },
            { id: "experience", label: "Experiência" },
            { id: "projects", label: "Entregas" },
            { id: "skills", label: "Competências" },
            { id: "contact", label: "Contato" },
          ],
          minimalLink: "Modo Canvas Interativo",
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
          expHeading: "Experiência",
          projHeading: "Entregas & Resultados",
          tracks: [
            { id: "all" as TrackFilter, label: "Destaques" },
            { id: "ai" as TrackFilter, label: "IA & RAG" },
            { id: "data" as TrackFilter, label: "Dados" },
            { id: "fullstack" as TrackFilter, label: "Fullstack" },
            { id: "systems" as TrackFilter, label: "GPU & Sistemas" },
          ],
          viewDetails: "Detalhes",
          impactPrefix: "Resultado:",
          showMore: `Ver todos os ${projects.length} projetos (+${hiddenCount})`,
          showLess: "Mostrar apenas destaques",
          skillsHeading: "Competências Técnicas",
          certsHeading: "Certificações & Idiomas",
          contactHeading: "Contato",
          contactLead:
            "Aberto a oportunidades de Engenharia de Dados, Engenharia de IA/RAG e Engenharia de Software no Brasil e no exterior.",
          copyEmail: "Copiar E-mail",
          copiedEmail: "Copiado!",
          backToTop: "Voltar ao topo ↑",
          footerNote:
            "Desenvolvido por Ian Costa Guimarães com Next.js 16, React 19 e Tailwind CSS.",
        };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
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

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          {/* LEFT COLUMN (STICKY ON DESKTOP) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-10 lg:overflow-y-auto">
            <div>
              {/* Top Utility Bar: Status + Language Switcher + Light/Dark Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                    <Image
                      src="/avatar.jpg"
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[var(--signal-fg)] shrink-0" />
                      {ui.available}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted-subtle)]">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {ui.location} • <Clock className="w-3 h-3 shrink-0" /> {currentTime || "12:00"} BRT
                    </span>
                  </div>
                </div>

                {/* Controls: EN | PT-BR + Light/Dark */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className="inline-flex items-center rounded-lg bg-[var(--card)] border border-[var(--border)] p-0.5"
                    role="group"
                    aria-label="Language switcher"
                  >
                    <Globe className="w-3.5 h-3.5 text-[var(--muted-subtle)] ml-2 mr-1" />
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      className={`px-2.5 sm:px-2 py-2 sm:py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                        locale === "en"
                          ? "bg-[var(--cta-bg)] text-[var(--cta-fg)]"
                          : "text-[var(--muted-subtle)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale("pt")}
                      className={`px-2.5 sm:px-2 py-2 sm:py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                        locale === "pt"
                          ? "bg-[var(--cta-bg)] text-[var(--cta-fg)]"
                          : "text-[var(--muted-subtle)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      PT-BR
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={toggleColorMode}
                    title={ui.modeTitle}
                    aria-label={ui.modeTitle}
                    className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted-subtle)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    {colorMode === "light" ? (
                      <Moon className="w-3.5 h-3.5" />
                    ) : (
                      <Sun className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] font-sans">
                {personalInfo.name}
              </h1>
              <h2 className="mt-2.5 text-lg sm:text-xl font-medium tracking-tight text-[var(--muted)]">
                {personalInfo.role}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                {ui.positioning}
              </p>

              {/* Impact KPI Grid — Signal color reserved exclusively for verified metrics */}
              <div className="mt-5 grid grid-cols-2 gap-2 max-w-md">
                {ui.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)]"
                  >
                    <div className="text-lg sm:text-xl font-bold text-[var(--signal-fg)] font-mono tracking-tight">
                      {kpi.value}
                    </div>
                    <div className="text-xs font-mono text-[var(--muted-subtle)] mt-0.5">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Controls */}
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsFastScanOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] font-semibold text-xs font-mono transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{ui.cvBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFastScanOpen(true);
                    setTimeout(() => window.print(), 150);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors cursor-pointer"
                  title={ui.pdfTitle}
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{ui.pdfBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  <CommandIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{ui.searchBtn}</span>
                  <kbd className="px-1.5 py-0.5 text-xs rounded bg-[var(--surface-subtle)] text-[var(--muted-subtle)] border border-[var(--border)]">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="nav hidden lg:block mt-6" aria-label="Section navigation">
                <ul className="w-max space-y-2.5">
                  {ui.nav.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className="group flex items-center py-1 transition-all cursor-pointer"
                      >
                        <span
                          className={`mr-4 h-px transition-all group-hover:w-14 group-hover:bg-[var(--accent)] ${
                            activeSection === item.id
                              ? "w-14 bg-[var(--accent)]"
                              : "w-7 bg-[var(--border)]"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors group-hover:text-[var(--foreground)] ${
                            activeSection === item.id
                              ? "text-[var(--foreground)]"
                              : "text-[var(--muted-subtle)]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="mt-6 lg:mt-4 flex items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-4 text-[var(--muted-subtle)]">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors p-1"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-[var(--foreground)] transition-colors p-1"
                  aria-label="Email"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>

              <span className="text-xs font-mono text-[var(--muted-subtle)]">
                {personalInfo.email}
              </span>
            </div>
          </header>

          {/* RIGHT COLUMN */}
          <main className="pt-14 lg:w-[54%] lg:py-16 space-y-20">
            {/* SECTION 1: ABOUT */}
            <section
              id="about"
              className="scroll-mt-16 lg:scroll-mt-20 space-y-4 max-w-[54ch] text-sm text-[var(--muted)] leading-relaxed"
              aria-label={ui.aboutHeading}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-bold">
                {ui.aboutHeading}
              </h2>
              <p>{ui.aboutP1}</p>
              <p>{ui.aboutP2}</p>
              <p>{ui.aboutP3}</p>
            </section>

            {/* SECTION 2: EXPERIENCE */}
            <section
              id="experience"
              className="scroll-mt-16 lg:scroll-mt-20 space-y-6"
              aria-label={ui.expHeading}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-bold">
                {ui.expHeading}
              </h2>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <article
                    key={index}
                    className="grid sm:grid-cols-8 sm:gap-5 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] transition-colors"
                  >
                    <div className="sm:col-span-2 text-xs font-mono uppercase tracking-wide text-[var(--muted-subtle)] mt-0.5">
                      {exp.period}
                    </div>

                    <div className="sm:col-span-6 space-y-3 mt-2 sm:mt-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {getCompanyLogo(exp.logoKey)}
                        <h3 className="font-semibold text-sm sm:text-base text-[var(--foreground)] flex items-center gap-1.5 flex-wrap">
                          <span>{exp.role}</span>
                          <span className="text-[var(--muted-subtle)]">•</span>
                          <span className="text-[var(--muted)] font-normal">{exp.organization}</span>
                        </h3>
                      </div>

                      {exp.highlightMetric && (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--signal-bg)] text-[var(--signal-fg)] border border-[var(--signal-border)] font-semibold text-xs font-mono">
                          <span>{exp.highlightMetric}</span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                        {exp.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-[var(--muted)]">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-[var(--accent)] mt-0.5">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Skills used">
                        {exp.skills.map((skill, sIdx) => (
                          <li
                            key={sIdx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-mono text-[var(--foreground)] border border-[var(--border)]"
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

            {/* SECTION 3: DELIVERED WORK (3-4 FLAGSHIP DEFAULT + TRACK FILTER) */}
            <section
              id="projects"
              className="scroll-mt-16 lg:scroll-mt-20 space-y-6"
              aria-label={ui.projHeading}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-bold">
                  {ui.projHeading}
                </h2>

                <div className="flex flex-wrap gap-2 sm:gap-1.5" role="tablist" aria-label="Project tracks">
                  {ui.tracks.map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTrack === track.id}
                      onClick={() => {
                        setActiveTrack(track.id);
                        setShowAllProjects(false);
                      }}
                      className={`px-3 sm:px-2.5 py-2 sm:py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activeTrack === track.id
                          ? "bg-[var(--cta-bg)] text-[var(--cta-fg)] font-semibold"
                          : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {visibleProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => selectProject(project)}
                    className="w-full text-left group/item grid sm:grid-cols-8 sm:gap-5 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors cursor-pointer"
                  >
                    <div className="sm:col-span-2 mt-0.5 space-y-1.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${
                          ["senhora-vera", "meucapilar", "data-warehouse-voos", "meu-amigo-broto"].includes(project.id)
                            ? "bg-[var(--signal-bg)] text-[var(--signal-fg)] border-[var(--signal-border)]"
                            : "bg-[var(--surface-subtle)] text-[var(--muted)] border-[var(--border)]"
                        }`}
                      >
                        {project.shortMetric || project.categoryLabel}
                      </span>
                      <div className="text-xs font-mono text-[var(--muted-subtle)]">
                        {project.period}
                      </div>
                    </div>

                    <div className="sm:col-span-6 space-y-2.5 mt-3 sm:mt-0">
                      <h3 className="font-semibold text-sm sm:text-base text-[var(--foreground)] flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5">
                          {project.title}
                          <ArrowUpRight className="w-4 h-4 text-[var(--muted-subtle)] group-hover/item:text-[var(--accent)] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                        </span>
                        <span className="text-xs font-mono text-[var(--accent)] shrink-0">
                          {ui.viewDetails} →
                        </span>
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                        {project.shortDescription}
                      </p>

                      <p className="text-xs font-mono text-[var(--signal-fg)] font-medium">
                        <span className="text-[var(--muted-subtle)] mr-1.5 font-normal">{ui.impactPrefix}</span>
                        {project.highlightMetric}
                      </p>

                      <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Project technologies">
                        {project.technologies.slice(0, 5).map((tech, tIdx) => (
                          <li
                            key={tIdx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-mono text-[var(--foreground)] border border-[var(--border)]"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>

              {activeTrack === "all" && (
                <button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {showAllProjects ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span>{ui.showLess}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      <span>{ui.showMore}</span>
                    </>
                  )}
                </button>
              )}
            </section>

            {/* SECTION 4: TECH STACK */}
            <section
              id="skills"
              className="scroll-mt-16 lg:scroll-mt-20 space-y-6"
              aria-label={ui.skillsHeading}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-bold">
                {ui.skillsHeading}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] font-semibold">
                        {cat.title}
                      </span>
                      <span className="text-xs font-mono text-[var(--muted-subtle)]">
                        {cat.skills.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--foreground)] text-xs font-mono border border-[var(--border)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] font-semibold block">
                  {ui.certsHeading}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
                  <div className="space-y-1.5">
                    {personalInfo.certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2">
                        <span className="text-[var(--signal-fg)] font-bold">✓</span>
                        <span className="text-[var(--foreground)]">{cert}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {personalInfo.languages.map((lang, lIdx) => (
                      <div key={lIdx} className="flex items-center justify-between text-[var(--muted-subtle)]">
                        <span className="text-[var(--foreground)]">{lang.name}</span>
                        <span className="font-mono text-xs text-[var(--muted)]">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: CONTACT CTA */}
            <section
              id="contact"
              className="scroll-mt-16 lg:scroll-mt-20 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4"
              aria-label={ui.contactHeading}
            >
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--muted-subtle)] font-bold">
                {ui.contactHeading}
              </h2>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {ui.contactLead}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-hover)] text-[var(--cta-fg)] font-semibold text-xs font-mono transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  <span>{copiedEmail ? ui.copiedEmail : `${ui.copyEmail} (${personalInfo.email})`}</span>
                </button>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface-subtle)] hover:opacity-90 border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-opacity"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface-subtle)] hover:opacity-90 border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-opacity"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-8 border-t border-[var(--border)] text-xs text-[var(--muted-subtle)] flex flex-wrap items-center justify-between gap-4">
              <p>{ui.footerNote}</p>
              <button
                type="button"
                onClick={() => {
                  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
                }}
                className="hover:text-[var(--foreground)] transition-colors cursor-pointer font-mono"
              >
                {ui.backToTop}
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
