# Portfólio Profissional — Ian Costa Guimarães

Engenheiro de Software (UnB) & Pesquisador Residente em Inteligência Artificial (Instituto Eldorado / Softex).

Este projeto é um portfólio web de alta performance construído com estética refinada no estilo *Linear / Apple Dev*, projetado para proporcionar leitura instantânea a recrutadores técnicos, tech leads e pesquisadores.

---

## ⚡ Destaques & Recursos Implementados

- **Command Palette (`Cmd + K` / `Ctrl + K`):** Sistema de busca global instantâneo para filtrar projetos, skills, seções e ações rápidas (copiar e-mail, redes sociais).
- **Lâmina de Detalhes Técnicos (Slide-over Drawer):** Ao clicar em qualquer projeto, abre uma gaveta lateral com:
  - *O Desafio Técnico* enfrentado.
  - *A Solução Arquitetural* adotada.
  - *Impactos e Decisões de Engenharia* (ex: relatórios de 1h para 5min no MeuCapilar, arquitetura local-first com WCAG AAA no Meu Amigo Broto, paralelização em GPU para MPM).
  - *Badges da Stack* e links para repositórios.
- **Filtro de Trilha por Especialidade:** Alternância entre `Todos`, `IA & RAG`, `Engenharia de Dados`, `Fullstack & Produção` e `Baixo Nível & GPU`.
- **Bento Grid de Impacto Imediato:** Destaques dos 4 pilares técnicos logo na introdução para retenção em menos de 15 segundos.
- **Trajetória & Pesquisa Estruturada:** Linha do tempo com Instituto Eldorado/Softex, SPU-ITRAC (SBQS), Singular GovTech, Studio Flávio Rabello e liderança acadêmica na UnB.
- **Cópia de Contato em 1 Clique:** Feedback tátil e visual ao copiar o e-mail ou abrir links de networking.

---

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilização:** Tailwind CSS v4 + Design System Dark Mode Personalizado
- **Componentes & Animações:** Lucide Icons, cmdk (Command Menu)
- **Deploy:** Otimizado para hospedagem instantânea na **Vercel**

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/iancostag/portifolio.git
cd portifolio
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## ☁️ Como Fazer o Deploy na Vercel

1. Suba o repositório para o seu GitHub:
```bash
git add .
git commit -m "feat: portfolio completo com projetos e arquitetura"
git remote add origin https://github.com/iancostag/portifolio.git
git push -u origin master
```

2. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
3. Importe o repositório `portifolio`.
4. A Vercel detectará automaticamente o **Next.js** e o **pnpm**.
5. Clique em **Deploy**! Em menos de 1 minuto seu portfólio estará no ar com HTTPS e CDN global.
