import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import type { ProductPageTranslations } from "@/data/i18n";
import { productThemes } from "@/data/productThemes";
import ProductGallery from "@/components/ProductGallery";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";
import { products } from "@/data/products";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://wa.me/5511999999999?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%2018k%20Wine";

const WHATSAPP_URL_EN =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://wa.me/5511999999999?text=Hi%2C%20I%20would%20like%20more%20information%20about%2018k%20Wine%20products";

interface ProductPageTemplateProps {
  product: Product;
  /** English UI strings; when omitted, Portuguese is used */
  t?: ProductPageTranslations;
  /** Base path for product links (e.g. /en/products for EN). Default /produto */
  productLinkBase?: string;
  /** Full list of products for "Related" (same locale as product). Default: products (PT) */
  relatedProducts?: Product[];
}

function getWhatsAppUrl(product: Product, isEn?: boolean): string {
  const base = isEn ? WHATSAPP_URL_EN : WHATSAPP_URL;
  const msg = isEn
    ? `Hi! I would like information or to order: ${product.title}`
    : `Olá! Gostaria de informações ou de encomendar: ${product.title}`;
  const text = encodeURIComponent(msg);
  if (base.includes("?")) return `${base}&text=${text}`;
  return `${base}?text=${text}`;
}

const DEFAULT_PT = {
  backToCollection: "Voltar à coleção",
  buyNow: "Comprar agora",
  addToCart: "Adicionar ao carrinho",
  aboutProduct: "Sobre o produto",
  characteristicsAndNotes: "Características e notas",
  pairings: "Harmonizações",
  gallery: "Galeria",
  technicalInfo: "Informações técnicas",
  youMayAlsoLike: "Você também pode gostar",
  faq: "Perguntas frequentes",
  readyToTakeHome: "Pronto para levar para casa?",
  talkToConsultant: "Falar com consultor",
  moreInfoAt: "Mais informações em",
  trustKosher: "Kosher certificado",
  trustValley: "Vale do São Francisco",
  trustDelivery: "Entrega rápida",
  trustTropical: "Tropical Wines · Vale do São Francisco",
  ariaProductPage: "Página do produto",
  ariaBuyNow: "Comprar agora pelo WhatsApp",
  ariaAddToCart: "Adicionar ao pedido pelo WhatsApp",
  ariaConsultant: "Falar com consultor no WhatsApp",
} as const;

