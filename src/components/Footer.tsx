import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          18k Wine
        </Link>
        
        <div className="footer-links">
          <Link href="/quem-somos" className="footer-link">
            Quem Somos
          </Link>
          <Link href="/contato" className="footer-link">
            Contato
          </Link>
          <a 
            href="https://www.18kwine.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            Site Oficial
          </a>
        </div>
        
        <span className="footer-copy">
          © {new Date().getFullYear()} 18k Wine. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
