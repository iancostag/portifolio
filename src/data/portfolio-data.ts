export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "ai" | "data" | "fullstack" | "systems" | "qa";
  categoryLabel: string;
  period: string;
  featured: boolean;
  shortMetric?: string;
  highlightMetric: string;
  shortDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  keyPoints: string[];
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  accent: "cyan" | "emerald" | "violet" | "amber" | "rose" | "blue";
}

export interface Certification {
  label: string;
  inProgress?: boolean;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  current?: boolean;
  location: string;
  summary: string;
  highlightMetric: string;
  logoKey: "eldorado" | "flavio" | "spu" | "singular" | "unb";
  highlights: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
}

export const PERSONAL_INFO = {
  name: "Ian Costa Guimarães",
  role: "Engenheiro de Software • QA & Automação de Testes • Sistemas de Dados & IA",
  headline:
    "Construindo sistemas confiáveis em produção, suítes automatizadas de testes E2E/API (Robot Framework & Python), pipelines de dados e guardrails para LLMs.",
  bio: "Graduando em Engenharia de Software na UnB e Pesquisador Residente em Inteligência Artificial no Instituto Eldorado/Softex. Foco em arquiteturas escaláveis, qualidade de software, automação de testes, fact-checking automatizado com LLMs e pipelines de dados.",
  location: "Brasília, DF - Brasil",
  email: "iancostag@gmail.com",
  github: "https://github.com/iancostag",
  linkedin: "https://linkedin.com/in/iancostag",
  status: "Disponível para Engenharia de Software, Automação de QA & Dados/IA",
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Avançado" },
    { name: "Japonês", level: "Intermediário" },
  ],
  certifications: [
    { label: "AWS Cloud Practitioner & Fundamentos de Nuvem" },
    { label: "The Complete Rails Course (Ruby on Rails)" },
    {
      label: "ISTQB® Certified Tester Foundation Level (CTFL v4.0) — Exame Dez/2026",
      inProgress: true,
    },
  ] as Certification[],
};

