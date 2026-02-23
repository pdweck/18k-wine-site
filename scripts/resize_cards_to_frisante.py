"""
Ajusta os 4 cards de produto ao tamanho e proporção do Card-Frisante (referência).
- Redimensiona e recorta proporcionalmente (crop central) para não distorcer.
- Mantém resolução alta (PNG).
- Nomes de saída: produto_resized.png
"""
import os
from PIL import Image

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(PROJECT_ROOT, "public", "cards")

REFERENCE = "Card-Frisante.png"

# (arquivo de entrada, nome de saída)
CARDS_TO_RESIZE = [
    ("Card - Suco de Uva.png", "suco_de_uva_resized.png"),
    ("Card - Vinho Branco.png", "vinho_branco_resized.png"),
    ("Card - Vinho tinto Doce.png", "vinho_tinto_doce_resized.png"),
    ("Card - Vinho Tinto Seco.png", "vinho_tinto_seco_resized.png"),
]


def resize_to_match_reference(src_path, ref_w, ref_h, out_path):
    """Redimensiona e recorta (crop central) para exatamente ref_w x ref_h sem esticar."""
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size

    # Escala para cobrir toda a área do Frisante (cover): escala = max(ref_w/w, ref_h/h)
    scale = max(ref_w / w, ref_h / h)
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))

    # Redimensionar (LANCZOS para alta qualidade)
    img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Crop central para exatamente ref_w x ref_h
    left = (new_w - ref_w) // 2
    top = (new_h - ref_h) // 2
    img_cropped = img_resized.crop((left, top, left + ref_w, top + ref_h))

    img_cropped.save(out_path, "PNG", optimize=True)
    print(f"  Salvo: {os.path.basename(out_path)} ({ref_w}x{ref_h})")


def main():
    ref_path = os.path.join(CARDS_DIR, REFERENCE)
    if not os.path.exists(ref_path):
        print(f"Referência não encontrada: {ref_path}")
        return

    with Image.open(ref_path) as ref_img:
        ref_w, ref_h = ref_img.size
    print(f"Referência '{REFERENCE}': {ref_w} x {ref_h} px\n")

    for src_name, out_name in CARDS_TO_RESIZE:
        src_path = os.path.join(CARDS_DIR, src_name)
        out_path = os.path.join(CARDS_DIR, out_name)
        if not os.path.exists(src_path):
            print(f"Pulando (não encontrado): {src_name}")
            continue
        print(f"Ajustando: {src_name}")
        resize_to_match_reference(src_path, ref_w, ref_h, out_path)

    print("\nConcluído.")


if __name__ == "__main__":
    main()
