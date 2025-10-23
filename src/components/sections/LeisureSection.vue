<template>
  <section id="lazer" class="leisure section">
    <div class="container">
      <!-- Cabeçalho minimalista -->
      <div class="section-header">
        <h2 class="section-title">
          Área de <span class="text-accent">Lazer</span>
        </h2>
        <p class="section-subtitle">
          Espaços exclusivos pensados para seu conforto e momentos especiais
        </p>
      </div>
      
      <!-- Grid de amenidades -->
      <div class="leisure-grid">
        <!-- Guarita -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/1-Guarita-Predio-Diurna_2025_01_14-1-1024x768.jpg" 
              alt="Guarita do Prédio"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Guarita 24h</h3>
            <p class="amenity-description">
              Segurança e controle de acesso 24 horas por dia
            </p>
          </div>
        </div>

        <!-- Salão de Festas Externo -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/3-Salao-de-Festas-Externo_2025_01_24-1024x576.jpg" 
              alt="Salão de Festas Externo"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Salão de Festas Externo</h3>
            <p class="amenity-description">
              Ambiente amplo e moderno para suas celebrações ao ar livre
            </p>
          </div>
        </div>

        <!-- Salão de Festas Interno -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/5-Salao-de-Festas-Interno_2024_12_10-1-1024x576.jpg" 
              alt="Salão de Festas Interno"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Salão de Festas Interno</h3>
            <p class="amenity-description">
              Espaço climatizado para eventos e comemorações
            </p>
          </div>
        </div>

        <!-- Fitness -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/6-Fitness_2024_12_10-1-1024x576.jpg" 
              alt="Academia"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Academia</h3>
            <p class="amenity-description">
              Academia equipada para seus treinos diários
            </p>
          </div>
        </div>

        <!-- Espaço Gourmet -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/7-Gourmet_2024_12_10-1-1024x576.jpg" 
              alt="Espaço Gourmet"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Espaço Gourmet</h3>
            <p class="amenity-description">
              Área gourmet completa para momentos gastronômicos especiais
            </p>
          </div>
        </div>

        <!-- Playground -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/8-Playground-com-vista-Gourmet-praca-encontro_2025_01_14-1-1024x576.jpg" 
              alt="Playground"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Playground</h3>
            <p class="amenity-description">
              Área recreativa segura para a diversão das crianças
            </p>
          </div>
        </div>

        <!-- Praça Jabuticabeira -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/10-Fruicao-Praca-Jabuticabeira_2024_12_10-1-1024x768.jpg" 
              alt="Praça Jabuticabeira"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Praça Jabuticabeira</h3>
            <p class="amenity-description">
              Área verde com jabuticabeiras para momentos de relaxamento
            </p>
          </div>
        </div>

        <!-- Banheiro Social -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/11-Banheiro-Social_04-12-24-1-683x1024.jpg" 
              alt="Banheiro Social"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Banheiro Social</h3>
            <p class="amenity-description">
              Banheiros sociais modernos e bem equipados
            </p>
          </div>
        </div>
      </div>
      
      <!-- Destaque especial -->
      <div class="leisure-highlight-container">
        <div class="leisure-highlight">
          <div class="highlight-content">
            <div class="highlight-badge">
              <span>✨ LAZER COMPLETO</span>
            </div>
            <h3 class="highlight-title">Viva momentos únicos</h3>
            <div class="highlight-main-copy">
              <p class="highlight-primary">
                <strong>Áreas de lazer completas</strong> para toda a família aproveitar momentos especiais sem sair do condomínio.
              </p>
              <p class="highlight-secondary">
                Do fitness ao playground, do salão de festas ao espaço gourmet, tudo pensado para seu conforto e bem-estar.
              </p>
              <div class="highlight-buttons">
                <button 
                  @click="toggleTourContainer"
                  class="btn-tour"
                  :class="{ 'active': showTourContainer }"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12l4 4 4-4m-4-4v8"></path>
                  </svg>
                  {{ showTourContainer ? 'Fechar Tour Virtual' : 'Tour Virtual 360°' }}
                </button>
                <button @click="openWhatsApp" class="btn-primary">
                  Fale Conosco
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Container do Tour Virtual Integrado -->
        <div 
          v-if="showTourContainer" 
          class="tour-container"
          :class="{ 'loading': tourLoading }"
        >
          <!-- Header do Tour -->
          <div class="tour-header">
            <div class="tour-header-info">
              <h3 class="tour-title">Tour Virtual 360°</h3>
              <p class="tour-subtitle">Conheça as áreas de lazer do Jardins Residence</p>
            </div>
            <div class="tour-header-controls">
              <!-- Botão de tela cheia (mobile) -->
              <button 
                v-if="isMobile" 
                @click="toggleFullscreen" 
                class="tour-control-btn"
                :title="isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'"
              >
                <svg v-if="!isFullscreen" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                </svg>
              </button>

              <!-- Botão de rotação (mobile portrait) -->
              <button 
                v-if="isMobile && isPortrait" 
                @click="showRotationHint = !showRotationHint" 
                class="tour-control-btn rotation-btn"
                :class="{ 'active': showRotationHint }"
                title="Dica de rotação"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.2.45 4.53 1.24"></path>
                  <path d="M17 3l4 4-4 4"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Banner de Rotação (mobile portrait) -->
          <div v-if="isMobile && isPortrait && showRotationHint" class="rotation-banner">
            <div class="rotation-banner-content">
              <div class="rotation-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.2.45 4.53 1.24"></path>
                  <path d="M17 3l4 4-4 4"></path>
                </svg>
              </div>
              <div class="rotation-text">
                <span><strong>💡 Dica:</strong> Gire o celular para melhor experiência</span>
              </div>
              <button @click="showRotationHint = false" class="rotation-close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Container do iframe -->
          <div class="tour-iframe-wrapper" :class="{ 'fullscreen': isFullscreen }">
            <!-- Botão de sair da tela cheia (visível apenas em fullscreen) -->
            <button 
              v-if="isFullscreen" 
              @click="exitFullscreen" 
              class="exit-fullscreen-btn"
              title="Sair da tela cheia"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
              </svg>
            </button>
            
            <!-- Loading State -->
            <div v-if="tourLoading" class="tour-loading">
              <div class="loading-spinner"></div>
              <p class="loading-text">Carregando tour virtual...</p>
              <div class="loading-tips" v-if="isMobile">
                <p class="loading-tip">💡 Para melhor experiência, conecte-se ao WiFi</p>
              </div>
            </div>
            
            <!-- Iframe -->
            <iframe
              v-show="!tourLoading"
              :src="tourUrl"
              class="tour-iframe"
              frameborder="0"
              allowfullscreen
              allow="gyroscope; accelerometer; vr; fullscreen"
              @load="onTourLoad"
              title="Tour Virtual 360° - Jardins Residence"
            ></iframe>
            
            <!-- Controles mobile overlay -->
            <div v-if="isMobile && !tourLoading && !isFullscreen" class="mobile-controls">
              <div class="control-item">
                <span class="control-icon">👆</span>
                <span class="control-text">Arraste</span>
              </div>
              <div class="control-item">
                <span class="control-icon">🤏</span>
                <span class="control-text">Zoom</span>
              </div>
            </div>
          </div>

          <!-- Instruções de uso -->
          <div class="tour-instructions" v-if="!isFullscreen">
            <div v-if="!isMobile" class="desktop-instructions">
              <div class="instruction">
                <span class="instruction-icon">🖱️</span>
                <span>Clique e arraste para navegar</span>
              </div>
              <div class="instruction">
                <span class="instruction-icon">🔍</span>
                <span>Scroll para zoom</span>
              </div>
              <div class="instruction">
                <span class="instruction-icon">🎯</span>
                <span>Clique nos pontos para mudar de ambiente</span>
              </div>
            </div>
            
            <div v-else class="mobile-instructions">
              <div class="instruction">
                <span class="instruction-icon">📱</span>
                <span>Toque e arraste para navegar</span>
              </div>
              <div class="instruction">
                <span class="instruction-icon">🤏</span>
                <span>Dois dedos para zoom</span>
              </div>
              <div class="instruction">
                <span class="instruction-icon">🎯</span>
                <span>Toque nos pontos para navegar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from '../../composables/useFacebookTracking'

