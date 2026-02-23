import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo-link">
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
        <Link href="/quem-somos" className="navbar-link">
          Quem Somos
        </Link>
        <Link href="/contato" className="navbar-link">
          Contato
        </Link>
      </div>
      
      <div className="navbar-right">
        <Link href="/en" className="navbar-lang-btn">
          English
        </Link>
      </div>
    </nav>
  );
}
