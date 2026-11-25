import { Locale } from "@/context/LocaleContext";
import {
  PERSONAL_INFO as PT_PERSONAL_INFO,
  PROJECTS as PT_PROJECTS,
  EXPERIENCES as PT_EXPERIENCES,
  SKILL_CATEGORIES as PT_SKILL_CATEGORIES,
  Project,
  Experience,
  Certification,
} from "./portfolio-data";

const SHORT_METRICS_PT: Record<string, string> = {
  "iris-pedagogical-ai": "0,42 Recall@5 • Zero-PII",
  "senhora-vera": "-75% Tokens",
  meucapilar: "1h → 5 min",
  "data-warehouse-voos": "Milhões / min",
  "gpu-mpm": "CUDA • C++",
  "meu-amigo-broto": "WCAG AAA",
  "financas-os": "Open Finance",
  "agis-rh": "Desktop IPC",
  "jogo-mud-postgres": "PL/pgSQL",
  "qa-e2e-framework": "Em andamento",
};

const EN_PERSONAL_INFO = {
  ...PT_PERSONAL_INFO,
  role: "Software Engineer • QA & Test Automation • Data & AI Systems",
  headline:
    "Building reliable production systems, automated E2E/API test suites (Robot Framework & Python), data pipelines, and LLM guardrails.",
  bio: "Software Engineering undergraduate at UnB and Resident AI Researcher at Instituto Eldorado / Softex. Focused on scalable architectures, software quality, test automation, automated LLM fact-checking, and data pipelines.",
  location: "Brasília, DF - Brazil",
  status: "Available for Software Engineering, QA Automation & Data/AI roles",
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Advanced" },
    { name: "Japanese", level: "Intermediate" },
  ],
  certifications: [
    { label: "AWS Cloud Practitioner & Cloud Fundamentals" },
    { label: "The Complete Rails Course (Ruby on Rails)" },
    {
      label: "ISTQB® Certified Tester Foundation Level (CTFL v4.0) — Exam Dec/2026",
      inProgress: true,
    },
  ] as Certification[],
};

