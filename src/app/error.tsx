"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#0a0a0a",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Algo deu errado</h1>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", maxWidth: "400px" }}>
        Ocorreu um erro ao carregar esta página.
      </p>
      <button
        type="button"
        onClick={reset}
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
        Tentar novamente
      </button>
    </div>
  );
}
