import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          18K Wine
        </Link>
        <nav className="header-nav">
          <Link href="/#produtos" className="header-link">
            Produtos
          </Link>
          <a
            href="https://www.18kwine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            Sobre
          </a>
        </nav>
      </div>
    </header>
  );
}
