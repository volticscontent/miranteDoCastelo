<template>
  <section class="hero section bg-black text-white" ref="heroSection">
    <!-- Background completamente fixo -->
    <div 
      class="hero-bg-fixed"
      style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,1)), url('/Imagens/JARDINS-RESIDENCE_PE_FACHADA_2025_01_16-1-1024x1024.jpg')"
    ></div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Badge minimalista -->
        <div class="hero-badge">
          <span class="badge">Lançamento Exclusivo</span>
        </div>
        
        <!-- Título principal elegante -->
        <h1 class="hero-title">
          Seu Novo Lar no<br>
          <span class="text-accent">Jardins Residence</span>
        </h1>
        
        <!-- Subtítulo refinado -->
        <div class="hero-subtitle">
          <p>Apartamentos modernos com 
            <br><span class="text-accent=sub">entrada facilitada</span>
            <br><span class="text-accent-subtitle">e sinal de:</span><br>
          </p>
          <div class="badge-subtitle">  
            <span class="text-accent-subtitle">R$14.900,00</span>
          </div>
        </div>
        
        <!-- CTAs minimalistas -->
        <div class="hero-ctas">
          <button @click="openWhatsApp" class="btn-primary-hero">
            Solicitar Informações
          </button>
          <button @click="scrollToPlants" class="btn-secondary-hero">
            Ver Plantas
          </button>
        </div>
        
        <!-- Indicadores de confiança minimalistas -->
        <div class="trust-indicators">
          <div class="trust-item">
            <div class="trust-number">Parcelas a partir de</div>
            <div class="trust-price">R$ 2.500,00</div>
          </div>
          <div class="trust-separator"></div>
          <div class="trust-item">
            <div class="trust-number">80%</div>
            <div class="trust-text">Aprovação no financiamento</div>
          </div>
          <div class="trust-separator"></div>
          <div class="trust-item">
            <div class="trust-number">100%</div>
            <div class="trust-text">Entrega garantida</div>
          </div>
        </div>
      </div>
      
      <!-- Indicador de scroll minimalista -->
      <div class="scroll-indicator">
        <div class="scroll-text">Role para descobrir mais</div>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useFacebookTracking } from '../../composables/useFacebookTracking'

export default {
  name: 'Hero',
  setup() {
    const { 
      trackHeroView,
      trackHeroCTAClick,
      trackNavigationClick
    } = useFacebookTracking()
    
    const openWhatsApp = () => {
      // Track Hero CTA click com novo padrão
      trackHeroCTAClick('solicitar_informacoes')
      
      const contactSection = document.getElementById('contato')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    const scrollToPlants = () => {
      // Track Hero CTA click com novo padrão
      trackHeroCTAClick('ver_plantas')
      
      // Track navigation click
      trackNavigationClick('hero', 'plantas')
      
      const plantsSection = document.getElementById('plantas')
      if (plantsSection) {
        plantsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    onMounted(() => {
      // Track hero view com novo padrão
      trackHeroView()
    })
    
    return {
      openWhatsApp,
      scrollToPlants
    }
  }
}
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

/* Background completamente fixo */
.hero-bg-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

/* Badge minimalista */
.hero-badge {
  margin-bottom: 32px;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-transform: uppercase;
}

/* Título elegante */
.hero-title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 200;
  line-height: 1.1;
  margin-bottom: 24px;
  color: white;
  letter-spacing: -2px;
  font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
}

.text-accent {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
}

/* Subtítulo refinado */
.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: -0.2px;
}

.hero-subtitle {
  font-weight: 500;
}

.badge-subtitle {
  display: inline-block;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 2px 5px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.text-accent-subtitle {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  font-size: 30px;
}

.text-accent-sub {
  font-weight: 500;
}

/* CTAs minimalistas */
.hero-ctas {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 64px;
  align-items: center;
}

.btn-primary-hero {
  background: white;
  color: #1a1a1a;
  border: none;
  padding: 16px 32px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-primary-hero:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.btn-secondary-hero {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px 32px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 200px;
}

.btn-secondary-hero:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Indicadores de confiança */
.trust-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.trust-item {
  text-align: center;
}

.trust-number {
  font-size: 24px;
  font-weight: 300;
  color: white;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.trust-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trust-price {
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.trust-separator {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* Indicador de scroll */
.scroll-indicator {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 12px;
  margin-top: 18px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.scroll-arrow {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .hero {
    padding-top: 60px;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .hero-ctas {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-primary-hero,
  .btn-secondary-hero {
    width: 100%;
    max-width: 280px;
    padding: 14px 24px;
    font-size: 14px;
  }
  
  .trust-indicators {
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .trust-separator {
    display: none;
  }
  
  .trust-number {
    font-size: 20px;
  }
  
  .trust-text {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .hero-badge {
    margin-bottom: 24px;
  }
  
  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }
  
  .trust-indicators {
    flex-direction: column;
    gap: 16px;
  }
  
  .trust-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .trust-number {
    font-size: 18px;
    margin-bottom: 0;
  }
  
  .trust-text {
    font-size: 10px;
  }
}

/* Otimização para dispositivos com motion reduzido */
@media (prefers-reduced-motion: reduce) {
  .scroll-indicator {
    animation: none;
  }
  
  .btn-primary-hero:hover,
  .btn-secondary-hero:hover {
    transform: none;
  }
}
</style>