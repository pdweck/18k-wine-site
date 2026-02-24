import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

interface RelatedProductsProps {
  currentSlug: string;
  products: Product[];
  /** Build href for each product slug. Default: (slug) => `/produto/${slug}` */
  productHref?: (slug: string) => string;
  /** Section title. Default: "Você também pode gostar" */
  relatedTitle?: string;
}

export default function RelatedProducts({
  currentSlug,
  products,
  productHref = (slug) => `/produto/${slug}`,
  relatedTitle = "Você também pode gostar",
}: RelatedProductsProps) {
  const others = products.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;

  return (
    <section className="pp-related" aria-labelledby="pp-related-heading">
      <h2 id="pp-related-heading" className="pp-related-title">
        {relatedTitle}
      </h2>
      <div className="pp-related-grid" role="list">
        {others.map((product) => (
          <Link
            key={product.slug}
            href={productHref(product.slug)}
            className="pp-related-card"
            aria-label={product.title}
          >
            <div className="pp-related-img-wrap">
              <Image
                src={product.cardImage}
                alt={product.title}
                width={320}
                height={213}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="pp-related-img"
              />
            </div>
            <div className="pp-related-info">
              <span className="pp-related-name">{product.title}</span>
              {product.subtitle && (
                <span className="pp-related-sub">{product.subtitle}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
