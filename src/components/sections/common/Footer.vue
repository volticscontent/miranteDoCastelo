<template>
  <footer class="footer">
    <div class="container">
      <!-- Linha principal minimalista -->
      <div class="footer-main">
        <!-- Informações do empreendimento -->
        <div class="project-info">
          <h3 class="project-name">Jardins Residence</h3>
          <p class="project-location">Rua Opala, nº 285 • Bairro São Joaquim • Contagem - MG</p>
        </div>
        
        <!-- Seção de Corretores -->
        <div class="brokers-section">
          <div class="brokers-header">
            <h4>Nossos Especialistas</h4>
            <p>Consultores imobiliários especializados</p>
          </div>
          
          <div class="brokers-grid">
            <!-- Miguel -->
            <div class="broker-card">
              <div class="broker-avatar">
                <img src="/Corretores/Miguel.jpg" alt="Miguel" />
                <div class="online-indicator"></div>
              </div>
              <div class="broker-info">
                <h5 class="broker-name">Miguel</h5>
                <p class="broker-role">Corretor Especialista</p>
                <div class="broker-stats">
                  <span>500+ famílias atendidas</span>
                  <span>8 anos de experiência</span>
                </div>
              </div>
              <div class="broker-actions">
                <button @click="contactMiguelWhatsApp" class="action-btn whatsapp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                  </svg>
                </button>
                <button @click="contactMiguelPhone" class="action-btn phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Thales -->
            <div class="broker-card">
              <div class="broker-avatar">
                <img src="/Corretores/Thales.jpg" alt="Thales" />
                <div class="online-indicator"></div>
              </div>
              <div class="broker-info">
                <h5 class="broker-name">Thales</h5>
                <p class="broker-role">Consultor Sênior</p>
                <div class="broker-stats">
                  <span>300+ famílias atendidas</span>
                  <span>5 anos de experiência</span>
                </div>
              </div>
              <div class="broker-actions">
                <button @click="contactThalesWhatsApp" class="action-btn whatsapp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                  </svg>
                </button>
                <button @click="contactThalesPhone" class="action-btn phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Linha de copyright minimalista -->
      <div class="footer-bottom">
        <div class="copyright">
          <span>&copy; {{ currentYear }} Jardins Residence</span>
          <span class="separator">•</span>
          <span>MRV Engenharia</span>
          <span class="separator">•</span>
          <span>(31) 91574-6070</span>
        </div>
        <div class="legal">
          <span>Imagens ilustrativas. Consulte condições.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useFacebookTracking } from '../../../composables/useFacebookTracking'

export default {
  name: 'Footer',
  setup() {
    const { trackContatoWhatsApp, trackContatoPhone } = useFacebookTracking()
    
    const currentYear = computed(() => new Date().getFullYear())
    
    const openWhatsApp = () => {
      // Scroll para o formulário de contato
      const contactSection = document.getElementById('contato')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        
        // Focar no primeiro input após um pequeno delay
        setTimeout(() => {
          const firstInput = contactSection.querySelector('input')
          if (firstInput) {
            firstInput.focus()
          }
        }, 500)
      }
    }

    // Funções de contato para Miguel
    const contactMiguelWhatsApp = () => {
      // Track WhatsApp click
      trackContatoWhatsApp()
      
      const message = encodeURIComponent('Olá Miguel! Tenho interesse no Jardins Residence e gostaria de mais informações.')
      window.open(`https://wa.me/5531915746070?text=${message}`, '_blank')
    }

    const contactMiguelPhone = () => {
      // Track phone click
      trackContatoPhone()
      
      window.open('tel:+5531915746070', '_self')
    }

    // Funções de contato para Thales
    const contactThalesWhatsApp = () => {
      // Track WhatsApp click
      trackContatoWhatsApp()
      
      const message = encodeURIComponent('Olá Thales! Tenho interesse no Jardins Residence e gostaria de mais informações.')
      window.open(`https://wa.me/5531987654321?text=${message}`, '_blank')
    }

    const contactThalesPhone = () => {
      // Track phone click
      trackContatoPhone()
      
      window.open('tel:+5531987654321', '_self')
    }
    
    return {
      currentYear,
      openWhatsApp,
      contactMiguelWhatsApp,
      contactMiguelPhone,
      contactThalesWhatsApp,
      contactThalesPhone
    }
  }
}
</script>

<style scoped>
.footer {
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
  padding: 40px 0 20px;
  position: relative;
  z-index: 20;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Linha principal */
.footer-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 32px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 16px;
  gap: 40px;
}

/* Informações do projeto */
.project-info {
  flex: 1;
  max-width: 400px;
}

.project-name {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.3px;
}

.project-location {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

/* Seção de Corretores */
.brokers-section {
  flex: 1;
  max-width: 600px;
}

.brokers-header {
  text-align: center;
  margin-bottom: 24px;
}

.brokers-header h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  letter-spacing: -0.2px;
}

.brokers-header p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.brokers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.broker-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.broker-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.broker-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.broker-avatar img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border: 2px solid #ffffff;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.broker-info {
  margin-bottom: 16px;
}

.broker-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.broker-role {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 12px 0;
}

.broker-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.broker-stats span {
  font-size: 12px;
  color: #94a3b8;
  background: #ffffff;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.broker-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.action-btn.whatsapp {
  background: #25d366;
  color: white;
}

.action-btn.whatsapp:hover {
  background: #20b954;
  transform: scale(1.05);
}

.action-btn.phone {
  background: #3b82f6;
  color: white;
}

.action-btn.phone:hover {
  background: #2563eb;
  transform: scale(1.05);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #64748b;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
}

.separator {
  color: #cbd5e1;
  font-weight: 300;
}

.legal {
  font-size: 12px;
  color: #94a3b8;
}

/* Responsividade */
@media (max-width: 768px) {
  .footer {
    padding: 32px 0 16px;
  }
  
  .footer-main {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
  }
  
  .project-info {
    max-width: none;
  }
  
  .brokers-section {
    max-width: none;
    width: 100%;
  }
  
  .brokers-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 320px;
    margin: 0 auto;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }
  
  .copyright {
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .project-name {
    font-size: 20px;
  }
  
  .project-location {
    font-size: 13px;
  }
  
  .brokers-header h4 {
    font-size: 18px;
  }
  
  .broker-card {
    padding: 16px;
  }
  
  .broker-avatar img {
    width: 56px;
    height: 56px;
  }
  
  .broker-name {
    font-size: 16px;
  }
  
  .action-btn {
    width: 36px;
    height: 36px;
  }
  
  .action-btn svg {
    width: 16px;
    height: 16px;
  }
  
  .copyright {
    font-size: 12px;
  }
  
  .legal {
    font-size: 11px;
  }
}
</style> 