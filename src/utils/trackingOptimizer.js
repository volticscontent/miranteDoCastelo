/**
 * Tracking Optimizer - Utilitário para otimizar scripts de tracking
 * Evita problemas de CSP ao centralizar a lógica de tracking
 */

// Configurações dos scripts de tracking
const TRACKING_CONFIG = {
  googleAnalytics: {
    id: 'G-F1XSC08C34',
    config: {
      page_title: 'Jardins Residence',
      send_page_view: true,
      enhanced_ecommerce: true,
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      session_timeout: 1800,
      custom_map: {
        'custom_parameter_1': 'traffic_source',
        'custom_parameter_2': 'utm_campaign',
        'custom_parameter_3': 'lead_source'
      },
      conversion_linker: true,
      debug_mode: false,
      content_group1: 'Real Estate',
      content_group2: 'Jardins Residence',
      allow_enhanced_conversions: true
    }
  },
  facebookPixel: {
    id: '545631091942284',
    config: {
      em: 'auto',
      ph: 'auto', 
      fn: 'auto',
      ln: 'auto',
      external_id: 'auto',
      agent: 'wordpress-5.8-fbpixel',
      debug: false
    }
  }
}

/**
 * Inicializa o Google Analytics de forma segura
 */
export function initializeGoogleAnalytics() {
  try {
    // Verificar se gtag já existe
    if (typeof window.gtag === 'function') {
      const config = TRACKING_CONFIG.googleAnalytics
      
      // Configuração principal
      window.gtag('config', config.id, config.config)
      
      // Enhanced conversions
      window.enhancedConversionData = function(email, phone) {
        if (email || phone) {
          window.gtag('config', config.id, {
            enhanced_conversions: {
              email_address: email,
              phone_number: phone
            }
          })
        }
      }
      
      console.log('✅ Google Analytics inicializado com sucesso')
      return true
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar Google Analytics:', error)
    return false
  }
}

/**
 * Inicializa o Facebook Pixel de forma segura
 */
export function initializeFacebookPixel() {
  try {
    const config = TRACKING_CONFIG.facebookPixel
    
    // Inicializar fbq se não existir
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq.callMethod ? 
        window.fbq.callMethod.apply(window.fbq, arguments) : 
        window.fbq.queue.push(arguments)
      }
      window.fbq.push = window.fbq
      window.fbq.loaded = true
      window.fbq.version = '2.0'
      window.fbq.queue = []
    }
    
    // Verificar se fbq está disponível
    if (typeof window.fbq === 'function') {
      // Inicializar pixel com configurações básicas primeiro
      window.fbq('init', config.id)
      
      // Configurar enhanced matching
      window.fbq('init', config.id, {
        em: 'auto',
        ph: 'auto',
        fn: 'auto',
        ln: 'auto'
      })
      
      // Track PageView inicial obrigatório
      window.fbq('track', 'PageView')
      
      // Log para debug
      console.log('✅ Facebook Pixel inicializado:', config.id)
      console.log('📊 PageView enviado automaticamente')
      
      // Função para enhanced matching manual
      window.fbqEnhancedMatching = function(userData) {
        if (userData && (userData.email || userData.phone)) {
          window.fbq('init', config.id, userData)
          console.log('🔄 Enhanced matching atualizado')
        }
      }
      
      return true
    } else {
      console.warn('⚠️ window.fbq não está disponível')
      return false
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar Facebook Pixel:', error)
    return false
  }
}

/**
 * Carrega scripts de tracking de forma assíncrona e segura
 */
