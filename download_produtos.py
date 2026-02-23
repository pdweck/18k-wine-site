import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin, urlparse
import time

def download_product_images():
    """Download all product images from 18kwine.com"""
    
    base_url = "https://www.18kwine.com"
    output_dir = "public/produtos"
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    print(f"Baixando produtos de {base_url}...")
    print("=" * 60)
    
    try:
        # Fetch main page
        response = requests.get(base_url, headers=headers, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all images
        images = soup.find_all('img')
        downloaded = []
        seen_urls = set()
        
        print(f"Encontradas {len(images)} imagens na pagina\n")
        
        for idx, img in enumerate(images):
            # Get image source
            img_url = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            
            if not img_url or img_url.startswith('data:'):
                continue
            
            # Make absolute URL
            img_url = urljoin(base_url, img_url)
            
            # Skip duplicates
            if img_url in seen_urls:
                continue
            seen_urls.add(img_url)
            
            # Get filename
            parsed_url = urlparse(img_url)
            filename = os.path.basename(parsed_url.path)
            
            # Clean filename
            if not filename or '.' not in filename:
                filename = f"produto_{idx}.jpg"
            
            filename = "".join(c for c in filename if c.isalnum() or c in '._-')
            filepath = os.path.join(output_dir, filename)
            
            # Handle duplicates
            base, ext = os.path.splitext(filepath)
            counter = 1
            while os.path.exists(filepath):
                filepath = f"{base}_{counter}{ext}"
                counter += 1
            
            try:
                print(f"Baixando: {filename}")
                img_response = requests.get(img_url, headers=headers, timeout=30)
                img_response.raise_for_status()
                
                # Skip very small files
                if len(img_response.content) < 1000:
                    print(f"   Ignorado (muito pequeno)")
                    continue
                
                with open(filepath, 'wb') as f:
                    f.write(img_response.content)
                
                file_size = len(img_response.content) / 1024
                print(f"   Salvo: {filepath} ({file_size:.1f} KB)")
                downloaded.append(filepath)
                
                time.sleep(0.5)  # Be nice to the server
                
            except Exception as e:
                print(f"   Erro: {e}")
                continue
        
        print("\n" + "=" * 60)
        print(f"Download completo!")
        print(f"Total de imagens baixadas: {len(downloaded)}")
        print(f"Pasta: {output_dir}")
        print("=" * 60)
        
        # List all downloaded files
        if downloaded:
            print("\nProdutos baixados:")
            for file in downloaded:
                print(f"   - {os.path.basename(file)}")
        
        return downloaded
        
    except Exception as e:
        print(f"Erro ao acessar o site: {e}")
        return []

if __name__ == "__main__":
    download_product_images()