export default function ProductPageTemplate({
  product,
  t: tProp,
  productLinkBase = "/produto",
  relatedProducts = products,
}: ProductPageTemplateProps) {
  const themeId = product.themeId ?? "vinho-doce";
  const theme = productThemes[themeId];
  const themeClass = theme?.themeClass ?? "pp-theme-vinho-doce";
  const t = tProp ?? DEFAULT_PT;
  const isEn = !!tProp;

  const heroImage = product.heroImage || product.productPageImage || product.cardImage;
  const bottleImage = product.bottleImage || product.productPageImage || product.cardImage;
  const paragraphs = product.description.split(/\n\n+/).filter(Boolean);

  const whatsappUrl = getWhatsAppUrl(product, isEn);
  const backHref = isEn ? "/en#products" : "/#produtos";

  return (
    <div className={`pp ${themeClass}`} role="main" aria-label={`${t.ariaProductPage} ${product.title}`}>
      <div className="pp-trust" aria-hidden>
        <span className="pp-trust-item">{t.trustKosher}</span>
        <span className="pp-trust-dot" aria-hidden />
        <span className="pp-trust-item">{t.trustValley}</span>
        <span className="pp-trust-dot" aria-hidden />
        <span className="pp-trust-item">{t.trustDelivery}</span>
      </div>

      <header className="pp-hero">
        <div className="pp-hero-bg">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="pp-hero-img"
          />
          <div className="pp-hero-overlay" aria-hidden />
        </div>
        <div className="pp-hero-content">
          <Link href={backHref} className="pp-back" aria-label={t.backToCollection}>
            <span aria-hidden>←</span> {t.backToCollection}
          </Link>
          {product.subtitle && (
            <p className="pp-hero-label">{product.subtitle}</p>
          )}
          <h1 className="pp-hero-title">{product.title}</h1>
          {product.volume && (
            <p className="pp-hero-volume" aria-label={`Volume: ${product.volume}`}>
              {product.volume}
            </p>
          )}
          {product.tagline && (
            <p className="pp-hero-tagline">{product.tagline}</p>
          )}
          <div className="pp-hero-ctas">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-cta pp-cta-primary"
              aria-label={t.ariaBuyNow}
            >
              {t.buyNow}
            </a>
          </div>
        </div>
      </header>

      <section className="pp-section pp-about" aria-labelledby="pp-about-heading">
        <div className="pp-container pp-about-inner">
          <div className="pp-about-text">
            <h2 id="pp-about-heading" className="pp-section-title">
              {t.aboutProduct}
            </h2>
            {paragraphs.map((para, i) => (
              <p key={i} className="pp-prose">{para}</p>
            ))}
          </div>
          <figure className="pp-about-figure">
            <Image
              src={bottleImage}
              alt={`Garrafa ${product.title}`}
              width={320}
              height={400}
              sizes="(max-width: 768px) 50vw, 320px"
              className="pp-bottle-img"
            />
          </figure>
        </div>
      </section>

      {/* Características / Notas de degustação */}
      {product.tastingNotes && product.tastingNotes.length > 0 && (
        <section className="pp-section pp-tasting" aria-labelledby="pp-tasting-heading">
          <div className="pp-container">
            <h2 id="pp-tasting-heading" className="pp-section-title">
              {t.characteristicsAndNotes}
            </h2>
            <div className="pp-tasting-grid" role="list">
              {product.tastingNotes.map((note, i) => (
                <div key={i} className="pp-tasting-card">
                  <span className="pp-tasting-label">{note.label}</span>
                  <p className="pp-tasting-value">{note.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Harmonizações */}
      {product.pairings && product.pairings.length > 0 && (
        <section className="pp-section pp-pairing" aria-labelledby="pp-pairing-heading">
          <div className="pp-container">
            <h2 id="pp-pairing-heading" className="pp-section-title">
              {t.pairings}
            </h2>
            <div className="pp-pairing-tags">
              {product.pairings.map((p, i) => (
                <span key={i} className="pp-pairing-tag">{p}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galeria com lightbox */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="pp-section pp-gallery-section" aria-labelledby="pp-gallery-heading">
          <div className="pp-container">
            <h2 id="pp-gallery-heading" className="pp-section-title">
              {t.gallery}
            </h2>
            <ProductGallery images={product.galleryImages} alt={product.title} />
          </div>
        </section>
      )}

      {/* Informações técnicas */}
      {product.specs && product.specs.length > 0 && (
        <section className="pp-section pp-specs" aria-labelledby="pp-specs-heading">
          <div className="pp-container">
            <h2 id="pp-specs-heading" className="pp-section-title">
              {t.technicalInfo}
            </h2>
            <dl className="pp-specs-list">
              {product.specs.map((spec, i) => (
                <div key={i} className="pp-spec-row">
                  <dt className="pp-spec-label">{spec.label}</dt>
                  <dd className="pp-spec-value">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <div className="pp-trust pp-trust-bottom" aria-hidden>
              <span className="pp-trust-item">{t.trustKosher}</span>
              <span className="pp-trust-item">{t.trustTropical}</span>
            </div>
          </div>
        </section>
      )}

      <RelatedProducts
        currentSlug={product.slug}
        products={relatedProducts}
        productHref={(slug) => `${productLinkBase}/${slug}`}
        relatedTitle={t.youMayAlsoLike}
      />

      {/* FAQ */}
      {product.faq && product.faq.length > 0 && (
        <section className="pp-section pp-faq-section" aria-labelledby="pp-faq-heading">
          <div className="pp-container">
            <h2 id="pp-faq-heading" className="pp-section-title">
              {t.faq}
            </h2>
            <ProductFAQ items={product.faq} />
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="pp-section pp-cta-block" aria-label={t.ariaConsultant}>
        <div className="pp-container pp-cta-wrap">
          <p className="pp-cta-lead">{t.readyToTakeHome}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-cta pp-cta-primary"
            aria-label={t.ariaConsultant}
          >
            {t.talkToConsultant}
          </a>
          <p className="pp-cta-note">
            {t.moreInfoAt}{" "}
            <a href="https://www.18kwine.com" target="_blank" rel="noopener noreferrer">
              18kwine.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
