/**
 * Paletas por produto para páginas premium.
 * Cada tema define cores para hero, CTAs, destaques e fundos.
 */
export type ProductThemeId =
  | "suco"
  | "vinho-doce"
  | "vinho-seco"
  | "vinho-frisante"
  | "vinho-branco";

export const productThemes: Record<
  ProductThemeId,
  {
    /** Classe/data-attribute para aplicar no wrapper da página */
    themeClass: string;
    /** Cor principal (destaques, bordas, CTAs) */
    accent: string;
    /** Cor de fundo escura */
    bgDark: string;
    /** Cor de fundo alternativa */
    bgAlt: string;
    /** Cor de texto clara */
    textLight: string;
    /** Cor de texto suave */
    textMuted: string;
  }
> = {
  suco: {
    themeClass: "pp-theme-suco",
    accent: "#8B2E6B",
    bgDark: "#1A0A12",
    bgAlt: "#2D1522",
    textLight: "#F5E6EF",
    textMuted: "rgba(245, 230, 239, 0.85)",
  },
  "vinho-doce": {
    themeClass: "pp-theme-vinho-doce",
    accent: "#C9A962",
    bgDark: "#0F0A05",
    bgAlt: "#1A0F08",
    textLight: "#F5EDE0",
    textMuted: "rgba(245, 237, 224, 0.88)",
  },
  "vinho-seco": {
    themeClass: "pp-theme-vinho-seco",
    accent: "#9B4B4B",
    bgDark: "#0D0808",
    bgAlt: "#1A0F0F",
    textLight: "#EDE4E0",
    textMuted: "rgba(237, 228, 224, 0.88)",
  },
  "vinho-frisante": {
    themeClass: "pp-theme-vinho-frisante",
    accent: "#B8A065",
    bgDark: "#0A0F0D",
    bgAlt: "#0F1814",
    textLight: "#E8F4F0",
    textMuted: "rgba(232, 244, 240, 0.88)",
  },
  "vinho-branco": {
    themeClass: "pp-theme-vinho-branco",
    accent: "#C4A84A",
    bgDark: "#0F0E0A",
    bgAlt: "#1A1810",
    textLight: "#F5F0E0",
    textMuted: "rgba(245, 240, 224, 0.88)",
  },
};
