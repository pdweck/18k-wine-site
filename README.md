# 18K Wine - Site Oficial

Site moderno e responsivo para a marca 18K Wine, com foco em vinhos e sucos tropicais produzidos no Vale do São Francisco, Nordeste do Brasil.

## Design

- **Paleta**: Vermelhos intensos, verdes tropicais, amarelos cítricos e tons de uva
- **Tipografia**: Montserrat (Google Fonts)
- **Estilo**: Moderno, vibrante, inclusivo — expandindo além do universo Kosher
- **Responsivo**: Mobile, tablet e desktop

## Estrutura

- **index.html** – Página inicial com carrossel de produtos
- **sobre.html** – História da marca e Vale do São Francisco
- **produtos.html** – Lista completa de vinhos e sucos
- **parceiros.html** – Formulário para colaborações
- **contato.html** – Formulário de mensagem

## Tecnologias

- HTML5
- CSS3 (variáveis, Grid, Flexbox)
- JavaScript vanilla
- [Swiper.js](https://swiperjs.com/) – Carrossel (via CDN)

## Como rodar localmente

1. Clone ou baixe a pasta do projeto
2. Abra `index.html` no navegador (duplo clique ou via servidor local)

Com servidor local (opcional):
```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Acesse: `http://localhost:8000`

## Hospedagem

### GitHub Pages

1. Crie um repositório no GitHub
2. Envie os arquivos do site
3. Em **Settings** → **Pages** → **Source**: branch `main`, pasta `/ (root)`
4. O site ficará em `https://seu-usuario.github.io/nome-repo`

### Netlify / Vercel

- Arraste a pasta do projeto ou conecte ao repositório Git
- Deploy automático em segundos

### Outras opções

- **Vercel**: `vercel deploy`
- **Netlify Drop**: arraste a pasta em [app.netlify.com/drop](https://app.netlify.com/drop)

## Imagens do relatório de branding

Para extrair imagens do PDF do relatório de branding:

```bash
pip install pymupdf
python scripts/extract_pdf_images.py
```

Ou passando o caminho do PDF:

```bash
python scripts/extract_pdf_images.py "caminho/para/ibranding-report.pdf"
```

Coloque o PDF na raiz do projeto (como `ibranding-report.pdf` ou `branding-report.pdf`) ou informe o caminho.

O script:
- Salva imagens em `images/branding/`
- Gera `valley.jpg`, `branding-hero.jpg`, `branding-about.jpg` (sugestões)
- Cria `manifest.json` para a galeria na página Sobre

O site usa essas imagens automaticamente, com fallback para Unsplash quando não existirem.

## Imagens de produtos

As imagens atuais vêm do Unsplash (placeholders). Para produção:

1. Substitua pelos arquivos reais dos produtos
2. Use nomes descritivos: `suco-uva-integral.jpg`, `vinho-tinto-doce.jpg`, etc.
3. Comprima as imagens (ex: [Squoosh](https://squoosh.app/)) para melhor performance
4. Mantenha proporções consistentes (ex: 16:9 ou 4:3)

### Sugestões de edição das imagens

- Aumentar brilho e contraste para cores mais vivas
- Adicionar overlay de texto (“Produzido no Nordeste”) quando fizer sentido
- Crop focado no produto para destaque
- Evitar elementos religiosos excessivos; priorizar terroir e frescor

## Recursos adicionais

- **Favicon** – `favicon.svg` (logo 18K)
- **404** – Página de erro customizada (`404.html`), usada automaticamente no GitHub Pages
- **Acessibilidade** – Link "Ir para o conteúdo", aria-labels
- **Breadcrumbs** – Nas páginas internas (Sobre, Produtos, Parceiros, Contato)
- **Voltar ao topo** – Botão flutuante ao rolar a página
- **Lazy loading** – Imagens abaixo da dobra carregam sob demanda

## SEO

- Meta tags em todas as páginas
- `alt` em todas as imagens
- Títulos hierárquicos (h1, h2, h3)
- URLs amigáveis e descritivas

## Contato dos formulários

Os formulários (Contato e Parceiros) usam `action="#"` e JavaScript para feedback. Para enviar dados de verdade, integre com:

- **Formspree**
- **Netlify Forms**
- **EmailJS**
- Ou backend próprio (PHP, Node, etc.)

---

© 2025 18K Wine
