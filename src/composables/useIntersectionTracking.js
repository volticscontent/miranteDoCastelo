import { ref, onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from './useFacebookTracking'

export function useIntersectionTracking() {
  const { 
    trackPlantasView,
    trackLocalizacaoView,
    trackContatoView,
    trackLazerView
  } = useFacebookTracking()
  
  const trackedSections = ref(new Set())

  const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const sectionId = entry.target.id
          
          // Evitar tracking duplicado
          if (trackedSections.value.has(sectionId)) {
            return
          }
          
          trackedSections.value.add(sectionId)
          
          // Track com novos métodos padronizados
          switch (sectionId) {
            case 'plantas':
              trackPlantasView()
              break
            case 'localizacao':
              trackLocalizacaoView()
              break
            case 'contato':
              trackContatoView()
              break
            case 'lazer':
              trackLazerView()
              break
          }
        }
      })
    }, {
      threshold: 0.3
    })

    // Observar seções específicas
    const sections = ['plantas', 'localizacao', 'contato', 'lazer']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return observer
  }

  let observer = null

  onMounted(() => {
    observer = observeElements()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    trackedSections
  }
} 