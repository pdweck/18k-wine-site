"""
Converte pixels pretos (fundo) em transparentes em PNGs de cards.
Assim os cards se mesclam com o fundo preto do site sem mostrar quadrado.
"""
import os
import numpy as np
from PIL import Image

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(PROJECT_ROOT, "public", "cards")

# Pixels com R,G,B abaixo deste valor viram transparentes (fundo preto)
BLACK_THRESHOLD = 25

# Arquivos a processar (nome no disco)
CARD_FILES = [
    "Card_Frisante.png",
    "card_empty_vinho_doce.png",
    "card_empty_vinho_branco.png",
    "card_empty_vinho_seco.png",
    "card_empty_suco.png",
]


def black_to_transparent(img, threshold=BLACK_THRESHOLD):
    """Torna pixels pretos ou muito escuros transparentes. Mantém o resto."""
    img = img.convert("RGBA")
    a = np.array(img)
    r, g, b, al = a[:, :, 0], a[:, :, 1], a[:, :, 2], a[:, :, 3]
    black = (r <= threshold) & (g <= threshold) & (b <= threshold)
    a[black, 3] = 0
    return Image.fromarray(a)


def main():
    for filename in CARD_FILES:
        path = os.path.join(CARDS_DIR, filename)
        if not os.path.exists(path):
            print(f"Pulando (não encontrado): {filename}")
            continue
        img = Image.open(path)
        out = black_to_transparent(img)
        out.save(path, "PNG", optimize=True)
        print(f"OK: {filename} (preto -> transparente)")


if __name__ == "__main__":
    main()