export default {
  name: 'LeisureSection',
  setup() {
    const { trackLazerView, trackVideoPlay, trackContatoWhatsApp } = useFacebookTracking()
    
    // Estados reativos
    const showTourContainer = ref(false)
    const tourLoading = ref(true)
    const isMobile = ref(false)
    const isPortrait = ref(true)
    const isFullscreen = ref(false)
    const showRotationHint = ref(true)
    
    // URL do tour virtual
    const tourUrl = 'https://tour360.meupasseiovirtual.com/074307/303294/tourvirtual/index.html'
    
    // Detectar dispositivo e orientação
    const checkDevice = () => {
      isMobile.value = window.innerWidth <= 768
      isPortrait.value = window.innerHeight > window.innerWidth
      
      // Auto-esconder aviso de rotação em landscape
      if (!isPortrait.value) {
        showRotationHint.value = false
      }
    }
    
    // Toggle do container do tour
    const toggleTourContainer = () => {
      showTourContainer.value = !showTourContainer.value
      
      if (showTourContainer.value) {
        tourLoading.value = true
        showRotationHint.value = isMobile.value && isPortrait.value
        
        // Track tour view
        trackLazerView()
        
        // Scroll suave para o container do tour quando abrir
        setTimeout(() => {
          const tourContainer = document.querySelector('.tour-container')
          if (tourContainer) {
            tourContainer.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      } else {
        // Se estava em fullscreen, sair
        if (isFullscreen.value) {
          exitFullscreen()
        }
      }
    }
    
    // Fechar container do tour
    const closeTourContainer = () => {
      showTourContainer.value = false
      tourLoading.value = true
      isFullscreen.value = false
      
      // Sair do fullscreen se estiver ativo
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
    
    // Toggle fullscreen (apenas mobile)
    const toggleFullscreen = async () => {
      try {
        if (!isFullscreen.value) {
          const tourContainer = document.querySelector('.tour-container')
          if (tourContainer && tourContainer.requestFullscreen) {
            await tourContainer.requestFullscreen()
          } else if (tourContainer && tourContainer.webkitRequestFullscreen) {
            await tourContainer.webkitRequestFullscreen()
          } else if (tourContainer && tourContainer.mozRequestFullScreen) {
            await tourContainer.mozRequestFullScreen()
          } else if (tourContainer && tourContainer.msRequestFullscreen) {
            await tourContainer.msRequestFullscreen()
          }
        } else {
          await exitFullscreen()
        }
      } catch (error) {
        console.warn('Fullscreen não suportado:', error)
      }
    }
    
    // Sair do fullscreen
    const exitFullscreen = async () => {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen()
        }
      } catch (error) {
        console.warn('Erro ao sair do fullscreen:', error)
      }
    }
    
    // Listener para mudanças de fullscreen
    const handleFullscreenChange = () => {
      isFullscreen.value = !!document.fullscreenElement
    }
    
    // Callback quando o tour carrega
    const onTourLoad = () => {
      // Delay para garantir carregamento completo
      setTimeout(() => {
        tourLoading.value = false
      }, 1500)
    }
    
    // Abrir WhatsApp
    const openWhatsApp = () => {
      const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o Jardins Residence.')
      const whatsappUrl = `https://wa.me/5511999999999?text=${message}`
      window.open(whatsappUrl, '_blank')
      
      // Track WhatsApp click
      trackContatoWhatsApp()
    }
    
    // Lifecycle hooks
    onMounted(() => {
      checkDevice()
      window.addEventListener('resize', checkDevice)
      window.addEventListener('orientationchange', checkDevice)
      document.addEventListener('fullscreenchange', handleFullscreenChange)
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.addEventListener('mozfullscreenchange', handleFullscreenChange)
      document.addEventListener('MSFullscreenChange', handleFullscreenChange)
      
      // Track section view
      trackLazerView()
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('orientationchange', checkDevice)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    })
    
    return {
      showTourContainer,
      tourLoading,
      tourUrl,
      isMobile,
      isPortrait,
      isFullscreen,
      showRotationHint,
      toggleTourContainer,
      closeTourContainer,
      toggleFullscreen,
      onTourLoad,
      openWhatsApp,
      checkDevice
    }
  }
}
</script>

<style scoped>
.leisure {
  padding: 50px 0;
  background: white;
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 3;
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

.leisure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
  position: relative;
  z-index: 3;
}

.amenity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.amenity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.amenity-image {
  height: 200px;
  overflow: hidden;
}

.amenity-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.amenity-card:hover .amenity-image img {
  transform: scale(1.05);
}

.amenity-content {
  padding: 24px;
}

.amenity-title {
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}

.amenity-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.leisure-highlight-container {
  position: relative;
  border-radius: 20px;
  min-height: 400px;
  z-index: 1;
  overflow: hidden;
}

.leisure-highlight {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 80px 40px;
  text-align: center;
  color: #1a1a1a;
  margin: 80px 0;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
}

.highlight-content {
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.highlight-badge {
  margin-bottom: 1.5rem;
}

.highlight-badge span {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.highlight-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
  color: #1a1a1a;
}

.highlight-main-copy {
  margin-bottom: 3rem;
}

.highlight-primary {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
}

.highlight-secondary {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
  color: #4b5563;
}

.highlight-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 2rem;
}

.btn-tour {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-tour::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.btn-tour:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
  background: linear-gradient(135deg, #6366f1, #3b82f6);
}

.btn-tour:hover::before {
  transform: translateX(100%);
}

.btn-tour svg {
  width: 24px;
  height: 24px;
  transition: transform 0.4s ease;
}

.btn-tour:hover svg {
  transform: rotate(180deg);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: white;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.2);
}

@media (max-width: 768px) {
  .leisure {
    padding: 20px 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .leisure-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
  
  .highlight-content {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .amenity-card {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .leisure-highlight {
    border-radius: 16px;
    padding: 0px 0px;
  }
  
  .highlight-buttons {
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
  }
  
  .btn-tour {
    padding: 18px 32px;
    font-size: 1.2rem;
  }
  
  .btn-primary {
    padding: 16px 28px;
  }
  
  .btn-tour,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 375px) {
  .leisure-highlight {
    padding: 30px 30px;
    margin: 0px 0px;
  }
}

/* Tour Container Integrado */
.tour-container {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: containerSlideIn 0.6s ease-out;
}

.tour-container.loading {
  min-height: 400px;
}

.tour-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  max-width: none !important;
  max-height: none !important;
  border-radius: 0;
  z-index: 9999;
  margin: 0;
}

@keyframes containerSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 800px;
  }
}

/* Header do Tour */
.tour-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tour-header-info h3.tour-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: white;
}

.tour-header-info p.tour-subtitle {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.8);
}

