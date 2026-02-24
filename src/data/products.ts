import type { ProductThemeId } from "./productThemes";

export interface TastingNote {
  label: string;
  value: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

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
  bullets?: string[];
  reviewQuote?: string;
  reviewAuthor?: string;
  seoTitle?: string;
  seoDescription?: string;
  ctaText?: string;
  sku?: string;
  price?: number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock";
  category: "vinho" | "suco" | "frisante";
  /** Tema visual da página (paleta por produto) */
  themeId?: ProductThemeId;
  /** Imagem hero (full-bleed). Se não definido, usa productPageImage ou cardImage */
  heroImage?: string;
  /** Imagem da garrafa na seção "Sobre" */
  bottleImage?: string;
  /** Galeria: 4–6 imagens para lightbox */
  galleryImages?: string[];
  /** Notas de degustação (visual, aroma, paladar) */
  tastingNotes?: TastingNote[];
  /** Especificações técnicas */
  specs?: ProductSpec[];
  /** Harmonizações (lista curta) */
  pairings?: string[];
  /** FAQ do produto */
  faq?: FAQItem[];
  /** Tagline curta no hero */
  tagline?: string;
}

export const products: Product[] = [
  {
    slug: "vinho-doce",
    title: "Vinhos Aleph - Tinto Suave (Kiddush)",
    subtitle: "Vinho Tinto Doce",
    cardImage: "/cards/VinhoTintosuavecard.png",
    productImage: "/produtos/vinho-doce-3dbranco.png",
    productPageImage: "/produtos/vinho-doce-produto.png",
    volume: "750ml",
    sku: "ALEPH-TINTO-SUAVE-750",
    shortDescription: "Vinho tinto suave, ideal para o Kiddush e momentos em família.",
    description:
      "Aleph é um vinho tinto suave de alta qualidade, elaborado com uvas selecionadas de um terroir especial do Vale do São Francisco, no nordeste do Brasil. Aleph é a primeira letra do alfabeto hebraico — representa a origem e uma conexão profunda.\n\nUm vinho fácil de beber, ideal para o Shabbat e refeições em família. Cada garrafa traz até você um pouco da nossa missão de fazer parte do dia a dia e das tradições da comunidade judaica.",
    category: "vinho",
    themeId: "vinho-doce",
    heroImage: "/produtos/vinho-doce-produto.png",
    bottleImage: "/produtos/vinho-doce-3dbranco.png",
    galleryImages: [
      "/produtos/vinho-doce-produto.png",
      "/produtos/vinho-doce-3dbranco.png",
      "/produtos/vinho-doce-foto.jpg",
      "/produtos/Vinho-Suave-800.jpg",
      "/produtos/VinhotintoDoce-3d.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Cor rubi profunda, reflexos granada." },
      { label: "Aroma", value: "Frutas vermelhas maduras e toques florais." },
      { label: "Paladar", value: "Suave, final aveludado e persistente." },
    ],
    specs: [
      { label: "Tipo", value: "Vinho Tinto Suave" },
      { label: "Volume", value: "750 ml" },
      { label: "Origem", value: "Vale do São Francisco, Brasil" },
      { label: "Certificação", value: "Kosher" },
      { label: "Servir", value: "14–16 °C" },
    ],
    pairings: ["Queijos de massa semidura", "Sobremesas de chocolate", "Frutas secas", "Kiddush e Shabbat"],
    tagline: "Do Vale do São Francisco à sua mesa. Tradição e doçura em cada taça.",
    faq: [
      { question: "É adequado para Kiddush?", answer: "Sim. O Aleph Tinto Suave foi pensado para o momento do Kiddush e para refeições em família, com doçura equilibrada e alta qualidade." },
      { question: "Como devo armazenar?", answer: "Em local fresco e seco, protegido da luz. Após aberto, consumir em alguns dias e manter refrigerado." },
      { question: "O vinho é certificado Kosher?", answer: "Sim. Nossos vinhos são produzidos sob certificação Kosher, com todo o cuidado e tradição." },
    ],
  },
  {
    slug: "vinho-branco",
    title: "Aleph Wine – Vinho Branco",
    subtitle: "Seco",
    cardImage: "/cards/Vinhobranco-card.png",
    productImage: "/produtos/Vinhobranco-3d.png",
    productPageImage: "/produtos/Vinho-Seco-Branco-800.jpg",
    volume: "750ml",
    sku: "ALEPH-BRANCO-750",
    shortDescription: "Frescor e elegância em cada taça. Blend único com notas de abacaxi e frutas cítricas.",
    description:
      "O Aleph Vinho Branco é seco e refrescante, com um blend único que revela o melhor do terroir tropical. Notas de abacaxi fresco e frutas cítricas, fácil de beber e versátil à mesa.\n\nIdeal para acompanhar frutos do mar, saladas e pratos leves. Perfeito para ocasiões especiais ou momentos de descontração, com a qualidade e a tradição kosher que você merece.",
    category: "vinho",
    themeId: "vinho-branco",
    heroImage: "/produtos/Vinho-Seco-Branco-800.jpg",
    bottleImage: "/produtos/Vinhobranco-3d.png",
    galleryImages: [
      "/produtos/Vinho-Seco-Branco-800.jpg",
      "/produtos/Vinhobranco-3d.png",
      "/cards/Vinhobranco-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Amarelo dourado claro, reflexos verdes." },
      { label: "Aroma", value: "Abacaxi, frutas cítricas e notas florais." },
      { label: "Paladar", value: "Fresco, equilibrado e final persistente." },
    ],
    specs: [
      { label: "Tipo", value: "Vinho Branco Seco" },
      { label: "Volume", value: "750 ml" },
      { label: "Origem", value: "Vale do São Francisco, Brasil" },
      { label: "Certificação", value: "Kosher" },
      { label: "Servir", value: "8–10 °C" },
    ],
    pairings: ["Frutos do mar", "Saladas", "Queijos frescos", "Peixes grelhados"],
    tagline: "Frescor tropical e elegância em cada taça.",
    faq: [
      { question: "Qual a temperatura ideal de serviço?", answer: "Entre 8 °C e 10 °C para realçar o frescor e os aromas." },
      { question: "É certificado Kosher?", answer: "Sim. Todo o portfólio Aleph é produzido sob certificação Kosher." },
    ],
  },
  {
    slug: "vinho-seco",
    title: "Aleph Wine – Vinho Tinto Seco",
    subtitle: "Tinto Seco",
    cardImage: "/cards/Vinhotintoseco-card.png",
    productImage: "/produtos/Vinhotintoseco-3d.png",
    productPageImage: "/produtos/Vinho-Seco-800.jpg",
    volume: "750ml",
    sku: "ALEPH-TINTO-SECO-750",
    shortDescription: "Intensidade e corpo para paladares exigentes. Mesa kosher com personalidade.",
    description:
      "O Aleph Tinto Seco é encorpado e intenso, com taninos bem estruturados e notas de frutas vermelhas maduras. Mesma base de excelência do nosso Tinto Suave, fermentado até o seco para quem aprecia vinhos com mais corpo.\n\nIdeal para carnes vermelhas, queijos maturados e pratos robustos. Uma escolha sofisticada para a mesa kosher.",
    category: "vinho",
    themeId: "vinho-seco",
    heroImage: "/produtos/Vinho-Seco-800.jpg",
    bottleImage: "/produtos/Vinhotintoseco-3d.png",
    galleryImages: [
      "/produtos/Vinho-Seco-800.jpg",
      "/produtos/Vinhotintoseco-3d.png",
      "/cards/Vinhotintoseco-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Rubi intenso, reflexos violáceos." },
      { label: "Aroma", value: "Frutas vermelhas maduras, especiarias leves." },
      { label: "Paladar", value: "Taninos elegantes, final longo e persistente." },
    ],
    specs: [
      { label: "Tipo", value: "Vinho Tinto Seco" },
      { label: "Volume", value: "750 ml" },
      { label: "Origem", value: "Vale do São Francisco, Brasil" },
      { label: "Certificação", value: "Kosher" },
      { label: "Servir", value: "16–18 °C" },
    ],
    pairings: ["Carnes vermelhas", "Queijos maturados", "Massas com molho vermelho", "Cordeiro"],
    tagline: "Corpo e elegância para a mesa.",
    faq: [
      { question: "Qual a diferença para o Tinto Suave?", answer: "O Tinto Seco é fermentado até o fim, sem açúcar residual, resultando em mais corpo e taninos. O Tinto Suave mantém doçura equilibrada, ideal para Kiddush." },
      { question: "Precisa decantar?", answer: "Para aproveitar ainda mais os aromas, pode decantar 15–30 minutos antes de servir." },
      { question: "É Kosher?", answer: "Sim. Produzido sob certificação Kosher, com o mesmo cuidado do restante da linha Aleph." },
    ],
  },
  {
    slug: "vinho-frisante",
    title: "Aleph Wine – Vinho Branco Frizzante",
    subtitle: "Espumante",
    cardImage: "/cards/Card_Frisante.png",
    productImage: "/produtos/Frisante-3d.jpg",
    productPageImage: "/produtos/Vinho-Frisante-800.jpg",
    volume: "750ml",
    sku: "ALEPH-FRIZZANTE-750",
    shortDescription: "Leveza e borbulhas para celebrar. Levemente doce e extremamente aromático.",
    description:
      "O Aleph Frizzante é leve e refrescante, com borbulhas delicadas e notas finas. Levemente doce e extremamente aromático, perfeito para brindes, aperitivos e celebrações.\n\nSua efervescência e frescor o tornam ideal para os dias mais quentes e para momentos especiais à mesa, com a qualidade kosher que você conhece.",
    category: "frisante",
    themeId: "vinho-frisante",
    heroImage: "/produtos/Vinho-Frisante-800.jpg",
    bottleImage: "/produtos/Frisante-3d.jpg",
    galleryImages: [
      "/produtos/Vinho-Frisante-800.jpg",
      "/produtos/Frisante-3d.jpg",
      "/produtos/Frisante_side.webp",
      "/cards/Card_Frisante.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Amarelo palha, borbulhas finas e persistentes." },
      { label: "Aroma", value: "Floral e frutas brancas, toques tropicais." },
      { label: "Paladar", value: "Levemente doce, fresco e vibrante." },
    ],
    specs: [
      { label: "Tipo", value: "Vinho Branco Frizzante" },
      { label: "Volume", value: "750 ml" },
      { label: "Origem", value: "Vale do São Francisco, Brasil" },
      { label: "Certificação", value: "Kosher" },
      { label: "Servir", value: "6–8 °C" },
    ],
    pairings: ["Aperitivos", "Frutas frescas", "Sobremesas leves", "Saladas"],
    tagline: "Borbulhas e frescor para celebrar.",
    faq: [
      { question: "Qual a temperatura ideal?", answer: "Entre 6 °C e 8 °C para manter as borbulhas e o frescor." },
      { question: "É doce ou seco?", answer: "Levemente doce, com equilíbrio que agrada a todos. Extremamente aromático." },
      { question: "É Kosher?", answer: "Sim. Produzido sob certificação Kosher." },
    ],
  },
  {
    slug: "suco-de-uva",
    title: "Suco de Uva Tinto Integral",
    subtitle: "100% Natural",
    cardImage: "/cards/Sucodeuva-card.png",
    productImage: "/produtos/Sucodeuva-3d.png",
    productPageImage: "/produtos/Sucodeuva-3d.png",
    volume: "300ml · 1L · 1,5L",
    sku: "SUCO-UVA-INTEGRAL",
    shortDescription: "100% natural, sem água nem açúcar. Feito com 2 kg de uvas por litro. Sabor único.",
    description:
      "Suco de Uva 18k é 100% natural, elaborado com uvas selecionadas do Vale do São Francisco. Sem adição de água, açúcares ou conservantes — apenas o melhor da uva, com sabor rico e autêntico.\n\nCada litro leva o equivalente a 2 kg de uvas, garantindo corpo, cor e sabor únicos. Rico em antioxidantes, é a escolha perfeita para toda a família e uma opção especial para momentos sem álcool.",
    category: "suco",
    themeId: "suco",
    heroImage: "/produtos/Sucodeuva-3d.png",
    bottleImage: "/produtos/Sucodeuva-3d.png",
    galleryImages: [
      "/produtos/Sucodeuva-3d.png",
      "/produtos/sucos.jpg",
      "/cards/Sucodeuva-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Violeta intenso, corpo denso." },
      { label: "Aroma", value: "Uva fresca, notas de fruta madura." },
      { label: "Sabor", value: "Rico, naturalmente doce e suculento." },
    ],
    specs: [
      { label: "Tipo", value: "Suco de Uva Tinto Integral" },
      { label: "Tamanhos", value: "300 ml, 1 L, 1,5 L" },
      { label: "Composição", value: "100% uva, sem água nem açúcar" },
      { label: "Origem", value: "Vale do São Francisco, Brasil" },
      { label: "Certificação", value: "Kosher" },
    ],
    pairings: ["Café da manhã", "Sobremesas", "Queijos", "Momento em família", "Alternativa sem álcool ao Kiddush"],
    tagline: "100% natural. Nada mais. Sabor que fala por si.",
    faq: [
      { question: "Contém açúcar adicionado?", answer: "Não. O doce vem apenas das uvas. Sem adição de água, açúcar ou conservantes." },
      { question: "É pasteurizado?", answer: "Sim, para garantir segurança e durabilidade, sem alterar o sabor natural." },
      { question: "Quantas uvas por litro?", answer: "O equivalente a cerca de 2 kg de uvas por litro, para um suco rico e encorpado." },
    ],
  },
];

export const categories = [
  { id: "vinho", label: "Vinhos" },
  { id: "suco", label: "Sucos" },
  { id: "frisante", label: "Frisante e Espumante" },
] as const;
