import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LocaleProvider } from "@/context/LocaleContext";

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
  title: "Ian Costa Guimarães | Data Engineering & AI",
  description:
    "Technical portfolio of Ian Costa Guimarães (UnB & Instituto Eldorado). Specialist in LLM/RAG orchestration, Medallion Data Engineering, GPU Computing (CUDA), and Production Systems.",
  keywords: [
    "Ian Costa Guimarães",
    "Software Engineering",
    "Artificial Intelligence",
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
    title: "Ian Costa Guimarães | Data Engineering & AI",
    description:
      "Technical portfolio featuring AI (RAG/NLI) architectures, Data Engineering, Production Systems, and GPU Computing.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
        <LocaleProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
