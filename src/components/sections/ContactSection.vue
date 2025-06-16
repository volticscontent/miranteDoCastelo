<template>
  <section id="contato" class="contact section">
    <div class="container">

      <div class="contact-content">
        <!-- Formulário de contato -->
        <div class="contact-form-container">
          <div class="form-header">
            <h3 class="form-title">Fale Conosco</h3>
            <p class="form-description">
              Preencha o formulário e entraremos em contato em até 2 horas
            </p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Nome completo</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="form-input"
                  placeholder="Seu nome"
                  required
                  @input="handleFormStart"
                >
              </div>
              <div class="form-group">
                <label class="form-label">Telefone</label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  class="form-input"
                  placeholder="(11) 99999-9999"
                  required
                  @input="handleFormStart"
                >
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="form-input"
                placeholder="seu@email.com"
                required
                @input="handleFormStart"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Valor da parcela desejada</label>
              <select v-model="form.installmentValue" class="form-select" required @change="handleFormStart">
                <option value="">Selecione o valor da parcela</option>
                <option value="2k-2500">R$ 2.500 a R$ 3.000</option>
                <option value="3k-3500">R$ 3.500 a R$ 4.000</option>
                <option value="plano-investidor">Plano Investidor</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Renda familiar</label>
              <select v-model="form.familyIncome" class="form-select" required @change="handleFormStart">
                <option value="">Selecione sua faixa de renda</option>
                <option value="5-10">R$ 7.000 a R$ 10.000</option>
                <option value="11-20">R$ 11.000 a R$ 20.000</option>
                <option value="acima-20">Acima de R$ 20.000</option>
              </select>
            </div>

            <!-- Confirmação de Entrega Protegida -->
            <div class="form-group">
              <div class="protected-delivery">
                <div class="delivery-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </div>
                <div class="delivery-content">
                  <span class="delivery-title">Entrega Protegida pela Caixa</span>
                  <span class="delivery-description">Seu investimento está garantido pelo maior banco público do país</span>
                </div>
              </div>
              
              <label class="checkbox-container">
                <input 
                  v-model="form.acceptsProtection" 
                  type="checkbox" 
                  class="checkbox-input"
                  required
                  @change="handleFormStart"
                >
                <span class="checkbox-custom"></span>
                <span class="checkbox-label">Confirmo que entendi a proteção oferecida pela Caixa Econômica Federal</span>
              </label>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>
          </form>
        </div>

        <!-- Informações de contato -->
        <div class="contact-info-container">
          <div class="contact-methods">
            <h3 class="info-title">Outras formas de contato</h3>
            
            <div class="contact-method" @click="openWhatsApp">
              <div class="method-icon whatsapp-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                </svg>
              </div>
              <div class="method-content">
                <span class="method-label">WhatsApp</span>
                <span class="method-value">Atendimento imediato</span>
                <span class="method-note">Disponível 24h</span>
              </div>
            </div>
          </div>       
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useFacebookTracking } from '../../composables/useFacebookTracking'

