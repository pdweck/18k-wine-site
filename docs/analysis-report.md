# Análise: Product pages + imagens dos cards | 18kwine.com

**Data:** 2025-02-23  
**Site de referência:** https://www.18kwine.com  
**Projeto:** 18knovosite (Next.js)

---

## Objetivo

- Product page exibir **a mesma imagem do card** (mesmo crop/resolução).
- Imagens locais; fallback placeholder; SEO e acessibilidade.

## Implementação realizada

- **Mapeamento:** Cada produto usa `cardImage` no carrossel e **na product page** (antes usava `productImage`).
- **next/image:** Uso de `next/image` com `fill`, `sizes` (srcset implícito) e lazy-loading.
- **Fallback:** Placeholder em `/images/placeholder.jpg` quando a imagem falha ao carregar (`ProductImage.tsx`).
- **SEO e acessibilidade:** `generateMetadata` por produto com `title`, `description`, `openGraph.images`, `twitter.card`; `og:image` aponta para a mesma imagem do card (URL absoluta via `NEXT_PUBLIC_SITE_URL`). Alt text: `{title} — {subtitle}`.
- **Marcação semântica:** `h1` no título do produto; meta description via metadata.

## Problemas detectados / recomendações

| Prioridade | Item | Recomendação |
|------------|------|--------------|
| **Alto** | Garantir que todos os arquivos de card existam em `public/cards/` | Verificar presença de `Sucodeuva-card.png`, `Vinhobranco-card.png`, etc. Evitar nomes com espaço (ex.: `Sucodeuva-card .png`). |
| **Alto** | OG image em produção | Definir `NEXT_PUBLIC_SITE_URL` no deploy (ex.: `https://www.18kwine.com`) para `og:image` absoluto. |
| **Médio** | Preços não existem no modelo | Se o site 18kwine.com exibir preços, adicionar campo `price` em `products.ts` e exibir na product page. |
| **Médio** | Volume (750ml, 1L, etc.) | Incluir em `Product` e no alt (ex.: "Vinho X — 750ml") para consistência com o site de referência. |
| **Baixo** | Nomenclatura de arquivos | Padronizar para kebab-case (ex.: `vinho-tinto-suave-card.png`) em futuras inclusões. |

## Site 18kwine.com (resumo da inspeção)

- Landing contém 5 produtos: Suco de Uva (Whole Red Grape Juice), Vinho Doce (Kiddush), Vinho Tinto Suave, Vinho Branco Frizzante, Vinho Branco.
- Produtos mencionam 750ml e suco em 1L, 1.5L, 300ml.
- Crawl completo (todas as product pages, URLs de imagens, status HTTP) exigiria ferramenta de crawl ou browser headless; inventário JSON/CSV do projeto foi preenchido com base nos dados atuais do repositório.

## Arquivos de imagem no projeto

- **Cards:** `public/cards/*.png` (VinhoTintosuavecard, Vinhobranco-card, Vinhotintoseco-card, Card_Frisante, Sucodeuva-card).
- **Placeholder:** `public/images/placeholder.jpg`.
- Nenhuma imagem do site 18kwine.com referenciada por URL externa; todas locais.

## Mapeamento final sugerido (slug → filename)

| slug | filename sugerido (kebab-case) |
|------|--------------------------------|
| vinho-doce | vinho-tinto-suave-card.png |
| vinho-branco | vinho-branco-card.png |
| vinho-seco | vinho-tinto-seco-card.png |
| vinho-frisante | card-frisante.png |
| suco-de-uva | sucodeuva-card.png |

---

*Relatório gerado no âmbito da tarefa "product page: use card images from local assets; add analysis report".*
