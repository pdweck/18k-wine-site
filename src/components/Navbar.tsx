import Link from "next/link";
import Image from "next/image";
import { navEn, navPt } from "@/data/i18n";

type Locale = "pt" | "en";

interface NavbarProps {
  locale?: Locale;
}

export default function Navbar({ locale = "pt" }: NavbarProps) {
  const nav = locale === "en" ? navEn : navPt;
  const aboutHref = locale === "en" ? "/en/about" : "/quem-somos";
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const homeHref = locale === "en" ? "/en" : "/";
  const switchHref = locale === "en" ? "/" : "/en";

  return (
    <nav className="navbar">
      <Link href={homeHref} className="navbar-logo-link">
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
        <Link href={aboutHref} className="navbar-link">
          {nav.about}
        </Link>
        <Link href={contactHref} className="navbar-link">
          {nav.contact}
        </Link>
      </div>

      <div className="navbar-right">
        <Link href={switchHref} className="navbar-lang-btn">
          {nav.switchTo}
        </Link>
      </div>
    </nav>
  );
}