const EN_PROJECTS: Project[] = [
  {
    ...PT_PROJECTS[0],
    title: "Íris — Pedagogical AI & Guardrails",
    subtitle: "Stateless Multi-Agent & Hybrid RAG Platform for Neurodivergent Education",
    categoryLabel: "AI & RAG",
    period: "Nov/2026",
    shortMetric: "0.42 Recall@5 • Zero-PII",
    highlightMetric: "Recall@5 0.20 → 0.42 (87% queries hit) • Faithfulness > 0.90 • Zero-Database LGPD",
    shortDescription:
      "Stateless multi-agent and hybrid RAG platform that adapts school materials for ADHD students with zero-PII guardrails and verifiable citations.",
    overview:
      "Built during the AI Residency Challenge 2 (Eldorado / Softex / UnB), Íris supports K-12 teachers in adapting exams and activities for students with ADHD without diluting curriculum rigor. Unlike generic LLM wrappers, it enforces functional barriers over clinical labels, 3-level cognitive scaffolding, and strict Zero-Database privacy.",
    challenge:
      "Generic LLMs frequently leak answers (\"crutch effect\"), simplify away core BNCC learning objectives, hallucinate ungrounded pedagogical claims, and risk exposing student PII under LGPD constraints.",
    solution:
      "Architected a stateless FastAPI + Next.js pipeline with in-memory PII scrubbing before any LLM call, a Hybrid RAG engine (Qwen3 embeddings on PostgreSQL/PGVector + Cross-Encoder reranking over 1,368 curated chunks from 38 sources), a multi-provider LLM client (Anthropic Claude / local Ollama with dynamic num_ctx scaling / offline fallback), and deterministic TRCC + scope isolation verifiers.",
    keyPoints: [
      "Upgraded retrieval from BM25 baseline (0.20 Recall@5, 47% queries hit) to Qwen3 + 50-candidate Cross-Encoder reranking (0.42 Recall@5, 87% hit rate; AP@5 0.31 → 0.56).",
      "Validated groundedness with multi-provider LLM-as-a-Judge evaluation (Claude Sonnet + Codex + Opus), achieving 0.905–0.950 faithfulness above the 0.90 threshold.",
      "Built deterministic scope-isolation and TRCC checks with 100% detection across adversarial sabotage tests, plus automatic Ollama context-window escalation (4k–32k tokens) to prevent silent prompt truncation.",
      "Enforced Privacy-by-Design (Zero-Database): zero student records persisted, local PII masking, and portable JSON/PDF pedagogical profiles.",
    ],
  },
  {
    ...PT_PROJECTS[1],
    subtitle: "Hybrid AI Agent for Fact-Checking",
    categoryLabel: "AI & RAG",
    period: "Oct/2026",
    shortMetric: "-75% Tokens",
    highlightMetric: "-75% Token Cost • Latency < 180ms",
    shortDescription:
      "Hybrid fact-checking pipeline combining ultra-fast stylistic triage with dense PGVector retrieval and deep NLI inference.",
    overview:
      "Senhora Vera is an AI agent built at Instituto Eldorado & Softex to analyze high-volume claim streams and detect factual inconsistencies against structured knowledge bases.",
    challenge:
      "Running full LLM verification on every sentence caused prohibitive token costs and 3–5 second latencies, making large-scale fact-checking unviable.",
    solution:
      "Two-stage architecture: a microsecond stylistic triage layer using TF-IDF and Logistic Regression filters trivial claims, routing only ambiguous cases to PGVector semantic search and deep NLI.",
    keyPoints: [
      "70%–80% reduction in total LLM inference costs",
      "Triage response latency under 180ms",
      "Dense vector retrieval with PGVector on PostgreSQL and semantic NLI verification",
      "Built for high concurrency and continuous stream processing",
    ],
  },
  {
    ...PT_PROJECTS[2],
    subtitle: "Clinical Hair & Scalp Assessment Platform",
    categoryLabel: "Fullstack & Production",
    period: "Mar/2025 – Aug/2025",
    shortMetric: "1h → 5 min",
    highlightMetric: "Reports from 1h to 5 min",
    shortDescription:
      "Production clinical platform with rigorous relational modeling that automated complex medical reports and diagnostics.",
    overview:
      "Built and maintained for Studio Flávio Rabello, MeuCapilar is a full clinical platform enabling physicians and trichologists to run anamnesis and issue traceable diagnostics.",
    challenge:
      "Manual clinical report generation took ~1 hour per patient, creating severe scheduling bottlenecks and data inconsistency risks.",
    solution:
      "Full PostgreSQL schema normalization, analytical query tuning, automated document generation, and end-to-end automated testing.",
    keyPoints: [
      "Optimized complex PostgreSQL routes and analytical queries",
      "Strict clinical business rules backed by automated test suites",
      "Direct business impact: report generation cut from 60 to 5 minutes",
      "Resilient production infrastructure serving real clinical patients",
    ],
  },
  {
    ...PT_PROJECTS[3],
    title: "Flight Delays Data Warehouse",
    subtitle: "Medallion Pipeline with PostgreSQL & Power BI",
    categoryLabel: "Data Engineering",
    period: "Jan/2026",
    shortMetric: "Millions / min",
    highlightMetric: "Millions of Rows in Minutes • 100% Docker",
    shortDescription:
      "End-to-end containerized analytics pipeline processing millions of flight records into a Star Schema warehouse.",
    overview:
      "Full Data Warehouse solution designed to ingest, sanitize, transform, and analyze air traffic data to pinpoint delay bottlenecks across airport networks.",
    challenge:
      "Processing massive flight datasets with temporal inconsistencies and nulls without exhausting memory buffers or slowing down Power BI queries.",
    solution:
      "Modular Python ELT/ETL pipeline using Pandas and SQLAlchemy loading into containerized PostgreSQL across Bronze (raw), Silver (cleaned/deduplicated), and Gold (Star Schema facts & dimensions) layers.",
    keyPoints: [
      "Automated processing of millions of records in minutes",
      "Star Schema dimensional modeling eliminating redundancy and speeding aggregations",
      "100% reproducible environment via Docker & Docker Compose",
      "Direct Power BI integration for root-cause delay analysis",
    ],
  },
  {
    ...PT_PROJECTS[4],
    title: "GPU Acceleration for MPM",
    subtitle: "Parallel Physics Simulation with CUDA, C++ & OpenMP",
    categoryLabel: "Low-Level & GPU",
    period: "2026",
    shortMetric: "CUDA • C++",
    highlightMetric: "P2G/G2P Kernels • OpenMP vs. CUDA",
    shortDescription:
      "GPU parallelization of Material Point Method (MPM) granular physics simulations using CUDA, Vulkan, and OpenMP.",
    overview:
      "High-performance computing project focused on parallelizing the Material Point Method (MPM), a numerical technique for simulating granular materials, fluids, and large-deformation solids.",
    challenge:
      "MPM requires intensive particle-to-grid and grid-to-particle transfers every timestep, making CPU-bound execution a bottleneck for dense grids.",
    solution:
      "Custom C++ and CUDA kernels using shared memory and GPU parallelism, structured against a multi-core OpenMP CPU baseline.",
    keyPoints: [
      "Parallelizing P2G (Particle-to-Grid) and G2P (Grid-to-Particle) stages in CUDA",
      "Memory coalescing and atomic contention reduction strategies on GPU",
      "Structured architecture comparing CPU (OpenMP) and GPU (CUDA / Vulkan)",
    ],
  },
  {
    ...PT_PROJECTS[5],
    subtitle: "Local-First PWA for Gambling Harm Reduction",
    categoryLabel: "Fullstack & Mobile",
    period: "Oct/2026",
    shortMetric: "WCAG AAA",
    highlightMetric: "WCAG AAA & Local-First",
    shortDescription:
      "Progressive Web App built at Hackathon BB Digital Week focused on privacy-first crisis support and accessibility.",
    overview:
      "PWA designed to support people recovering from online betting addiction with urge-surfing tools, trigger logging, and judgment-free guidance.",
    challenge:
      "Guaranteeing absolute privacy for sensitive user data and instant offline availability during sudden impulse moments, under strict accessibility standards.",
    solution:
      "100% Local-First architecture persisting via IndexedDB on-device, paired with WCAG AAA contrast and full offline PWA support.",
    keyPoints: [
      "Local-First architecture (IndexedDB): user data never leaves the device",
      "Installable PWA with offline support and minimal data footprint",
      "WCAG AAA accessibility (contrast, keyboard navigation, screen readers)",
      "Integrated urge-surfing workflow for impulse management",
    ],
  },
  {
    ...PT_PROJECTS[6],
    subtitle: "Personal Finance with Open Finance",
    categoryLabel: "Fullstack & FinTech",
    period: "Oct/2026",
    shortMetric: "Open Finance",
    highlightMetric: "Pluggy API & FastAPI",
    shortDescription:
      "Real-time cashflow analytics dashboard connected directly to user bank accounts via Open Finance.",
    overview:
      "Financial management platform featuring automated bank sync, smart expense categorization, and live cashflow reporting.",
    challenge:
      "Normalizing noisy multi-bank transaction descriptions while maintaining strict security for financial payloads.",
    solution:
      "Async Python backend with FastAPI integrating the Pluggy Open Finance API, paired with a Next.js + Tailwind dashboard and recurring-expense classification.",
    keyPoints: [
      "Continuous Open Finance sync via Pluggy API",
      "High-throughput modular backend with FastAPI and Pydantic",
      "Responsive Next.js and Tailwind CSS interface",
    ],
  },
  {
    ...PT_PROJECTS[7],
    title: "AGIS — Shift Scheduling",
    subtitle: "Native Desktop HR Shift Management",
    categoryLabel: "Desktop & Systems",
    period: "2024",
    shortMetric: "Desktop IPC",
    highlightMetric: "Electron & Docker/MongoDB",
    shortDescription:
      "Desktop software built to optimize shift allocation, operational schedules, and mandatory rest-rule validation.",
    overview:
      "Workforce scheduling system built to manage complex employee shifts while preventing legal schedule conflicts, double-booking, and payroll errors.",
    challenge:
      "Delivering native desktop responsiveness alongside heavy local validation rules and cryptographic credential security.",
    solution:
      "Electron app with React and TypeScript, optimized IPC channels, containerized MongoDB persistence, and bcrypt authentication.",
    keyPoints: [
      "Cross-platform desktop application with Electron and React",
      "Real-time validation of shift conflicts and mandatory rest windows",
      "Credential security with bcrypt hashing and Dockerized MongoDB",
    ],
  },
  {
    ...PT_PROJECTS[8],
    title: "Pure PostgreSQL MUD Engine",
    subtitle: "Multi-User Game Engine Inside PostgreSQL",
    categoryLabel: "Databases & Logic",
    period: "Jul/2025 – Aug/2025",
    shortMetric: "PL/pgSQL",
    highlightMetric: "Pure PL/pgSQL Engine",
    shortDescription:
      "Text-adventure game engine where all room state, combat, and inventory logic executes directly inside PostgreSQL.",
    overview:
      "Advanced database engineering experiment eliminating the application tier by encoding all procedural game rules inside the RDBMS.",
    challenge:
      "Managing multi-player concurrency, spatial movement, and inventory consistency using strictly relational primitives.",
    solution:
      "Relational graph schema powered by PL/pgSQL functions, transactional triggers, and dynamic views guaranteeing ACID atomicity.",
    keyPoints: [
      "Game and combat rules implemented in PL/pgSQL functions",
      "Transactional triggers for automatic state and map event updates",
      "Full ACID integrity preventing item duplication under concurrency",
    ],
  },
  {
    ...PT_PROJECTS[9],
    title: "E2E Web & API Test Automation Framework",
    subtitle: "Modular Suite with Robot Framework, Playwright & CI/CD",
    categoryLabel: "QA & Automation",
    period: "In Progress",
    shortMetric: "In Progress",
    highlightMetric: "Web E2E + REST Contracts • Pabot & CI/CD",
    shortDescription:
      "Modular Web (Playwright) and REST contract test automation suite with BDD (Gherkin), parallel Pabot execution, and automated GitHub Actions HTML reports.",
    overview:
      "Modular test automation architecture built to validate end-to-end Web user journeys and REST API contracts with requirement traceability, layered separation (Page Objects / Keywords / Resources), and automated CI/CD execution.",
    challenge:
      "Avoiding brittle UI suites coupled to unstable selectors while maintaining consistent coverage across both Web flows and REST contract validation with fast feedback on pull requests.",
    solution:
      "Implemented in Robot Framework and Python combining Browser Library (Playwright) for Web E2E flows and RequestsLibrary for payload and status-code contract checks, structured with BDD (Gherkin), Data-Driven boundary value analysis, Pabot parallel runs, and automated HTML reports on GitHub Actions.",
    keyPoints: [
      "Web E2E automation with Browser Library (Playwright) and reusable modular architecture",
      "REST contract validation (status codes, schemas, and business rules) via RequestsLibrary",
      "Readable BDD (Gherkin) scenarios and Data-Driven suites applying boundary value analysis",
      "Parallel execution via Pabot integrated with GitHub Actions generating automated HTML reports",
    ],
  },
];

