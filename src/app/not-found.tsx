import Link from "next/link";

export default function NotFound() {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Página não encontrada</h1>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
        O endereço que você acessou não existe.
      </p>
      <Link
        href="/"
        style={{
          color: "#c9a962",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
