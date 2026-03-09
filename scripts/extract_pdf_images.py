#!/usr/bin/env python3
"""
Extrai imagens de PDFs (ex: relatório de branding) para a pasta images/branding/
Uso: python scripts/extract_pdf_images.py [caminho_do_pdf]
"""

import sys
from pathlib import Path
from typing import List, Tuple

# Caminhos do projeto
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "images" / "branding"
MIN_IMAGE_SIZE = 5000  # Ignorar imagens muito pequenas (ícones, etc.)


def extract_images_from_pdf(pdf_path: Path) -> List[Tuple[Path, int, int]]:
    """Extrai imagens do PDF e retorna lista de arquivos salvos."""
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("Erro: PyMuPDF não instalado. Execute: pip install pymupdf")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    saved = []  # (filepath, width, height)
    seen_xrefs = set()

    doc = fitz.open(pdf_path)
    base_name = pdf_path.stem

    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images(full=True)

        for img_index, img in enumerate(image_list):
            xref = img[0]
            if xref in seen_xrefs:
                continue

            try:
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                width = base_image.get("width", 0)
                height = base_image.get("height", 0)

                if len(image_bytes) < MIN_IMAGE_SIZE:
                    continue

                seen_xrefs.add(xref)
                filename = f"{base_name}_page{page_num + 1}_{img_index + 1}.{image_ext}"
                filepath = OUTPUT_DIR / filename

                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                saved.append((filepath, width, height))
                print(f"  Salvo: {filename} ({width}x{height}, {len(image_bytes)//1024} KB)")

            except Exception as e:
                print(f"  Aviso: imagem {xref} ignorada - {e}")

    doc.close()

    # Copiar as maiores imagens para nomes sugeridos (uso no site)
    suggested = [
        ("valley", "Vale do São Francisco / paisagem"),
        ("branding-hero", "Hero / destaque"),
        ("branding-about", "Sobre / história"),
    ]
    if saved:
        import shutil
        import json
        sorted_by_size = sorted(saved, key=lambda x: x[1] * x[2], reverse=True)
        for i, (base_name, desc) in enumerate(suggested):
            if i < len(sorted_by_size):
                src = sorted_by_size[i][0]
                ext = src.suffix
                dest = OUTPUT_DIR / f"{base_name}{ext}"
                if src.resolve() != dest.resolve():
                    shutil.copy2(src, dest)
                    print(f"\n  Sugestão: {dest.name} <- {desc}")

        # Gerar manifest para a galeria do site
        manifest = [f.name for f in sorted(OUTPUT_DIR.iterdir()) if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")]
        manifest_path = OUTPUT_DIR / "manifest.json"
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)
        print(f"\n  Manifest: {manifest_path.name} ({len(manifest)} imagens)")

    return [s[0] for s in saved]


def main():
    # Verificar argumento ou procurar PDF no projeto
    if len(sys.argv) > 1:
        pdf_path = Path(sys.argv[1])
    else:
        candidates = [
            PROJECT_ROOT / "ibranding-report.pdf",
            PROJECT_ROOT / "branding-report.pdf",
            PROJECT_ROOT / "relatorio-branding.pdf",
        ]
        pdf_path = next((c for c in candidates if c.exists()), None)
        if not pdf_path:
            pdfs = list(PROJECT_ROOT.glob("*.pdf"))
            pdf_path = pdfs[0] if pdfs else None

    if not pdf_path or not pdf_path.exists():
        print("Uso: python scripts/extract_pdf_images.py <caminho_do_pdf>")
        print("\nOu coloque um PDF (ibranding-report.pdf, branding-report.pdf)")
        print("na raiz do projeto e execute novamente.")
        sys.exit(1)

    print(f"Extraindo imagens de: {pdf_path.name}")
    print(f"Destino: {OUTPUT_DIR}\n")

    files = extract_images_from_pdf(pdf_path)

    if files:
        print(f"\nOK: {len(files)} imagem(ns) extraida(s).")
        print("Imagens em images/branding/ - use valley.jpg, branding-hero.jpg, branding-about.jpg no site.")
    else:
        print("\nNenhuma imagem significativa encontrada no PDF.")


if __name__ == "__main__":
    main()
