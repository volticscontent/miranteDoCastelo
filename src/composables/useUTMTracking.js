import { ref, onMounted } from 'vue'

export function useUTMTracking() {
  const utmParams = ref({})
  const campaignData = ref({})
  const sessionData = ref({})

  // Coleta todos os parâmetros UTM e de campanha da URL
  const collectUTMParameters = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const params = {}
    
    // Parâmetros UTM padrão
    const utmParameters = [
      'utm_source',
      'utm_medium', 
      'utm_campaign',
      'utm_term',
      'utm_content',
      'utm_id'
    ]
    
    // Parâmetros do Facebook
    const facebookParameters = [
      'fbclid',
      'fb_action_ids',
      'fb_action_types',
      'fb_source'
    ]
    
    // Parâmetros do Google
    const googleParameters = [
      'gclid',
      'gclsrc',
      'dclid',
      'wbraid',
      'gbraid'
    ]
    
    // Outros parâmetros de campanha
    const otherParameters = [
      'ref',
      'referrer',
      'source',
      'medium',
      'campaign'
    ]
    
    // Coleta todos os parâmetros
    const allParameters = [
      ...utmParameters,
      ...facebookParameters, 
      ...googleParameters,
      ...otherParameters
    ]
    
    allParameters.forEach(param => {
      const value = urlParams.get(param)
      if (value) {
        params[param] = decodeURIComponent(value)
      }
    })
    
    return params
  }

  // Salva UTMs no localStorage para persistir durante a sessão
  const saveUTMsToStorage = (params) => {
    try {
      // Salva UTMs apenas se não existirem (first-touch attribution)
      const existingUTMs = localStorage.getItem('jardins_utm_params')
      if (!existingUTMs && Object.keys(params).length > 0) {
        localStorage.setItem('jardins_utm_params', JSON.stringify({
          ...params,
          timestamp: Date.now(),
          url: window.location.href,
          referrer: document.referrer
        }))
      }
      
      // Sempre salva a sessão atual (last-touch attribution)
      localStorage.setItem('jardins_session_params', JSON.stringify({
        ...params,
        timestamp: Date.now(),
        url: window.location.href,
        referrer: document.referrer
      }))
    } catch (error) {
      console.warn('Erro ao salvar UTMs no localStorage:', error)
    }
  }

  // Recupera UTMs salvos
  const getSavedUTMs = () => {
    try {
      const firstTouch = localStorage.getItem('jardins_utm_params')
      const lastTouch = localStorage.getItem('jardins_session_params')
      
      return {
        firstTouch: firstTouch ? JSON.parse(firstTouch) : {},
        lastTouch: lastTouch ? JSON.parse(lastTouch) : {}
      }
    } catch (error) {
      console.warn('Erro ao recuperar UTMs do localStorage:', error)
      return { firstTouch: {}, lastTouch: {} }
    }
  }

  // Identifica a fonte de tráfego
  const identifyTrafficSource = (params) => {
    // Facebook
    if (params.fbclid || params.utm_source === 'facebook' || params.utm_source === 'fb') {
      return {
        source: 'facebook',
        medium: params.utm_medium || 'social',
        platform: 'Meta Ads'
      }
    }
    
    // Google Ads
    if (params.gclid || params.utm_source === 'google' && params.utm_medium === 'cpc') {
      return {
        source: 'google',
        medium: 'cpc',
        platform: 'Google Ads'
      }
    }
    
    // Google Organic
    if (params.utm_source === 'google' && params.utm_medium === 'organic') {
      return {
        source: 'google',
        medium: 'organic',
        platform: 'Google Search'
      }
    }
    
    // Instagram
    if (params.utm_source === 'instagram' || params.utm_source === 'ig') {
      return {
        source: 'instagram',
        medium: params.utm_medium || 'social',
        platform: 'Instagram'
      }
    }
    
    // WhatsApp
    if (params.utm_source === 'whatsapp' || params.utm_source === 'wa') {
      return {
        source: 'whatsapp',
        medium: params.utm_medium || 'messaging',
        platform: 'WhatsApp'
      }
    }
    
    // Email
    if (params.utm_medium === 'email') {
      return {
        source: params.utm_source || 'email',
        medium: 'email',
        platform: 'Email Marketing'
      }
    }
    
    // Referral
    if (document.referrer && !params.utm_source) {
      const referrerDomain = new URL(document.referrer).hostname
      return {
        source: referrerDomain,
        medium: 'referral',
        platform: 'Referral'
      }
    }
    
    // Direct
    return {
      source: 'direct',
      medium: 'none',
      platform: 'Direct'
    }
  }

  // Prepara dados para Facebook Pixel
  const getFacebookPixelParams = () => {
    const saved = getSavedUTMs()
    const current = utmParams.value
    
    // Usa first-touch para atribuição de conversão
    const attribution = saved.firstTouch.utm_source ? saved.firstTouch : current
    
    return {
      // Parâmetros padrão do Facebook
      fb_login_id: null,
      external_id: null,
      
      // UTM parameters
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_term: attribution.utm_term || null,
      utm_content: attribution.utm_content || null,
      
      // Facebook específicos
      fbclid: attribution.fbclid || null,
      
      // Dados adicionais
      referrer: attribution.referrer || document.referrer || null,
      landing_page: window.location.href
    }
  }

  // Prepara dados para Google Analytics
  const getGoogleAnalyticsParams = () => {
    const saved = getSavedUTMs()
    const current = utmParams.value
    
    // Usa last-touch para GA4
    const attribution = Object.keys(current).length > 0 ? current : saved.lastTouch
    
    return {
      // Campaign parameters
      campaign_source: attribution.utm_source || '(direct)',
      campaign_medium: attribution.utm_medium || '(none)',
      campaign_name: attribution.utm_campaign || '(not set)',
      campaign_term: attribution.utm_term || null,
      campaign_content: attribution.utm_content || null,
      campaign_id: attribution.utm_id || null,
      
      // Google específicos
      gclid: attribution.gclid || null,
      
      // Traffic source
      traffic_source: campaignData.value.source || 'direct',
      traffic_medium: campaignData.value.medium || 'none',
      traffic_platform: campaignData.value.platform || 'Direct',
      
      // Session data
      page_referrer: document.referrer || null,
      page_location: window.location.href
    }
  }

  // Envia dados de campanha para Facebook Pixel
  const sendCampaignDataToFacebook = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      const params = getFacebookPixelParams()
      
      // Remove parâmetros null/undefined
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined)
      )
      
      if (Object.keys(cleanParams).length > 0) {
        window.fbq('track', 'PageView', cleanParams)
        console.log('FB Pixel - Campaign Data:', cleanParams)
      }
    }
  }

  // Envia dados de campanha para Google Analytics
  const sendCampaignDataToGA = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const params = getGoogleAnalyticsParams()
      
      // Remove parâmetros null/undefined
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined)
      )
      
      if (Object.keys(cleanParams).length > 0) {
        window.gtag('event', 'campaign_attribution', cleanParams)
        console.log('GA4 - Campaign Data:', cleanParams)
      }
    }
  }

  // Atualiza eventos com dados de campanha
  const enrichEventWithCampaignData = (eventParams = {}) => {
    const utmData = getFacebookPixelParams()
    const gaData = getGoogleAnalyticsParams()
    
    return {
      ...eventParams,
      
      // UTM attribution
      utm_source: utmData.utm_source,
      utm_medium: utmData.utm_medium,
      utm_campaign: utmData.utm_campaign,
      utm_term: utmData.utm_term,
      utm_content: utmData.utm_content,
      
      // Traffic source
      traffic_source: gaData.traffic_source,
      traffic_medium: gaData.traffic_medium,
      traffic_platform: gaData.traffic_platform,
      
      // Attribution
      attribution_model: 'first_touch', // para conversões
      session_attribution: 'last_touch' // para análise de sessão
    }
  }

  // Limpa UTMs antigas (opcional - para campanhas sazonais)
  const clearOldUTMs = (daysOld = 30) => {
    try {
      const saved = getSavedUTMs()
      const now = Date.now()
      const maxAge = daysOld * 24 * 60 * 60 * 1000 // dias em millisegundos
      
      if (saved.firstTouch.timestamp && (now - saved.firstTouch.timestamp) > maxAge) {
        localStorage.removeItem('jardins_utm_params')
        console.log('UTMs antigos removidos (mais de', daysOld, 'dias)')
      }
    } catch (error) {
      console.warn('Erro ao limpar UTMs antigos:', error)
    }
  }

  // Inicializa o tracking de UTM
  const initializeUTMTracking = () => {
    // Coleta parâmetros da URL atual
    const currentParams = collectUTMParameters()
    utmParams.value = currentParams
    
    // Identifica fonte de tráfego
    campaignData.value = identifyTrafficSource(currentParams)
    
    // Salva no localStorage
    saveUTMsToStorage(currentParams)
    
    // Recupera dados salvos
    const saved = getSavedUTMs()
    sessionData.value = saved
    
    // Envia dados para as plataformas
    setTimeout(() => {
      sendCampaignDataToFacebook()
      sendCampaignDataToGA()
    }, 1000)
    
    // Limpa UTMs antigos
    clearOldUTMs(30)
    
    console.log('UTM Tracking inicializado:', {
      current: currentParams,
      campaign: campaignData.value,
      saved: saved
    })
  }

  // Hook de montagem
  onMounted(() => {
    initializeUTMTracking()
  })

  return {
    // Estados
    utmParams,
    campaignData,
    sessionData,
    
    // Métodos principais
    initializeUTMTracking,
    collectUTMParameters,
    getSavedUTMs,
    
    // Dados para plataformas
    getFacebookPixelParams,
    getGoogleAnalyticsParams,
    enrichEventWithCampaignData,
    
    // Envio de dados
    sendCampaignDataToFacebook,
    sendCampaignDataToGA,
    
    // Utilitários
    identifyTrafficSource,
    clearOldUTMs
  }
} 