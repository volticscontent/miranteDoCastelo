import { ref } from 'vue'

export function useFacebookTracking() {
  const isTracking = ref(true)

  // Função principal para trackear eventos - SIMPLIFICADA
  const trackEvent = (eventName, parameters = {}) => {
    if (!isTracking.value) return

    try {
      // Eventos básicos permitidos + eventos customizados dos CTAs
      const allowedEvents = [
        'PageView', 
        'ViewContent', 
        'Lead', 
        'Contact',
        'CTAClick',
        'HeroView',
        'NavigationClick',
        'MapInteraction',
        'POIClick',
        'MobileMenuToggle'
      ]
      
      if (!allowedEvents.includes(eventName)) {
        console.warn(`Evento ${eventName} não permitido`)
        return
      }

      // Parâmetros muito simples
      const simpleParams = {}
      
      // Apenas parâmetros básicos e seguros
      if (parameters.value && typeof parameters.value === 'number') {
        simpleParams.value = parameters.value
        simpleParams.currency = 'BRL'
      }
      
      if (parameters.content_name && typeof parameters.content_name === 'string') {
        simpleParams.content_name = parameters.content_name.substring(0, 50)
      }

      // Parâmetros específicos para CTAs
      if (parameters.cta_type && typeof parameters.cta_type === 'string') {
        simpleParams.cta_type = parameters.cta_type.substring(0, 30)
      }

      if (parameters.cta_location && typeof parameters.cta_location === 'string') {
        simpleParams.cta_location = parameters.cta_location.substring(0, 30)
      }

      // Parâmetros para navegação
      if (parameters.navigation_target && typeof parameters.navigation_target === 'string') {
        simpleParams.navigation_target = parameters.navigation_target.substring(0, 30)
      }

      if (parameters.source && typeof parameters.source === 'string') {
        simpleParams.source = parameters.source.substring(0, 30)
      }

      // Enviar via Facebook Pixel
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', eventName, simpleParams)
        console.log(`FB Pixel: ${eventName}`, simpleParams)
      }
    } catch (error) {
      console.warn('Erro no tracking:', error)
    }
  }

  // Eventos simplificados
  const trackPageView = () => {
    trackEvent('PageView')
  }

  const trackViewContent = (contentType = 'property') => {
    trackEvent('ViewContent', {
      content_name: 'Mirante do Castelo'
    })
  }

  const trackLead = (value = null) => {
    const params = {
      content_name: 'Mirante do Castelo'
    }
    
    if (value) {
      params.value = value
    }
    
    trackEvent('Lead', params)
  }

  const trackContact = () => {
    trackEvent('Contact', {
      content_name: 'Mirante do Castelo'
    })
  }

  // Funções vazias para manter compatibilidade
  const trackSchedule = () => trackContact()
  const trackSearch = () => {}
  const trackAddToWishlist = () => trackViewContent()
  const trackInitiateCheckout = () => trackLead()
  const trackPurchase = () => trackLead()
  const trackCompleteRegistration = () => trackLead()
  const trackSubmitApplication = () => trackLead()
  const trackPropertyView = () => trackViewContent()
  const trackFloorPlanView = () => trackViewContent()
  const trackLocationView = () => trackViewContent()
  const trackWhatsAppClick = () => trackContact()
  const trackPhoneClick = () => trackContact()
  const trackFormStart = () => {}
  const trackFormSubmit = () => trackLead()
  const trackConversion = () => trackLead()
  const trackVideoPlay = () => trackViewContent()
  const trackDownload = () => trackViewContent()
  const trackScroll = () => {}
  const trackTimeOnPage = () => {}
  
  const initializeTracking = () => {
    console.log('Facebook Pixel simplificado inicializado')
  }

  return {
    // Controle
    isTracking,
    initializeTracking,
    
    // Eventos principais
    trackEvent,
    trackPageView,
    trackViewContent,
    trackLead,
    trackContact,
    trackSchedule,
    trackSearch,
    trackAddToWishlist,
    trackInitiateCheckout,
    trackPurchase,
    trackCompleteRegistration,
    trackSubmitApplication,
    
    // Eventos específicos
    trackPropertyView,
    trackFloorPlanView,
    trackLocationView,
    trackWhatsAppClick,
    trackPhoneClick,
    trackFormStart,
    trackFormSubmit,
    trackConversion,
    trackVideoPlay,
    trackDownload,
    trackScroll,
    trackTimeOnPage
  }
} 