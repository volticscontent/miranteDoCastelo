import os
import shutil

def organizar_imagens():
    # Dicionário com o mapeamento das imagens
    mapeamento_imagens = {
        # Plantas
        "1-1-1024x1024.png": "planta_tipo_1.png",
        "2-1-1024x1024.png": "planta_tipo_2.png",
        "3-1-1024x1024.png": "planta_tipo_3.png",
        "4-1-1024x1024.png": "planta_tipo_4.png",
        "5-1-1024x1024.png": "planta_tipo_5.png",
        "6-1-1024x1024.png": "planta_tipo_6.png",

        # Imagens do empreendimento
        "1-Guarita-Predio-Diurna_2025_01_14-1-1024x768.jpg": "guarita_dia.jpg",
        "2-Guarita-Predio-Noturno_2025_01_14-1-1024x1024.jpg": "guarita_n.jpg",
        "JARDINS-RESIDENCE_PE_FACHADA_2025_01_16-1-1024x1024.jpg": "guarita_hero.jpg",
        "3-Salao-de-Festas-Externo_2025_01_24-1024x576.jpg": "s_festa.jpg",
        "5-Salao-de-Festas-Interno_2024_12_10-1-1024x576.jpg": "s_festa_int.jpg",
        "4-Entrada-da-Torre_2024_12_10-1-1024x768.jpg": "entrada_torre.jpg",
        "6-Fitness_2024_12_10-1-1024x576.jpg": "fitness.jpg",
        "7-Gourmet_2024_12_10-1-1024x576.jpg": "gourmet_ar_livre.jpg",
        "8-Playground-com-vista-Gourmet-praca-encontro_2025_01_14-1-1024x576.jpg": "kids.jpg",
        "10-Fruicao-Praca-Jabuticabeira_2024_12_10-1-1024x768.jpg": "praca.jpg",
        "11-Redario_2024_12_10-1-1024x576.jpg": "redario.jpg",
        "12-Vista-Panoramica-Implantacao_2024_12_24-1024x1024.jpg": "panoramica.jpg",

        # Imagens do apartamento
        "1-Sala-jantar-sendo-vista-pela-entrada-apto_20-12-24-1024x818.jpg": "jantar.jpg",
        "3-Salacozinha-servico-sendo-visto-pelo-jantar_mod-1_20-12-24-1-1024x818.jpg": "salacozinha.jpg",
        "5-Marcenaria-cozinhajantar-sendo-visto-cozinha_mod1_20-12-24-1024x574.jpg": "marcenaria_cozinha_jantar.jpg",
        "6-Cozinha-ASporta-entrada-sendo-visto-pela-sala_20-12-24-1-1024x567.jpg": "kitchen.jpg",
        "7_Cozinhajantarsala-sendo-vista-pelo-jantar_mod-2_20-12-24-1024x818.jpg": "cozinhajantar_marcenaria.jpg",
        "9-Salajantar-visto-pela-sala_mod-2_20-12-24-1024x818.jpg": "jantar_vista_da_sala.jpg",
        "11-Banheiro-Social_04-12-24-1-683x1024.jpg": "banheiro.jpg",
        "12-Quarto-solteiro-adolescente-visto-de-frente_04-12-24-1-1024x827.jpg": "quarto_de_solteiro.jpg",
        "13-Quarto-solteiro-adolescente-vista-lateral_04-12-24-1024x818.jpg": "quarto_de_solteiro_lat.jpg",
        "14-Quarto-solteiro-Bebe-visto-de-frente_04-12-24-1-1024x818.jpg": "baby.jpg",
        "15-Quarto-solteiro-Bebe-vista-lateral_04-12-24-1024x818.jpg": "baby_lat.jpg",
        "16-Quarto-Casal-vista-lateral_04-12-24-1-1024x768.jpg": "casal_lat.jpg",
        "17-Quarto-casal-vista-de-frente_armario_04-12-24-1-1024x768.jpg": "casal.jpg",
        "18-Banheiro-Suite_04-12-24-1-683x1024.jpg": "banheiro_suite.jpg"
    }

    # Diretórios
    dir_plantas = "plantas"
    dir_imagens = "imagens_new"
    dir_temp = "temp"

    # Criar diretório temporário
    os.makedirs(dir_temp, exist_ok=True)

    # Processar plantas
    print("Organizando plantas...")
    for arquivo_original, novo_nome in mapeamento_imagens.items():
        if arquivo_original.endswith(".png"):
            caminho_original = os.path.join(dir_plantas, arquivo_original)
            caminho_novo = os.path.join(dir_temp, novo_nome)
            if os.path.exists(caminho_original):
                shutil.copy2(caminho_original, caminho_novo)
                print(f"Renomeando: {arquivo_original} -> {novo_nome}")

    # Processar imagens
    print("\nOrganizando imagens...")
    for arquivo_original, novo_nome in mapeamento_imagens.items():
        if arquivo_original.endswith(".jpg"):
            caminho_original = os.path.join(dir_imagens, arquivo_original)
            caminho_novo = os.path.join(dir_temp, novo_nome)
            if os.path.exists(caminho_original):
                shutil.copy2(caminho_original, caminho_novo)
                print(f"Renomeando: {arquivo_original} -> {novo_nome}")

    # Remover diretórios originais
    print("\nRemovendo diretórios originais...")
    shutil.rmtree(dir_plantas, ignore_errors=True)
    shutil.rmtree(dir_imagens, ignore_errors=True)

    # Recriar diretórios e mover arquivos
    print("\nRecriando estrutura e movendo arquivos...")
    os.makedirs(dir_plantas, exist_ok=True)
    os.makedirs(dir_imagens, exist_ok=True)

    # Mover arquivos para seus diretórios finais
    for arquivo in os.listdir(dir_temp):
        caminho_temp = os.path.join(dir_temp, arquivo)
        if arquivo.endswith(".png"):
            destino = os.path.join(dir_plantas, arquivo)
        else:
            destino = os.path.join(dir_imagens, arquivo)
        shutil.move(caminho_temp, destino)

    # Remover diretório temporário
    shutil.rmtree(dir_temp, ignore_errors=True)

    print("\nOrganização concluída!")
    print(f"Plantas organizadas em: {dir_plantas}")
    print(f"Imagens organizadas em: {dir_imagens}")

if __name__ == "__main__":
    organizar_imagens() 