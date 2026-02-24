# Vinho Doce — Redesign Luxury: Análise, Changelog e Entregáveis

## A) Resumo da análise (antes)

**O que estava bom**
- Estrutura semântica (h1, figure, aria-label) e uso de next/image com fallback.
- Conteúdo em PT-BR e dados do produto centralizados em `products.ts`.
- Meta tags e JSON-LD pensados para SEO.
- Link “Voltar” e CTA WhatsApp presentes.

**O que estava longe do nível luxury**
- **Visual:** fundo preto genérico (#000), pouco contraste de luxo; sem gradientes nem paleta “vinho doce”.
- **Hierarquia:** página de produto em grid 2 colunas simples; sem hero, sem respiro; tipografia sem escala de luxo.
- **Emoção:** nenhuma seção sensorial (“essência do doce”, degustação, harmonização); tom mais informativo que aspiracional.
- **Conversão:** CTA único e pouco destacado; sem narrativa (hero → história → prova → ação).
- **Performance/UX:** hero não priorizado (sem `priority` na imagem principal); sem animações sutis.
- **Mobile:** mesmo layout que desktop, sem foco em leitura e toque em telas pequenas.
- **Marca:** não transmitia “vinícola premium”; parecia página de catálogo.

---

## B) Changelog detalhado (o que mudou e por quê)

### 1. Arquitetura e escopo
- **Novo componente:** `VinhoDoceLuxury.tsx` usado **apenas** para `slug === "vinho-doce"`.
- **Motivo:** experiência luxury dedicada sem alterar as outras páginas de produto.
- **Roteamento:** em `page.tsx`, se `product.slug === "vinho-doce"` renderiza `VinhoDoceLuxury` + Navbar + WhatsApp flutuante + Footer; senão, mantém o fluxo atual.

### 2. Paleta e identidade visual
- **Variáveis CSS:** `--luxury-bg` (#0F0A05), `--luxury-bg-alt` (#1A0F08), `--luxury-burgundy` (#9B2A1F), `--luxury-gold` (#D4AF37), `--luxury-cream` (#F5EDE0), `--luxury-neutral`, `--luxury-warm`.
- **Uso:** fundos em preto/chocolate, títulos e CTAs em dourado, corpo em creme, overlays em gradiente.
- **Ganho:** sensação de vinho doce/premium e consistência com marcas de luxo.

### 3. Hero full-viewport
- **Antes:** imagem ao lado do texto em grid.
- **Agora:** hero 100vh com imagem de produto em full-bleed, overlay em gradiente (transparente → escuro) e conteúdo centralizado por cima.
- **Conteúdo:** “Voltar à coleção”, label “Vinho Tinto Suave”, título (nome do produto), volume (750ml), tagline (“Do Vale do São Francisco à sua mesa…”), CTA “Explorar e encomendar”.
- **Imagem:** `next/image` com `priority` e `sizes="100vw"` para LCP.
- **Ganho:** impacto visual imediato e foco em emoção + conversão.

### 4. Tipografia
- **Headings:** Playfair Display + Cormorant Garamond (serif) para título do hero e títulos de seção.
- **Corpo:** Inter mantida; textos em `--luxury-cream` com opacidade para hierarquia.
- **Escala:** `clamp(2.25rem, 6vw, 3.5rem)` no título do hero; seções com `clamp(1.75rem, 4vw, 2.25rem)`.
- **Ganho:** leitura confortável e sensação premium.

### 5. Estrutura da página (narrativa)
- **Seção “A essência do doce”:** dois parágrafos do produto (Aleph, terroir, Shabat, comunidade) em fundo alternado.
- **“Notas de degustação”:** lista com ícone ◇ (cor, aroma, paladar) em estilo minimalista.
- **“Harmonizações perfeitas”:** texto sobre queijos, sobremesas, Kiddush.
- **Bloco CTA final:** “Pronto para levar o Aleph para casa?” + botão “Falar com consultor” + link 18kwine.com.
- **Ganho:** fluxo claro (apresentação → história → prova → decisão) e reforço de conversão.

### 6. CTAs e botões
- **Hero:** botão dourado sólido (“Explorar e encomendar”) com hover em dourado mais claro e leve brilho.
- **Final:** botão outline dourado (“Falar com consultor”) com hover em fundo dourado suave e borda brilhante.
- **Acessibilidade:** `aria-label` em todos os links externos/WhatsApp.
- **Ganho:** CTAs visíveis e alinhados a um tom consultivo (luxury).

### 7. Animações e micro-interações
- **CSS:** `@keyframes luxuryFadeIn` (opacity + translateY) nas seções, com `prefers-reduced-motion` respeitado.
- **Delays:** pequenos offsets entre seções para efeito de revelação suave.
- **Hover:** transições em back, CTAs e link “Voltar”.
- **Ganho:** sensação de fluidez sem distrair.

### 8. Acessibilidade e SEO
- **Semântica:** `<header>`, `<section>`, `aria-labelledby`, `role="main"`, `aria-label` em links.
- **Alt da imagem:** descritivo em PT-BR (produto + volume + cena).
- **JSON-LD:** mantido para Product (nome, imagem, descrição, sku, brand); página luxury não altera ofertas.
- **Ganho:** WCAG AA mais próximo e SEO preservado.

### 9. Responsivo e performance
- **Container:** `max-width: 640px` no conteúdo escrito; hero full-width.
- **Padding e tipo:** `clamp()` e `rem` para escalar em mobile.
- **Imagem hero:** `priority` para LCP; `object-fit: cover` e `object-position` para enquadramento.
- **Ganho:** mobile-first e LCP otimizado.

---

## C) Sugestões de imagens (stock / IA)

- **Hero (atual):** a imagem do produto (garrafa + taça + uvas) já está em uso; manter como principal.
- **Alternativa hero (ambiente):** taça de vinho tinto em mesa, luz quente, fundo escuro.  
  - Unsplash: buscar “red wine glass dark background”, “wine pour dark”.  
  - Ex.: `https://unsplash.com/s/photos/red-wine-glass-dark`
- **Harmonizações (futuro):** queijos e sobremesas em pratos neutros; ângulo de cima ou 3/4.  
  - Pexels: “cheese board”, “chocolate dessert plate”.
- **Texto para IA (hero alternativo):** “Professional product photo of a glass of red sweet wine on a dark wooden table, soft golden light from the side, dark background, shallow depth of field, luxury wine brand style.”

---

## D) Fontes Google e implementação

**Já em uso (layout):**
- **Inter:** corpo e UI.
- **Playfair Display:** títulos gerais.
- **Cormorant Garamond:** adicionada para títulos da página luxury (hero e seções).

**Link atual (layout.tsx):**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Uso no CSS (luxury):**
- `.luxury-hero-title`, `.luxury-section-title`: `font-family: "Playfair Display", "Cormorant Garamond", Georgia, serif;`
- Corpo: `font-family: "Inter", system-ui, sans-serif;`

**Opcional (se quiser ainda mais “editorial”):**
- **Cinzel** para títulos curtos (ex.: label “Vinho Tinto Suave”):  
  `family=Cinzel:wght@400;500;600`  
- **Satoshi** (não está no Google Fonts; usar via Adobe Fonts ou arquivo local se tiver licença).

---

## E) Next.js: componentes reutilizáveis e Server Components

- **`VinhoDoceLuxury`:** Server Component; recebe `product` já resolvido no `page.tsx`; sem estado nem hooks.
- **Reutilização possível:**
  - **`LuxuryHero`:** recebe `imageSrc`, `imageAlt`, `label`, `title`, `volume`, `tagline`, `ctaText`, `ctaHref` para outras páginas de produto premium.
  - **`LuxurySection`:** recebe `title`, `id`, `children` e opcional `className` para “Essência”, “Degustação”, “Harmonizações”.
  - **`LuxuryCtaBlock`:** lead + botão + nota; parametrizável por texto e URL.
- **Manter Server Components:** dados do produto vêm de `products` no servidor; JSON-LD e meta continuam em `page.tsx`; apenas o WhatsApp flutuante poderia ser um Client Component se no futuro tiver interação extra (ex.: analytics no click).
- **Lazy load:** seções abaixo da dobra já beneficiam do carregamento nativo; imagens abaixo do hero podem usar `loading="lazy"` (next/image já faz por padrão quando não é `priority`).

---

## F) Checklist rápido (implementado)

- [x] Hero full-viewport com overlay e CTA
- [x] Paleta luxury (chocolate, dourado, creme)
- [x] Tipografia serif (Playfair + Cormorant) para títulos
- [x] Seções: A essência do doce, Notas de degustação, Harmonizações, CTA final
- [x] CTAs com estilo dourado (sólido + outline) e hover
- [x] Animação sutil ao scroll (fade-in em seções)
- [x] Respeito a `prefers-reduced-motion`
- [x] Semântica e ARIA; alt em PT-BR
- [x] JSON-LD Product mantido
- [x] Layout responsivo e hero com `priority`
- [x] Apenas página vinho-doce alterada; demais produtos inalterados
