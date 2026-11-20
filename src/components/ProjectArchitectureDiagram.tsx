"use client";

import { ArrowRight } from "lucide-react";
import { Locale } from "@/context/LocaleContext";

interface DiagramStep {
  title: string;
  detail: string;
  highlight?: boolean;
}

const DIAGRAMS: Record<string, { en: DiagramStep[]; pt: DiagramStep[] }> = {
  "senhora-vera": {
    en: [
      { title: "Claim Stream", detail: "Raw text input" },
      { title: "TF-IDF + LogReg", detail: "<180ms triage", highlight: true },
      { title: "PGVector", detail: "Dense retrieval" },
      { title: "Deep NLI", detail: "-75% tokens", highlight: true },
    ],
    pt: [
      { title: "Fluxo de Alegações", detail: "Entrada bruta" },
      { title: "TF-IDF + LogReg", detail: "Triagem <180ms", highlight: true },
      { title: "PGVector", detail: "Busca vetorial" },
      { title: "NLI Profundo", detail: "-75% tokens", highlight: true },
    ],
  },
  "data-warehouse-voos": {
    en: [
      { title: "Raw Flights", detail: "CSV ingestion" },
      { title: "Bronze", detail: "Raw staging" },
      { title: "Silver", detail: "Clean & dedup" },
      { title: "Gold (Star Schema)", detail: "Facts & dims", highlight: true },
      { title: "Power BI", detail: "Delay insights" },
    ],
    pt: [
      { title: "Dados de Voos", detail: "Ingestão CSV" },
      { title: "Bronze", detail: "Camada bruta" },
      { title: "Silver", detail: "Limpeza & dedup" },
      { title: "Gold (Star Schema)", detail: "Fatos & dims", highlight: true },
      { title: "Power BI", detail: "Análise atrasos" },
    ],
  },
  meucapilar: {
    en: [
      { title: "Anamnesis UI", detail: "Next.js / TS" },
      { title: "PostgreSQL", detail: "Normalized schema" },
      { title: "Report Engine", detail: "Automated SQL", highlight: true },
      { title: "Clinical PDF", detail: "1h → 5 min", highlight: true },
    ],
    pt: [
      { title: "Anamnese UI", detail: "Next.js / TS" },
      { title: "PostgreSQL", detail: "Schema normalizado" },
      { title: "Motor de Laudos", detail: "SQL otimizado", highlight: true },
      { title: "PDF Clínico", detail: "1h → 5 min", highlight: true },
    ],
  },
  "gpu-mpm": {
    en: [
      { title: "Particles", detail: "Lagrangian state" },
      { title: "P2G Kernel", detail: "CUDA shared mem", highlight: true },
      { title: "Eulerian Grid", detail: "Force integration" },
      { title: "G2P Kernel", detail: "GPU update", highlight: true },
    ],
    pt: [
      { title: "Partículas", detail: "Estado Lagrangiano" },
      { title: "Kernel P2G", detail: "CUDA shared mem", highlight: true },
      { title: "Malha Euleriana", detail: "Integração forças" },
      { title: "Kernel G2P", detail: "Atualização GPU", highlight: true },
    ],
  },
  "meu-amigo-broto": {
    en: [
      { title: "Crisis Trigger", detail: "Urge surfing UI" },
      { title: "IndexedDB", detail: "100% on-device", highlight: true },
      { title: "Offline PWA", detail: "WCAG AAA", highlight: true },
    ],
    pt: [
      { title: "Apoio à Crise", detail: "Urge surfing UI" },
      { title: "IndexedDB", detail: "100% no aparelho", highlight: true },
      { title: "PWA Offline", detail: "WCAG AAA", highlight: true },
    ],
  },
  "financas-os": {
    en: [
      { title: "Bank Sync", detail: "Pluggy Open Finance" },
      { title: "FastAPI", detail: "Async classifier", highlight: true },
      { title: "Dashboard", detail: "Live cashflow" },
    ],
    pt: [
      { title: "Sync Bancário", detail: "Pluggy Open Finance" },
      { title: "FastAPI", detail: "Classificador async", highlight: true },
      { title: "Dashboard", detail: "Fluxo em tempo real" },
    ],
  },
  "agis-rh": {
    en: [
      { title: "Electron UI", detail: "React + TS" },
      { title: "IPC Rules", detail: "Shift validation", highlight: true },
      { title: "MongoDB", detail: "Docker + bcrypt" },
    ],
    pt: [
      { title: "Electron UI", detail: "React + TS" },
      { title: "Regras IPC", detail: "Conflitos de escala", highlight: true },
      { title: "MongoDB", detail: "Docker + bcrypt" },
    ],
  },
  "jogo-mud-postgres": {
    en: [
      { title: "Player Input", detail: "CLI / client" },
      { title: "PL/pgSQL", detail: "Combat & rooms", highlight: true },
      { title: "Triggers & Views", detail: "ACID state" },
    ],
    pt: [
      { title: "Ação Jogador", detail: "Cliente / CLI" },
      { title: "PL/pgSQL", detail: "Combate & salas", highlight: true },
      { title: "Triggers & Views", detail: "Estado ACID" },
    ],
  },
  "qa-e2e-framework": {
    en: [
      { title: "BDD & Test Data", detail: "Gherkin + BVA" },
      { title: "Robot Framework", detail: "Browser + Requests", highlight: true },
      { title: "Pabot Parallel", detail: "Multi-worker run" },
      { title: "GitHub Actions", detail: "HTML Reports", highlight: true },
    ],
    pt: [
      { title: "BDD & Massa", detail: "Gherkin + Valor Limite" },
      { title: "Robot Framework", detail: "Browser + Requests", highlight: true },
      { title: "Pabot Paralelo", detail: "Execução distribuída" },
      { title: "GitHub Actions", detail: "Relatórios HTML", highlight: true },
    ],
  },
};

export function ProjectArchitectureDiagram({
  projectId,
  locale,
}: {
  projectId: string;
  locale: Locale;
}) {
  const steps = DIAGRAMS[projectId]?.[locale];
  if (!steps) return null;

  return (
    <div className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)]">
      <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-subtle)] font-semibold mb-3">
        {locale === "en" ? "Architecture Flow" : "Fluxo da Arquitetura"}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, idx) => (
          <div key={step.title} className="flex items-center gap-2">
            <div
              className={`px-3 py-2 rounded-lg border text-xs ${
                step.highlight
                  ? "bg-[var(--signal-bg)] border-[var(--signal-border)]"
                  : "bg-[var(--card)] border-[var(--border)]"
              }`}
            >
              <div className="font-semibold text-[var(--foreground)]">{step.title}</div>
              <div
                className={`font-mono text-xs ${
                  step.highlight ? "text-[var(--signal-fg)]" : "text-[var(--muted-subtle)]"
                }`}
              >
                {step.detail}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-[var(--muted-subtle)] shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
