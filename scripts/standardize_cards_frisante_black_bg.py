"""
Padroniza os 4 cards ao Frisante (referência) e coloca todos (incl. Frisante) em fundo preto.
- Detecta o card interno por cor (região dominante não-branca).
- Redimensiona/recorta o conteúdo do card para coincidir com o card do Frisante.
- Fundo externo = preto sólido #000000.
- Saída: produto_standard.png (5 imagens finais).
"""
import os
from PIL import Image
import numpy as np

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(PROJECT_ROOT, "public", "cards")

REFERENCE = "Card-Frisante.png"

CARDS = [
    ("Card - Suco de Uva.png", "suco_de_uva_standard.png"),
    ("Card - Vinho Branco.png", "vinho_branco_standard.png"),
    ("Card - Vinho tinto Doce.png", "vinho_tinto_doce_standard.png"),
    ("Card - Vinho Tinto Seco.png", "vinho_tinto_seco_standard.png"),
]
FRISANTE_OUT = "frisante_standard.png"

# Fundo preto
BLACK = (0, 0, 0)


def get_card_color_from_left_band(img, band_width_ratio=0.35):
    """Obtém a cor típica do card amostrando a faixa esquerda (onde fica o texto)."""
    w, h = img.size
    band_w = int(w * band_width_ratio)
    region = img.crop((0, h // 4, band_w, 3 * h // 4))
    a = np.array(region)
    if a.ndim == 3:
        # Ignorar pixels muito claros (texto) ou muito escuros
        mask = (a[:, :, :3].mean(axis=2) > 30) & (a[:, :, :3].mean(axis=2) < 250)
        if mask.any():
            pixels = a[mask][:, :3]
            return tuple(np.median(pixels, axis=0).astype(int))
    return (180, 100, 50)


def color_distance(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5


def detect_card_bbox(img, card_color=None, distance_threshold=120, padding_pct=0.02):
    """
    Detecta o retângulo do card interno pela proximidade à cor do card.
    Retorna (left, top, right, bottom).
    """
    w, h = img.size
    if card_color is None:
        card_color = get_card_color_from_left_band(img)
    img_rgb = img.convert("RGB")
    a = np.array(img_rgb)
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    dist = np.sqrt((r - card_color[0]) ** 2 + (g - card_color[1]) ** 2 + (b - card_color[2]) ** 2)
    # Incluir também pixels que não são brancos (evitar fundo branco como "card")
    not_white = (r < 250) & (g < 250) & (b < 250)
    card_mask = (dist < distance_threshold) | (not_white & (dist < 180))
    rows = np.any(card_mask, axis=1)
    cols = np.any(card_mask, axis=0)
    if not rows.any() or not cols.any():
        # Fallback: usar margens fixas (card ocupa ~85% central)
        pad_x = int(w * 0.08)
        pad_y = int(h * 0.12)
        return (pad_x, pad_y, w - pad_x, h - pad_y)
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]
    # Margem para incluir bordas arredondadas e sombra
    pad_x = max(int((cmax - cmin) * padding_pct), int(w * 0.03))
    pad_y = max(int((rmax - rmin) * padding_pct), int(h * 0.03))
    return (
        max(0, cmin - pad_x),
        max(0, rmin - pad_y),
        min(w, cmax + 1 + pad_x),
        min(h, rmax + 1 + pad_y),
    )


def standardize_card_to_reference(
    src_path,
    ref_img,
    ref_card_bbox,
    ref_size,
    out_path,
):
    """
    Extrai o card de src, redimensiona para o tamanho do card do Frisante,
    coloca em canvas preto do tamanho da referência.
    """
    src = Image.open(src_path).convert("RGBA")
    sw, sh = src.size
    src_card = detect_card_bbox(src)
    l, t, r, b = src_card
    card_w = r - l
    card_h = b - t
    ref_l, ref_t, ref_r, ref_b = ref_card_bbox
    ref_card_w = ref_r - ref_l
    ref_card_h = ref_b - ref_t

    # Escala uniforme para caber no retângulo do Frisante (cover)
    scale = max(ref_card_w / card_w, ref_card_h / card_h)
    new_cw = int(round(card_w * scale))
    new_ch = int(round(card_h * scale))

    card_crop = src.crop((l, t, r, b))
    card_resized = card_crop.resize((new_cw, new_ch), Image.Resampling.LANCZOS)

    # Crop central para exatamente ref_card_w x ref_card_h
    x0 = (new_cw - ref_card_w) // 2
    y0 = (new_ch - ref_card_h) // 2
    card_final = card_resized.crop((x0, y0, x0 + ref_card_w, y0 + ref_card_h))

    # Canvas preto do tamanho da referência
    out_w, out_h = ref_size
    canvas = Image.new("RGBA", (out_w, out_h), (*BLACK, 255))
    canvas.paste(card_final, (ref_l, ref_t), card_final.split()[3] if card_final.mode == "RGBA" else None)

    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  Salvo: {os.path.basename(out_path)}")


def frisante_to_black_background(ref_path, out_path, ref_size):
    """Substitui o fundo branco/externo do Frisante por preto."""
    img = Image.open(ref_path).convert("RGBA")
    w, h = img.size
    a = np.array(img)
    r, g, b, al = a[:, :, 0], a[:, :, 1], a[:, :, 2], a[:, :, 3]
    # Fundo = branco ou quase branco
    white_mask = (r > 245) & (g > 245) & (b > 245)
    a[white_mask, 0] = 0
    a[white_mask, 1] = 0
    a[white_mask, 2] = 0
    a[white_mask, 3] = 255
    out = Image.fromarray(a)
    if (w, h) != ref_size:
        out = out.resize(ref_size, Image.Resampling.LANCZOS)
    out.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  Salvo: {os.path.basename(out_path)} (referência em fundo preto)")


def main():
    ref_path = os.path.join(CARDS_DIR, REFERENCE)
    if not os.path.exists(ref_path):
        print(f"Referência não encontrada: {ref_path}")
        return

    ref_img = Image.open(ref_path).convert("RGB")
    ref_w, ref_h = ref_img.size
    ref_size = (ref_w, ref_h)

    ref_card_bbox = detect_card_bbox(ref_img)
    print(f"Referência '{REFERENCE}': {ref_w} x {ref_h} px")
    print(f"  Card interno detectado: {ref_card_bbox}\n")

    # Frisante: só trocar fundo por preto
    frisante_out_path = os.path.join(CARDS_DIR, FRISANTE_OUT)
    frisante_to_black_background(ref_path, frisante_out_path, ref_size)

    for src_name, out_name in CARDS:
        src_path = os.path.join(CARDS_DIR, src_name)
        out_path = os.path.join(CARDS_DIR, out_name)
        if not os.path.exists(src_path):
            print(f"Pulando (não encontrado): {src_name}")
            continue
        print(f"Padronizando: {src_name}")
        standardize_card_to_reference(
            src_path,
            ref_img,
            ref_card_bbox,
            ref_size,
            out_path,
        )

    print("\nConcluído. 5 imagens com fundo preto e composição alinhada ao Frisante.")


if __name__ == "__main__":
    main()