export function loadTrackingScripts() {
  return new Promise((resolve) => {
    let scriptsLoaded = 0
    const totalScripts = 2
    
    function checkComplete() {
      scriptsLoaded++
      if (scriptsLoaded === totalScripts) {
        // Aguardar um pouco para garantir inicialização
        setTimeout(() => {
          resolve({
            ga: typeof window.gtag === 'function',
            fb: typeof window.fbq === 'function'
          })
        }, 500)
      }
    }
    
    // Google Analytics
    const gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.googleAnalytics.id}`
    gaScript.onload = () => {
      // Inicializar dataLayer
      window.dataLayer = window.dataLayer || []
      window.gtag = function() { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
      
      initializeGoogleAnalytics()
      checkComplete()
    }
    gaScript.onerror = () => {
      console.error('❌ Erro ao carregar Google Analytics')
      checkComplete()
    }
    
    // Facebook Pixel - Inicialização inline primeiro
    window.fbq = window.fbq || function() {
      window.fbq.callMethod ? 
      window.fbq.callMethod.apply(window.fbq, arguments) : 
      window.fbq.queue.push(arguments)
    }
    if (!window.fbq.push) window.fbq.push = window.fbq
    window.fbq.loaded = true
    window.fbq.version = '2.0'
    window.fbq.queue = []
    
    // Facebook Pixel Script
    const fbScript = document.createElement('script')
    fbScript.async = true
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js'
    fbScript.onload = () => {
      console.log('📦 Facebook Pixel script carregado')
      initializeFacebookPixel()
      checkComplete()
    }
    fbScript.onerror = () => {
      console.error('❌ Erro ao carregar Facebook Pixel')
      // Mesmo com erro, tentar inicializar com o que temos
      initializeFacebookPixel()
      checkComplete()
    }
    
    // Adicionar scripts ao head
    document.head.appendChild(gaScript)
    document.head.appendChild(fbScript)
    
    console.log('📦 Carregando scripts de tracking...')
  })
}

/**
 * Valida se os scripts de tracking estão funcionando
 */
export function validateTracking() {
  const validation = {
    googleAnalytics: {
      loaded: typeof window.gtag === 'function',
      dataLayer: Array.isArray(window.dataLayer),
      configured: false
    },
    facebookPixel: {
      loaded: typeof window.fbq === 'function',
      initialized: false,
      configured: false
    }
  }
  
  // Validar GA
  if (validation.googleAnalytics.loaded && validation.googleAnalytics.dataLayer) {
    validation.googleAnalytics.configured = window.dataLayer.some(item => 
      Array.isArray(item) && item[0] === 'config' && item[1] === TRACKING_CONFIG.googleAnalytics.id
    )
  }
  
  // Validar FB
  if (validation.facebookPixel.loaded) {
    validation.facebookPixel.initialized = window.fbq.loaded === true
    validation.facebookPixel.configured = validation.facebookPixel.initialized
  }
  
  return validation
}

/**
 * Função utilitária para debug de tracking
 */
export function debugTracking() {
  const validation = validateTracking()
  
  console.group('🔍 Debug do Sistema de Tracking')
  console.log('Google Analytics:', validation.googleAnalytics)
  console.log('Facebook Pixel:', validation.facebookPixel)
  console.log('DataLayer:', window.dataLayer?.slice(-5)) // Últimos 5 eventos
  console.log('FB Queue:', window.fbq?.queue?.slice(-5)) // Últimos 5 eventos
  console.groupEnd()
  
  return validation
}

/**
 * Inicialização completa do sistema de tracking
 */
export async function initializeTrackingSystem() {
  try {
    console.log('🚀 Inicializando sistema de tracking...')
    
    // Carregar scripts
    const loadResult = await loadTrackingScripts()
    console.log('📦 Scripts carregados:', loadResult)
    
    // Validar funcionamento
    const validation = validateTracking()
    console.log('✅ Validação do tracking:', validation)
    
    // Debug se necessário
    if (window.location.search.includes('debug=tracking')) {
      debugTracking()
    }
    
    return {
      success: true,
      googleAnalytics: validation.googleAnalytics.configured,
      facebookPixel: validation.facebookPixel.configured
    }
    
  } catch (error) {
    console.error('❌ Erro na inicialização do tracking:', error)
    return {
      success: false,
      error: error.message
    }
  }
} 