from PIL import Image
import sys

def crop_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(output_path)
        print(f"Cropped from {img.size} to {cropped.size}")
    else:
        img.save(output_path)
        print("No crop needed")

if __name__ == "__main__":
    crop_transparent(sys.argv[1], sys.argv[2])
