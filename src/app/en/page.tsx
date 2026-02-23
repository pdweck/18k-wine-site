import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function EnglishPage() {
  return (
    <>
      <nav className="navbar">
        <Link href="/en" className="navbar-logo-link">
          <Image
            src="/produtos/logo-100.png"
            alt="18k Wine"
            width={80}
            height={60}
            className="navbar-logo-img"
            priority
          />
        </Link>
        
        <div className="navbar-center">
          <Link href="/en/about" className="navbar-link">
            About Us
          </Link>
          <Link href="/en/contact" className="navbar-link">
            Contact
          </Link>
        </div>
        
        <div className="navbar-right">
          <Link href="/" className="navbar-lang-btn">
            Português
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-logo">
          <Image
            src="/produtos/logo-100.png"
            alt="18k Wine"
            width={180}
            height={140}
            className="hero-logo-img"
            priority
          />
        </div>
        <p className="hero-tagline">Premium Kosher Wines</p>
      </section>

      <section className="products-section">
        <h2 className="section-title">Coming Soon</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", marginTop: "-1rem" }}>
          English version under construction
        </p>
      </section>

      <Footer />
    </>
  );
}
