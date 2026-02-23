"""
Gera versões WebP e PNG com alpha (fundo preto -> transparente) dos renders do Frisante.
Uso: python scripts/export_frisante_renders.py
"""
import os
from PIL import Image

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUTOS_DIR = os.path.join(PROJECT_ROOT, "public", "produtos")

RENDERS = [
    "Frisante_front.png",
    "Frisante_3-4.png",
    "Frisante_side.png",
    "Frisante_detail.png",
]


def black_to_alpha(img, threshold=20):
    """Torna pixels pretos (ou quase) transparentes."""
    img = img.convert("RGBA")
    a = img.getchannel("A")
    r, g, b = img.getchannel("R"), img.getchannel("G"), img.getchannel("B")
    dark = (r.load()[:] <= threshold) & (g.load()[:] <= threshold) & (b.load()[:] <= threshold)
    # Não expor load() como array; usar numpy ou per-pixel
    import numpy as np
    arr = np.array(img)
    r, g, b, al = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    black_mask = (r <= threshold) & (g <= threshold) & (b <= threshold)
    arr[black_mask, 3] = 0
    return Image.fromarray(arr)


def main():
    for name in RENDERS:
        path = os.path.join(PRODUTOS_DIR, name)
        if not os.path.exists(path):
            print(f"Pulando (não encontrado): {name}")
            continue
        base = os.path.splitext(name)[0]
        img = Image.open(path).convert("RGB")

        # WebP (qualidade alta)
        webp_path = os.path.join(PRODUTOS_DIR, f"{base}.webp")
        img.save(webp_path, "WEBP", quality=90, method=6)
        print(f"  {base}.webp")

        # PNG com alpha (fundo preto -> transparente)
        img_rgba = img.convert("RGBA")
        import numpy as np
        a = np.array(img_rgba)
        r, g, b, al = a[:, :, 0], a[:, :, 1], a[:, :, 2], a[:, :, 3]
        black = (r <= 25) & (g <= 25) & (b <= 25)
        a[black, 3] = 0
        alpha_path = os.path.join(PRODUTOS_DIR, f"{base}_alpha.png")
        Image.fromarray(a).save(alpha_path, "PNG", optimize=True)
        print(f"  {base}_alpha.png")

    print("\nConcluído.")


if __name__ == "__main__":
    main()
