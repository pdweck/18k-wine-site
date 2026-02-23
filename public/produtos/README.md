# Imagens dos produtos

## Usar a imagem original no site

As imagens desta pasta são usadas na **página de detalhe** de cada produto (`/produto/[slug]`). O caminho é definido em `src/data/products.ts` no campo **productImage**.

### Frisante
- **Imagem original:** `Frisante-3d.jpg`  
- Já configurada em `productImage: "/produtos/Frisante-3d.jpg"` para manter as características originais.

### Outros produtos
Para usar a foto original de cada produto, altere em `src/data/products.ts` o valor de **productImage** para o arquivo desta pasta, por exemplo:

| Produto     | Campo productImage (exemplo)           |
|------------|------------------------------------------|
| Vinho Doce | `/produtos/VinhotintoDoce-3d.png`        |
| Vinho Branco | `/produtos/Vinhobranco-3d.png`       |
| Vinho Seco | `/produtos/Vinhotintoseco-3d.png`       |
| Suco de Uva | (colocar aqui o nome do arquivo)        |

### Dicas
- **Formato:** PNG ou JPG. O site exibe o arquivo sem redimensionar na página do produto (proporção e qualidade preservadas).
- **Carrossel:** O campo **cardImage** em `products.ts` aponta para os cards em `public/cards/`. Para mostrar a foto original também no carrossel, use o mesmo caminho em **cardImage** e **productImage** (ex.: `/produtos/Frisante-3d.jpg`).
