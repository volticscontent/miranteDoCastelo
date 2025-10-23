<template>
  <section id="localizacao" class="location section">
    <div class="container">
      <!-- Cabeçalho minimalista -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="text-accent">Localização</span> Privilegiada
        </h2>
        <p class="section-subtitle">
          No coração da cidade, com fácil acesso a tudo que você precisa
        </p>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="location-content">
        <!-- Vídeo Horizontal -->
        <div class="video-container">
          <video 
            class="location-video"
            controls
            preload="metadata"
            poster=""
            playsinline
            muted
          >
            <source src="https://pub-1d787a1c2d3d45bfa1d6c9e476359133.r2.dev/0606.mp4" type="video/mp4">
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        
        <!-- Container do mapa -->
        <div class="map-container">
          <div class="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.8969!2d-43.9378!3d-19.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzAwLjEiUyA0M8KwNTYnMTYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1647875493829!5m2!1spt-BR!2sbr"
              width="100%"
              height="300"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="map-overlay">
              <button @click="toggleMapViewer" class="expand-map-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
                Ver Mapa Expandido
              </button>
            </div>
          </div>
        </div>
        
        <!-- Visualizador de Mapa Integrado -->
        <div v-if="showMapViewer" class="map-viewer-container">
          <div class="map-viewer-header">
            <h3 class="map-viewer-title">Mapa da Localização</h3>
            <button @click="closeMapViewer" class="close-viewer-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="map-viewer-content">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.8969!2d-43.9378!3d-19.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzAwLjEiUyA0M8KwNTYnMTYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1647875493829!5m2!1spt-BR!2sbr"
              width="100%"
              height="500"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div class="map-viewer-footer">
            <a 
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.8969!2d-43.9378!3d-19.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzAwLjEiUyA0M8KwNTYnMTYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1647875493829!5m2!1spt-BR!2sbr" 
              target="_blank" 
              class="maps-button"
            >
              <svg class="maps-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Abrir no Google Maps
            </a>
          </div>
        </div>
        
        <!-- Informações de localização -->
        <div class="location-info">
          <div class="address-card">
            <h3 class="address-title">Endereço</h3>
            <p class="address-text">
              Rua Opala, nº 285<br>
              Bairro São Joaquim<br>
              Contagem - MG
            </p>
          </div>
          
          <!-- Pontos de interesse -->
          <div class="points-of-interest">
            <h3 class="poi-title">Pontos de Interesse</h3>
            
            <div class="poi-grid">
              <div class="poi-item" @click="handlePoiClick('supermercado')">
                <div class="poi-icon shopping">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Supermercado EPA</span>
                  <span class="poi-distance">5 min</span>
                </div>
              </div>
              
              <div class="poi-item" @click="handlePoiClick('farmacia')">
                <div class="poi-icon health">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 12H18L15 21L9 3L6 12H2"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Drogaria São Paulo</span>
                  <span class="poi-distance">3 min</span>
                </div>
              </div>
              
              <div class="poi-item" @click="handlePoiClick('academia')">
                <div class="poi-icon education">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"></path>
                    <path d="M8 12L11 15L16 9"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Academia Smart Fit</span>
                  <span class="poi-distance">7 min</span>
                </div>
              </div>
              
              <div class="poi-item" @click="handlePoiClick('shopping')">
                <div class="poi-icon market">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"></path>
                    <path d="M3 7H21L20 21H4L3 7Z"></path>
                    <path d="M8 7V10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10V7"></path>
                    <path d="M16 7V10C16 11.1046 16.8954 12 18 12C19.1046 12 20 11.1046 20 10V7"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Shopping Contagem</span>
                  <span class="poi-distance">10 min</span>
                </div>
              </div>
              
              <div class="poi-item" @click="handlePoiClick('escola')">
                <div class="poi-icon park">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22V16"></path>
                    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"></path>
                    <path d="M21 15C21 17.2091 19.2091 19 17 19H7C4.79086 19 3 17.2091 3 15C3 12.7909 4.79086 11 7 11H17C19.2091 11 21 12.7909 21 15Z"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Escola Municipal</span>
                  <span class="poi-distance">4 min</span>
                </div>
              </div>
              
              <div class="poi-item" @click="handlePoiClick('transporte')">
                <div class="poi-icon transport">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17C7.55228 17 8 16.5523 8 16C8 15.4477 7.55228 15 7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17Z"></path>
                    <path d="M17 17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15C16.4477 15 16 15.4477 16 16C16 16.5523 16.4477 17 17 17Z"></path>
                    <path d="M5 12V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V12"></path>
                    <path d="M5 12H19L21 19H3L5 12Z"></path>
                    <path d="M9 5V2"></path>
                    <path d="M15 5V2"></path>
                  </svg>
                </div>
                <div class="poi-content">
                  <span class="poi-name">Terminal Eldorado</span>
                  <span class="poi-distance">12 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Destaque de mobilidade -->
      <div class="mobility-highlight">
        <div class="mobility-content">
          <h3 class="mobility-title">Mobilidade e Conectividade</h3>
          <p class="mobility-description">
            Localização estratégica com fácil acesso às principais vias da cidade, 
            transporte público e centros comerciais.
          </p>
          
          <div class="mobility-features">
            <div class="mobility-item">
              <span class="mobility-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17C7.55228 17 8 16.5523 8 16C8 15.4477 7.55228 15 7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17Z"></path>
                  <path d="M17 17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15C16.4477 15 16 15.4477 16 16C16 16.5523 16.4477 17 17 17Z"></path>
                  <path d="M5 12V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V12"></path>
                  <path d="M5 12H19L21 19H3L5 12Z"></path>
                  <path d="M9 5V2"></path>
                  <path d="M15 5V2"></path>
                </svg>
              </span>
              <div class="mobility-text">
                <span class="mobility-label">Acesso rápido</span>
                <span class="mobility-value">Marginais e rodovias</span>
              </div>
            </div>
            
            <div class="mobility-item">
              <span class="mobility-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <path d="M9 1V4"></path>
                  <path d="M15 1V4"></path>
                  <path d="M9 20V23"></path>
                  <path d="M15 20V23"></path>
                  <path d="M20 9H23"></path>
                  <path d="M20 14H23"></path>
                  <path d="M1 9H4"></path>
                  <path d="M1 14H4"></path>
                </svg>
              </span>
              <div class="mobility-text">
                <span class="mobility-label">Metrô mais próximo</span>
                <span class="mobility-value">1.2km de distância</span>
              </div>
            </div>
            
            <div class="mobility-item">
              <span class="mobility-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"></path>
                  <path d="M4 8H20L19 20H5L4 8Z"></path>
                  <path d="M10 11V14"></path>
                  <path d="M14 11V14"></path>
                  <circle cx="7" cy="18" r="2"></circle>
                  <circle cx="17" cy="18" r="2"></circle>
                </svg>
              </span>
              <div class="mobility-text">
                <span class="mobility-label">Linhas de ônibus</span>
                <span class="mobility-value">5+ linhas na região</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useFacebookTracking } from '../../composables/useFacebookTracking'

