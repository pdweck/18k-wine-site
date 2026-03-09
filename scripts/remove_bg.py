from PIL import Image
import numpy as np
import sys

def remove_white_bg(input_path, output_path, threshold=248):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    white_mask = (r > threshold) & (g > threshold) & (b > threshold)
    near_white = (r > 242) & (g > 242) & (b > 242)
    data[white_mask] = [0, 0, 0, 0]
    edge_alpha = np.where(near_white & ~white_mask,
                          ((255 - ((r.astype(int) + g.astype(int) + b.astype(int)) // 3 - 242) * 20)).clip(0, 255),
                          a)
    data[:,:,3] = edge_alpha.astype(np.uint8)
    result = Image.fromarray(data)
    result.save(output_path)
    print(f"Saved: {output_path}")

if __name__ == "__main__":
    remove_white_bg(sys.argv[1], sys.argv[2])
