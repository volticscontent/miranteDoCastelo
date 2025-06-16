<template>
  <section id="lazer" class="leisure section">
    <div class="container">
      <!-- Cabeçalho minimalista -->
      <div class="section-header">
        <h2 class="section-title">
          Área de <span class="text-accent">Lazer</span>
        </h2>
        <p class="section-subtitle">
          Espaços exclusivos pensados para seu conforto e momentos especiais
        </p>
      </div>
      
      <!-- Grid de amenidades -->
      <div class="leisure-grid">
        <!-- Guarita -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/1-Guarita-Predio-Diurna_2025_01_14-1-1024x768.jpg" 
              alt="Guarita do Prédio"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Guarita 24h</h3>
            <p class="amenity-description">
              Segurança e controle de acesso 24 horas por dia
            </p>
          </div>
        </div>

        <!-- Salão de Festas Externo -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/3-Salao-de-Festas-Externo_2025_01_24-1024x576.jpg" 
              alt="Salão de Festas Externo"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Salão de Festas Externo</h3>
            <p class="amenity-description">
              Ambiente amplo e moderno para suas celebrações ao ar livre
            </p>
          </div>
        </div>

        <!-- Salão de Festas Interno -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/5-Salao-de-Festas-Interno_2024_12_10-1-1024x576.jpg" 
              alt="Salão de Festas Interno"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Salão de Festas Interno</h3>
            <p class="amenity-description">
              Espaço climatizado para eventos e comemorações
            </p>
          </div>
        </div>

        <!-- Fitness -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/6-Fitness_2024_12_10-1-1024x576.jpg" 
              alt="Academia"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Academia</h3>
            <p class="amenity-description">
              Academia equipada para seus treinos diários
            </p>
          </div>
        </div>

        <!-- Espaço Gourmet -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/7-Gourmet_2024_12_10-1-1024x576.jpg" 
              alt="Espaço Gourmet"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Espaço Gourmet</h3>
            <p class="amenity-description">
              Área gourmet completa para momentos gastronômicos especiais
            </p>
          </div>
        </div>

        <!-- Playground -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/8-Playground-com-vista-Gourmet-praca-encontro_2025_01_14-1-1024x576.jpg" 
              alt="Playground"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Playground</h3>
            <p class="amenity-description">
              Área recreativa segura para a diversão das crianças
            </p>
          </div>
        </div>

        <!-- Praça Jabuticabeira -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/10-Fruicao-Praca-Jabuticabeira_2024_12_10-1-1024x768.jpg" 
              alt="Praça Jabuticabeira"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Praça Jabuticabeira</h3>
            <p class="amenity-description">
              Área verde com jabuticabeiras para momentos de relaxamento
            </p>
          </div>
        </div>

        <!-- Banheiro Social -->
        <div class="amenity-card">
          <div class="amenity-image">
            <img 
              src="/Imagens/11-Banheiro-Social_04-12-24-1-683x1024.jpg" 
              alt="Banheiro Social"
              loading="lazy"
            >
          </div>
          <div class="amenity-content">
            <h3 class="amenity-title">Banheiro Social</h3>
            <p class="amenity-description">
              Banheiros sociais modernos e bem equipados
            </p>
          </div>
        </div>
      </div>
      
      <!-- Destaque especial -->
      <div class="leisure-highlight-container">
        <div class="leisure-highlight">
          <div class="highlight-content">
            <div class="highlight-badge">
              <span>✨ LAZER COMPLETO</span>
            </div>
            <h3 class="highlight-title">Viva momentos únicos</h3>
            <div class="highlight-main-copy">
              <p class="highlight-primary">
                <strong>Áreas de lazer completas</strong> para toda a família aproveitar momentos especiais sem sair do condomínio.
              </p>
              <p class="highlight-secondary">
                Do fitness ao playground, do salão de festas ao espaço gourmet, tudo pensado para seu conforto e bem-estar.
              </p>
              <div class="highlight-buttons">
                <a 
                  href="https://tour360.meupasseiovirtual.com/074307/303294/tourvirtual/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-tour"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12l4 4 4-4m-4-4v8"></path>
                  </svg>
                  Tour Virtual 360°
                </a>
                <button @click="openWhatsApp" class="btn-primary">
                  Fale Conosco
                </button>
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
  name: 'LeisureSection',
  setup() {
    const { trackEvent } = useFacebookTracking()
    
    onMounted(() => {
      // Track leisure section view
      trackEvent('ViewContent', {
        content_category: 'real_estate',
        content_type: 'leisure_amenities',
        content_name: 'Jardins Residence - Área de Lazer',
        value: 0,
        currency: 'BRL'
      })
    })
  }
}
</script>

<style scoped>
.leisure {
  padding: 50px 0;
  background: white;
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 3;
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

.leisure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
  position: relative;
  z-index: 3;
}

.amenity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.amenity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.amenity-image {
  height: 200px;
  overflow: hidden;
}

.amenity-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.amenity-card:hover .amenity-image img {
  transform: scale(1.05);
}

.amenity-content {
  padding: 24px;
}

.amenity-title {
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}

.amenity-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.leisure-highlight-container {
  position: relative;
  border-radius: 20px;
  min-height: 400px;
  z-index: 1;
  overflow: hidden;
}

.leisure-highlight {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 80px 40px;
  text-align: center;
  color: #1a1a1a;
  margin: 80px 0;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
}

.highlight-content {
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.highlight-badge {
  margin-bottom: 1.5rem;
}

.highlight-badge span {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.highlight-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
  color: #1a1a1a;
}

.highlight-main-copy {
  margin-bottom: 3rem;
}

.highlight-primary {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
}

.highlight-secondary {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
  color: #4b5563;
}

.highlight-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 2rem;
}

.btn-tour {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-tour::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.btn-tour:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
  background: linear-gradient(135deg, #6366f1, #3b82f6);
}

.btn-tour:hover::before {
  transform: translateX(100%);
}

.btn-tour svg {
  width: 24px;
  height: 24px;
  transition: transform 0.4s ease;
}

.btn-tour:hover svg {
  transform: rotate(180deg);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: white;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.2);
}

@media (max-width: 768px) {
  .leisure {
    padding: 20px 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .leisure-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
  
  .highlight-content {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .amenity-card {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .leisure-highlight {
    border-radius: 16px;
    padding: 0px 0px;
  }
  
  .highlight-buttons {
    flex-direction: column;
    gap: 20px;
    padding: 0 16px;
  }
  
  .btn-tour {
    padding: 18px 32px;
    font-size: 1.2rem;
  }
  
  .btn-primary {
    padding: 16px 28px;
  }
  
  .btn-tour,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 375px) {
  .leisure-highlight {
    padding: 30px 30px;
    margin: 0px 0px;
  }
}
</style> 