"""
Cria cards retangulares vazios nas cores especificadas.
Proporção e tamanho para o carrossel (um card inteiro visível, outros pela metade).
"""
import os
from PIL import Image, ImageDraw

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(PROJECT_ROOT, "public", "cards")

# Largura grande para ver 1 card inteiro e 2 pela metade no carrossel
WIDTH = 1248
HEIGHT = 832
RADIUS = 80  # bordas arredondadas

# Cores dos anexos: vinho doce, vinho seco, laranja, dourado, verde-sálvia
CARDS = [
    ("card_empty_vinho_doce.png", "#4B0024"),      # bordô/vinho escuro
    ("card_empty_vinho_seco.png", "#692A2E"),      # marrom-avermelhado
    ("card_empty_frisante.png", "#E07C3C"),       # laranja
    ("card_empty_suco.png", "#B8860B"),            # dourado/ocre
    ("card_empty_vinho_branco.png", "#A4B4AF"),   # verde-sálvia
]


def draw_rounded_rect(draw, xy, radius, fill):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    draw.pieslice([x1, y1, x1 + 2 * radius, y1 + 2 * radius], 180, 270, fill=fill)
    draw.pieslice([x2 - 2 * radius, y1, x2, y1 + 2 * radius], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - 2 * radius, x1 + 2 * radius, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - 2 * radius, y2 - 2 * radius, x2, y2], 0, 90, fill=fill)


def main():
    for filename, hex_color in CARDS:
        img = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
        draw = ImageDraw.Draw(img)
        # Card ocupa toda a imagem (bordas arredondadas)
        draw_rounded_rect(draw, (0, 0, WIDTH, HEIGHT), RADIUS, hex_color)
        out_path = os.path.join(CARDS_DIR, filename)
        img.save(out_path, "PNG", optimize=True)
        print(f"  {filename} ({hex_color})")
    print(f"\n{len(CARDS)} cards criados em {CARDS_DIR}")


if __name__ == "__main__":
    main()
