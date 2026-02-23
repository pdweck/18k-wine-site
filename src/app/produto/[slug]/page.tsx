import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-container">
          <Link href="/#produtos" className="product-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Voltar aos Produtos
          </Link>

          <div className="product-grid">
            <div className="product-image-wrapper">
              <img
                src={product.productImage}
                alt={product.title}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h1>{product.title}</h1>
              <p className="product-subtitle">{product.subtitle}</p>
              <p className="product-description">{product.description}</p>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
