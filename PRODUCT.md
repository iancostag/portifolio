# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Technical recruiters, engineering managers, and tech leads in Brazil and internationally evaluating candidates for Data Engineering, AI/ML Engineering, and Software Engineering roles.
- **Secondary:** R&D partners and academic collaborators reviewing applied research and systems engineering work.
- **Situation & job:** Scanning a portfolio in under 15 seconds to verify technical depth, production impact, and architectural decision-making, then drilling into specific projects or initiating contact.

## Product Purpose

Present Ian Costa Guimarães's software engineering and AI research work with immediate scannability and verifiable technical depth, converting hiring evaluators (in Brazil and abroad) into direct contact or interview conversations.

## Positioning

Combines applied AI/RAG research (Instituto Eldorado / Softex, SPU-ITRAC / SBQS) with measurable production fullstack and low-level/GPU engineering outcomes (e.g., reducing MeuCapilar report time from 1h to 5min; local-first WCAG AAA architecture in Meu Amigo Broto; GPU parallelization for MPM).

## Operating Context

- Evaluated asynchronously by recruiters and tech leads on desktop and mobile browsers, often in brief initial passes before deeper technical review.
- Must support both **PT-BR** and **English** (bilingual) to serve Brazilian and international hiring processes.
- Built on Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4 (`pnpm dev` / `pnpm build`).

## Capabilities and Constraints

- **Confirmed core flows:** Project showcase with track filtering (`Todos`, `IA & RAG`, `Engenharia de Dados`, `Fullstack & Produção`, `Baixo Nível & GPU`), slide-over technical case drawer (challenge, architecture, engineering impact, stack, repo links), experience timeline, and one-click contact copy/links.
- **Language requirement:** Bilingual support (PT-BR and English) is required; currently the codebase copy is primarily PT-BR.
- **Open / undecided product scope:** Whether the `/minimal` route and existing interactive widgets (Command Palette `Cmd+K`, `InteractiveTerminal`, `FastScanModal`, `ThemePaletteSelector`) are all mandatory to keep long-term or can be simplified during refinement.

## Brand Commitments

- **Owner:** Ian Costa Guimarães — Engenheiro de Software (UnB) & Pesquisador Residente em Inteligência Artificial (Instituto Eldorado / Softex).
- **Factual accuracy:** All institutional affiliations, publications, and project metrics must remain strictly accurate and never be altered or fabricated.

## Evidence on Hand

- `src/data/portfolio-data.ts`: Structured portfolio projects, skills, and experience entries.
- `public/avatar.jpg`: Profile photo.
- Confirmed core proof points: UnB, Instituto Eldorado / Softex, SPU-ITRAC (SBQS), Singular GovTech, Studio Flávio Rabello, MeuCapilar (1h → 5min report optimization), Meu Amigo Broto (local-first + WCAG AAA), MPM GPU parallelization.
- **Absences not to fabricate:** No external customer testimonials, unverified benchmarks, or third-party press quotes exist in the repository.

## Product Principles

1. **15-second technical legibility:** Recruiters and tech leads must grasp seniority, core domains, and concrete impact immediately without digging.
2. **Evidence over claims:** Every highlighted capability is backed by a specific architectural decision, metric, or shipped system.
3. **Bilingual parity:** Both PT-BR and English audiences should experience the same clarity and technical precision.
4. **Preserve factual truth:** Never invent metrics, roles, or testimonials; refine presentation without distorting reality.

## Accessibility & Inclusion

- Target high-contrast readability and keyboard accessibility (consistent with the portfolio's own WCAG AAA engineering commitment in Meu Amigo Broto).
