import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax() {
  const parallaxElements = ref([])
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset
    
    parallaxElements.value.forEach(element => {
      if (element) {
        const speed = parseFloat(element.dataset.parallax) || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      }
    })
  }

  const initParallax = () => {
    // Encontrar todos os elementos com data-parallax
    parallaxElements.value = document.querySelectorAll('[data-parallax]')
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Executar uma vez para posição inicial
    handleScroll()
  }

  const destroyParallax = () => {
    window.removeEventListener('scroll', handleScroll)
  }

  onMounted(() => {
    initParallax()
  })

  onUnmounted(() => {
    destroyParallax()
  })

  return {
    initParallax,
    destroyParallax
  }
} 