export const PROJECTS: Project[] = [
  {
    id: "senhora-vera",
    title: "Senhora Vera",
    subtitle: "Agente de IA Híbrido para Fact-Checking",
    category: "ai",
    categoryLabel: "IA & RAG",
    period: "Out/2026",
    featured: true,
    highlightMetric: "-75% Custo de Tokens • Latência < 180ms",
    shortDescription:
      "Pipeline híbrido de checagem de fatos com triagem estilística preliminar e busca vetorial densa com NLI profundo.",
    overview:
      "A Senhora Vera é um agente de inteligência artificial concebido no Instituto Eldorado & Softex para analisar grandes fluxos de alegações, identificando inconsistências factuais contra bases de dados estruturadas.",
    challenge:
      "A checagem direta via LLMs para cada frase gerava custos proibitivos de tokens e latências na casa de 3 a 5 segundos, inviabilizando operações de checagem em larga escala.",
    solution:
      "Arquitetura em duas camadas: uma triagem estilística ultrarrápida com TF-IDF e Regressão Logística que filtra ruídos e alegações triviais em microssegundos, acionando a inferência profunda de NLI e busca semântica em PGVector apenas quando necessário.",
    keyPoints: [
      "Redução estimada de 70% a 80% nos custos totais de inferência de LLMs",
      "Latência de resposta reduzida para menos de 180ms na camada de triagem",
      "Busca vetorial densa com PGVector sobre PostgreSQL e checagem semântica com NLI",
      "Arquitetura pronta para alta concorrência e processamento de fluxos contínuos",
    ],
    technologies: [
      "Python",
      "LLM Orchestration",
      "PGVector",
      "PostgreSQL",
      "TF-IDF",
      "Scikit-Learn",
      "NLI",
    ],
    repoUrl: "https://github.com/Challenge-1-Grupo-04-Residencia/challenge_1_residencia_ia_grupo_4",
    accent: "emerald",
  },
  {
    id: "meucapilar",
    title: "MeuCapilar",
    subtitle: "Plataforma Clínica de Avaliação Capilar",
    category: "fullstack",
    categoryLabel: "Fullstack & Produção",
    period: "Mar/2025 – Ago/2025",
    featured: true,
    highlightMetric: "Relatórios de 1h para 5 min",
    shortDescription:
      "Plataforma em produção com modelagem relacional rigorosa que automatizou laudos e diagnósticos clínicos complexos.",
    overview:
      "Desenvolvido e mantido para o Studio Flávio Rabello, o MeuCapilar é uma solução completa para médicos e tricologistas realizarem anamnese e emissão de diagnósticos detalhados com rastreabilidade total.",
    challenge:
      "A emissão manual de relatórios clínicos consumia cerca de 1 hora por paciente e gerava gargalos severos de atendimento, além de riscos de inconsistência nos dados.",
    solution:
      "Reestruturação integral do banco de dados PostgreSQL com normalização estratégica, otimização de queries analíticas, automação de geração documental e testes automatizados de ponta a ponta.",
    keyPoints: [
      "Otimização de rotas e consultas complexas em PostgreSQL",
      "Regras de negócio clínicas estritas e validadas por testes automatizados",
      "Impacto direto de negócio: tempo de emissão reduzido de 60 para 5 minutos",
      "Infraestrutura resiliente em produção atendendo clientes reais",
    ],
    technologies: [
      "PostgreSQL",
      "TypeScript",
      "Node.js",
      "Next.js",
      "Docker",
      "Automated Testing",
    ],
    accent: "emerald",
  },
  {
    id: "data-warehouse-voos",
    title: "DW & Analytics: Atrasos de Voos",
    subtitle: "Pipeline Medalhão com PostgreSQL & Power BI",
    category: "data",
    categoryLabel: "Engenharia de Dados",
    period: "Jan/2026",
    featured: true,
    highlightMetric: "Milhões de Linhas em Minutos • 100% Docker",
    shortDescription:
      "Pipeline analítico de ponta a ponta em container Docker processando milhões de registros de voos com Star Schema.",
    overview:
      "Solução completa de Data Warehouse concebida para ingerir, sanitizar, transformar e analisar dados complexos de tráfego aéreo, identificando gargalos e causas raízes de atrasos em malhas aeroportuárias.",
    challenge:
      "Processar bases massivas de voos com inconsistências temporais e dados nulos sem estourar o buffer de memória nem comprometer a responsividade analítica no Power BI.",
    solution:
      "Construção de pipeline ELT/ETL modular em Python com Pandas e SQLAlchemy, persistindo em PostgreSQL containerizado com camadas Bronze (ingestão bruta), Silver (limpeza e desduplicação) e Gold (dimensões e fatos em Star Schema).",
    keyPoints: [
      "Processamento automatizado de milhões de registros em poucos minutos",
      "Modelagem dimensional Star Schema eliminando redundâncias e acelerando agregações",
      "Ambiente 100% isolado e reprodutível via Docker e Docker Compose",
      "Integração direta com Power BI para detecção imediata de causas de atraso",
    ],
    technologies: [
      "Python",
      "Pandas",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker",
      "Power BI",
      "Star Schema",
    ],
    repoUrl: "https://github.com/iancostag/dw-flight-delays",
    accent: "cyan",
  },
  {
    id: "gpu-mpm",
    title: "Aceleração em GPU para MPM",
    subtitle: "Simulação Física Paralela com CUDA, C++ & OpenMP",
    category: "systems",
    categoryLabel: "Baixo Nível & GPU",
    period: "2026",
    featured: true,
    shortMetric: "CUDA • C++",
    highlightMetric: "Kernels P2G/G2P • OpenMP vs. CUDA",
    shortDescription:
      "Paralelização de simulação física granular (Material Point Method) com kernels em CUDA, Vulkan e baseline em OpenMP.",
    overview:
      "Projeto focado na paralelização do Material Point Method (MPM), método numérico para simulação física de materiais granulares, fluidos e sólidos com grandes deformações.",
    challenge:
      "O método MPM exige transferências intensivas entre partículas (Lagrangian) e malha (Eulerian) a cada passo de tempo, tornando a execução sequencial em CPU um gargalo para malhas densas.",
    solution:
      "Implementação de kernels em C++ e CUDA explorando memória compartilhada (shared memory), paralelismo em GPU e comparação arquitetural contra baseline multi-core em OpenMP.",
    keyPoints: [
      "Paralelização dos estágios P2G (Partícula-Grade) e G2P (Grade-Partícula) em CUDA",
      "Estratégias de coalescência de memória e redução de contenção atômica em GPU",
      "Arquitetura comparativa estruturada entre CPU (OpenMP) e GPU (CUDA / Vulkan)",
    ],
    technologies: ["C++", "CUDA", "Vulkan", "OpenMP", "GPU Computing", "Makefiles"],
    accent: "emerald",
  },
  {
    id: "meu-amigo-broto",
    title: "Meu Amigo Broto",
    subtitle: "PWA Local-First para Redução de Danos em Apostas",
    category: "fullstack",
    categoryLabel: "Fullstack & Mobile",
    period: "Out/2026",
    featured: false,
    highlightMetric: "WCAG AAA & Local-First",
    shortDescription:
      "Aplicação progressiva desenvolvida no Hackathon BB Digital Week com foco em bem-estar e suporte a momentos de crise.",
    overview:
      "Aplicativo web progressivo (PWA) criado para apoiar pessoas em recuperação de dependência em apostas digitais (bets), fornecendo ferramentas de urge surfing, registro de gatilhos e apoio sem julgamentos.",
    challenge:
      "Garantir privacidade absoluta dos dados mais sensíveis do usuário e disponibilidade mesmo sem internet nos momentos de impulso súbito, com padrões rigorosos de acessibilidade.",
    solution:
      "Arquitetura 100% Local-First com persistência via IndexedDB no dispositivo do usuário, design acessível validado nos mais altos critérios de contraste (WCAG AAA) e suporte offline completo.",
    keyPoints: [
      "Arquitetura Local-First (IndexedDB): dados não saem do aparelho do usuário",
      "PWA instalável com suporte offline e baixo consumo de dados",
      "Acessibilidade de nível AAA (contraste, foco por teclado e leitores de tela)",
      "Metodologia de urge surfing integrada para controle de impulsividade",
    ],
    technologies: ["TypeScript", "Next.js", "PWA", "IndexedDB", "Tailwind CSS", "WCAG AAA"],
    repoUrl: "https://github.com/iancostag/meu-amigo-broto",
    accent: "emerald",
  },
  {
    id: "financas-os",
    title: "Finanças OS",
    subtitle: "Gestão Financeira com Open Finance",
    category: "fullstack",
    categoryLabel: "Fullstack & FinTech",
    period: "Out/2026",
    featured: false,
    highlightMetric: "Pluggy API & FastAPI",
    shortDescription:
      "Dashboard analítico de fluxo de caixa conectado diretamente às contas bancárias do usuário via Open Finance.",
    overview:
      "Sistema de controle financeiro com sincronização bancária automatizada, categorização inteligente de gastos e relatórios de fluxo de caixa em tempo real.",
    challenge:
      "Normalizar transações de múltiplos bancos com descrições poluidíssimas e garantir segurança estrita na manipulação de dados financeiros.",
    solution:
      "Backend assíncrono em Python com FastAPI para comunicação com a API Pluggy, interface dinâmica em Next.js e Tailwind, com algoritmos de classificação de despesas recorrentes.",
    keyPoints: [
      "Integração contínua com Open Finance através da Pluggy API",
      "Backend modular e de alta velocidade com FastAPI e Pydantic",
      "Interface responsiva com Next.js e Tailwind CSS",
    ],
    technologies: ["Next.js", "FastAPI", "Python", "TypeScript", "Tailwind CSS", "Pluggy API"],
    repoUrl: "https://github.com/iancostag/financas-os",
    accent: "blue",
  },
  {
    id: "agis-rh",
    title: "AGIS — Gestão de Escalas",
    subtitle: "Aplicação Desktop Nativa para RH",
    category: "systems",
    categoryLabel: "Desktop & Sistemas",
    period: "2024",
    featured: false,
    highlightMetric: "Electron & Docker/MongoDB",
    shortDescription:
      "Software desktop desenvolvido para otimizar alocação de plantões, escalas operacionais e regras de descanso.",
    overview:
      "Sistema concebido para gerenciar escalas complexas de colaboradores, prevenindo conflitos legais de horário, duplicação de plantões e inconsistências salariais.",
    challenge:
      "Construir uma ferramenta com performance nativa desktop, interface moderna e capacidade de rodar regras de validação pesadas localmente com segurança criptográfica.",
    solution:
      "Aplicação Electron empacotada com React e TypeScript no frontend, comunicação IPC otimizada, persistência via MongoDB containerizado e autenticação segura com bcrypt.",
    keyPoints: [
      "Aplicação desktop multiplataforma com Electron e React",
      "Validação em tempo real de conflitos de turnos e folgas obrigatórias",
      "Segurança de credenciais com criptografia bcrypt e MongoDB em Docker",
    ],
    technologies: ["Electron", "TypeScript", "React", "Node.js", "MongoDB", "Docker", "bcrypt"],
    accent: "rose",
  },
  {
    id: "jogo-mud-postgres",
    title: "MUD Engine em PostgreSQL",
    subtitle: "Jogo Multiusuário Baseado em Banco Relacional",
    category: "data",
    categoryLabel: "Banco de Dados & Lógica",
    period: "Jul/2025 – Ago/2025",
    featured: false,
    highlightMetric: "Lógica Pura em PL/pgSQL",
    shortDescription:
      "Mecanismo completo de jogo de aventura em texto onde toda a lógica de salas, estados e ações roda diretamente no PostgreSQL.",
    overview:
      "Experimento prático avançado explorando o poder computacional dos SGBDs modernos, eliminando a camada de aplicação intermediária e centralizando regras procedurais no próprio banco.",
    challenge:
      "Gerenciar concorrência de múltiplos jogadores, movimentação espacial e consistência de inventário usando unicamente recursos relacionais.",
    solution:
      "Arquitetura de dados orientada a grafos relacionais utilizando PL/pgSQL, triggers transacionais e views dinâmicas para calcular visibilidade, combate e inventário com atomicidade ACID garantida.",
    keyPoints: [
      "Lógica de negócios e regras de combate escritas em funções PL/pgSQL",
      "Gatilhos (triggers) para atualização automática de estado e eventos de mapa",
      "Integridade transacional total sem risco de duplicação de itens",
    ],
    technologies: ["PostgreSQL", "PL/pgSQL", "Triggers", "Views", "Database Architecture"],
    accent: "amber",
  },
  {
    id: "qa-e2e-framework",
    title: "Framework de Automação de Testes E2E Web & API",
    subtitle: "Suíte Modular em Robot Framework, Playwright & CI/CD",
    category: "qa",
    categoryLabel: "QA & Automação",
    period: "Em andamento",
    featured: false,
    highlightMetric: "Web E2E + Contratos REST • Pabot & CI/CD",
    shortDescription:
      "Suíte modular de automação de testes cobrindo fluxos Web (Browser Library / Playwright) e validação de contratos REST (RequestsLibrary). Estruturada com BDD (Gherkin), testes orientados a dados (análise de valor limite), execução paralela com Pabot e esteira CI/CD no GitHub Actions gerando relatórios HTML automáticos.",
    overview:
      "Arquitetura modular de automação de testes concebida para validar fluxos críticos Web de ponta a ponta e contratos de APIs REST com rastreabilidade de requisitos, separação em camadas (Page Objects / Keywords / Resources) e execução automatizada em pipeline CI/CD.",
    challenge:
      "Evitar suítes frágeis e acopladas a seletores instáveis, garantindo cobertura consistente tanto da camada de interface quanto dos contratos REST com feedback rápido em pull requests.",
    solution:
      "Implementação em Robot Framework e Python combinando Browser Library (Playwright) para testes Web E2E e RequestsLibrary para validação de payloads e status codes, com cenários em BDD (Gherkin), Data-Driven Testing com análise de valor limite, paralelização via Pabot e publicação automática de relatórios HTML no GitHub Actions.",
    keyPoints: [
      "Automação Web E2E com Browser Library (Playwright) e arquitetura modular reutilizável",
      "Validação de contratos REST (status codes, schemas e regras de negócio) com RequestsLibrary",
      "Cenários legíveis em BDD (Gherkin) e suítes Data-Driven aplicando análise de valor limite",
      "Execução paralela com Pabot integrada ao GitHub Actions gerando logs e relatórios HTML automáticos",
    ],
    technologies: [
      "Robot Framework",
      "Python",
      "Playwright",
      "API Testing",
      "BDD",
      "GitHub Actions",
      "Pabot",
    ],
    repoUrl: "https://github.com/iancostag/qa-e2e-automation-framework",
    accent: "cyan",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Pesquisador Residente em Inteligência Artificial",
    organization: "Instituto Eldorado, Softex & UnB",
    period: "Ago/2026 – Atual",
    current: true,
    location: "Brasília, DF",
    highlightMetric: "-75% Custo de Tokens • RAG & NLI",
    logoKey: "eldorado",
    summary:
      "Pesquisa e implementação de arquiteturas híbridas de inteligência artificial aplicadas à validação de dados em larga escala e fact-checking automatizado.",
    highlights: [
      "Desenvolvimento de pipelines RAG (Retrieval-Augmented Generation) com indexação vetorial densa em PGVector.",
      "Redução de 75% no consumo de tokens com triagem estilística prévia em TF-IDF e Regressão Logística.",
      "Engenharia de prompts avançada e orquestração de LLMs com verificação semântica em duas etapas.",
    ],
    skills: ["LLMs", "RAG", "PGVector", "Python", "PLN", "Model Context Protocol", "Automated Validation"],
  },
  {
    role: "Mantedor de Infraestrutura & Desenvolvedor Fullstack",
    organization: "Studio Flávio Rabello (MeuCapilar)",
    period: "Mar/2025 – Ago/2025",
    current: false,
    location: "Brasília, DF",
    highlightMetric: "60m → 5m Laudo (-91.6%) • Produção Real",
    logoKey: "flavio",
    summary:
      "Responsável pela arquitetura, infraestrutura e evolução contínua da plataforma médica MeuCapilar.",
    highlights: [
      "Redução do tempo de geração de relatórios clínicos de 60 para 5 minutos via modelagem relacional otimizada em PostgreSQL.",
      "Implementação de rotinas de testes automatizados de ponta a ponta e deploy contínuo em produção.",
      "Módulos completos de anamnese, gestão de consultas e autocomplete dinâmico de alta performance.",
    ],
    skills: ["PostgreSQL", "Node.js", "TypeScript", "Next.js", "Docker", "Testes Automatizados", "E2E Testing"],
  },
  {
    role: "Pesquisador em Design de Serviços (Bolsista)",
    organization: "SPU-ITRAC / UnB",
    period: "Mar/2025 – Ago/2026",
    current: false,
    location: "Brasília, DF",
    highlightMetric: "Artigo Aceito: Simpósio Brasileiro de Qualidade de Software (SBQS) • SPUX Blueprint",
    logoKey: "spu",
    summary:
      "Transformação digital e mapeamento de jornadas públicas estratégicas na Secretaria do Patrimônio da União (SPU).",
    highlights: [
      "Aplicação de metodologias colaborativas (SPUX e Service Blueprints) para otimização de serviços governamentais.",
      "Alinhamento estratégico entre gestores públicos, corpo técnico e cidadãos.",
      "Coautoria e artigo técnico-científico aceito no Simpósio Brasileiro de Qualidade de Software (SBQS).",
    ],
    skills: ["Service Blueprint", "Design Thinking", "Engenharia de Requisitos", "SBQS"],
  },
  {
    role: "Estagiário em Modelagem de Banco de Dados e Delivery",
    organization: "Singular GovTech",
    period: "Mar/2025 – Set/2025",
    current: false,
    location: "Brasília, DF",
    highlightMetric: "100% Cumprimento de SLAs • PostgreSQL",
    logoKey: "singular",
    summary:
      "Modelagem relacional, otimização de consultas e automação de fluxos operacionais para órgãos da administração pública.",
    highlights: [
      "Modelagem e normalização de bancos PostgreSQL, reduzindo tempos de resposta de consultas analíticas.",
      "Criação de scripts e automações em JavaScript para gatilhos operacionais e gestão de SLAs.",
      "Levantamento de requisitos com clientes governamentais e elaboração de documentação técnica de delivery.",
    ],
    skills: ["PostgreSQL", "JavaScript", "Modelagem Relacional", "SLAs", "ITIL"],
  },
  {
    role: "Liderança de Projeto & Monitoria Acadêmica",
    organization: "Universidade de Brasília (UnB)",
    period: "2024 – Atual",
    current: true,
    location: "Brasília, DF",
    highlightMetric: "Liderança de 20 Engenheiros • Micromouse",
    logoKey: "unb",
    summary:
      "Gestão de equipes de engenharia e instrução acadêmica em disciplinas fundamentais do curso.",
    highlights: [
      "Gerente Geral de Projeto (PI1 - 2026): Liderança de equipe multidisciplinar com 20 integrantes para desenvolvimento do robô autônomo Micromouse.",
      "Monitor Acadêmico das disciplinas de Estrutura de Dados e Engenharia de Requisitos, orientando mais de 60 estudantes em algoritmos, complexidade e modelagem.",
    ],
    skills: ["Liderança Ágil", "Estrutura de Dados", "Engenharia de Requisitos", "C/C++", "Gestão de Equipes"],
  },
];