const EN_EXPERIENCES: Experience[] = [
  {
    ...PT_EXPERIENCES[0],
    role: "Resident AI Researcher",
    period: "Aug/2026 – Present",
    highlightMetric: "-75% Tokens (Senhora Vera) • Recall@5 0.42 & Faithfulness > 0.90 (Íris)",
    summary:
      "Research and production implementation of hybrid AI architectures, multi-agent pipelines, and RAG systems for automated fact-checking (Senhora Vera) and inclusive pedagogical adaptation (Íris).",
    highlights: [
      "Senhora Vera: cut LLM token consumption by 75% via preliminary TF-IDF + Logistic Regression stylistic triage and dense PGVector retrieval with NLI.",
      "Íris: architected a stateless multi-agent and Hybrid RAG platform (Qwen3 + Cross-Encoder), boosting Recall@5 from 0.20 to 0.42 (87% queries hit) with Faithfulness > 0.90.",
      "Built deterministic guardrails (TRCC, scope isolation, and Zero-Database in-memory PII scrubbing) validated via multi-provider LLM-as-a-Judge evaluation.",
    ],
    skills: ["LLMs", "RAG", "PGVector", "Python", "FastAPI", "NLI", "Anthropic Claude", "Automated Validation"],
  },
  {
    ...PT_EXPERIENCES[1],
    role: "Infrastructure Maintainer & Fullstack Developer",
    period: "Mar/2025 – Aug/2025",
    highlightMetric: "60m → 5m Reports (-91.6%) • Production",
    summary:
      "Owned architecture, production infrastructure, and continuous feature delivery for the MeuCapilar clinical platform.",
    highlights: [
      "Cut clinical report generation from 60 minutes to 5 minutes through PostgreSQL relational optimization.",
      "Implemented end-to-end automated testing suites and continuous production deployments.",
      "Built full anamnesis, consultation management, and high-speed autocomplete modules.",
    ],
    skills: ["PostgreSQL", "Node.js", "TypeScript", "Next.js", "Docker", "Automated Testing", "E2E Testing"],
  },
  {
    ...PT_EXPERIENCES[2],
    role: "Service Design Researcher (Fellow)",
    period: "Mar/2025 – Aug/2026",
    highlightMetric: "Accepted Paper: Brazilian Symposium on Software Quality (SBQS) • SPUX Blueprint",
    summary:
      "Digital transformation and strategic public-service journey mapping at Brazil's Secretariat of Federal Assets (SPU).",
    highlights: [
      "Applied collaborative methodologies (SPUX & Service Blueprints) to streamline government workflows.",
      "Aligned public-sector stakeholders, engineering teams, and citizen needs.",
      "Co-authored a peer-reviewed paper accepted at the Brazilian Symposium on Software Quality (SBQS).",
    ],
    skills: ["Service Blueprint", "Design Thinking", "Requirements Eng.", "SBQS"],
  },
  {
    ...PT_EXPERIENCES[3],
    role: "Database Modeling & Delivery Intern",
    period: "Mar/2025 – Sep/2025",
    highlightMetric: "100% SLA Compliance • PostgreSQL",
    summary:
      "Relational modeling, query tuning, and operational workflow automation for public-administration clients.",
    highlights: [
      "Modeled and normalized PostgreSQL databases, reducing analytical query response times.",
      "Built JavaScript automation scripts for operational triggers and SLA tracking.",
      "Led requirements elicitation and technical delivery documentation with government clients.",
    ],
    skills: ["PostgreSQL", "JavaScript", "Relational Modeling", "SLAs", "ITIL"],
  },
  {
    ...PT_EXPERIENCES[4],
    role: "Project Lead & Academic Teaching Assistant",
    organization: "University of Brasília (UnB)",
    period: "2024 – Present",
    highlightMetric: "Led 20 Engineers • Micromouse",
    summary:
      "Engineering team leadership and academic instruction across core Software Engineering courses.",
    highlights: [
      "General Project Manager (PI1 - 2026): Led a 20-member multidisciplinary engineering team building an autonomous Micromouse robot.",
      "Teaching Assistant for Data Structures and Requirements Engineering, mentoring 60+ students on algorithms and modeling.",
    ],
    skills: ["Agile Leadership", "Data Structures", "Requirements Eng.", "C/C++", "Team Management"],
  },
];

