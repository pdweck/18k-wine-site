import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QuemSomosPage() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Quem Somos</h1>
          <div className="page-text">
            <p style={{ marginBottom: "1.5rem" }}>
              A 18k Wine nasceu da paixão por vinhos de qualidade e da tradição milenar 
              da produção de vinhos Kosher. Nosso compromisso é oferecer produtos excepcionais 
              que honram as tradições judaicas enquanto proporcionam uma experiência sensorial 
              incomparável.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Cada garrafa 18k Wine é resultado de um processo cuidadoso, desde a seleção 
              das melhores uvas até o engarrafamento final. Nossa certificação Kosher 
              é supervisionada por autoridades rabínicas reconhecidas, garantindo a 
              autenticidade e qualidade de nossos produtos.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Trabalhamos com vinícolas tradicionais que compartilham nossos valores 
              de excelência e respeito às tradições. O resultado são vinhos que combinam 
              técnicas modernas de vinificação com o rigor das leis Kosher.
            </p>
            <p>
              Seja para o Kiddush, celebrações especiais ou momentos de apreciação, 
              a 18k Wine oferece a escolha perfeita para cada ocasião. Descubra o prazer 
              de um vinho que une qualidade, tradição e sofisticação.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
