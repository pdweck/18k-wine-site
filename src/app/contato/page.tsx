import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Contato</h1>
          <div className="page-text">
            <p style={{ marginBottom: "2rem" }}>
              Entre em contato conosco para saber mais sobre nossos produtos, 
              pontos de venda ou parcerias comerciais.
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
                Redes Sociais
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                Siga-nos nas redes sociais para novidades e promoções exclusivas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