.tour-header-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tour-control-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tour-control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.tour-control-btn.rotation-btn {
  background: rgba(68, 179, 25, 0.2);
  border-color: rgba(68, 179, 25, 0.4);
  color: #44b319;
}

.tour-control-btn.rotation-btn:hover {
  background: rgba(68, 179, 25, 0.3);
  border-color: rgba(68, 179, 25, 0.6);
}

.tour-control-btn.rotation-btn.active {
  background: rgba(68, 179, 25, 0.4);
  border-color: rgba(68, 179, 25, 0.7);
  box-shadow: 0 0 0 2px rgba(68, 179, 25, 0.2);
}

/* Banner de Rotação Mobile */
.rotation-banner {
  background: linear-gradient(135deg, #44b319 0%, #059669 100%);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: bannerSlideDown 0.4s ease-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rotation-banner-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.rotation-icon {
  flex-shrink: 0;
  animation: rotateIcon 2s ease-in-out infinite;
}

.rotation-text {
  flex: 1;
}

.rotation-text span {
  font-size: 0.9rem;
  font-weight: 500;
}

.rotation-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.rotation-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

@keyframes bannerSlideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotateIcon {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
}

/* Container do iframe */
.tour-iframe-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tour-iframe-wrapper.fullscreen {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
}

.tour-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
}