export const SKILL_CATEGORIES = [
  {
    title: "IA, Machine Learning & Dados",
    icon: "Brain",
    skills: [
      "Orquestração de LLMs",
      "Sistemas RAG",
      "Model Context Protocol (MCP)",
      "Inferência de Linguagem (NLI)",
      "Bancos Vetoriais (PGVector)",
      "Arquitetura Medalhão (Bronze/Silver/Gold)",
      "Modelagem Star Schema",
      "ETL / ELT",
      "Pandas & SQLAlchemy",
      "Scikit-Learn",
    ],
  },
  {
    title: "Linguagens & Baixo Nível",
    icon: "Cpu",
    skills: [
      "Python",
      "SQL (Avançado / PL/pgSQL)",
      "TypeScript",
      "JavaScript",
      "C & C++",
      "CUDA (Computação em GPU)",
      "Vulkan & OpenMP",
      "Ruby / Rails",
    ],
  },
  {
    title: "Bancos de Dados & DevOps",
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
    title: "Metodologias & Engenharia de Software",
    icon: "Layers",
    skills: [
      "Engenharia de Requisitos",
      "Design de Serviços (Service Blueprint)",
      "Design Thinking",
      "Metodologias Ágeis & Kanban",
      "Gestão de SLAs & ITIL",
      "Robot Framework",
      "Web & API Testing",
      "BDD / Gherkin",
      "Test Design (ISTQB)",
      "Acessibilidade (WCAG AAA)",
    ],
  },
];
