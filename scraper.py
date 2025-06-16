import os
import requests
from urllib.parse import urlparse
from pathlib import Path

def download_image(url, save_dir):
    try:
        # Headers para simular um navegador real
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://sonharconstrutora.com.br/',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }

        # Fazer a requisição com os headers
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        # Extrair o nome do arquivo da URL
        filename = os.path.basename(urlparse(url).path)
        if not filename:
            filename = f"image_{hash(url)}.jpg"

        # Criar o caminho completo para salvar
        save_path = os.path.join(save_dir, filename)

        # Salvar a imagem
        with open(save_path, 'wb') as f:
            f.write(response.content)

        print(f"Imagem baixada com sucesso: {filename}")
        return True

    except requests.exceptions.RequestException as e:
        print(f"Erro ao baixar {url}: {str(e)}")
        return False
    except Exception as e:
        print(f"Erro inesperado ao baixar {url}: {str(e)}")
        return False

def download_plantas():
    # Criar diretório para salvar as plantas
    save_dir = "plantas"
    os.makedirs(save_dir, exist_ok=True)

    # Lista de URLs das plantas
    urls = [
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/1-1-1024x1024.png",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/2-1-1024x1024.png",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/3-1-1024x1024.png",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/4-1-1024x1024.png",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/5-1-1024x1024.png",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/6-1-1024x1024.png"
    ]

    # Contador de downloads bem-sucedidos
    successful_downloads = 0

    # Baixar cada planta
    for url in urls:
        if download_image(url, save_dir):
            successful_downloads += 1

    print(f"\nDownload das plantas concluído! {successful_downloads} de {len(urls)} plantas foram baixadas com sucesso.")

def main():
    # Criar diretório para salvar as imagens
    save_dir = "imagens_new"
    os.makedirs(save_dir, exist_ok=True)

    # Lista de URLs das imagens
    urls = [
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/2-Guarita-Predio-Noturno_2025_01_14-1-1024x1024.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/1-Guarita-Predio-Diurna_2025_01_14-1-1024x768.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/JARDINS-RESIDENCE_PE_FACHADA_2025_01_16-1-1024x1024.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/3-Salao-de-Festas-Externo_2025_01_24-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/5-Salao-de-Festas-Interno_2024_12_10-1-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/8-Playground-com-vista-Gourmet-praca-encontro_2025_01_14-1-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/7-Gourmet_2024_12_10-1-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/6-Fitness_2024_12_10-1-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/11-Redario_2024_12_10-1-1024x576.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/10-Fruicao-Praca-Jabuticabeira_2024_12_10-1-1024x768.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/12-Vista-Panoramica-Implantacao_2024_12_24-1024x1024.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/4-Entrada-da-Torre_2024_12_10-1-1024x768.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/7_Cozinhajantarsala-sendo-vista-pelo-jantar_mod-2_20-12-24-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/3-Salacozinha-servico-sendo-visto-pelo-jantar_mod-1_20-12-24-1-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/9-Salajantar-visto-pela-sala_mod-2_20-12-24-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/1-Sala-jantar-sendo-vista-pela-entrada-apto_20-12-24-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/5-Marcenaria-cozinhajantar-sendo-visto-cozinha_mod1_20-12-24-1024x574.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/6-Cozinha-ASporta-entrada-sendo-visto-pela-sala_20-12-24-1-1024x567.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/11-Banheiro-Social_04-12-24-1-683x1024.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/12-Quarto-solteiro-adolescente-visto-de-frente_04-12-24-1-1024x827.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/13-Quarto-solteiro-adolescente-vista-lateral_04-12-24-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/14-Quarto-solteiro-Bebe-visto-de-frente_04-12-24-1-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/15-Quarto-solteiro-Bebe-vista-lateral_04-12-24-1024x818.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/17-Quarto-casal-vista-de-frente_armario_04-12-24-1-1024x768.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/16-Quarto-Casal-vista-lateral_04-12-24-1-1024x768.jpg",
        "https://sonharconstrutora.com.br/wp-content/uploads/2025/01/18-Banheiro-Suite_04-12-24-1-683x1024.jpg"
    ]

    # Contador de downloads bem-sucedidos
    successful_downloads = 0

    # Baixar cada imagem
    for url in urls:
        if download_image(url, save_dir):
            successful_downloads += 1

    print(f"\nDownload das imagens concluído! {successful_downloads} de {len(urls)} imagens foram baixadas com sucesso.")

if __name__ == "__main__":
    main()
    download_plantas() 