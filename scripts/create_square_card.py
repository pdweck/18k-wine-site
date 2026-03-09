from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

BASE = r"c:\Users\pdweck\Site Option4"

def round_rectangle(size, radius, color):
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([0, 0, size[0]-1, size[1]-1], radius=radius, fill=color)
    return img

def create_gradient(size, color1, color2):
    img = Image.new("RGBA", size, color1)
    draw = ImageDraw.Draw(img)
    for y in range(size[1]):
        r = int(color1[0] + (color2[0] - color1[0]) * y / size[1])
        g = int(color1[1] + (color2[1] - color1[1]) * y / size[1])
        b = int(color1[2] + (color2[2] - color1[2]) * y / size[1])
        draw.line([(0, y), (size[0], y)], fill=(r, g, b, 255))
    return img

def add_sparkles(img, count=15):
    draw = ImageDraw.Draw(img)
    import random
    random.seed(42)
    for _ in range(count):
        x = random.randint(int(img.width * 0.45), int(img.width * 0.9))
        y = random.randint(int(img.height * 0.05), int(img.height * 0.7))
        size = random.choice([2, 3, 4, 5])
        alpha = random.randint(120, 220)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=(255, 255, 255, alpha))
    return img

def create_card(
    output_path,
    bottle_path,
    bg_color1, bg_color2,
    brand_text, product_line1, product_line2,
    description, cta_text="Descobrir >"
):
    CARD_SIZE = 1024
    card = Image.new("RGBA", (CARD_SIZE, CARD_SIZE), (0, 0, 0, 0))
    margin = 40
    top_margin = 80
    bg_w = CARD_SIZE - margin * 2
    bg_h = CARD_SIZE - top_margin - margin
    gradient = create_gradient((bg_w, bg_h), bg_color1, bg_color2)
    bg_round = round_rectangle((bg_w, bg_h), 36, (255, 255, 255, 255))
    gradient.putalpha(bg_round.split()[3])
    add_sparkles(gradient)
    card.paste(gradient, (margin, top_margin), gradient)

    try:
        font_brand = ImageFont.truetype("C:/Windows/Fonts/montserrat-italic.ttf", 22)
    except:
        try:
            font_brand = ImageFont.truetype("C:/Windows/Fonts/calibrii.ttf", 22)
        except:
            font_brand = ImageFont.load_default()
    try:
        font_title = ImageFont.truetype("C:/Windows/Fonts/montserrat-bold.ttf", 56)
    except:
        try:
            font_title = ImageFont.truetype("C:/Windows/Fonts/calibrib.ttf", 56)
        except:
            font_title = ImageFont.load_default()
    try:
        font_desc = ImageFont.truetype("C:/Windows/Fonts/montserrat-italic.ttf", 22)
    except:
        try:
            font_desc = ImageFont.truetype("C:/Windows/Fonts/calibrii.ttf", 22)
        except:
            font_desc = ImageFont.load_default()
    try:
        font_cta = ImageFont.truetype("C:/Windows/Fonts/montserrat-medium.ttf", 18)
    except:
        try:
            font_cta = ImageFont.truetype("C:/Windows/Fonts/calibri.ttf", 18)
        except:
            font_cta = ImageFont.load_default()

    draw = ImageDraw.Draw(card)
    text_x = margin + 50
    text_y = top_margin + 80

    draw.text((text_x, text_y), brand_text, fill=(255, 255, 255, 220), font=font_brand)
    text_y += 45
    draw.text((text_x, text_y), product_line1, fill=(255, 255, 255, 255), font=font_title)
    text_y += 70
    draw.text((text_x, text_y), product_line2, fill=(255, 255, 255, 255), font=font_title)
    text_y += 90
    for line in description.split("\n"):
        draw.text((text_x, text_y), line, fill=(255, 255, 255, 230), font=font_desc)
        text_y += 32
    text_y += 30

    btn_w, btn_h = 200, 50
    btn_x, btn_y = text_x, text_y
    draw.rounded_rectangle(
        [btn_x, btn_y, btn_x + btn_w, btn_y + btn_h],
        radius=25, outline=(255, 255, 255, 200), width=2
    )
    cta_bbox = draw.textbbox((0, 0), cta_text, font=font_cta)
    cta_w = cta_bbox[2] - cta_bbox[0]
    cta_h = cta_bbox[3] - cta_bbox[1]
    draw.text(
        (btn_x + (btn_w - cta_w) // 2, btn_y + (btn_h - cta_h) // 2 - 2),
        cta_text, fill=(255, 255, 255, 230), font=font_cta
    )

    bottle = Image.open(bottle_path).convert("RGBA")
    bbox = bottle.getbbox()
    if bbox:
        bottle = bottle.crop(bbox)
    target_h = int(CARD_SIZE * 1.0)
    aspect = bottle.width / bottle.height
    target_w = int(target_h * aspect)
    bottle = bottle.resize((target_w, target_h), Image.LANCZOS)
    bottle_x = CARD_SIZE - target_w - 20
    bottle_y = (CARD_SIZE - target_h) // 2 - 30
    card.paste(bottle, (bottle_x, bottle_y), bottle)

    card.save(output_path, "PNG")
    print(f"Card saved: {output_path} ({card.size})")

if __name__ == "__main__":
    bottle_path = os.path.join(BASE, "scripts", "bottle-suave-nobg.png")
    output_path = os.path.join(BASE, "Cards", "VinhoTintosuavecard-cream_square.png")
    create_card(
        output_path=output_path,
        bottle_path=bottle_path,
        bg_color1=(244, 114, 168),
        bg_color2=(232, 54, 143),
        brand_text="A L E P H",
        product_line1="VINHO TINTO",
        product_line2="SUAVE",
        description="Do\u00e7ura e tradi\u00e7\u00e3o para\nmomentos especiais."
    )
