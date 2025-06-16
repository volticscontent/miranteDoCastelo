import { ref, onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from './useFacebookTracking'

export function useIntersectionTracking() {
  const { trackEvent, trackViewContent } = useFacebookTracking()
  const observer = ref(null)
  const trackedSections = ref(new Set())

  const trackSectionView = (sectionId, sectionName) => {
    if (trackedSections.value.has(sectionId)) return
    
    trackedSections.value.add(sectionId)
    
    trackEvent('SectionView', {
      content_category: 'real_estate',
      section_name: sectionName,
      section_id: sectionId,
      content_name: 'Mirante do Castelo'
    })

    // Track specific section events
    switch (sectionId) {
      case 'plantas':
        trackViewContent('section', 'plantas_section')
        break
      case 'localizacao':
        trackViewContent('section', 'location_section')
        break
      case 'contato':
        trackViewContent('section', 'contact_section')
        break
      case 'sobre':
        trackViewContent('section', 'about_section')
        break
    }
  }

  const setupIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% of section is visible
    }

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const sectionName = entry.target.dataset.sectionName || sectionId
          
          if (sectionId) {
            trackSectionView(sectionId, sectionName)
          }
        }
      })
    }, options)

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      observer.value.observe(section)
    })
  }

  onMounted(() => {
    // Setup with a small delay to ensure DOM is ready
    setTimeout(setupIntersectionObserver, 100)
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    trackedSections: trackedSections.value
  }
} 