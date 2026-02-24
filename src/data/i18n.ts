/**
 * UI strings for product pages and common elements.
 * Use these for EN pages; PT uses hardcoded strings in components.
 */
export const productPageUiEn = {
  backToCollection: "Back to collection",
  buyNow: "Buy now",
  addToCart: "Add to cart",
  aboutProduct: "About the product",
  characteristicsAndNotes: "Characteristics & tasting notes",
  pairings: "Pairings",
  gallery: "Gallery",
  technicalInfo: "Technical information",
  youMayAlsoLike: "You may also like",
  faq: "Frequently asked questions",
  readyToTakeHome: "Ready to take it home?",
  talkToConsultant: "Talk to consultant",
  moreInfoAt: "More information at",
  trustKosher: "Kosher certified",
  trustValley: "São Francisco Valley",
  trustDelivery: "Fast delivery",
  trustTropical: "Tropical Wines · São Francisco Valley",
  ariaProductPage: "Product page",
  ariaBuyNow: "Buy now via WhatsApp",
  ariaAddToCart: "Add to order via WhatsApp",
  ariaConsultant: "Talk to consultant on WhatsApp",
} as const;

export type ProductPageTranslations = typeof productPageUiEn;

export type CategoryId = "vinho" | "suco" | "frisante" | "all";

/** Carousel category filters: EN */
export const categoriesEn: { id: CategoryId; label: string }[] = [
  { id: "all", label: "Highlights" },
  { id: "vinho", label: "Wines" },
  { id: "suco", label: "Juices" },
  { id: "frisante", label: "Frizzante & Sparkling" },
];

/** Carousel category filters: PT (Destaques + categories from products) */
export const categoriesPt: { id: CategoryId; label: string }[] = [
  { id: "all", label: "Destaques" },
  { id: "vinho", label: "Vinhos" },
  { id: "suco", label: "Sucos" },
  { id: "frisante", label: "Frisante e Espumante" },
];

/** Navbar/Footer links and labels */
export const navEn = {
  about: "About Us",
  contact: "Contact",
  switchTo: "Português",
  officialSite: "Official Site",
  rights: "All rights reserved.",
};

export const navPt = {
  about: "Quem Somos",
  contact: "Contato",
  switchTo: "English",
  officialSite: "Site Oficial",
  rights: "Todos os direitos reservados.",
};
