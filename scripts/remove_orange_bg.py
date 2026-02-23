"""
Remove o fundo laranja externo do card, mantendo o card interno e a garrafa.
Gera PNG com transparência na área exterior.
"""
from PIL import Image
import sys
import os

def is_exterior_orange(r, g, b, a=255):
    """Remove apenas o laranja exterior (fundo). Mantém card interno (peach) e garrafa."""
    if a < 128:
        return True
    # Laranja exterior: vermelho-alaranjado, mais escuro que o card
    # Card interno = mais claro/peach (R e G altos, tom suave)
    brightness = (r + g + b) / 3
    is_orange_ish = r > 160 and g > 70 and b < 140 and r > g
    # Se for laranja e não muito claro = exterior
    if is_orange_ish and brightness < 200:
        return True
    # Laranja muito saturado e escuro
    if r > 200 and 80 < g < 180 and b < 100:
        return True
    return False

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    input_path = os.path.join(project_root, "public", "cards", "card-frisante-abacaxi-18k.png")
    output_path = os.path.join(project_root, "public", "cards", "card-frisante-abacaxi-18k-sem-fundo.png")

    if not os.path.exists(input_path):
        print(f"Arquivo não encontrado: {input_path}")
        sys.exit(1)

    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for item in data:
        r, g, b, a = item
        if is_exterior_orange(r, g, b, a):
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Salvo: {output_path}")

if __name__ == "__main__":
    main()
