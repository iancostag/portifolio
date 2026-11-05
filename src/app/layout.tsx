import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iancostag.vercel.app"),
  title: "Ian Costa Guimarães | Engenharia de Software & Pesquisa em IA",
  description:
    "Portfólio técnico de Ian Costa Guimarães (UnB & Instituto Eldorado). Especialista em orquestração de LLMs/RAG, Engenharia de Dados Medalhão, Computação Acelerada em GPU (CUDA) e Sistemas em Produção.",
  keywords: [
    "Ian Costa Guimarães",
    "Engenharia de Software",
    "Inteligência Artificial",
    "RAG",
    "LLM",
    "PGVector",
    "UnB",
    "Instituto Eldorado",
    "Data Warehouse",
    "CUDA",
    "GPU",
    "PostgreSQL",
  ],
  authors: [{ name: "Ian Costa Guimarães" }],
  openGraph: {
    title: "Ian Costa Guimarães | Engenharia de Software & Pesquisa em IA",
    description:
      "Portfólio técnico com arquiteturas detalhadas de IA (RAG/NLI), Engenharia de Dados, Sistemas de Produção e Computação em GPU.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-zinc-100 bg-grid-pattern transition-colors duration-500">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