export default {
  name: 'ContactSection',
  setup() {
    const { 
      trackFormStart, 
      trackFormSubmit, 
      trackLead, 
      trackWhatsAppClick,
      trackContact,
      trackCompleteRegistration,
      trackConversion
    } = useFacebookTracking()
    
    const form = ref({
      name: '',
      phone: '',
      email: '',
      installmentValue: '',
      familyIncome: '',
      acceptsProtection: false
    })

    const isSubmitting = ref(false)
    const formStarted = ref(false)

    // Track form start when user begins typing
    const handleFormStart = () => {
      if (!formStarted.value) {
        trackFormStart('contact')
        formStarted.value = true
      }
    }

    const submitForm = async () => {
      isSubmitting.value = true
      
      try {
        // Track form submission - simplificado
        trackFormSubmit('contact')
        
        // Preparar dados EXATAMENTE no formato solicitado
        const formData = {
          "Nome_Completo": form.value.name,
          "Telefone": form.value.phone,
          "E-mail": form.value.email,
          "Renda familiar": form.value.familyIncome,
          "Valor de parcela que procura": form.value.installmentValue
        }
        
        console.log('Enviando dados para Make.com:', formData)
        
        // Enviar para Make.com
        // @https://hook.eu2.make.com/mjxthixyva104axff8vxw772ravcnqyv 
        const response = await fetch('https://hook.eu2.make.com/mjxthixyva104axff8vxw772ravcnqyv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        
        console.log('Response status:', response.status)
        
        if (response.ok) {
          console.log('Formulário enviado com sucesso para Make.com')
          
          // CONVERSÃO: Marcar conversão quando formulário é enviado com sucesso - simplificado
          trackConversion()
          
          // Track registration completion - simplificado
          trackCompleteRegistration()
          
          // Criar mensagem para WhatsApp com os dados do formulário
          const message = `Olá Miguel! Pode me falar mais sobre o empreendimento:`

          const encodedMessage = encodeURIComponent(message)
          
          // Track WhatsApp redirect from form
          trackWhatsAppClick()
          
          window.open(`https://wa.me/553115746070?text=${encodedMessage}`, '_blank')
          
          // Limpar formulário
          form.value = {
            name: '',
            phone: '',
            email: '',
            installmentValue: '',
            familyIncome: '',
            acceptsProtection: false
          }
          
          formStarted.value = false
          alert('Formulário enviado com sucesso! Você será redirecionado para o WhatsApp.')
        } else {
          const errorText = await response.text()
          console.error('Erro ao enviar formulário:', response.status, response.statusText, errorText)
          
          // Mesmo com erro no webhook, ainda redirecionar para WhatsApp
          const message = `Olá Miguel! Pode me falar mais sobre o empreendimento:`
          const encodedMessage = encodeURIComponent(message)
          trackWhatsAppClick()
          window.open(`https://wa.me/553115746070?text=${encodedMessage}`, '_blank')
          
          alert('Formulário processado! Você será redirecionado para o WhatsApp.')
        }
        
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        
        // Mesmo com erro, ainda redirecionar para WhatsApp
        const message = `Olá Miguel! Pode me falar mais sobre o empreendimento?`
        const encodedMessage = encodeURIComponent(message)
        trackWhatsAppClick()
        window.open(`https://wa.me/553115746070?text=${encodedMessage}`, '_blank')
        
        alert('Formulário processado! Você será redirecionado para o WhatsApp.')
      } finally {
        isSubmitting.value = false
      }
    }

    const callPhone = () => {
      trackContact()
      window.open('tel:+553115746070', '_self')
    }

    const openWhatsApp = () => {
      trackWhatsAppClick()
      trackContact()
      
      const message = encodeURIComponent('Olá Miguel! Pode me falar mais sobre o empreendimento:')
      window.open(`https://wa.me/553115746070?text=${message}`, '_blank')
    }

    const openEmail = () => {
      trackContact()
      window.open('mailto:vendas@jardinsresidence.com.br?subject=Interesse no Jardins Residence', '_self')
    }

    onMounted(() => {
      // Track contact section view
      trackContact()
    })

    return {
      form,
      isSubmitting,
      submitForm,
      callPhone,
      openWhatsApp,
      openEmail,
      handleFormStart
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 50px 0;
  background: white;
  position: relative;
  z-index: 17;
}

/* Cabeçalho da seção */
.section-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -1px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.text-accent {
  font-weight: 400;
  color: #2d3748;
}

.section-subtitle {
  font-size: 18px;
  color: #6b7280;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.2px;
}

/* Layout principal */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

/* Formulário */
.contact-form-container {
  background: white;
  border-radius: 16px;
  padding: 48px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-header {
  margin-bottom: 40px;
}

.form-title {
  font-size: 28px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.form-description {
  font-size: 15px;
  color: #6b7280;
  font-weight: 300;
  line-height: 1.5;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: #374151;
  font-weight: 400;
  letter-spacing: -0.1px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 300;
  background: white;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1a1a1a;
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
}

.submit-btn:hover:not(:disabled) {
  background: #2d3748;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Informações de contato */
.contact-info-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.info-title {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.method-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.phone-icon {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.whatsapp-icon {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
}

.email-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.method-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.method-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.method-value {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 400;
}

.method-note {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 300;
}

/* Horário de funcionamento */
.business-hours {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hours-title {
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.hours-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.day {
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
}

.time {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 400;
}

/* Responsividade */
@media (max-width: 1024px) {
  .contact-content {
    gap: 60px;
  }
  
  .contact-form-container {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 20px 0;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  
  .contact-form-container {
    padding: 32px 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .contact-method {
    padding: 20px;
  }
  
  .method-icon {
    width: 48px;
    height: 48px;
  }

  .section-header {
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .contact-form-container,
  .business-hours {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .contact-method {
    margin: 0 -16px;
    border-radius: 0;
  }
}

/* Entrega Protegida */
.protected-delivery {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05));
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  margin-bottom: 16px;
}

.delivery-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #22c55e, #10b981);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.delivery-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delivery-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.2px;
}

.delivery-description {
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.4;
}

/* Checkbox Customizado */
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-input:checked + .checkbox-custom {
  background: #22c55e;
  border-color: #22c55e;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.checkbox-label {
  color: #374151;
  font-weight: 400;
  cursor: pointer;
}

.checkbox-container:hover .checkbox-custom {
  border-color: #22c55e;
}

/* Responsividade para entrega protegida */
@media (max-width: 768px) {
  .protected-delivery {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .delivery-icon {
    width: 40px;
    height: 40px;
    align-self: center;
  }
  
  .checkbox-container {
    align-items: center;
    text-align: left;
  }
}
</style> 