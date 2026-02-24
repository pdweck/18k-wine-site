import Link from "next/link";
import { navEn, navPt } from "@/data/i18n";

type Locale = "pt" | "en";

interface FooterProps {
  locale?: Locale;
}

export default function Footer({ locale = "pt" }: FooterProps) {
  const nav = locale === "en" ? navEn : navPt;
  const aboutHref = locale === "en" ? "/en/about" : "/quem-somos";
  const contactHref = locale === "en" ? "/en/contact" : "/contato";
  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href={homeHref} className="footer-logo">
          18k Wine
        </Link>

        <div className="footer-links">
          <Link href={aboutHref} className="footer-link">
            {nav.about}
          </Link>
          <Link href={contactHref} className="footer-link">
            {nav.contact}
          </Link>
          <a
            href="https://www.18kwine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {nav.officialSite}
          </a>
        </div>

        <span className="footer-copy">
          © {new Date().getFullYear()} 18k Wine. {nav.rights}
        </span>
      </div>
    </footer>
  );
}
