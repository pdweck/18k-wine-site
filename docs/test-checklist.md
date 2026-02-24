# Test checklist — Product pages e imagens dos cards

## Evidências obrigatórias

- [ ] **1. Clicar em 5 cards distintos na landing** e verificar que a product page mostra **a mesma imagem** do card (mesmo arquivo/crop).
  - [ ] Vinho Doce
  - [ ] Vinho Branco
  - [ ] Vinho Seco
  - [ ] Vinho Frisante
  - [ ] Suco de Uva

- [ ] **2. Todas as imagens carregam do diretório local** (sem 404).
  - Abrir DevTools → Network; filtrar por Img; recarregar product pages; verificar que as imagens vêm de `/cards/...` (e não retornam 404).

- [ ] **3. Alt text e OG image** atualizados no HTML.
  - Em cada product page: inspecionar `<img alt="...">` e conferir `<meta property="og:image" ...>` (e opcionalmente Twitter card).

- [ ] **4. Fallback placeholder**
  - Renomear temporariamente uma imagem de card (ex.: `Sucodeuva-card.png`) para forçar erro; recarregar a product page do Suco de Uva e confirmar que aparece `/images/placeholder.jpg`.

## Comando para rodar o site

```bash
npm run dev
```

Abrir `http://localhost:3000` (ou a porta indicada), ir à seção de produtos, clicar em cada card e validar os itens acima.
