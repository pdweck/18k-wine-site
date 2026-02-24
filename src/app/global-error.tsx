"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Erro crítico</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
            Ocorreu um erro inesperado. Recarregue a página.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.6rem 1.25rem",
              background: "#c9a962",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}
