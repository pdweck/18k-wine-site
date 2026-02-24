import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | 18k Wine",
  description:
    "18k Wine offers outstanding Kosher wines and juices from the São Francisco Valley, Brazil. Tradition, quality and rabbinic supervision.",
};

export default function EnAboutPage() {
  return (
    <>
      <Navbar locale="en" />
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">About Us</h1>
          <div className="page-text">
            <p style={{ marginBottom: "1.5rem" }}>
              18k Wine deeply believes in offering outstanding drinking experiences that are part of your traditions and daily life. Our commitment is to bring you exceptional Kosher products that honour Jewish tradition while delivering an unforgettable sensory experience.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              All of our products are elaborated following Kashrut guidelines with rabbinic supervision. Each bottle is the result of a careful process, from the selection of the finest grapes to the final bottling, ensuring authenticity and quality.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Our wines and juices are made in the São Francisco Valley, northeastern Brazil, under the Tropical Wines denomination of origin. We work with traditional wineries that share our values of excellence and respect for tradition — combining modern winemaking techniques with the rigour of Kosher law.
            </p>
            <p>
              Whether for Kidush, Shabbat, family meals or special celebrations, 18k Wine offers the perfect choice for every occasion. Discover the pleasure of wines and juices that unite quality, tradition and sophistication.
            </p>
          </div>
        </div>
      </div>
      <Footer locale="en" />
    </>
  );
}
