export interface Product {
  slug: string;
  title: string;
  subtitle: string;
  cardImage: string;
  productImage: string;
  productPageImage?: string;
  volume?: string;
  shortDescription: string;
  description: string;
  descriptionParagraphs?: string[];
  /** Bullets: benefícios, notas, harmonização (layout Aleph). */
  bullets?: string[];
  /** Prova social: citação de avaliação. */
  reviewQuote?: string;
  reviewAuthor?: string;
  /** SEO: título e descrição prioritários para esta página. */
  seoTitle?: string;
  seoDescription?: string;
  /** CTA principal (ex.: texto do botão). */
  ctaText?: string;
  /** JSON-LD: preço, SKU, disponibilidade (opcional). */
  sku?: string;
  price?: number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock";
  category: "vinho" | "suco" | "frisante";
}

export const products: Product[] = [
  {
    slug: "vinho-doce",
    title: "Vinhos Aleph - Tinto Suave (Kiddush)",
    subtitle: "",
    cardImage: "/cards/VinhoTintosuavecard.png",
    productImage: "/produtos/vinho-doce-3dbranco.png",
    productPageImage: "/produtos/vinho-doce-produto.png",
    volume: "750ml",
    sku: "ALEPH-TINTO-SUAVE-750",
    shortDescription: "Vinho tinto suave, ideal para o Kiddush e momentos em família.",
    description:
      "Aleph é um vinho tinto suave de alta qualidade. Um vinho elaborado com uvas selecionadas de um terroir especial do vale de São Francisco no nordeste do Brasil. Aleph é a primeira letra do alfabeto hebraico com uma importante simbologia. Representa a origem de todas as coisas e uma conexão pesada.\n\nEste produto é um vinho fácil de beber, ideal para o Shabat e outras refeições em família. Cada garrafa traz até você um pouco da nossa missão de fazer parte do dia a dia e das tradições da comunidade judaica.",
    category: "vinho",
  },
  {
    slug: "vinho-branco",
    title: "Vinho Branco",
    subtitle: "Seco",
    cardImage: "/cards/Vinhobranco-card.png",
    productImage: "/produtos/vinho-branco.png",
    shortDescription: "Frescor e elegância em cada taça.",
    description:
      "O Vinho Branco 18k é um vinho seco e refrescante, ideal para acompanhar frutos do mar, saladas e pratos leves. Com aromas cítricos e florais, oferece uma experiência gastronômica sofisticada. Perfeito para ocasiões especiais ou momentos de descontração.",
    category: "vinho",
  },
  {
    slug: "vinho-seco",
    title: "Vinho Seco",
    subtitle: "Tinto",
    cardImage: "/cards/Vinhotintoseco-card.png",
    productImage: "/produtos/vinho-seco.png",
    shortDescription: "Intensidade e corpo para paladares exigentes.",
    description:
      "O Vinho Tinto Seco 18k é encorpado e intenso, com taninos bem estruturados e notas de frutas vermelhas maduras. Ideal para acompanhar carnes vermelhas, queijos maturados e pratos robustos. Uma escolha sofisticada para quem aprecia vinhos com personalidade.",
    category: "vinho",
  },
  {
    slug: "vinho-frisante",
    title: "Vinho Frisante",
    subtitle: "Espumante",
    cardImage: "/cards/Card_Frisante.png",
    productImage: "/produtos/Frisante-3d.jpg",
    shortDescription: "Leveza e borbulhas para celebrar.",
    description:
      "O Vinho Frisante 18k é leve e refrescante, com borbulhas delicadas que proporcionam uma experiência única. Perfeito para brindes, aperitivos e celebrações. Suas notas frutadas e frescor o tornam ideal para os dias mais quentes.",
    category: "frisante",
  },
  {
    slug: "suco-de-uva",
    title: "Suco de Uva",
    subtitle: "Natural",
    cardImage: "/cards/Sucodeuva-card.png",
    productImage: "/produtos/suco-de-uva.png",
    shortDescription: "Sabor autêntico da uva para toda a família.",
    description:
      "O Suco de Uva 18k é 100% natural, elaborado com uvas selecionadas para garantir o máximo sabor e qualidade. Sem adição de açúcares ou conservantes, é a escolha perfeita para toda a família. Rico em antioxidantes e sabor.",
    category: "suco",
  },
];

export const categories = [
  { id: "vinho", label: "Vinhos" },
  { id: "suco", label: "Sucos" },
  { id: "frisante", label: "Frisante e Espumante" },
] as const;