/* Loading State */
.tour-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #44b319;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 1rem 0;
}

.loading-tips {
  margin-top: 1rem;
}

.loading-tip {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  opacity: 0.8;
}

/* Controles Mobile Overlay */
.mobile-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  animation: controlsFadeIn 0.5s ease-out 2s both;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
}

.control-icon {
  font-size: 1rem;
}

.control-text {
  white-space: nowrap;
}

@keyframes controlsFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Instruções de uso */
.tour-instructions {
  background: #f8fafc;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.desktop-instructions,
.mobile-instructions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.instruction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
  font-weight: 500;
}

.instruction-icon {
  font-size: 1.1rem;
}

/* Botão do Tour - Estado Ativo */
.btn-tour.active {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  transform: scale(1.02);
}

.btn-tour.active:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: scale(1.05);
}

.btn-tour.active svg {
  transform: rotate(180deg);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .tour-container {
    margin-top: 1.5rem;
    border-radius: 12px;
  }

  .tour-container.fullscreen {
    border-radius: 0;
  }

  .tour-header {
    padding: 1rem 1.5rem;
  }

  .tour-header-info h3.tour-title {
    font-size: 1.25rem;
  }

  .tour-header-info p.tour-subtitle {
    font-size: 0.8rem;
  }

  .tour-header-controls {
    gap: 0.5rem;
  }

  .tour-control-btn {
    width: 36px;
    height: 36px;
  }

  .rotation-banner {
    padding: 0.75rem 1rem;
  }

  .rotation-banner-content {
    gap: 0.75rem;
  }

  .rotation-text span {
    font-size: 0.8rem;
  }

  .tour-iframe-wrapper {
    height: 400px;
  }

  .tour-instructions {
    padding: 1rem 1.5rem;
  }

  .desktop-instructions,
  .mobile-instructions {
    gap: 1rem;
    justify-content: space-around;
  }

  .instruction {
    font-size: 0.8rem;
  }

  .mobile-controls {
    bottom: 15px;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
  }

  .control-item {
    font-size: 0.75rem;
  }
}

