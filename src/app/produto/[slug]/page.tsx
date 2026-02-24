import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";
import VinhoDoceLuxury from "./VinhoDoceLuxury";
import { products } from "@/data/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.18kwine.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Produto não encontrado" };
  }
  const title =
    product.seoTitle || `${product.title} — ${product.subtitle} | 18k Wine`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    product.description.slice(0, 160);
  const imageForOg = product.productPageImage || product.cardImage;
  const ogImage = imageForOg.startsWith("http")
    ? imageForOg
    : `${BASE_URL}${imageForOg}`;
  const imageAlt = `${product.title} — ${product.subtitle}${product.volume ? `, ${product.volume}` : ""}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://wa.me/5511999999999?text=Olá%2C%20gostaria%20de%20fazer%20um%20pedido";

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  /* Página luxury dedicada apenas para Vinho Doce (Tinto Suave) */
  if (product.slug === "vinho-doce") {
    return (
      <>
        <Navbar />
        {product.sku !== undefined && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: `${product.title} — ${product.subtitle}`,
                image: (product.productPageImage || product.cardImage).startsWith("http")
                  ? product.productPageImage || product.cardImage
                  : `${BASE_URL}${product.productPageImage || product.cardImage}`,
                description: product.shortDescription,
                sku: product.sku,
                brand: { "@type": "Brand", name: "18k Wine" },
              }),
            }}
          />
        )}
        <VinhoDoceLuxury product={product} />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Fale conosco no WhatsApp"
        >
          <span className="whatsapp-float-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
          <span className="whatsapp-float-text">Fale conosco</span>
        </a>
        <Footer />
      </>
    );
  }

  const altText = `${product.title} — ${product.subtitle}${product.volume ? `, ${product.volume}` : ""}. Vinho kosher.`;
  const mainImage = product.productPageImage || product.cardImage;
  const isAlephLayout =
    product.descriptionParagraphs && product.descriptionParagraphs.length > 0;
  const ctaLabel = product.ctaText || "FAÇA AQUI O SEU PEDIDO";

  return (
    <>
      <Navbar />
      {/* JSON-LD Product (apenas quando há dados mínimos: nome, imagem, slug) */}
      {product.sku !== undefined && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${product.title} — ${product.subtitle}`,
              image: mainImage.startsWith("http") ? mainImage : `${BASE_URL}${mainImage}`,
              description: product.shortDescription,
              sku: product.sku,
              brand: { "@type": "Brand", name: "18k Wine" },
              ...(product.price !== undefined &&
                product.priceCurrency && {
                  offers: {
                    "@type": "Offer",
                    price: product.price,
                    priceCurrency: product.priceCurrency,
                    availability: `https://schema.org/${product.availability || "InStock"}`,
                  },
                }),
            }),
          }}
        />
      )}
      <div
        className={`product-page ${isAlephLayout ? "product-page--aleph" : ""}`}
        role="main"
        aria-label={`Página do produto ${product.title}`}
      >
        <div className="product-container">
          <Link href="/#produtos" className="product-back" aria-label="Voltar à lista de produtos">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar aos Produtos
          </Link>

          <div
            className={`product-grid ${isAlephLayout ? "product-grid--aleph" : ""}`}
          >
            <figure className="product-image-wrapper" aria-labelledby="product-title">
              <ProductImage
                src={mainImage}
                alt={altText}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </figure>

            <div
              className={`product-info ${isAlephLayout ? "product-info--aleph" : ""}`}
              id="product-details"
            >
              <h1 id="product-title" className="product-title">
                {product.title}
              </h1>
              <p className="product-subtitle">{product.subtitle}</p>
              {product.volume && (
                <p className="product-volume" aria-label={`Volume: ${product.volume}`}>
                  {product.volume}
                </p>
              )}
              {isAlephLayout && (product.descriptionParagraphs?.length ? (
                <>
                  {product.descriptionParagraphs.map((para, i) => (
                    <p key={i} className="product-description product-description--lead">
                      {para}
                    </p>
                  ))}
                  {product.bullets && product.bullets.length > 0 && (
                    <ul className="product-bullets" aria-label="Características do produto">
                      {product.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {product.reviewQuote && (
                    <blockquote
                      className="product-review"
                      cite={product.reviewAuthor}
                      aria-label="Avaliação de cliente"
                    >
                      <span className="product-review-stars" aria-hidden>
                        ★★★★★
                      </span>
                      <p className="product-review-quote">&ldquo;{product.reviewQuote}&rdquo;</p>
                      {product.reviewAuthor && (
                        <cite className="product-review-author">— {product.reviewAuthor}</cite>
                      )}
                    </blockquote>
                  )}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-cta-button"
                    aria-label={`${ctaLabel}. Abre o WhatsApp em nova janela.`}
                  >
                    {ctaLabel}
                  </a>
                </>
              ) : isAlephLayout && product.slug === "vinho-doce" ? (
                <>
                  <p className="product-description product-description--lead">
                    {product.description}
                  </p>
                  {product.bullets && product.bullets.length > 0 && (
                    <ul className="product-bullets" aria-label="Características do produto">
                      {product.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {product.reviewQuote && (
                    <blockquote className="product-review" cite={product.reviewAuthor} aria-label="Avaliação de cliente">
                      <span className="product-review-stars" aria-hidden>★★★★★</span>
                      <p className="product-review-quote">&ldquo;{product.reviewQuote}&rdquo;</p>
                      {product.reviewAuthor && <cite className="product-review-author">— {product.reviewAuthor}</cite>}
                    </blockquote>
                  )}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-cta-button"
                    aria-label={`${ctaLabel}. Abre o WhatsApp em nova janela.`}
                  >
                    {ctaLabel}
                  </a>
                </>
              ) : (
                <>
                  {product.volume && (
                    <p className="product-volume" aria-label={`Volume: ${product.volume}`}>
                      {product.volume}
                    </p>
                  )}
                  {product.description.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="product-description">
                      {para}
                    </p>
                  ))}
                  <p className="product-source">
                    Mais informações em{" "}
                    <a
                      href="https://www.18kwine.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      18kwine.com
                    </a>
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botão flutuante WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="whatsapp-float-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span className="whatsapp-float-text">Fale conosco AGORA!</span>
      </a>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
