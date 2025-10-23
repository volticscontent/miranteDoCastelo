<template>
  <section id="panoramica" class="panoramic section">
    <div class="container">
      <!-- Cabeçalho minimalista -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="text-accent">Vista Panorâmica</span> e Implantação
        </h2>
        <p class="section-subtitle">
          Conheça todos os detalhes do seu novo lar
        </p>
      </div>
      
      <!-- Imagem Panorâmica -->
      <div class="panoramic-image-container">
        <img 
          src="/Imagens/12-Vista-Panoramica-Implantacao_2024_12_24-1024x1024.jpg" 
          alt="Vista Panorâmica e Implantação do Empreendimento"
          class="panoramic-image"
        />
        
        <!-- Legenda da Implantação -->
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="feature-content">
              <span class="feature-title">Torre Única</span>
              <span class="feature-description">15 andares de puro conforto</span>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M7 8h10M7 12h10M7 16h10"></path>
              </svg>
            </div>
            <div class="feature-content">
              <span class="feature-title">Estacionamento</span>
              <span class="feature-description">Vagas demarcadas e cobertas</span>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
            <div class="feature-content">
              <span class="feature-title">Fácil Acesso</span>
              <span class="feature-description">Portaria moderna e segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useFacebookTracking } from '../../composables/useFacebookTracking'
import { onMounted } from 'vue'

export default {
  name: 'PanoramicSection',
  setup() {
    const { trackPanoramicaView } = useFacebookTracking()

    onMounted(() => {
      // Track panoramic section view com novo padrão
      trackPanoramicaView()
    })
  }
}
</script>

<style scoped>
.panoramic {
  padding: 50px 0;
  background: white;
  position: relative;
  z-index: 10;
}

/* Cabeçalho minimalista */
.section-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -1px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.text-accent {
  font-weight: 400;
  color: #2d3748;
}

.section-subtitle {
  font-size: 18px;
  color: #6b7280;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.2px;
}

/* Container da Imagem Panorâmica */
.panoramic-image-container {
  position: relative;
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
}

.panoramic-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
}

/* Lista de Características */
.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  margin-top: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.feature-description {
  font-size: 14px;
  color: #6b7280;
}

/* Responsividade */
@media (max-width: 768px) {
  .panoramic {
    padding: 30px 0;
  }

  .features-list {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .feature-item {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .panoramic-image-container {
    margin: 0 -16px;
    border-radius: 0;
  }

  .panoramic-image {
    border-radius: 0;
  }

  .features-list {
    border-radius: 0;
  }
}
</style> 