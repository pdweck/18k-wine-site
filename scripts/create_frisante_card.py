"""
Cria o card do Frisante: fundo laranja, garrafa ocupando toda a altura do card,
tampa saindo pela borda superior (efeito 3D), garrafa levemente inclinada para a direita.
"""
import os
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(PROJECT_ROOT, "public", "cards")
PRODUTOS_DIR = os.path.join(PROJECT_ROOT, "public", "produtos")

# Card: mesma proporção do carrossel (aspect 2.25)
CARD_W = 1248
CARD_H = int(CARD_W / 2.25)  # ~554
# Pixels no topo da imagem onde a tampa fica FORA do card (acima do laranja)
# A imagem final é 1248x554 (aspect 2.25) para o carrossel não cortar
CAP_TOP_PX = 58
CANVAS_H = CARD_H
RADIUS = 60
# Garrafa em destaque; só metade da tampa ultrapassa a borda superior
BOTTLE_SCALE = 1.728
# Metade da tampa acima do card (tampa ~10% da garrafa; metade = 5%)
EXTRA_TOP_BASE = 37
# Garrafa mais 10% + 20%; pode ultrapassar borda superior e inferior (nada cortado)
SIZE_FACTOR = 2.0328  # 1.694 * 1.2
BOTTLE_Y_DOWN = -352  # mais 50 px para cima
BOTTLE_X_LEFT = 270   # mais 50 px para a esquerda
BOTTLE_H = int((EXTRA_TOP_BASE + CARD_H) * SIZE_FACTOR)
# Se garrafa foi movida para cima (Y negativo): expandir canvas para a tampa não ser cortada
if BOTTLE_Y_DOWN < 0:
    EXTRA_TOP = -BOTTLE_Y_DOWN  # faixa onde a tampa ultrapassa a borda superior
    TOTAL_H = BOTTLE_H
else:
    EXTRA_TOP = BOTTLE_Y_DOWN + int(0.05 * BOTTLE_H)
    TOTAL_H = max(EXTRA_TOP + CARD_H, BOTTLE_Y_DOWN + BOTTLE_H)

# Cor do anexo: laranja queimado
ORANGE_HEX = "#C45C26"
# Texto e botão no lado esquerdo (cinza claro)
TEXT_COLOR = "#E0E0E0"
TEXT_LEFT = 52
TEXT_TOP_OFFSET = 145  # +50 px para baixo

# Posição horizontal no card (0 = esquerda, 1 = direita) — mais à direita
BOTTLE_X_RATIO = 0.35

# Usar a garrafa já com fundo transparente (gerada por create_frisante_transparent.py)
BOTTLE_PATH = os.path.join(PRODUTOS_DIR, "Frisante-3d-transparent.png")
BOTTLE_PATH_FALLBACK = os.path.join(PRODUTOS_DIR, "Frisante-3d.jpg")
OUT_PATH = os.path.join(CARDS_DIR, "card_empty_frisante.png")


def draw_rounded_rect(draw, xy, radius, fill):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    draw.pieslice([x1, y1, x1 + 2 * radius, y1 + 2 * radius], 180, 270, fill=fill)
    draw.pieslice([x2 - 2 * radius, y1, x2, y1 + 2 * radius], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - 2 * radius, x1 + 2 * radius, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - 2 * radius, y2 - 2 * radius, x2, y2], 0, 90, fill=fill)


def draw_left_side_text(draw, card_top_y):
    """Desenha ALEPH, VINHO FRISANTE, tagline e botão Descobrir no lado esquerdo do card."""
    y0 = card_top_y + TEXT_TOP_OFFSET
    try:
        font_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 28)
        font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 52)
        font_tag = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 30)
    except OSError:
        font_small = font_title = font_tag = ImageFont.load_default()
    draw.text((TEXT_LEFT, y0), "ALEPH", fill=TEXT_COLOR, font=font_small)
    draw.text((TEXT_LEFT, y0 + 48), "VINHO FRISANTE", fill=TEXT_COLOR, font=font_title)
    draw.text((TEXT_LEFT, y0 + 120), "Tropical e refrescante, a bebida que inspira.", fill=TEXT_COLOR, font=font_tag)
    # Botão oval "Descobrir >"
    btn_y = y0 + 195
    btn_w, btn_h = 190, 52
    draw.rounded_rectangle(
        [TEXT_LEFT, btn_y, TEXT_LEFT + btn_w, btn_y + btn_h],
        radius=btn_h // 2,
        outline=TEXT_COLOR,
        width=2,
    )
    try:
        font_btn = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 26)
    except OSError:
        font_btn = ImageFont.load_default()
    draw.text((TEXT_LEFT + 28, btn_y + 12), "Descobrir >", fill=TEXT_COLOR, font=font_btn)


