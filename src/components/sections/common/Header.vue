<template>
  <header 
    :class="[
      'header',
      { 'header-hidden': isHeaderHidden },
      { 'header-scrolled': isScrolled }
    ]"
  >
    <div class="container">
      <div class="header-content">
        <!-- Logo minimalista -->
        <div class="logo">
          <h1 class="logo-text">
            Jardins <span class="text-accent">Residence</span>
          </h1>
        </div>

        <!-- Menu Desktop minimalista -->
        <nav class="nav-desktop">
          <ul class="nav-list">
            <li><a href="#home" class="nav-link" @click="scrollToSection('home')">Início</a></li>
            <li><a href="#plantas" class="nav-link" @click="scrollToSection('plantas')">Plantas</a></li>
            <li><a href="#lazer" class="nav-link" @click="scrollToSection('lazer')">Lazer</a></li>
            <li><a href="#localizacao" class="nav-link" @click="scrollToSection('localizacao')">Localização</a></li>
            <li><a href="#contato" class="nav-link" @click="scrollToSection('contato')">Contato</a></li>
          </ul>
        </nav>

        <!-- Botão CTA minimalista -->
        <div class="header-cta">
          <button @click="scrollToContact" class="btn-minimal">
            Fale Conosco
          </button>
        </div>

        <!-- Botão Menu Mobile minimalista -->
        <button 
          @click="toggleMobileMenu" 
          class="mobile-menu-btn"
          :class="{ 'active': isMobileMenuOpen }"
          aria-label="Menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Menu Mobile minimalista -->
    <div 
      class="mobile-menu-overlay" 
      :class="{ 'active': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
    
    <nav 
      class="mobile-menu" 
      :class="{ 'active': isMobileMenuOpen }"
    >
      <div class="mobile-menu-header">
        <h2 class="mobile-menu-title">Menu</h2>
        <button @click="closeMobileMenu" class="mobile-menu-close">
          ×
        </button>
      </div>
      
      <ul class="mobile-nav-list">
        <li>
          <a href="#home" @click="handleMobileNavClick('home')" class="mobile-nav-link">
            Início
          </a>
        </li>
        <li>
          <a href="#plantas" @click="handleMobileNavClick('plantas')" class="mobile-nav-link">
            Plantas
          </a>
        </li>
        <li>
          <a href="#lazer" @click="handleMobileNavClick('lazer')" class="mobile-nav-link">
            Lazer
          </a>
        </li>
        <li>
          <a href="#localizacao" @click="handleMobileNavClick('localizacao')" class="mobile-nav-link">
            Localização
          </a>
        </li>
        <li>
          <a href="#financiamento" @click="handleMobileNavClick('financiamento')" class="mobile-nav-link">
            Financiamento
          </a>
        </li>
        <li>
          <a href="#contato" @click="handleMobileNavClick('contato')" class="mobile-nav-link">
            Contato
          </a>
        </li>
      </ul>
      
      <div class="mobile-menu-cta">
        <button @click="handleMobileNavClick('contato')" class="btn-minimal-mobile">
          Fale Conosco
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from '../../../composables/useFacebookTracking'

