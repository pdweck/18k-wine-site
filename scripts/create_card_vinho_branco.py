"""
Gera um card de Vinho Branco no mesmo formato do Card_Frisante,
usando como fundo o `card_empty_vinho_branco.png` e a garrafa
`Vinhobranco-3d.png`, sem frutas ao redor.
"""

import os
from pathlib import Path

from PIL import Image

PROJECT_ROOT = Path(__file__).resolve().parents[1]
CARDS_DIR = PROJECT_ROOT / "public" / "cards"
PRODUTOS_DIR = PROJECT_ROOT / "public" / "produtos"

BACKGROUND_NAME = "card_empty_vinho_branco.png"
BOTTLLE_NAME = "Vinhobranco-3d.png"
OUTPUT_NAME = "Card_Vinho_Branco.png"


def remove_black_background(img: Image.Image, threshold: int = 10) -> Image.Image:
    """
    Converte o fundo preto da garrafa em transparência (chroma key simples).
    threshold controla o quão "próximo de preto" o pixel precisa ser.
    """
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        if r <= threshold and g <= threshold and b <= threshold:
            # trata como fundo transparente
            new_data.append((r, g, b, 0))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    return img


def main() -> None:
    bg_path = CARDS_DIR / BACKGROUND_NAME
    bottle_path = PRODUTOS_DIR / BOTTLLE_NAME

    if not bg_path.exists():
        raise FileNotFoundError(f"Fundo não encontrado: {bg_path}")
    if not bottle_path.exists():
        raise FileNotFoundError(f"Garrafa não encontrada: {bottle_path}")

    # Fundo: já no tamanho e proporção corretos para o carrossel
    bg = Image.open(bg_path).convert("RGBA")
    width, height = bg.size

    # GARRAFA: remove fundo preto, redimensiona e rotaciona levemente
    bottle = Image.open(bottle_path)
    bottle = remove_black_background(bottle, threshold=15)

    # Escala: deixa a garrafa ocupando cerca de 80% da altura do card
    target_h = int(height * 0.8)
    scale = target_h / bottle.height
    new_size = (int(bottle.width * scale), target_h)
    bottle = bottle.resize(new_size, Image.LANCZOS)

    # Rotação leve (como o frisante)
    bottle = bottle.rotate(-8, resample=Image.BICUBIC, expand=True)

    # Posicionamento: lado direito, centralizada verticalmente
    bx, by = bottle.size
    center_x = int(width * 0.68)
    center_y = int(height * 0.52)

    paste_x = center_x - bx // 2
    paste_y = center_y - by // 2

    composed = bg.copy()
    composed.alpha_composite(bottle, dest=(paste_x, paste_y))

    out_path = CARDS_DIR / OUTPUT_NAME
    composed.save(out_path, "PNG", optimize=True)
    print(f"Card criado em: {out_path}")


if __name__ == "__main__":
    main()

