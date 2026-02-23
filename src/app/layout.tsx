import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "18k Wine | Vinhos Kosher Premium",
  description: "Vinhos Kosher de alta qualidade para celebrações e momentos especiais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
