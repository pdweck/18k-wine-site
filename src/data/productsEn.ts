import type { Product } from "@/data/products";
import type { ProductThemeId } from "./productThemes";

/**
 * English product data. Same structure as Product; slug is the EN URL slug.
 * slugPt links to the Portuguese product page for language switch.
 */
export interface ProductEn extends Omit<Product, "slug"> {
  slug: string;
  slugPt: string;
}

export const productsEn: ProductEn[] = [
  {
    slug: "aleph-sweet-red-wine-kidush",
    slugPt: "vinho-doce",
    title: "Aleph Wine – Sweet Red Wine (Kidush)",
    subtitle: "Sweet Red",
    cardImage: "/cards/VinhoTintosuavecard.png",
    productImage: "/produtos/vinho-doce-3dbranco.png",
    productPageImage: "/produtos/vinho-doce-produto.png",
    volume: "750ml",
    sku: "ALEPH-TINTO-SUAVE-750",
    shortDescription: "A high-quality smooth red wine, ideal for Kidush and family moments.",
    description:
      "Aleph is a high-quality smooth red wine, crafted with grapes from a special terroir in the São Francisco Valley, in northeastern Brazil. Aleph is the first letter of the Hebrew alphabet — it represents origin and a deep connection.\n\nAn easy-drinking wine, ideal for Shabbat and family meals. Each bottle brings you a little of our mission to be part of daily life and the traditions of the Jewish community.",
    category: "vinho",
    themeId: "vinho-doce" as ProductThemeId,
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
      { label: "Visual", value: "Deep ruby colour with garnet reflections." },
      { label: "Aroma", value: "Ripe red fruits and floral notes." },
      { label: "Palate", value: "Smooth, velvety and persistent finish." },
    ],
    specs: [
      { label: "Type", value: "Sweet Red Wine" },
      { label: "Volume", value: "750 ml" },
      { label: "Origin", value: "São Francisco Valley, Brazil" },
      { label: "Certification", value: "Kosher" },
      { label: "Serve", value: "14–16 °C" },
    ],
    pairings: ["Semi-hard cheeses", "Chocolate desserts", "Dried fruits", "Kidush and Shabbat"],
    tagline: "From the São Francisco Valley to your table. Tradition and sweetness in every glass.",
    faq: [
      { question: "Is it suitable for Kidush?", answer: "Yes. Aleph Sweet Red was designed for the Kidush moment and for family meals, with balanced sweetness and high quality." },
      { question: "How should I store it?", answer: "In a cool, dry place, away from light. Once opened, consume within a few days and keep refrigerated." },
      { question: "Is the wine Kosher certified?", answer: "Yes. Our wines are produced under Kosher certification, with full care and tradition." },
    ],
  },
  {
    slug: "aleph-white-wine",
    slugPt: "vinho-branco",
    title: "Aleph Wine – White Wine",
    subtitle: "Dry",
    cardImage: "/cards/Vinhobranco-card.png",
    productImage: "/produtos/Vinhobranco-3d.png",
    productPageImage: "/produtos/Vinho-Seco-Branco-800.jpg",
    volume: "750ml",
    sku: "ALEPH-BRANCO-750",
    shortDescription: "Freshness and elegance in every glass. Unique blend with pineapple and citrus notes.",
    description:
      "Aleph White Wine is dry and refreshing, with a unique blend that showcases the best of the tropical terroir. Notes of fresh pineapple and citrus fruits, easy to drink and versatile at the table.\n\nIdeal with seafood, salads and light dishes. Perfect for special occasions or casual moments, with the quality and Kosher tradition you deserve.",
    category: "vinho",
    themeId: "vinho-branco" as ProductThemeId,
    heroImage: "/produtos/Vinho-Seco-Branco-800.jpg",
    bottleImage: "/produtos/Vinhobranco-3d.png",
    galleryImages: [
      "/produtos/Vinho-Seco-Branco-800.jpg",
      "/produtos/Vinhobranco-3d.png",
      "/cards/Vinhobranco-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Pale golden yellow with green reflections." },
      { label: "Aroma", value: "Pineapple, citrus and floral notes." },
      { label: "Palate", value: "Fresh, balanced and persistent finish." },
    ],
    specs: [
      { label: "Type", value: "Dry White Wine" },
      { label: "Volume", value: "750 ml" },
      { label: "Origin", value: "São Francisco Valley, Brazil" },
      { label: "Certification", value: "Kosher" },
      { label: "Serve", value: "8–10 °C" },
    ],
    pairings: ["Seafood", "Salads", "Fresh cheeses", "Grilled fish"],
    tagline: "Tropical freshness and elegance in every glass.",
    faq: [
      { question: "What is the ideal serving temperature?", answer: "Between 8 °C and 10 °C to enhance freshness and aromas." },
      { question: "Is it Kosher certified?", answer: "Yes. The entire Aleph range is produced under Kosher certification." },
    ],
  },
  {
    slug: "aleph-dry-red-wine",
    slugPt: "vinho-seco",
    title: "Aleph Wine – Dry Red Wine",
    subtitle: "Smooth Red",
    cardImage: "/cards/Vinhotintoseco-card.png",
    productImage: "/produtos/Vinhotintoseco-3d.png",
    productPageImage: "/produtos/Vinho-Seco-800.jpg",
    volume: "750ml",
    sku: "ALEPH-TINTO-SECO-750",
    shortDescription: "Intensity and body for discerning palates. Kosher table with personality.",
    description:
      "Aleph Dry Red is full-bodied and intense, with well-structured tannins and notes of ripe red fruits. The same excellence as our Sweet Red, fermented to dryness for those who appreciate wines with more body.\n\nIdeal with red meats, aged cheeses and robust dishes. A sophisticated choice for the Kosher table.",
    category: "vinho",
    themeId: "vinho-seco" as ProductThemeId,
    heroImage: "/produtos/Vinho-Seco-800.jpg",
    bottleImage: "/produtos/Vinhotintoseco-3d.png",
    galleryImages: [
      "/produtos/Vinho-Seco-800.jpg",
      "/produtos/Vinhotintoseco-3d.png",
      "/cards/Vinhotintoseco-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Intense ruby with violet reflections." },
      { label: "Aroma", value: "Ripe red fruits and light spices." },
      { label: "Palate", value: "Elegant tannins, long and persistent finish." },
    ],
    specs: [
      { label: "Type", value: "Dry Red Wine" },
      { label: "Volume", value: "750 ml" },
      { label: "Origin", value: "São Francisco Valley, Brazil" },
      { label: "Certification", value: "Kosher" },
      { label: "Serve", value: "16–18 °C" },
    ],
    pairings: ["Red meats", "Aged cheeses", "Pasta with red sauce", "Lamb"],
    tagline: "Body and elegance for the table.",
    faq: [
      { question: "What is the difference from the Sweet Red?", answer: "The Dry Red is fully fermented with no residual sugar, resulting in more body and tannins. The Sweet Red keeps a balanced sweetness, ideal for Kidush." },
      { question: "Should it be decanted?", answer: "To bring out the aromas further, you can decant 15–30 minutes before serving." },
      { question: "Is it Kosher?", answer: "Yes. Produced under Kosher certification, with the same care as the rest of the Aleph range." },
    ],
  },
  {
    slug: "aleph-white-frizzante",
    slugPt: "vinho-frisante",
    title: "Aleph Wine – White Frizzante",
    subtitle: "Sparkling",
    cardImage: "/cards/Card_Frisante.png",
    productImage: "/produtos/Frisante-3d.jpg",
    productPageImage: "/produtos/Vinho-Frisante-800.jpg",
    volume: "750ml",
    sku: "ALEPH-FRIZZANTE-750",
    shortDescription: "Lightness and bubbles to celebrate. Slightly sweet and intensely aromatic.",
    description:
      "Aleph Frizzante is light and refreshing, with delicate bubbles and fine notes. Slightly sweet and intensely aromatic, perfect for toasts, aperitifs and celebrations.\n\nIts effervescence and freshness make it ideal for warm days and special moments at the table, with the Kosher quality you know.",
    category: "frisante",
    themeId: "vinho-frisante" as ProductThemeId,
    heroImage: "/produtos/Vinho-Frisante-800.jpg",
    bottleImage: "/produtos/Frisante-3d.jpg",
    galleryImages: [
      "/produtos/Vinho-Frisante-800.jpg",
      "/produtos/Frisante-3d.jpg",
      "/produtos/Frisante_side.webp",
      "/cards/Card_Frisante.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Straw yellow, fine and persistent bubbles." },
      { label: "Aroma", value: "Floral and white fruits with tropical touches." },
      { label: "Palate", value: "Slightly sweet, fresh and vibrant." },
    ],
    specs: [
      { label: "Type", value: "White Frizzante" },
      { label: "Volume", value: "750 ml" },
      { label: "Origin", value: "São Francisco Valley, Brazil" },
      { label: "Certification", value: "Kosher" },
      { label: "Serve", value: "6–8 °C" },
    ],
    pairings: ["Aperitifs", "Fresh fruits", "Light desserts", "Salads"],
    tagline: "Bubbles and freshness to celebrate.",
    faq: [
      { question: "What is the ideal temperature?", answer: "Between 6 °C and 8 °C to preserve the bubbles and freshness." },
      { question: "Is it sweet or dry?", answer: "Slightly sweet, with a balance that pleases everyone. Intensely aromatic." },
      { question: "Is it Kosher?", answer: "Yes. Produced under Kosher certification." },
    ],
  },
  {
    slug: "whole-red-grape-juice",
    slugPt: "suco-de-uva",
    title: "Whole Red Grape Juice",
    subtitle: "100% Natural",
    cardImage: "/cards/Sucodeuva-card.png",
    productImage: "/produtos/Sucodeuva-3d.png",
    productPageImage: "/produtos/Sucodeuva-3d.png",
    volume: "300ml · 1L · 1.5L",
    sku: "SUCO-UVA-INTEGRAL",
    shortDescription: "100% natural, no water or sugar added. Made with 2 kg of grapes per litre. Unique taste.",
    description:
      "18k Grape Juice is 100% natural, made with selected grapes from the São Francisco Valley. No added water, sugar or preservatives — just the best of the grape, with a rich and authentic flavour.\n\nEach litre uses the equivalent of 2 kg of grapes, ensuring unique body, colour and taste. Rich in antioxidants, it is the perfect choice for the whole family and a special option for alcohol-free moments.",
    category: "suco",
    themeId: "suco" as ProductThemeId,
    heroImage: "/produtos/Sucodeuva-3d.png",
    bottleImage: "/produtos/Sucodeuva-3d.png",
    galleryImages: [
      "/produtos/Sucodeuva-3d.png",
      "/produtos/sucos.jpg",
      "/cards/Sucodeuva-card.png",
    ],
    tastingNotes: [
      { label: "Visual", value: "Deep violet, full body." },
      { label: "Aroma", value: "Fresh grape, ripe fruit notes." },
      { label: "Taste", value: "Rich, naturally sweet and juicy." },
    ],
    specs: [
      { label: "Type", value: "Whole Red Grape Juice" },
      { label: "Sizes", value: "300 ml, 1 L, 1.5 L" },
      { label: "Composition", value: "100% grape, no water or sugar" },
      { label: "Origin", value: "São Francisco Valley, Brazil" },
      { label: "Certification", value: "Kosher" },
    ],
    pairings: ["Breakfast", "Desserts", "Cheeses", "Family time", "Alcohol-free alternative for Kidush"],
    tagline: "100% natural. Nothing else. Taste that speaks for itself.",
    faq: [
      { question: "Does it contain added sugar?", answer: "No. The sweetness comes only from the grapes. No added water, sugar or preservatives." },
      { question: "Is it pasteurised?", answer: "Yes, to ensure safety and shelf life without changing the natural flavour." },
      { question: "How many grapes per litre?", answer: "The equivalent of about 2 kg of grapes per litre for a rich, full-bodied juice." },
    ],
  },
];

export function getProductEnBySlug(slug: string): ProductEn | undefined {
  return productsEn.find((p) => p.slug === slug);
}