def add_condensation_effect(bottle_img, density=0.12, droplet_radius_range=(1, 4), opacity_range=(40, 120)):
    """
    Cria efeito de suor/condensação na garrafa: gotas semitransparentes sobre o vidro.
    bottle_img: PIL Image RGBA da garrafa (será modificada com uma camada de gotas).
    """
    w, h = bottle_img.size
    out = bottle_img.copy()
    draw = ImageDraw.Draw(out)
    alpha = np.array(bottle_img.getchannel("A"))
    # Só colocar gotas onde a garrafa tem opacidade (vidro ou conteúdo)
    valid = alpha > 80
    ys, xs = np.where(valid)
    if len(xs) < 50:
        return bottle_img
    n_droplets = int(len(xs) * density)
    indices = random.sample(range(len(xs)), min(n_droplets, len(xs)))
    for i in indices:
        cx, cy = int(xs[i]), int(ys[i])
        r = random.randint(droplet_radius_range[0], droplet_radius_range[1])
        op = random.randint(opacity_range[0], opacity_range[1])
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, op))
    return out


def remove_white_background(img, threshold=248):
    """Torna pixels brancos transparentes."""
    img = img.convert("RGBA")
    a = np.array(img)
    r, g, b, al = a[:, :, 0], a[:, :, 1], a[:, :, 2], a[:, :, 3]
    white = (r >= threshold) & (g >= threshold) & (b >= threshold)
    a[white, 3] = 0
    return Image.fromarray(a)


def main():
    canvas = Image.new("RGBA", (CARD_W, TOTAL_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    # Card laranja: altura CARD_H; garrafa pode ultrapassar acima e abaixo
    draw_rounded_rect(draw, (0, EXTRA_TOP, CARD_W, EXTRA_TOP + CARD_H), RADIUS, ORANGE_HEX)
    draw_left_side_text(draw, EXTRA_TOP)

    bottle_path = BOTTLE_PATH if os.path.exists(BOTTLE_PATH) else BOTTLE_PATH_FALLBACK
    if not os.path.exists(bottle_path):
        canvas.convert("RGB").save(OUT_PATH, "PNG", optimize=True)
        print(f"Garrafa não encontrada. Salvo apenas o card: {OUT_PATH}")
        return

    bottle = Image.open(bottle_path).convert("RGBA")
    if bottle_path.endswith(".jpg"):
        bottle = remove_white_background(bottle.convert("RGB"))

    bottle = bottle.rotate(-10, expand=True, resample=Image.Resampling.BICUBIC)

    ratio = BOTTLE_H / bottle.height
    new_w = int(bottle.width * ratio)
    new_h = int(bottle.height * ratio)
    bottle = bottle.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Efeito suor/condensação na garrafa
    bottle = add_condensation_effect(bottle, density=0, droplet_radius_range=(1, 3), opacity_range=(50, 110))

    x = int(CARD_W * BOTTLE_X_RATIO) - BOTTLE_X_LEFT
    bottle_y = 0 if BOTTLE_Y_DOWN < 0 else BOTTLE_Y_DOWN  # y=0 para tampa inteira acima do card
    canvas.paste(bottle, (x, bottle_y), bottle)

    out_rgb = Image.new("RGB", (CARD_W, TOTAL_H), (0, 0, 0))
    out_rgb.paste(canvas, (0, 0), canvas)
    out_rgb.save(OUT_PATH, "PNG", optimize=True)
    print(f"Salvo: {OUT_PATH}")


if __name__ == "__main__":
    main()
