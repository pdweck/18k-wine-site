import Navbar from "@/components/Navbar";
import CircularCarousel from "@/components/CircularCarousel";
import Footer from "@/components/Footer";

export const metadata = {
  title: "18k Wine | Premium Kosher Wines & Juice",
  description:
    "A complete juice and wine range to be part of the traditions and your daily life. Kosher certified, from the São Francisco Valley, Brazil.",
};

export default function EnHomePage() {
  return (
    <main>
      <Navbar locale="en" />
      <p className="hero-tagline en-hero-tagline" style={{ textAlign: "center", paddingTop: "6rem", paddingBottom: "0.5rem", maxWidth: "720px", margin: "0 auto 1rem", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)" }}>
        A complete juice and wine range to be part of the traditions and your daily life.
      </p>
      <CircularCarousel locale="en" />
      <Footer locale="en" />
    </main>
  );
}
