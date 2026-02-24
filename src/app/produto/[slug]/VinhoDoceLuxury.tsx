import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://wa.me/5511999999999?text=Olá%2C%20gostaria%20de%20conhecer%20o%20Vinho%20Aleph%20Tinto%20Suave";

interface VinhoDoceLuxuryProps {
  product: Product;
}

export default function VinhoDoceLuxury({ product }: VinhoDoceLuxuryProps) {
  const mainImage = product.productPageImage || product.cardImage;
  const paragraphs = product.description.split(/\n\n+/);

  return (
    <div className="luxury-product" role="main" aria-label={`Página do produto ${product.title}`}>
      {/* Hero full-screen */}
      <header className="luxury-hero">
        <div className="luxury-hero-bg">
          <Image
            src={mainImage}
            alt={`${product.title}, ${product.volume || ""}. Garrafa e taça em fundo escuro.`}
            fill
            sizes="100vw"
            priority
            className="luxury-hero-img"
          />
          <div className="luxury-hero-overlay" aria-hidden />
        </div>
        <div className="luxury-hero-content">
          <Link href="/#produtos" className="luxury-back" aria-label="Voltar à coleção">
            <span className="luxury-back-icon" aria-hidden>←</span>
            Voltar à coleção
          </Link>
          <p className="luxury-hero-label">Vinho Tinto Suave</p>
          <h1 className="luxury-hero-title">{product.title}</h1>
          {product.volume && (
            <p className="luxury-hero-volume">{product.volume}</p>
          )}
          <p className="luxury-hero-tagline">
            Do Vale do São Francisco à sua mesa. Tradição e doçura em cada taça.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-cta luxury-cta--hero"
            aria-label="Falar com consultor pelo WhatsApp"
          >
            <span className="luxury-cta-text">Explorar e encomendar</span>
          </a>
        </div>
      </header>

      {/* A Essência do Doce */}
      <section className="luxury-section luxury-essence" aria-labelledby="essencia-heading">
        <div className="luxury-container">
          <h2 id="essencia-heading" className="luxury-section-title">
            A essência do doce
          </h2>
          <div className="luxury-prose">
            {paragraphs.map((para, i) => (
              <p key={i} className="luxury-prose-p">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Notas de Degustação */}
      <section className="luxury-section luxury-tasting" aria-labelledby="degustacao-heading">
        <div className="luxury-container">
          <h2 id="degustacao-heading" className="luxury-section-title">
            Notas de degustação
          </h2>
          <ul className="luxury-tasting-list" role="list">
            <li>
              <span className="luxury-tasting-icon" aria-hidden>◇</span>
              Cor rubi profunda, reflexos granada
            </li>
            <li>
              <span className="luxury-tasting-icon" aria-hidden>◇</span>
              Aroma de frutas vermelhas maduras e toques florais
            </li>
            <li>
              <span className="luxury-tasting-icon" aria-hidden>◇</span>
              Paladar suave, final aveludado e persistente
            </li>
          </ul>
        </div>
      </section>

      {/* Harmonizações */}
      <section className="luxury-section luxury-pairing" aria-labelledby="harmonizacoes-heading">
        <div className="luxury-container">
          <h2 id="harmonizacoes-heading" className="luxury-section-title">
            Harmonizações perfeitas
          </h2>
          <p className="luxury-pairing-text">
            Queijos de massa semidura, sobremesas de chocolate, frutas secas e o momento do Kiddush. 
            Um vinho que une tradição e prazer à mesa.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="luxury-section luxury-cta-block" aria-label="Chamada para ação">
        <div className="luxury-container luxury-cta-wrap">
          <p className="luxury-cta-lead">Pronto para levar o Aleph para casa?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-cta luxury-cta--primary"
            aria-label="Encomendar pelo WhatsApp"
          >
            Falar com consultor
          </a>
          <p className="luxury-cta-note">
            Mais informações em{" "}
            <a href="https://www.18kwine.com" target="_blank" rel="noopener noreferrer">
              18kwine.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
