import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | 18k Wine",
  description: "Get in touch with 18k Wine for product information, stockists and partnerships.",
};

export default function EnContactPage() {
  return (
    <>
      <Navbar locale="en" />
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Contact</h1>
          <div className="page-text">
            <p style={{ marginBottom: "2rem" }}>
              Get in touch for more information about our products, where to buy or commercial partnerships.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                Email
              </h3>
              <p>
                <a
                  href="mailto:contato@18kwine.com"
                  style={{ color: "var(--white)", textDecoration: "underline" }}
                >
                  contato@18kwine.com
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                Website
              </h3>
              <p>
                <a
                  href="https://www.18kwine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--white)", textDecoration: "underline" }}
                >
                  www.18kwine.com
                </a>
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>
                Social media
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                Follow us on social media for news and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer locale="en" />
    </>
  );
}
