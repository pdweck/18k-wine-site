"""
Apaga toda a escrita do card Sucodeuva-card.png (ALEPH, título, tagline).
Mantém apenas o botão Descobrir e o resto da imagem (garrafa, fundo).
Salva com outro nome: Sucodeuva-card-somente-botao.png
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PROJECT_ROOT = Path(__file__).resolve().parents[1]
CARDS_DIR = PROJECT_ROOT / "public" / "cards"
INPUT_NAME = "Sucodeuva-card.png"
OUTPUT_NAME = "Sucodeuva-card-somente-botao.png"

TEXT_LEFT = 52
# Cobre ALEPH + título + tagline (toda a escrita), sem cobrir o botão
COVER_X1 = TEXT_LEFT
COVER_Y1 = 85
COVER_X2 = 520
COVER_Y2 = 265
# Botão Descobrir
BTN_TOP = 265
BTN_WIDTH = 190
BTN_HEIGHT = 52


def sample_background_color(img: Image.Image) -> tuple:
    """Amostra a cor de fundo roxa na área do texto."""
    x, y = 120, 180
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    p = img.getpixel((x, y))
    if len(p) == 4:
        return p
    return (*p[:3], 255)


def main() -> None:
    input_path = CARDS_DIR / INPUT_NAME
    if not input_path.exists():
        raise FileNotFoundError(f"Card não encontrado: {input_path}")

    img = Image.open(input_path).convert("RGBA")
    draw = ImageDraw.Draw(img)

    # Apagar toda a escrita (ALEPH, título, tagline) com o fundo roxo
    bg_color = sample_background_color(img)
    draw.rectangle(
        [COVER_X1, COVER_Y1, COVER_X2, COVER_Y2],
        fill=bg_color,
    )

    # Manter apenas o botão Descobrir
    try:
        font_btn = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 26)
    except OSError:
        font_btn = ImageFont.load_default()

    text_color = (255, 255, 255)
    draw.rounded_rectangle(
        [
            TEXT_LEFT,
            BTN_TOP,
            TEXT_LEFT + BTN_WIDTH,
            BTN_TOP + BTN_HEIGHT,
        ],
        radius=BTN_HEIGHT // 2,
        outline=text_color,
        width=2,
    )
    draw.text(
        (TEXT_LEFT + 28, BTN_TOP + 12),
        "Descobrir >",
        fill=text_color,
        font=font_btn,
    )

    out_path = CARDS_DIR / OUTPUT_NAME
    img.save(out_path, "PNG", optimize=True)
    print(f"Card salvo em: {out_path}")


if __name__ == "__main__":
    main()
