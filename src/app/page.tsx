"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  Project,
} from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Sparkles,
  Command as CommandIcon,
  FileText,
  Clock,
  MapPin,
  ExternalLink,
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
import { ThemePaletteSelector } from "@/components/ThemePaletteSelector";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isFastScanOpen, setIsFastScanOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Relógio de Brasília em tempo real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scrollspy para atualizar a seção ativa na coluna esquerda
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills"];
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
        return <div className="w-5 h-5 rounded bg-zinc-800" />;
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      {/* Sutil Spotlight radial que persegue o cursor */}
      <SpotlightCursor />

      {/* Modal de Leitura Rápida para Recrutador */}
      <FastScanModal
        isOpen={isFastScanOpen}
        onClose={() => setIsFastScanOpen(false)}
      />

      {/* Global Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Slide-over Technical Drawer com Abas de Código & Benchmark */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Container Principal: Split 50/50 clássico */}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          
          {/* ============================================================ */}
          {/* COLUNA ESQUERDA (FIXA NO DESKTOP)                           */}
          {/* ============================================================ */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Avatar + Badge de Status */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 ring-2 ring-white/10 shadow-lg">
                  <Image
                    src="/avatar.jpg"
                    alt={PERSONAL_INFO.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Disponível para novos projetos
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                    <MapPin className="w-3 h-3" />
                    Brasília, DF • <Clock className="w-3 h-3 ml-0.5" /> {currentTime || "12:00"} BRT
                  </span>
                </div>
              </div>

              {/* Título Principal & Proposta de Valor */}
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-sans">
                {PERSONAL_INFO.name}
              </h1>
              <h2 className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-zinc-200">
                {PERSONAL_INFO.role}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300">
                Engenheiro de Software com <strong className="text-white font-semibold">3+ anos de experiência prática</strong> construindo sistemas resilientes em produção, orquestrações de LLMs com RAG e computação acelerada em GPU (CUDA) pela <strong className="text-white font-medium">UnB</strong> & <strong className="text-white font-medium">Instituto Eldorado / Softex</strong>.
              </p>

              {/* Micro-Painel de Resultados Rápidos (Alto Contraste Branco Puro & Titânio) */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 max-w-sm">
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 hover:border-white/40 transition-all">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                    +3 Anos
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                    Experiência Prática
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 hover:border-white/40 transition-all">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                    -78%
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                    Tokens (RAG Prod)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 hover:border-white/40 transition-all">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                    ~20x
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                    Speedup CUDA/GPU
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 hover:border-white/40 transition-all">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                    Milhões
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide">
                    Linhas em DW
                  </div>
                </div>
              </div>

              {/* Controles Rápidos: Seletor de Tema + Busca Cmd+K */}
              <div className="mt-6 flex items-center gap-2.5 flex-wrap">
                <ThemePaletteSelector />
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Buscar rapidamente no portfólio"
                >
                  <CommandIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Buscar</span>
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-zinc-300 border border-white/10">
                    ⌘K
                  </kbd>
                </button>
                <button
                  onClick={() => setIsFastScanOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium text-xs font-mono transition-all cursor-pointer shadow-md"
                  title="Visualizar currículo resumido em 1 página"
                >
                  <FileText className="w-3.5 h-3.5 text-black" />
                  <span>1-Pág CV</span>
                </button>
              </div>

              {/* Menu de Navegação Vertical Dinâmico (Assertivo & Executivo) */}
              <nav className="nav hidden lg:block mt-10" aria-label="Navegação interna da página">
                <ul className="w-max space-y-4">
                  <li>
                    <button
                      onClick={() => scrollTo("about")}
                      className={`group flex items-center py-1 transition-all cursor-pointer ${
                        activeSection === "about" ? "active" : ""
                      }`}
                    >
                      <span
                        className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-white ${
                          activeSection === "about"
                            ? "w-16 bg-white"
                            : "w-8 bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-white ${
                          activeSection === "about"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        01 // Visão & Atuação
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("experience")}
                      className={`group flex items-center py-1 transition-all cursor-pointer ${
                        activeSection === "experience" ? "active" : ""
                      }`}
                    >
                      <span
                        className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-white ${
                          activeSection === "experience"
                            ? "w-16 bg-white"
                            : "w-8 bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-white ${
                          activeSection === "experience"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        02 // Experiência Profissional
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("projects")}
                      className={`group flex items-center py-1 transition-all cursor-pointer ${
                        activeSection === "projects" ? "active" : ""
                      }`}
                    >
                      <span
                        className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-white ${
                          activeSection === "projects"
                            ? "w-16 bg-white"
                            : "w-8 bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-white ${
                          activeSection === "projects"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        03 // Entregas & Resultados
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("skills")}
                      className={`group flex items-center py-1 transition-all cursor-pointer ${
                        activeSection === "skills" ? "active" : ""
                      }`}
                    >
                      <span
                        className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-white ${
                          activeSection === "skills"
                            ? "w-16 bg-white"
                            : "w-8 bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-white ${
                          activeSection === "skills"
                            ? "text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        04 // Competências Técnicas
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Rodapé da Coluna Esquerda: Links Sociais + Switcher de Rota */}
            <div className="mt-10 lg:mt-0 flex flex-col gap-4">
              <Link
                href="/minimal"
                className="group flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all w-fit"
                title="Conheça também a experiência imersiva com tela cheia e canvas interativo"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span>Alternar para Modo Monumental</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-4 text-zinc-400">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-white transition-colors p-1"
                  aria-label="E-mail"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </header>

          {/* ============================================================ */}
          {/* COLUNA DIREITA (SCROLL NATURAL)                             */}
          {/* ============================================================ */}
          <main className="pt-16 lg:w-[52%] lg:py-24 space-y-24">
            
            {/* SEÇÃO 1: SOBRE */}
            <section
              id="about"
              className="scroll-mt-16 lg:scroll-mt-24 space-y-4 text-sm text-zinc-300 leading-relaxed"
              aria-label="Sobre mim"
            >
              <div className="lg:hidden mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  01 // Visão & Atuação
                </h3>
              </div>
              <p>
                Com mais de <strong className="text-white font-semibold">3 anos de experiência prática</strong> em engenharia de software e pesquisa aplicada em Inteligência Artificial, sou graduando em <strong className="text-zinc-100">Engenharia de Software pela Universidade de Brasília (UnB)</strong> e atuo como pesquisador residente no <strong className="text-zinc-100">Instituto Eldorado / Softex</strong>.
              </p>
              <p>
                Meu foco é a intersecção entre <strong className="text-white font-semibold">engenharia de software rigorosa</strong> e <strong className="text-white font-semibold">IA em produção</strong>. Já arquitetei sistemas de orquestração RAG hierárquicos com vetores no PostgreSQL/PGVector, pipelines ETL de alta volumetria no padrão medalhão com Apache Airflow e computação científica acelerada por hardware em <strong className="text-white font-semibold">CUDA / C++</strong> com ganhos de até 20x sobre CPU.
              </p>
              <p>
                Não construo apenas protótipos em notebooks: me preocupo com <em>guardrails</em> factuais contra alucinação de LLMs, redução drástica de custos operacionais de inferência (<strong className="text-black bg-white px-1.5 py-0.5 rounded font-mono font-bold">-78% em tokens</strong> no MeuCapilar), latência de consultas e resiliência de microsserviços.
              </p>
            </section>

            {/* SEÇÃO 2: EXPERIÊNCIA PROFISSIONAL */}
            <section
              id="experience"
              className="scroll-mt-16 lg:scroll-mt-24"
              aria-label="Experiência profissional"
            >
              <div className="lg:hidden mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  02 // Experiência Profissional
                </h3>
              </div>

              {/* Container de lista com foco reativo (Brittany Chiang style) */}
              <div className="group/list space-y-8">
                {EXPERIENCES.map((exp, index) => (
                  <div
                    key={index}
                    className="group/item relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-6 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 p-4 -mx-4 rounded-2xl hover:bg-white/[0.06] border border-white/10 hover:border-white/30 shadow-sm"
                  >
                    {/* Período à esquerda */}
                    <header className="sm:col-span-2 text-xs font-mono uppercase tracking-wide text-zinc-400 mt-1">
                      {exp.period}
                    </header>

                    {/* Conteúdo à direita */}
                    <div className="sm:col-span-6 space-y-3">
                      {/* Logo + Cargo + Empresa */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {getCompanyLogo(exp.logoKey)}
                        <h4 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover/item:text-white transition-colors flex items-center gap-1.5">
                          <span>{exp.role}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-300">{exp.organization}</span>
                        </h4>
                      </div>

                      {/* KPI Callout da Experiência em Branco Puro de Alto Contraste */}
                      {exp.highlightMetric && (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white text-black font-extrabold text-xs font-mono shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                          <span>{exp.highlightMetric}</span>
                        </div>
                      )}

                      {/* Resumo & Destaques de Impacto */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {exp.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {exp.highlights.slice(0, 2).map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-zinc-500 mt-0.5">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags de Tecnologias em Alto Contraste */}
                      <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tecnologias usadas">
                        {exp.skills.map((skill, sIdx) => (
                          <li
                            key={sIdx}
                            className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-mono text-white border border-white/20 hover:border-white/40 transition-colors"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÃO 3: ENTREGAS & RESULTADOS */}
            <section
              id="projects"
              className="scroll-mt-16 lg:scroll-mt-24"
              aria-label="Projetos em destaque"
            >
              <div className="lg:hidden mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  03 // Entregas & Resultados
                </h3>
              </div>

              {/* Lista de Projetos com foco interativo */}
              <div className="group/list space-y-8">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group/item relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-6 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 p-4 -mx-4 rounded-2xl hover:bg-white/[0.06] border border-white/10 hover:border-white/30 shadow-sm cursor-pointer"
                  >
                    {/* Métrica em Branco Puro na coluna da esquerda */}
                    <div className="sm:col-span-2 mt-1">
                      <div className="inline-block px-2.5 py-1 rounded bg-white text-black text-xs font-mono font-extrabold tracking-tight shadow-md">
                        {project.highlightMetric.split(" ")[0]}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase mt-1">
                        {project.period}
                      </div>
                    </div>

                    {/* Detalhes do Projeto */}
                    <div className="sm:col-span-6 space-y-2.5">
                      <h4 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover/item:text-white transition-colors flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          {project.title}
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/item:text-white group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 uppercase group-hover/item:text-white">
                          Ver detalhes →
                        </span>
                      </h4>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Métricas e KeyPoints em Destaque Branco Puro */}
                      <div className="p-3 rounded-xl bg-white text-black font-mono text-xs space-y-1 shadow-md">
                        <div className="font-extrabold text-black flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          Impacto: {project.highlightMetric}
                        </div>
                        <div className="text-[11px] text-zinc-800 font-sans font-medium">
                          {project.keyPoints[0]}
                        </div>
                      </div>

                      {/* Tags de Tecnologias */}
                      <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tecnologias do projeto">
                        {project.technologies.slice(0, 5).map((tech, tIdx) => (
                          <li
                            key={tIdx}
                            className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-mono text-white border border-white/20 hover:border-white/40 transition-colors"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÃO 4: COMPETÊNCIAS TÉCNICAS */}
            <section
              id="skills"
              className="scroll-mt-16 lg:scroll-mt-24 space-y-6"
              aria-label="Competências técnicas"
            >
              <div className="lg:hidden mb-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  04 // Competências Técnicas
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 hover:border-white/30 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                        {cat.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {cat.skills.length} techs
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-mono border border-white/20 hover:bg-white hover:text-black transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificações & Idiomas */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/15 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
                  Certificações & Idiomas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                  <div className="space-y-1">
                    {PERSONAL_INFO.certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5">
                        <span className="text-white font-bold">✓</span>
                        <span className="text-zinc-200">{cert}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {PERSONAL_INFO.languages.map((lang, lIdx) => (
                      <div key={lIdx} className="flex items-center justify-between text-zinc-400">
                        <span className="text-zinc-200">{lang.name}</span>
                        <span className="font-mono text-[11px] text-zinc-300">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* RODAPÉ ELEGANTE */}
            <footer className="pt-12 border-t border-white/10 text-xs text-zinc-500 space-y-3 leading-relaxed">
              <p>
                Inspirado na arquitetura clássica de portfólio de <strong>Brittany Chiang</strong>. Desenvolvido para <strong>Ian Costa Guimarães</strong> utilizando <strong>Next.js 16</strong>, <strong>Tailwind CSS v4</strong> e <strong>TypeScript</strong>.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <Link
                  href="/minimal"
                  className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Ver Modo Monumental ⚡
                </Link>
                <span>•</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Voltar ao topo ↑
                </button>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}