export default {
  name: 'LocationSection',
  setup() {
    const { trackLocalizacaoView, trackMapClick, trackPOIClick } = useFacebookTracking()
    
    const handleMapClick = () => {
      // Track map click com novo padrão
      trackMapClick()
    }
    
    const handlePoiClick = (poiType) => {
      // Track POI click com novo padrão
      trackPOIClick(poiType)
    }
    
    onMounted(() => {
      // Track location view com novo padrão
      trackLocalizacaoView()
    })
    
    return {
      handleMapClick,
      handlePoiClick
    }
  }
}
</script>

<style scoped>
.location {
  padding: 50px 0;
  background: white;
  position: relative;
  z-index: 15;
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

/* Conteúdo principal */
.location-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
}

/* Vídeo Horizontal */
.video-container {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.location-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Mapa */
.map-container {
  position: relative;
}

.map-embed {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.map-embed iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-pin {
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.pin-icon {
  font-size: 20px;
}

.pin-text {
  font-weight: 500;
  color: #1a1a1a;
  font-size: 16px;
}

.maps-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4285f4;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
}

.maps-button:hover {
  background: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
}

.maps-icon {
  font-size: 1rem;
}

/* Informações de localização */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.address-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.address-title {
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

.address-text {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
}

.maps-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4285f4;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
}

.maps-button:hover {
  background: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
}

.maps-icon {
  font-size: 1rem;
}

/* Pontos de interesse */
.points-of-interest {
  background: white;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.poi-title {
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
}

.poi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.poi-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.poi-item:hover {
  background: #f9fafb;
}

.poi-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.poi-icon svg {
  stroke: #374151;
  fill: none;
}

.poi-icon.education { background: rgba(59, 130, 246, 0.1); }
.poi-icon.health { background: rgba(239, 68, 68, 0.1); }
.poi-icon.shopping { background: rgba(168, 85, 247, 0.1); }
.poi-icon.transport { background: rgba(34, 197, 94, 0.1); }
.poi-icon.park { background: rgba(34, 197, 94, 0.1); }
.poi-icon.market { background: rgba(245, 158, 11, 0.1); }

.poi-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.poi-name {
  font-size: 14px;
  font-weight: 400;
  color: #1a1a1a;
}

.poi-distance {
  font-size: 12px;
  color: #6b7280;
  font-weight: 300;
}

/* Destaque de mobilidade */
.mobility-highlight {
  background: white;
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.mobility-title {
  font-size: 28px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.mobility-description {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 300;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.mobility-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 700px;
  margin: 0 auto;
}

.mobility-item {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
}

.mobility-icon {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.mobility-icon svg {
  stroke: #374151;
  fill: none;
}

.mobility-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobility-label {
  font-size: 12px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.mobility-value {
  font-size: 14px;
  color: #374151;
  font-weight: 400;
}

/* Responsividade */
@media (max-width: 768px) {
  .section-header {
    margin-bottom: 30px;
  }
  
  .location {
    padding: 20px 0;
  }
  
  .location-content {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }
  
  .poi-grid {
    grid-template-columns: 1fr;
  }
  
  .mobility-highlight {
    padding: 40px 24px;
  }
  
  .mobility-features {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .mobility-item {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .address-card,
  .points-of-interest {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .mobility-highlight {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .map-embed {
    margin: 0 -16px;
    border-radius: 0;
  }
}
</style> 