export default {
  name: 'Header',
  setup() {
    const { trackEvent } = useFacebookTracking()
    
    const isMobileMenuOpen = ref(false)
    const isHeaderHidden = ref(false)
    const isScrolled = ref(false)
    const lastScrollY = ref(0)
    const scrollThreshold = 100

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determina se o header deve estar escondido
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY.value) {
          // Scrollando para baixo - esconder header
          isHeaderHidden.value = true
        } else {
          // Scrollando para cima - mostrar header
          isHeaderHidden.value = false
        }
      } else {
        // No topo da página - sempre mostrar
        isHeaderHidden.value = false
      }
      
      // Determina se o header tem background
      isScrolled.value = currentScrollY > 50
      
      lastScrollY.value = currentScrollY
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
      
      // Track mobile menu interaction
      trackEvent('MobileMenuToggle', {
        content_category: 'real_estate',
        menu_action: isMobileMenuOpen.value ? 'open' : 'close',
        content_name: 'Jardins Residence'
      })
      
      // Previne scroll do body quando menu está aberto
      if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
      document.body.style.overflow = ''
    }

    const scrollToSection = (sectionId) => {
      // Track navigation click
      trackEvent('NavigationClick', {
        content_category: 'real_estate',
        navigation_target: sectionId,
        source: 'header_desktop',
        content_name: 'Jardins Residence'
      })
      
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.offsetTop - headerHeight
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }

    const scrollToContact = () => {
      // Track CTA click
      trackEvent('CTAClick', {
        content_category: 'real_estate',
        cta_type: 'fale_conosco',
        cta_location: 'header',
        content_name: 'Jardins Residence'
      })
      
      scrollToSection('contato')
    }

    const handleMobileNavClick = (sectionId) => {
      // Track mobile navigation click
      trackEvent('NavigationClick', {
        content_category: 'real_estate',
        navigation_target: sectionId,
        source: 'header_mobile',
        content_name: 'Jardins Residence'
      })
      
      closeMobileMenu()
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 300)
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Chama uma vez para definir estado inicial
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = '' // Limpa overflow ao desmontar
    })

    return {
      isMobileMenuOpen,
      isHeaderHidden,
      isScrolled,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection,
      scrollToContact,
      handleMobileNavClick
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: transparent;
  backdrop-filter: blur(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border-bottom: 1px solid transparent;
}

.header-hidden {
  transform: translateY(-100%);
}

.header-scrolled {
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 30px rgba(0, 0, 0, 0.04);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  min-height: 80px;
}

/* Logo elegante */
.logo-text {
  font-size: 30px;
  font-weight: 300;
  color: white;
  margin: 0;
  letter-spacing: -0.5px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: color 0.3s ease;
}

.header-scrolled .logo-text {
  color: #1a1a1a;
}

.text-accent {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.header-scrolled .text-accent {
  color: #2d3748;
}

/* Navegação minimalista */
.nav-desktop {
  display: none;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.2px;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px 0;
}

.header-scrolled .nav-link {
  color: #4a5568;
}

.nav-link:hover {
  color: white;
}

.header-scrolled .nav-link:hover {
  color: #1a1a1a;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.3s ease;
}

.header-scrolled .nav-link::after {
  background: #1a1a1a;
}

/* Botão CTA minimalista */
.header-cta {
  display: none;
}

.btn-minimal {
  background: none;
  border: 1px solid #e2e8f0;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-minimal:hover {
  border-color: #cbd5e0;
  color: #44b319;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.02);
}

.header-scrolled .btn-minimal:hover {
  color: #44b319;
}

.header-scrolled .btn-minimal {
  color: #1a1a1a;
}

/* Menu mobile minimalista */
.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 4px;
}

.hamburger-line {
  width: 18px;
  height: 1px;
  background: #ffffff;
  transition: all 0.3s ease;
  transform-origin: center;
}

.header-scrolled .hamburger-line {
  background: #1a1a1a;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(2px, 2px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  transform: rotate(-45deg) translate(2px, -2px);
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1001;
  backdrop-filter: blur(4px);
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1002;
  overflow-y: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.mobile-menu-title {
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.3px;
}

.mobile-menu-close {
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.mobile-menu-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 16px 0;
}

.mobile-nav-link {
  display: block;
  padding: 16px 24px;
  color: #4a5568;
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.2px;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
}

.mobile-nav-link:hover {
  background: rgba(0, 0, 0, 0.02);
  color: #1a1a1a;
  border-left-color: #e2e8f0;
}

.mobile-menu-cta {
  padding: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: auto;
}

.btn-minimal-mobile {
  width: 100%;
  background: #1a1a1a;
  border: none;
  color: white;
  padding: 14px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-minimal-mobile:hover {
  background: #2d3748;
}

/* Desktop */
@media (min-width: 768px) {
  .nav-desktop {
    display: block;
  }
  
  .header-cta {
    display: block;
  }
  
  .mobile-menu-btn {
    display: none;
  }
  
  .mobile-menu {
    display: none;
  }
  
  .mobile-menu-overlay {
    display: none;
  }
}

/* Animações suaves */
@media (prefers-reduced-motion: reduce) {
  .header,
  .mobile-menu,
  .mobile-menu-overlay,
  .hamburger-line {
    transition: none;
  }
}
</style> 