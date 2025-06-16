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
        
        <!-- Corretor -->
        <div class="realtor-compact">
          <!-- <div class="realtor-avatar">
            <img src="/imagens/miguel.png" alt="Miguel" />
          </div> -->
          <div class="realtor-details">
            <span class="realtor-name">Miguel</span>
            <span class="realtor-role">Corretor Especialista</span>
          </div>
          <button @click="openWhatsApp" class="contact-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
            </svg>
            WhatsApp
          </button>
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

export default {
  name: 'Footer',
  setup() {
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
    
    return {
      currentYear,
      openWhatsApp
    }
  }
}
</script>

<style scoped>
.footer {
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
  padding: 32px 0 20px;
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
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 16px;
}

/* Informações do projeto */
.project-info {
  flex: 1;
}

.project-name {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  letter-spacing: -0.3px;
}

.project-location {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
}

/* Corretor compacto */
.realtor-compact {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.realtor-avatar {
  flex-shrink: 0;
}

.realtor-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.realtor-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.realtor-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
}

.realtor-role {
  font-size: 12px;
  color: #64748b;
  font-weight: 400;
  line-height: 1.2;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #25d366;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.contact-btn:hover {
  background: #20b954;
  transform: translateY(-1px);
}

.contact-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
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
    padding: 24px 0 16px;
  }
  
  .footer-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 20px;
  }
  
  .realtor-compact {
    width: 100%;
    justify-content: space-between;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .copyright {
    flex-wrap: wrap;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .project-name {
    font-size: 18px;
  }
  
  .project-location {
    font-size: 13px;
  }
  
  .realtor-compact {
    padding: 10px 12px;
    gap: 10px;
  }
  
  .realtor-avatar img {
    width: 36px;
    height: 36px;
  }
  
  .contact-btn {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  .copyright {
    font-size: 12px;
  }
  
  .legal {
    font-size: 11px;
  }
}

/* Hover effects */
.realtor-compact:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transition: all 0.2s ease;
}

.realtor-compact:hover .realtor-avatar img {
  border-color: #94a3b8;
  transition: all 0.2s ease;
}
</style> 