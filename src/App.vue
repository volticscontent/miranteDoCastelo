<template>
  <div id="app">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section - Fixo -->
    <div class="hero-container">
      <Hero />
    </div>
    
    <!-- Main Content - Sobrepõe o Hero -->
    <main class="main-content">
      <PanoramicSection />
      <PlantsSection />
      
      <!-- Lazer Section -->
      <LeisureSection />
      
      <!-- Localização Section -->
      <LocationSection />
      
      <!-- Contato Section -->
      <ContactSection />
      
      <!-- Footer -->
      <Footer />
    </main>
  </div>
</template>

<script>
import Header from './components/sections/common/Header.vue'
import Footer from './components/sections/common/Footer.vue'
import Hero from './components/sections/Hero.vue'
import PanoramicSection from './components/sections/PanoramicSection.vue'
import PlantsSection from './components/sections/PlantsSection.vue'
import LeisureSection from './components/sections/LeisureSection.vue'
import LocationSection from './components/sections/LocationSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import { onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from './composables/useFacebookTracking'
import { useIntersectionTracking } from './composables/useIntersectionTracking'
import { useUTMTracking } from './composables/useUTMTracking'
import { initializeTrackingSystem } from './utils/trackingOptimizer'
  

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Hero,
    PanoramicSection,
    PlantsSection,
    LeisureSection,
    LocationSection,
    ContactSection
  },
  setup() {
    const { trackPageView } = useFacebookTracking()
    const { trackedSections } = useIntersectionTracking()
    const { initializeUTMTracking } = useUTMTracking()
    
    onMounted(async () => {
      try {
        console.log('🚀 Jardins Residence - Inicializando aplicação...')
        
        // 1. Inicializar coleta de UTMs primeiro
        initializeUTMTracking()
        console.log('✅ UTM Tracking inicializado')
        
        // 2. Inicializar sistema de tracking otimizado
        const trackingResult = await initializeTrackingSystem()
        
        if (trackingResult.success) {
          console.log('✅ Sistema de tracking inicializado com sucesso:')
          console.log(`   - Google Analytics: ${trackingResult.googleAnalytics ? '✅' : '❌'}`)
          console.log(`   - Facebook Pixel: ${trackingResult.facebookPixel ? '✅' : '❌'}`)
          
          // 3. Track page view após inicialização
          setTimeout(() => {
            trackPageView()
            console.log('✅ Page view enviado com UTMs')
          }, 1500)
          
        } else {
          console.warn('⚠️ Problemas na inicialização do tracking:', trackingResult.error)
        }
        
        // 4. Inicializar intersection observer
        console.log('✅ Intersection Observer ativo')
        
        console.log('🎉 Jardins Residence - Aplicação totalmente carregada!')
        
      } catch (error) {
        console.error('❌ Erro na inicialização da aplicação:', error)
      }
    })
    
    return {
      trackedSections
    }
  }
}
</script>

<style>
/* Reset e configurações globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

#app {
  position: relative;
  min-height: 100vh;
}

/* Hero Container - Fixo */
.hero-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

/* Main Content - Sobrepõe o Hero */
.main-content {
  position: relative;
  z-index: 10;
  margin-top: 100vh;
  background: transparent;
  min-height: 100vh;
}

/* Efeito de sobreposição das seções */
.main-content > section {
  position: relative;
  z-index: 10;
  background: white;
  padding-top: 50px;
}

/* Primeira seção (plantas) */
.main-content > section:first-child {
  margin-top: 0;
  z-index: 10;
  background: white;
}

/* Seção de lazer com z-index menor para permitir ver o hero */
.main-content > section:nth-child(2) {
  z-index: 1;
  background: white;
  margin-top: 0;
  padding-top: 50px;
}

/* Seção de localização - sem sobreposição */
.main-content > section:nth-child(3) {
  z-index: 15;
  margin-top: 0;
  padding-top: 50px;
  background: white;
}

/* Seção de financiamento - sem sobreposição */
.main-content > section:nth-child(4) {
  z-index: 16;
  margin-top: 0;
  padding-top: 50px;
  background: white;
}

/* Seção de contato - sem sobreposição */
.main-content > section:nth-child(5) {
  z-index: 17;
  margin-top: 0;
  padding-top: 50px;
  background: white;
}

/* Classes utilitárias existentes */
.hover-lift {
  @apply transition-transform duration-300 hover:-translate-y-2;
}

.contact-method {
  @apply flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-white no-underline;
}

.contact-method-icon {
  @apply w-12 h-12 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0;
}

/* Responsividade */
@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }
  
  .contact-method {
    flex-direction: column;
    text-align: center;
  }
  
  /* Ajustes para mobile */
  .main-content {
    margin-top: 100vh;
  }
  
  .main-content::before {
    top: -50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .main-content::before {
    top: -30px;
    height: 30px;
  }
}

/* Animação suave para o scroll */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style> 