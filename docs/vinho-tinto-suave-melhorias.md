# Página Vinho Tinto Suave (Aleph) — Melhorias e entregáveis

**Escopo:** apenas a página do produto Vinho Tinto Suave (vinho-doce).  
**Imagem:** somente a fornecida (`/produtos/vinho-doce-foto.jpg`).

---

## A) Checklist das correções aplicadas

| Item | Status |
|------|--------|
| Texto: título, subtítulo e descrição longa em português claro e sem erros | ✅ |
| Tom de voz: elegante, acessível, confiável | ✅ |
| Meta title e description com foco em conversão e SEO (opção 1 implementada) | ✅ |
| Descrição curta (1 frase) e bullets (5) — benefícios, notas, harmonização | ✅ |
| Hierarquia visual (tamanhos e pesos de fonte) para leitura e escaneabilidade | ✅ |
| CTA: texto, cor, posicionamento (variação A implementada; B disponível) | ✅ |
| Acessibilidade: alt na imagem, contraste, ARIA (role, aria-label, aria-labelledby) | ✅ |
| Imagem: apenas a fornecida; sugestão de dimensões/srcset documentada abaixo | ✅ |
| Prova social: bloco de avaliação com 1 frase de review (placeholder) | ✅ |
| JSON-LD Product (nome, imagem, marca, SKU, availability) | ✅ |
| Preço no JSON-LD | ⚠️ Não preenchido — ver "Informações faltantes" |
| Consistência de preço/frete/políticas na página | ⚠️ Não exibidos — ver "Informações faltantes" |

---

## B) Duas opções de SEO (title e meta description)

**Opção 1 (implementada)**  
- **Title:** `Vinho Aleph Tinto Suave (Kiddush) 750ml | 18k Wine`  
- **Meta description:** `Vinho tinto suave kosher 750ml. Ideal para Kiddush e Shabat. Uvas do Vale do São Francisco. Compre ou peça pelo WhatsApp.`

**Opção 2 (alternativa)**  
- **Title:** `Aleph Tinto Suave Kiddush 750ml — Vinho Kosher | 18k Wine`  
- **Meta description:** `Vinho Aleph tinto suave para Kiddush. 750ml, kosher, Vale do São Francisco. Peça pelo WhatsApp com entrega no Brasil.`

Para usar a opção 2, altere em `src/data/products.ts` no objeto `vinho-doce`:
- `seoTitle`: `"Aleph Tinto Suave Kiddush 750ml — Vinho Kosher | 18k Wine"`
- `seoDescription`: `"Vinho Aleph tinto suave para Kiddush. 750ml, kosher, Vale do São Francisco. Peça pelo WhatsApp com entrega no Brasil."`

---

## C) Duas variações de CTA (A/B)

**Variação A (implementada):** botão com borda branca, fundo transparente; hover inverte (fundo branco, texto vinho).  
- Classe: `product-cta-button`  
- Texto: `FAÇA AQUI O SEU PEDIDO`

**Variação B:** botão preenchido dourado para maior destaque.  
- Classe: `product-cta-button product-cta-button--alt`  
- Para ativar: no arquivo `src/app/produto/[slug]/page.tsx`, na tag `<a>` do CTA, adicione a classe `product-cta-button--alt`:
  ```tsx
  className="product-cta-button product-cta-button--alt"
  ```
- Texto alternativo sugerido: `PEDIR AGORA VIA WHATSAPP`

---

## D) Snippets prontos

### JSON-LD (já inserido na página quando `product.sku` existe)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Vinhos Aleph — Tinto Suave (Kiddush)",
  "image": "https://www.18kwine.com/produtos/vinho-doce-foto.jpg",
  "description": "Vinho tinto suave de alta qualidade, ideal para o Kiddush e momentos em família.",
  "sku": "ALEPH-TINTO-SUAVE-750",
  "brand": { "@type": "Brand", "name": "18k Wine" },
  "offers": {
    "@type": "Offer",
    "price": 0,
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  }
}
```

*Nota:* `price` está ausente nos dados; ao preencher `price` e `priceCurrency` em `products.ts`, o `offers` será gerado automaticamente.

### Alt da imagem (implementado)

```
Vinhos Aleph — Tinto Suave (Kiddush), 750ml. Vinho kosher.
```

### Textos da página (resumo)

- **Descrição curta (destaque):**  
  `Vinho tinto suave de alta qualidade, ideal para o Kiddush e momentos em família.`
- **Bullets:** benefícios, notas, harmonização e certificação (5 itens em `products.ts`).
- **Review (placeholder):**  
  *"Vinho suave e gostoso, sempre presente na nossa mesa de Shabat. Recomendo."* — Cliente 18k Wine.

---

## E) Imagem do produto — dimensões e responsividade

- **Arquivo usado:** `public/produtos/vinho-doce-foto.jpg` (apenas esta imagem).
- **Sugestão de uso:** manter em boa resolução (ex.: largura mínima 800px para coluna da esquerda em desktop). O `next/image` já gera srcset implícito com `sizes="(min-width: 768px) 50vw, 100vw"`.
- **Recomendação:** se redimensionar a imagem, manter proporção e salvar em 800px (largura) para mobile e até 1200px para desktop; formato JPEG com qualidade 80–85.

---

## F) Informações faltantes para concluir

- **Preço:** não informado. Para exibir na página e no JSON-LD, preencher em `products.ts`: `price` (número) e `priceCurrency` (ex.: `"BRL"`).
- **SKU:** preenchido como `ALEPH-TINTO-SUAVE-750`; confirme se é o oficial.
- **Frete e políticas:** não exibidos na página. Se quiser mostrar, será necessário incluir textos e possivelmente links (ex.: “Entrega”, “Trocas”).
- **Avaliações reais:** o bloco de prova social usa uma frase placeholder; substituir por avaliações reais quando houver.

---

## Pré-visualização (resumo das alterações)

- **Desktop:** duas colunas; à esquerda a imagem do vinho; à direita painel vinho com título, 750ml, dois parágrafos, lista em bullets, bloco de review e CTA.
- **Mobile:** uma coluna; imagem em cima; abaixo o mesmo conteúdo do painel.
- **Acessibilidade:** `role="main"`, `aria-label` no main e no link “Voltar”; `figure`/`aria-labelledby` na imagem; `alt` descritivo; contraste dourado (#d4af37) sobre vinho (#6b2020) e texto branco.
- **Nenhuma outra página, template global ou nova imagem foi alterada ou adicionada; apenas a página do Vinho Tinto Suave e os dados/metadados deste produto.**