/* Landscape Mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .tour-header {
    padding: 0.75rem 1.5rem;
  }

  .tour-header-info h3.tour-title {
    font-size: 1.1rem;
  }

  .tour-header-info p.tour-subtitle {
    font-size: 0.75rem;
  }

  .tour-iframe-wrapper {
    height: 350px;
  }

  .tour-instructions {
    padding: 0.75rem 1.5rem;
  }

  .mobile-controls {
    bottom: 10px;
    padding: 0.4rem 0.8rem;
  }

  .control-item {
    font-size: 0.7rem;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .tour-container {
    border-radius: 20px;
  }

  .tour-header {
    padding: 2rem 2.5rem;
  }

  .tour-header-info h3.tour-title {
    font-size: 1.75rem;
  }

  .tour-header-info p.tour-subtitle {
    font-size: 1rem;
  }

  .tour-iframe-wrapper {
    height: 600px;
  }

  .tour-instructions {
    padding: 2rem 2.5rem;
  }

  .desktop-instructions,
  .mobile-instructions {
    gap: 3rem;
  }

  .instruction {
    font-size: 0.95rem;
  }
}

/* Botão de sair da tela cheia */
.exit-fullscreen-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.exit-fullscreen-btn:hover {
  background: rgba(220, 38, 38, 0.9);
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(220, 38, 38, 0.4);
}

.exit-fullscreen-btn:active {
  transform: scale(0.95);
}

/* Responsive para o botão de sair da tela cheia */
@media (max-width: 768px) {
  .exit-fullscreen-btn {
    width: 45px;
    height: 45px;
    top: 15px;
    right: 15px;
  }
  
  .exit-fullscreen-btn svg {
    width: 20px;
    height: 20px;
  }
}

/* Landscape Mobile */
</style> 