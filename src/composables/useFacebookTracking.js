import { ref } from 'vue'
import { useUTMTracking } from './useUTMTracking'

export function useFacebookTracking() {
  const isTracking = ref(true)
  const { enrichEventWithCampaignData, getFacebookPixelParams, getGoogleAnalyticsParams } = useUTMTracking()

  // Mapeamento dos nomes das seções para eventos
  const sectionNames = {
    hero: "Seu Novo Lar no Jardins Residence",
    panoramica: "Vista Panorâmica e Implantação", 
    plantas: "Plantas dos Apartamentos",
    lazer: "Área de Lazer",
    localizacao: "Localização Privilegiada",
    contato: "Fale Conosco"
  }

  // === GOOGLE ANALYTICS TRACKING ===
  const trackGoogleAnalytics = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Enriquece com dados de campanha
      const enrichedParams = enrichEventWithCampaignData({
        event_category: 'real_estate',
        event_label: 'Jardins Residence',
        ...parameters
      })

      window.gtag('event', eventName, enrichedParams)
      console.log(`GA4 Event: ${eventName}`, enrichedParams)
    }
  }

  // === META ADS CONVERSION EVENTS ===
  const trackMetaConversion = (eventType, parameters = {}) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      // Enriquece com dados de campanha
      const campaignData = getFacebookPixelParams()
      const enrichedParams = {
        content_name: 'Jardins Residence',
        content_category: 'real_estate',
        value: 240000,
        currency: 'BRL',
        ...campaignData,
        ...parameters
      }

      // Remove valores null/undefined
      const cleanParams = Object.fromEntries(
        Object.entries(enrichedParams).filter(([_, value]) => value !== null && value !== undefined)
      )

      // Eventos padrão do Meta Ads para conversões
      switch (eventType) {
        case 'Lead':
          window.fbq('track', 'Lead', cleanParams)
          break
        case 'CompleteRegistration':
          window.fbq('track', 'CompleteRegistration', cleanParams)
          break
        case 'Contact':
          window.fbq('track', 'Contact', cleanParams)
          break
        case 'SubmitApplication':
          window.fbq('track', 'SubmitApplication', cleanParams)
          break
        case 'Schedule':
          window.fbq('track', 'Schedule', cleanParams)
          break
        case 'ViewContent':
          window.fbq('track', 'ViewContent', cleanParams)
          break
        case 'InitiateCheckout':
          window.fbq('track', 'InitiateCheckout', cleanParams)
          break
      }
      console.log(`Meta Conversion: ${eventType}`, cleanParams)
    }
  }

  // Função principal para trackear eventos - ATUALIZADA com UTMs
  const trackEvent = (sectionKey, eventType, parameters = {}) => {
    if (!isTracking.value) return

    try {
      // Criar nome do evento no formato: "Nome da Seção + Tipo de Evento"
      const sectionName = sectionNames[sectionKey] || sectionKey
      const eventName = `${sectionName}_${eventType}`
      
      // Eventos básicos permitidos
      const allowedEventTypes = [
        'View_Section',
        'Click_CTA', 
        'Click_Navigation',
        'Click_Plants',
        'View_Plant_Detail',
        'Form_Start',
        'Form_Submit',
        'Click_WhatsApp',
        'Click_Phone',
        'Click_Map',
        'Click_POI',
        'Video_Play',
        'Image_Zoom',
        'Conversion',
        'Lead_Generated'
      ]
      
      if (!allowedEventTypes.includes(eventType)) {
        console.warn(`Tipo de evento ${eventType} não permitido`)
        return
      }

      // Parâmetros base enriquecidos com UTMs
      const baseParams = enrichEventWithCampaignData({
        section_name: sectionName,
        event_type: eventType
      })
      
      // Adiciona parâmetros específicos do evento
      const eventParams = { ...baseParams }
      
      // Apenas parâmetros básicos e seguros
      if (parameters.value && typeof parameters.value === 'number') {
        eventParams.value = parameters.value
        eventParams.currency = 'BRL'
      }
      
      if (parameters.content_name && typeof parameters.content_name === 'string') {
        eventParams.content_name = parameters.content_name.substring(0, 50)
      }

      // Parâmetros específicos para CTAs
      if (parameters.cta_type && typeof parameters.cta_type === 'string') {
        eventParams.cta_type = parameters.cta_type.substring(0, 30)
      }

      if (parameters.plant_id && typeof parameters.plant_id === 'string') {
        eventParams.plant_id = parameters.plant_id.substring(0, 30)
      }

      if (parameters.poi_type && typeof parameters.poi_type === 'string') {
        eventParams.poi_type = parameters.poi_type.substring(0, 30)
      }

      if (parameters.navigation_target && typeof parameters.navigation_target === 'string') {
        eventParams.navigation_target = parameters.navigation_target.substring(0, 30)
      }

      // Adiciona dados específicos do Facebook
      const fbParams = getFacebookPixelParams()
      const fbEventParams = {
        ...eventParams,
        ...fbParams
      }

      // Remove valores null/undefined para Facebook
      const cleanFbParams = Object.fromEntries(
        Object.entries(fbEventParams).filter(([_, value]) => value !== null && value !== undefined)
      )

      // Enviar via Facebook Pixel (Evento Customizado)
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, cleanFbParams)
        console.log(`FB Pixel Custom Event: ${eventName}`, cleanFbParams)
      }

      // Enviar via Google Analytics
      trackGoogleAnalytics(eventName.replace(/ /g, '_'), eventParams)

    } catch (error) {
      console.warn('Erro no tracking:', error)
    }
  }

  // Eventos específicos por seção - ATUALIZADOS com UTMs
  
  // === HERO SECTION ===
  const trackHeroView = () => {
    trackEvent('hero', 'View_Section', {
      content_name: 'Jardins Residence Hero',
      value: 240000
    })
    
    // Meta Ads: ViewContent para otimização
    trackMetaConversion('ViewContent', {
      content_type: 'property',
      content_ids: ['jardins-residence-hero']
    })
  }

  const trackHeroCTAClick = (ctaType) => {
    trackEvent('hero', 'Click_CTA', {
      cta_type: ctaType,
      content_name: 'Jardins Residence'
    })
    
    // Meta Ads: InitiateCheckout para CTAs importantes
    if (ctaType === 'solicitar_informacoes') {
      trackMetaConversion('InitiateCheckout', {
        content_type: 'property',
        content_ids: ['jardins-residence'],
        num_items: 1
      })
    }
  }

  // === PANORÂMICA SECTION ===
  const trackPanoramicaView = () => {
    trackEvent('panoramica', 'View_Section', {
      content_name: 'Vista Panorâmica'
    })
    
    // Meta Ads: ViewContent
    trackMetaConversion('ViewContent', {
      content_type: 'property_feature',
      content_ids: ['panoramic-view']
    })
  }

  // === PLANTAS SECTION ===
  const trackPlantasView = () => {
    trackEvent('plantas', 'View_Section', {
      content_name: 'Plantas dos Apartamentos'
    })
    
    // Meta Ads: ViewContent
    trackMetaConversion('ViewContent', {
      content_type: 'floor_plans',
      content_ids: ['floor-plans-section']
    })
  }

  const trackPlantClick = (plantId) => {
    trackEvent('plantas', 'Click_Plants', {
      plant_id: plantId,
      content_name: 'Planta Apartamento'
    })
    
    // Meta Ads: ViewContent específico
    trackMetaConversion('ViewContent', {
      content_type: 'floor_plan',
      content_ids: [plantId]
    })
  }

  const trackPlantDetailView = (plantId) => {
    trackEvent('plantas', 'View_Plant_Detail', {
      plant_id: plantId,
      content_name: 'Planta Detalhada'
    })
    
    // Meta Ads: ViewContent detalhado
    trackMetaConversion('ViewContent', {
      content_type: 'floor_plan_detail',
      content_ids: [plantId],
      value: 240000,
      currency: 'BRL'
    })
  }

  const trackPlantImageZoom = (plantId) => {
    trackEvent('plantas', 'Image_Zoom', {
      plant_id: plantId,
      content_name: 'Zoom Planta'
    })
  }

  // === LAZER SECTION ===
  const trackLazerView = () => {
    trackEvent('lazer', 'View_Section', {
      content_name: 'Área de Lazer'
    })
    
    // Meta Ads: ViewContent
    trackMetaConversion('ViewContent', {
      content_type: 'property_amenities',
      content_ids: ['leisure-area']
    })
  }

  // === LOCALIZAÇÃO SECTION ===
  const trackLocalizacaoView = () => {
    trackEvent('localizacao', 'View_Section', {
      content_name: 'Localização Privilegiada'
    })
    
    // Meta Ads: ViewContent
    trackMetaConversion('ViewContent', {
      content_type: 'location',
      content_ids: ['location-section']
    })
  }

  const trackMapClick = () => {
    trackEvent('localizacao', 'Click_Map', {
      content_name: 'Mapa Localização'
    })
  }

  const trackPOIClick = (poiType) => {
    trackEvent('localizacao', 'Click_POI', {
      poi_type: poiType,
      content_name: 'Ponto de Interesse'
    })
  }

  const trackVideoPlay = () => {
    trackEvent('localizacao', 'Video_Play', {
      content_name: 'Vídeo Localização'
    })
  }

  // === CONTATO SECTION ===
  const trackContatoView = () => {
    trackEvent('contato', 'View_Section', {
      content_name: 'Formulário de Contato'
    })
    
    // Meta Ads: ViewContent
    trackMetaConversion('ViewContent', {
      content_type: 'contact_form',
      content_ids: ['contact-form']
    })
  }

  const trackContatoFormStart = () => {
    trackEvent('contato', 'Form_Start', {
      content_name: 'Formulário de Contato'
    })
    
    // Meta Ads: InitiateCheckout (início do funil de conversão)
    trackMetaConversion('InitiateCheckout', {
      content_name: 'Formulário Iniciado',
      content_type: 'lead_form',
      content_ids: ['contact-form-start']
    })
  }

  const trackContatoFormSubmit = () => {
    trackEvent('contato', 'Form_Submit', {
      content_name: 'Formulário de Contato'
    })
    
    // Meta Ads: SubmitApplication (IMPORTANTE PARA CONVERSÕES)
    trackMetaConversion('SubmitApplication', {
      content_name: 'Formulário Submetido',
      status: 'submitted',
      content_type: 'lead_form',
      content_ids: ['contact-form-submit']
    })
  }

  const trackContatoWhatsApp = () => {
    trackEvent('contato', 'Click_WhatsApp', {
      content_name: 'WhatsApp Contato'
    })
    
    // Meta Ads: Contact
    trackMetaConversion('Contact', {
      content_name: 'WhatsApp Click',
      contact_method: 'whatsapp'
    })
  }

  const trackContatoPhone = () => {
    trackEvent('contato', 'Click_Phone', {
      content_name: 'Telefone Contato'
    })
    
    // Meta Ads: Contact
    trackMetaConversion('Contact', {
      content_name: 'Phone Click',
      contact_method: 'phone'
    })
  }

  const trackContatoConversion = () => {
    trackEvent('contato', 'Conversion', {
      content_name: 'Conversão Formulário',
      value: 240000
    })
    
    // Meta Ads: EVENTO PRINCIPAL DE CONVERSÃO - LEAD
    trackMetaConversion('Lead', {
      content_name: 'Jardins Residence Lead',
      lead_type: 'contact_form',
      status: 'qualified'
    })
    
    // Meta Ads: Complete Registration (conversão secundária)
    trackMetaConversion('CompleteRegistration', {
      content_name: 'Jardins Residence Registration',
      registration_method: 'contact_form'
    })
  }

  const trackContatoLead = () => {
    trackEvent('contato', 'Lead_Generated', {
      content_name: 'Lead Gerado',
      value: 240000
    })
    
    // Meta Ads: Lead Generation (evento específico para leads)
    trackMetaConversion('Lead', {
      content_name: 'Jardins Residence Lead Generated',
      lead_source: 'website_form'
    })
  }

  // === NAVEGAÇÃO GERAL ===
  const trackNavigationClick = (sectionKey, target) => {
    trackEvent(sectionKey, 'Click_Navigation', {
      navigation_target: target,
      content_name: 'Navegação'
    })
  }

  // Eventos simplificados para compatibilidade
  const trackPageView = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      const campaignData = getFacebookPixelParams()
      window.fbq('track', 'PageView', campaignData)
      console.log('FB Pixel: PageView with UTMs', campaignData)
    }
    
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const gaData = getGoogleAnalyticsParams()
      window.gtag('event', 'page_view', {
        page_title: 'Jardins Residence',
        page_location: window.location.href,
        ...gaData
      })
    }
  }

  const trackViewContent = (contentType = 'property', plantId = null) => {
    if (plantId) {
      trackPlantDetailView(plantId)
    } else {
      trackHeroView()
    }
  }

  const trackLead = (value = 240000) => {
    trackContatoLead()
  }

  const trackContact = () => {
    trackContatoView()
  }

  // Funções de compatibilidade (mapeadas para novo padrão)
  const trackSchedule = () => trackContatoView()
  const trackSearch = () => {}
  const trackAddToWishlist = () => trackPlantasView()
  const trackInitiateCheckout = () => trackContatoFormStart()
  const trackPurchase = () => trackContatoConversion()
  const trackCompleteRegistration = () => trackContatoConversion()
  const trackSubmitApplication = () => trackContatoFormSubmit()
  const trackPropertyView = () => trackHeroView()
  const trackFloorPlanView = (plantId) => trackPlantDetailView(plantId)
  const trackLocationView = () => trackLocalizacaoView()
  const trackWhatsAppClick = () => trackContatoWhatsApp()
  const trackPhoneClick = () => trackContatoPhone()
  const trackFormStart = () => trackContatoFormStart()
  const trackFormSubmit = () => trackContatoFormSubmit()
  const trackConversion = () => trackContatoConversion()
  const trackDownload = () => trackPlantDetailView()
  const trackScroll = () => {}
  const trackTimeOnPage = () => {}
  
  const initializeTracking = () => {
    console.log('Sistema de tracking integrado (Meta Ads + Google Analytics + UTMs) inicializado')
    console.log('Eventos de conversão configurados para Meta Ads API')
    console.log('UTM tracking ativo para atribuição de campanhas')
  }

  return {
    // Controle
    isTracking,
    initializeTracking,
    
    // Eventos principais
    trackEvent,
    trackGoogleAnalytics,
    trackMetaConversion,
    
    // Eventos por seção
    trackHeroView,
    trackHeroCTAClick,
    trackPanoramicaView,
    trackPlantasView,
    trackPlantClick,
    trackPlantDetailView,
    trackPlantImageZoom,
    trackLazerView,
    trackLocalizacaoView,
    trackMapClick,
    trackPOIClick,
    trackVideoPlay,
    trackContatoView,
    trackContatoFormStart,
    trackContatoFormSubmit,
    trackContatoWhatsApp,
    trackContatoPhone,
    trackContatoConversion,
    trackContatoLead,
    trackNavigationClick,
    
    // Eventos de compatibilidade (antigos)
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
    trackPropertyView,
    trackFloorPlanView,
    trackLocationView,
    trackWhatsAppClick,
    trackPhoneClick,
    trackFormStart,
    trackFormSubmit,
    trackConversion,
    trackDownload,
    trackScroll,
    trackTimeOnPage
  }
} 