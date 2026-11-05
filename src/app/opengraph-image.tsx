import { ImageResponse } from "next/og";

export const alt = "Ian Costa Guimarães — Engenharia de Software & IA";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          border: "2px solid rgba(59, 130, 246, 0.3)",
        }}
      >
        {/* Top Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              color: "#38bdf8",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ● UnB & Instituto Eldorado / Softex
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            Brasília, DF
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            Ian Costa Guimarães
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#38bdf8",
            }}
          >
            Engenharia de Software • RAG & LLMs • Aceleração GPU (CUDA)
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Sistemas de alta performance, orquestração de IA com PGVector e otimização de bancos de dados em produção real.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#38bdf8" }}>
                -78% Tokens
              </span>
              <span style={{ fontSize: "16px", color: "#64748b" }}>Senhora Vera RAG</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#60a5fa" }}>
                ~20x Speedup
              </span>
              <span style={{ fontSize: "16px", color: "#64748b" }}>CUDA vs CPU</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#93c5fd" }}>
                1h → 5 min
              </span>
              <span style={{ fontSize: "16px", color: "#64748b" }}>MeuCapilar Produção</span>
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            iancostag.vercel.app
          </div>
        </div>
      </div>
    )
  );
}