const EN_SKILL_CATEGORIES = [
  {
    title: "AI, Machine Learning & Data",
    icon: "Brain",
    skills: [
      "LLM Orchestration",
      "RAG Systems",
      "Model Context Protocol (MCP)",
      "Natural Language Inference (NLI)",
      "Vector DBs (PGVector)",
      "Medallion Architecture",
      "Star Schema Modeling",
      "ETL / ELT",
      "Pandas & SQLAlchemy",
      "Scikit-Learn",
    ],
  },
  {
    title: "Languages & Low-Level",
    icon: "Cpu",
    skills: [
      "Python",
      "SQL (Advanced / PL/pgSQL)",
      "TypeScript",
      "JavaScript",
      "C & C++",
      "CUDA (GPU Computing)",
      "Vulkan & OpenMP",
      "Ruby / Rails",
    ],
  },
  {
    title: "Databases & DevOps",
    icon: "Database",
    skills: [
      "PostgreSQL",
      "MySQL & SQL Server",
      "MongoDB",
      "Docker & Docker Compose",
      "AWS Cloud",
      "Linux (Debian / Bash)",
      "Git & GitHub Actions",
      "Makefiles",
      "Antigravity IDE",
    ],
  },
  {
    title: "Software Engineering & Practices",
    icon: "Layers",
    skills: [
      "Requirements Engineering",
      "Service Design (Blueprint)",
      "Design Thinking",
      "Agile & Kanban",
      "SLA & ITIL Management",
      "Robot Framework",
      "Web & API Testing",
      "BDD / Gherkin",
      "Test Design (ISTQB)",
      "Accessibility (WCAG AAA)",
    ],
  },
];

export function getPortfolioData(locale: Locale) {
  if (locale === "en") {
    return {
      personalInfo: EN_PERSONAL_INFO,
      projects: EN_PROJECTS,
      experiences: EN_EXPERIENCES,
      skillCategories: EN_SKILL_CATEGORIES,
    };
  }

  return {
    personalInfo: PT_PERSONAL_INFO,
    projects: PT_PROJECTS.map((p) => ({
      ...p,
      shortMetric: SHORT_METRICS_PT[p.id] || p.categoryLabel,
    })),
    experiences: PT_EXPERIENCES,
    skillCategories: PT_SKILL_CATEGORIES,
  };
}
