<template>
  <section id="plantas" class="plants-section">
    <!-- Cabeçalho -->
    <div class="section-header">
      <h2 class="section-title">
        Plantas dos <span class="text-accent">Apartamentos</span>
      </h2>
      <p class="section-subtitle">
        Layouts modernos e funcionais pensados para o seu conforto
      </p>
    </div>
    
    <!-- Carrossel de Cards -->
    <div class="carousel-container">
      <div 
        class="carousel-wrapper"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startCarouselTouch"
        @touchmove="handleCarouselTouchMove"
        @touchend="endCarouselTouch"
        ref="carouselWrapper"
      >
        <div 
          class="carousel-track" 
          :class="{ 'dragging': isDragging }"
          :style="{ 
            transform: `translateX(-${currentIndex * cardWidth + dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }"
        >
          <div 
            v-for="(plant, index) in plants" 
            :key="plant.id" 
            class="plant-card"
            :class="{ 
              'active': index === currentIndex,
              'next': index === currentIndex + 1,
              'prev': index === currentIndex - 1,
              'far': Math.abs(index - currentIndex) > 1
            }"
          >
            <!-- Imagem da Planta -->
            <div class="card-image">
              <img :src="plant.image" :alt="plant.title">
              <div class="card-overlay">
                <span class="apartment-type">{{ plant.type }}</span>
              </div>
            </div>
            
            <!-- Conteúdo do Card -->
            <div class="card-content">
              <div class="card-header">
                <h3 class="apartment-title">{{ plant.title }}</h3>
                <div class="apartment-area">{{ plant.area }}</div>
              </div>
              
              <p class="apartment-description">
                {{ plant.description }}
              </p>
              
              <!-- Features Grid -->
              <div class="features-grid">
                <div class="feature" v-for="feature in plant.features" :key="feature.text">
                  <span class="icon" v-html="feature.icon"></span>
                  <span>{{ feature.text }}</span>
                </div>
              </div>
              
              <!-- Botões de Ação -->
              <div class="card-actions">
                <button 
                  @click="requestPlantInfo(plant.id)" 
                  @mousedown.stop
                  @touchstart.stop
                  class="btn-primary"
                >
                  Solicitar Informações
                </button>
                <button 
                  @click="viewDetails(plant.id)" 
                  @mousedown.stop
                  @touchstart.stop
                  class="btn-secondary"
                >
                  Ver Planta Detalhada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Controles de Navegação -->
      <div class="carousel-controls">
        <button 
          @click="previousSlide" 
          class="nav-button prev"
          :disabled="currentIndex === 0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <div class="carousel-indicators">
          <button 
            v-for="(plant, index) in plants" 
            :key="index"
            @click="goToSlide(index)"
            class="indicator"
            :class="{ 'active': index === currentIndex }"
          ></button>
        </div>
        
        <button 
          @click="nextSlide" 
          class="nav-button next"
          :disabled="currentIndex === plants.length - 1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal para Visualizar Planta -->
    <div v-if="showModal" class="plant-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- Botão Fechar - Sempre visível -->
        <button @click="closeModal" class="close-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Controles de Zoom -->
        <div class="zoom-controls">
          <button @click="zoomIn" class="zoom-btn" title="Aumentar zoom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button @click="zoomOut" class="zoom-btn" title="Diminuir zoom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button @click="resetZoom" class="zoom-btn" title="Resetar zoom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>
        </div>

        <!-- Indicador de Zoom -->
        <div class="zoom-indicator" v-if="zoomLevel !== 1">
          {{ Math.round(zoomLevel * 100) }}%
        </div>

        <!-- Aviso de Rotação (apenas mobile) -->
        <div v-if="isMobile && isPortrait && showRotationHint" class="rotation-hint">
          <div class="rotation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.2.45 4.53 1.24"/>
              <path d="M17 3l4 4-4 4"/>
            </svg>
          </div>
          <p>Gire o celular para melhor visualização</p>
        </div>

        <!-- Imagem da Planta -->
        <div 
          class="modal-image-container" 
          @wheel="handleWheel"
          @mousedown="startPan"
          @mousemove="handlePan"
          @mouseup="endPan"
          @mouseleave="endPan"
          @touchstart="startTouch"
          @touchmove="handleTouch"
          @touchend="endTouch"
          ref="imageContainer"
        >
          <img 
            :src="selectedPlant?.image" 
            :alt="selectedPlant?.title" 
            class="modal-image"
            :class="{ 'image-loaded': imageLoaded }"
            :style="{
              transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
              cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in'
            }"
            @click="handleImageClick"
            @load="onImageLoad"
            draggable="false"
          >
        </div>

        <!-- Instruções de Uso simplificadas -->
        <div class="usage-instructions" v-if="!isMobile">
          <p>🖱️ Scroll para zoom • 🖐️ Arraste para mover</p>
        </div>
        <div class="usage-instructions mobile" v-else>
          <p>📱 Pinça para zoom • 👆 Arraste para mover</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFacebookTracking } from '../../composables/useFacebookTracking'

export default {
  name: 'PlantsSection',
  setup() {
    const { 
      trackFloorPlanView, 
      trackWhatsAppClick, 
      trackViewContent,
      trackFormStart,
      trackContact
    } = useFacebookTracking()
    
    const currentIndex = ref(0)
    const cardWidth = ref(400)
    const showModal = ref(false)
    const selectedPlant = ref(null)
    const isMobile = ref(false)
    const isPortrait = ref(true)
    const zoomLevel = ref(1)
    const panX = ref(0)
    const panY = ref(0)
    const isPanning = ref(false)
    const lastPanX = ref(0)
    const lastPanY = ref(0)
    const panVelocityX = ref(0)
    const panVelocityY = ref(0)
    const panMomentum = ref(false)
    const dragOffset = ref(0)
    const isDragging = ref(false)
    const dragStartX = ref(0)
    const dragStartY = ref(0)
    const dragThreshold = 50 // Distância mínima para trocar slide
    const showRotationHint = ref(true)
    const imageLoaded = ref(false)
    
    const plants = ref([
      {
        id: 'planta-2q-49m',
        type: 'Apartamento Tipo',
        title: 'Apartamento 49,5m²',
        area: '2 Quartos com Suíte',
        description: 'Apartamento com 2 quartos sendo 1 suíte, sala de estar/jantar, cozinha, área de serviço e 2 banheiros. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_1.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>', 
            text: '1 suíte' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '2 quartos' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '2 banheiros' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>', 
            text: 'Área de serviço' 
          }
        ]
      },
      {
        id: 'planta-2q-51m',
        type: 'Apartamento Tipo',
        title: 'Apartamento 51,76m²',
        area: '2 Quartos com Suíte',
        description: 'Apartamento com 2 quartos sendo 1 suíte, sala de estar/jantar, cozinha, área de serviço e 2 banheiros. Layout linear otimizado. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_2.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>', 
            text: '1 suíte' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '2 quartos' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '2 banheiros' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>', 
            text: 'Área de serviço' 
          }
        ]
      },
      {
        id: 'planta-2q-garden-64m',
        type: 'Garden',
        title: 'Apartamento Garden 64,78m²',
        area: '2 Quartos com Suíte',
        description: 'Garden com 2 quartos sendo 1 suíte, sala de estar/jantar, cozinha, área de serviço, 2 banheiros e área privativa com jardim. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_3.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>', 
            text: '1 suíte' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '2 quartos' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '2 banheiros' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path><path d="M16 3v4M8 3v4"></path></svg>', 
            text: 'Jardim privativo' 
          }
        ]
      },
      {
        id: 'planta-2q-garden-74m',
        type: 'Garden',
        title: 'Apartamento Garden 74,10m²',
        area: '2 Quartos com Suíte',
        description: 'Garden com 2 quartos sendo 1 suíte, sala de estar/jantar, cozinha, área de serviço, 2 banheiros e área privativa com jardim e espaço gourmet. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_4.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>', 
            text: '1 suíte' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '2 quartos' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '2 banheiros' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path><path d="M16 3v4M8 3v4"></path></svg>', 
            text: 'Jardim + Gourmet' 
          }
        ]
      },
      {
        id: 'planta-1q-garden-58m',
        type: 'Garden',
        title: 'Apartamento Garden 58,75m²',
        area: '1 Quarto',
        description: 'Garden com 1 quarto, sala de estar/jantar, cozinha, área de serviço, banheiro, depósito e área privativa com jardim. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_5.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '1 quarto' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '1 banheiro' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"></path><path d="M16 3v4M8 3v4"></path></svg>', 
            text: 'Jardim privativo' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>', 
            text: 'Depósito' 
          }
        ]
      },
      {
        id: 'planta-1q-office-51m',
        type: 'Apartamento Tipo',
        title: 'Apartamento 51,76m²',
        area: '1 Quarto com Home Office',
        description: 'Apartamento com 1 quarto, sala de estar/jantar, cozinha, área de serviço, banheiro e espaço home office. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_6.png',
        features: [
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', 
            text: '1 quarto' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path><path d="M2 12v7c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-7"></path></svg>', 
            text: '1 banheiro' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18m-9-9v18"></path><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>', 
            text: 'Cozinha' 
          },
          { 
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>', 
            text: 'Home Office' 
          }
        ]
      }
    ])
    
    const updateCardWidth = () => {
      const container = document.querySelector('.carousel-container')
      if (container) {
        const containerWidth = container.offsetWidth
        if (window.innerWidth <= 768) {
          cardWidth.value = containerWidth - 80 // Mobile: quase toda a largura
        } else {
          cardWidth.value = Math.min(400, containerWidth * 0.7) // Desktop: 70% ou 400px max
        }
      }
    }

    const checkOrientation = () => {
      isMobile.value = window.innerWidth <= 768
      isPortrait.value = window.innerHeight > window.innerWidth
    }
    
    const nextSlide = () => {
      if (currentIndex.value < plants.value.length - 1) {
        // Adiciona classe de animação antes de mudar
        const currentCard = document.querySelector('.plant-card.active')
        if (currentCard) {
          currentCard.classList.add('slide-out-left')
        }
        
        setTimeout(() => {
          currentIndex.value++
          
          // Remove a classe após a transição
          setTimeout(() => {
            if (currentCard) {
              currentCard.classList.remove('slide-out-left')
            }
          }, 100)
        }, 150)
      }
    }
    
    const previousSlide = () => {
      if (currentIndex.value > 0) {
        // Adiciona classe de animação antes de mudar
        const currentCard = document.querySelector('.plant-card.active')
        if (currentCard) {
          currentCard.classList.add('slide-out-right')
        }
        
        setTimeout(() => {
          currentIndex.value--
          
          // Remove a classe após a transição
          setTimeout(() => {
            if (currentCard) {
              currentCard.classList.remove('slide-out-right')
            }
          }, 100)
        }, 150)
      }
    }
    
    const goToSlide = (index) => {
      if (index === currentIndex.value) return
      
      const direction = index > currentIndex.value ? 'left' : 'right'
      const currentCard = document.querySelector('.plant-card.active')
      
      if (currentCard) {
        currentCard.classList.add(`slide-out-${direction}`)
      }
      
      setTimeout(() => {
        currentIndex.value = index
        
        // Track plant view when slide changes
        const plant = plants.value[index]
        if (plant) {
          trackViewContent('property', plant.id, plant.price ? parseInt(plant.price.replace(/\D/g, '')) : 240000)
        }
        
        // Remove a classe após a transição
        setTimeout(() => {
          if (currentCard) {
            currentCard.classList.remove(`slide-out-${direction}`)
          }
        }, 100)
      }, 150)
    }
    
    const requestPlantInfo = (plantId) => {
      // Track form start
      trackFormStart()
      
      // Rolar até o formulário de contato
      const contactSection = document.getElementById('contato')
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        
        // Focar no primeiro campo do formulário após um pequeno delay
        setTimeout(() => {
          const nameInput = contactSection.querySelector('input[type="text"]')
          if (nameInput) {
            nameInput.focus()
          }
        }, 800)
      }
    }
    
    const viewDetails = (plantId) => {
      const plant = plants.value.find(p => p.id === plantId)
      if (plant) {
        // Track floor plan view
        trackFloorPlanView(plantId)
        
        // Reset states
        imageLoaded.value = false
        zoomLevel.value = 1
        panX.value = 0
        panY.value = 0
        
        selectedPlant.value = plant
        showModal.value = true
        showRotationHint.value = true
        document.body.style.overflow = 'hidden'
        
        // Esconde o aviso de rotação após 3 segundos
        setTimeout(() => {
          showRotationHint.value = false
        }, 3000)
      }
    }

    const closeModal = () => {
      showModal.value = false
      selectedPlant.value = null
      document.body.style.overflow = 'auto'
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape' && showModal.value) {
        closeModal()
      }
    }
    
    const zoomIn = () => {
      const newZoom = Math.min(3, zoomLevel.value + 0.2)
      zoomLevel.value = newZoom
      if (newZoom === 1) {
        panX.value = 0
        panY.value = 0
      }
    }
    
    const zoomOut = () => {
      const newZoom = Math.max(0.5, zoomLevel.value - 0.2)
      zoomLevel.value = newZoom
      if (newZoom === 1) {
        panX.value = 0
        panY.value = 0
      }
    }
    
    const resetZoom = () => {
      zoomLevel.value = 1
      panX.value = 0
      panY.value = 0
      panMomentum.value = false
    }
    
    const startPan = (event) => {
      if (zoomLevel.value <= 1) return
      
      isPanning.value = true
      panMomentum.value = false
      
      if (event instanceof MouseEvent) {
        lastPanX.value = event.clientX
        lastPanY.value = event.clientY
      } else if (event instanceof TouchEvent && event.touches.length === 1) {
        const touch = event.touches[0]
        lastPanX.value = touch.clientX
        lastPanY.value = touch.clientY
      }
      
      panVelocityX.value = 0
      panVelocityY.value = 0
      event.preventDefault()
    }
    
    const handlePan = (event) => {
      if (!isPanning.value || zoomLevel.value <= 1) return
      
      let currentX = 0
      let currentY = 0
      
      if (event instanceof MouseEvent) {
        currentX = event.clientX
        currentY = event.clientY
      } else if (event instanceof TouchEvent && event.touches.length === 1) {
        const touch = event.touches[0]
        currentX = touch.clientX
        currentY = touch.clientY
      }
      
      const deltaX = currentX - lastPanX.value
      const deltaY = currentY - lastPanY.value
      
      // Calcula velocidade para momentum
      panVelocityX.value = deltaX * 0.8
      panVelocityY.value = deltaY * 0.8
      
      // Aplica movimento com limites
      const maxPanX = (zoomLevel.value - 1) * 200
      const maxPanY = (zoomLevel.value - 1) * 150
      
      panX.value = Math.max(-maxPanX, Math.min(maxPanX, panX.value + deltaX))
      panY.value = Math.max(-maxPanY, Math.min(maxPanY, panY.value + deltaY))
      
      lastPanX.value = currentX
      lastPanY.value = currentY
      
      event.preventDefault()
    }
    
    const endPan = () => {
      if (!isPanning.value) return
      
      isPanning.value = false
      
      // Aplica momentum se a velocidade for significativa
      if (Math.abs(panVelocityX.value) > 2 || Math.abs(panVelocityY.value) > 2) {
        panMomentum.value = true
        applyMomentum()
      }
    }
    
    const applyMomentum = () => {
      if (!panMomentum.value) return
      
      const friction = 0.92
      const threshold = 0.5
      
      panVelocityX.value *= friction
      panVelocityY.value *= friction
      
      const maxPanX = (zoomLevel.value - 1) * 200
      const maxPanY = (zoomLevel.value - 1) * 150
      
      panX.value = Math.max(-maxPanX, Math.min(maxPanX, panX.value + panVelocityX.value))
      panY.value = Math.max(-maxPanY, Math.min(maxPanY, panY.value + panVelocityY.value))
      
      if (Math.abs(panVelocityX.value) > threshold || Math.abs(panVelocityY.value) > threshold) {
        requestAnimationFrame(applyMomentum)
      } else {
        panMomentum.value = false
      }
    }
    
    const startTouch = (event) => {
      if (event.touches.length === 1) {
        // Pan com um dedo
        startPan(event)
      } else if (event.touches.length === 2) {
        // Zoom com dois dedos (pinch)
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        )
        lastPanX.value = distance
        event.preventDefault()
      }
    }
    
    const handleTouch = (event) => {
      if (event.touches.length === 1) {
        // Pan com um dedo
        handlePan(event)
      } else if (event.touches.length === 2) {
        // Zoom com dois dedos (pinch)
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        )
        
        const scale = distance / lastPanX.value
        const newZoom = zoomLevel.value * scale
        
        if (newZoom >= 0.5 && newZoom <= 3) {
          zoomLevel.value = newZoom
        }
        
        lastPanX.value = distance
        event.preventDefault()
      }
    }
    
    const endTouch = () => {
      endPan()
    }
    
    const handleWheel = (event) => {
      event.preventDefault()
      
      const zoomSpeed = 0.1
      const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed
      const newZoom = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
      
      zoomLevel.value = newZoom
      
      if (newZoom === 1) {
        panX.value = 0
        panY.value = 0
      }
    }
    
    const handleImageClick = (event) => {
      if (zoomLevel.value === 1) {
        zoomLevel.value = 2
      } else {
        resetZoom()
      }
    }
    
    const startDrag = (event) => {
      // Não inicia drag se clicou em um botão ou elemento interativo
      if (event.target.closest('button') || event.target.closest('.btn-primary') || event.target.closest('.btn-secondary')) {
        return
      }
      
      isDragging.value = true
      dragOffset.value = 0
      
      if (event instanceof MouseEvent) {
        dragStartX.value = event.clientX
        dragStartY.value = event.clientY
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0]
        dragStartX.value = touch.clientX
        dragStartY.value = touch.clientY
      }
    }
    
    const handleDrag = (event) => {
      if (!isDragging.value) return
      
      let currentX = 0
      let currentY = 0
      
      if (event instanceof MouseEvent) {
        currentX = event.clientX
        currentY = event.clientY
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        const touch = event.touches[0]
        currentX = touch.clientX
        currentY = touch.clientY
      }
      
      const deltaX = currentX - dragStartX.value
      const deltaY = currentY - dragStartY.value
      
      dragOffset.value = deltaX
      
      // Só previne o evento se o movimento for claramente horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 15) {
        event.preventDefault()
      }
    }
    
    const endDrag = () => {
      if (!isDragging.value) return
      
      const dragDistance = Math.abs(dragOffset.value)
      const dragDirection = dragOffset.value > 0 ? 'right' : 'left'
      
      if (dragDistance > dragThreshold) {
        const currentCard = document.querySelector('.plant-card.active')
        
        if (dragDirection === 'left' && currentIndex.value < plants.value.length - 1) {
          if (currentCard) {
            currentCard.classList.add('slide-out-left')
          }
          
          setTimeout(() => {
            currentIndex.value++
            setTimeout(() => {
              if (currentCard) {
                currentCard.classList.remove('slide-out-left')
              }
            }, 100)
          }, 150)
        } else if (dragDirection === 'right' && currentIndex.value > 0) {
          if (currentCard) {
            currentCard.classList.add('slide-out-right')
          }
          
          setTimeout(() => {
            currentIndex.value--
            setTimeout(() => {
              if (currentCard) {
                currentCard.classList.remove('slide-out-right')
              }
            }, 100)
          }, 150)
        }
      }
      
      isDragging.value = false
      dragOffset.value = 0
    }
    
    const handleTouchMove = (event) => {
      handleDrag(event)
    }
    
    const startCarouselTouch = (event) => {
      startDrag(event)
    }
    
    const handleCarouselTouchMove = (event) => {
      handleDrag(event)
    }
    
    const endCarouselTouch = () => {
      endDrag()
    }
    
    const onImageLoad = () => {
      imageLoaded.value = true
    }
    
    // Track initial plant view on mount
    onMounted(() => {
      updateCardWidth()
      checkOrientation()
      window.addEventListener('resize', updateCardWidth)
      window.addEventListener('resize', checkOrientation)
      window.addEventListener('orientationchange', checkOrientation)
      document.addEventListener('keydown', handleKeydown)
      
      // Track initial plant view
      if (plants.value.length > 0) {
        const firstPlant = plants.value[0]
        trackViewContent('property', firstPlant.id, firstPlant.price ? parseInt(firstPlant.price.replace(/\D/g, '')) : 240000)
      }
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', updateCardWidth)
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'auto'
    })
    
    return {
      plants,
      currentIndex,
      cardWidth,
      showModal,
      selectedPlant,
      isMobile,
      isPortrait,
      nextSlide,
      previousSlide,
      goToSlide,
      requestPlantInfo,
      viewDetails,
      closeModal,
      zoomLevel,
      panX,
      panY,
      isPanning,
      zoomIn,
      zoomOut,
      resetZoom,
      startPan,
      handlePan,
      endPan,
      startTouch,
      handleTouch,
      endTouch,
      handleWheel,
      handleImageClick,
      dragOffset,
      isDragging,
      dragStartX,
      dragStartY,
      dragThreshold,
      startDrag,
      handleDrag,
      endDrag,
      handleTouchMove,
      startCarouselTouch,
      handleCarouselTouchMove,
      endCarouselTouch,
      showRotationHint,
      lastPanX,
      lastPanY,
      panVelocityX,
      panVelocityY,
      panMomentum,
      applyMomentum,
      imageLoaded,
      onImageLoad
    }
  }
}
</script>

<style scoped>
.plants-section {
  background: #ffffff;
  padding: 10px 0;
  padding-top: 40px;
  min-height: auto; 
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #161616;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.text-accent {
  color: #44b319;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #1d1d1d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Carousel Container */
.carousel-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  border-radius: 20px;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.carousel-wrapper:active {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  gap: 3rem;
  padding: 0 2rem;
  will-change: transform;
}

/* Plant Card */
.plant-card {
  flex: 0 0 auto;
  width: 400px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid rgba(0, 0, 0, 0.04);
  opacity: 0.4;
  transform: scale(0.85);
  transform-origin: center center;
}

.plant-card.active {
  opacity: 1;
  transform: scale(1);
  animation: slideInCenter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 3;
}

/* Plantas adjacentes - preparação para entrada */
.plant-card.next,
.plant-card.prev {
  opacity: 0.7;
  transform: scale(0.92);
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.plant-card.next {
  transform: scale(0.92) translateX(-10px);
}

.plant-card.prev {
  transform: scale(0.92) translateX(10px);
}

/* Plantas distantes */
.plant-card.far {
  opacity: 0.3;
  transform: scale(0.8);
  z-index: 1;
}

/* Efeito de hover para plantas adjacentes */
.plant-card.next:hover,
.plant-card.prev:hover {
  opacity: 0.85;
  transform: scale(0.95);
  cursor: pointer;
}

/* Animações de entrada */
@keyframes slideInCenter {
  0% {
    opacity: 0.7;
    transform: scale(0.8) translateX(0px);
    z-index: 3;
  }
  50% {
    opacity: 0.85;
    transform: scale(0.9) translateX(0px);
    z-index: 3;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0px);
    z-index: 3;
  }
}

/* Animações de saída */
.plant-card.slide-out-left {
  animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
}

.plant-card.slide-out-right {
  animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
}

@keyframes slideOutLeft {
  0% {
    opacity: 1;
    transform: scale(1) translateX(0px);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.85) translateX(-100px);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.7) translateX(-200px);
  }
}

@keyframes slideOutRight {
  0% {
    opacity: 1;
    transform: scale(1) translateX(0px);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.85) translateX(100px);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.7) translateX(200px);
  }
}

/* Animações para próximas plantas que entram */
.plant-card:not(.active) {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Efeito de preparação para plantas adjacentes */
.plant-card:nth-child(n+1) {
  transform-origin: center center;
}

/* Melhorias na transição do track */
.carousel-track:not(.dragging) {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Efeitos de hover melhorados */
.plant-card:hover:not(.active) {
  transform: scale(0.98);
  opacity: 0.85;
  transition: all 0.3s ease;
}

.plant-card.active:hover {
  transform: scale(1.02);
  transition: all 0.3s ease;
}

/* Card Image */
.card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.plant-card.active .card-image img {
  transform: scale(1.02);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.05) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
}

.apartment-type {
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

/* Card Content */
.card-content {
  padding: 1.5rem;
}

.card-header {
  margin-bottom: 0.8rem;
}

.apartment-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

.apartment-area {
  font-size: 1rem;
  color: #10b981;
  font-weight: 600;
}

.apartment-description {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #4a5568;
  margin-bottom: 1rem;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #f8fafc;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.feature .icon {
  font-size: 0.9rem;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
}

.feature .icon svg {
  width: 16px;
  height: 16px;
  stroke: #000000;
  fill: none;
}

/* Card Actions */
.card-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #1a1a1a;
  color: white;
}

.btn-primary:hover {
  background: #2d3748;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f3f4f6;
  color: #1a1a1a;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

/* Efeito de clique */
.btn-primary:active,
.btn-secondary:active {
  transform: translateY(0);
}

/* Responsividade para os botões */
@media (max-width: 768px) {
  .card-actions {
    gap: 8px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 12px 20px;
    font-size: 13px;
  }
}

/* Carousel Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.nav-button {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.nav-button:hover:not(:disabled) {
  background: #10b981;
  color: white;
  border-color: #10b981;
  transform: scale(1.05);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #cbd5e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #10b981;
  transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-track {
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .plant-card {
    width: calc(100vw - 120px);
    max-width: 350px;
  }
  
  /* Animações mobile - movimentos menores */
  @keyframes slideOutLeft {
    0% {
      opacity: 1;
      transform: scale(1) translateX(0px);
    }
    50% {
      opacity: 0.6;
      transform: scale(0.9) translateX(-60px);
    }
    100% {
      opacity: 0.3;
      transform: scale(0.8) translateX(-120px);
    }
  }
  
  @keyframes slideOutRight {
    0% {
      opacity: 1;
      transform: scale(1) translateX(0px);
    }
    50% {
      opacity: 0.6;
      transform: scale(0.9) translateX(60px);
    }
    100% {
      opacity: 0.3;
      transform: scale(0.8) translateX(120px);
    }
  }
  
  @keyframes slideInCenter {
    0% {
      opacity: 0.7;
      transform: scale(0.85) translateX(0px);
    }
    50% {
      opacity: 0.85;
      transform: scale(0.92) translateX(0px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateX(0px);
    }
  }
  
  .card-content {
    padding: 1.2rem;
  }
  
  .apartment-title {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
  
  .card-actions {
    flex-direction: row;
    gap: 0.4rem;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 0.6rem;
    font-size: 0.75rem;
  }
  
  .carousel-controls {
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .nav-button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    padding: 0 1rem;
  }
  
  .plant-card {
    width: calc(100vw - 80px);
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: none;
  }
}

/* Large screens optimization */
@media (min-width: 1200px) {
  .carousel-container {
    max-width: 1600px;
    padding: 0 6rem;
  }
  
  .carousel-track {
    gap: 4rem;
    padding: 0 3rem;
  }
  
  .plant-card {
    width: 450px;
  }
}

@media (min-width: 1400px) {
  .carousel-container {
    padding: 0 8rem;
  }
  
  .carousel-track {
    gap: 5rem;
    padding: 0 4rem;
  }
}

/* Modal Styles */
.plant-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(0px);
  animation: modalOverlay 0.6s ease-out forwards;
}

@keyframes modalOverlay {
  0% {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }
  100% {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
  }
}

.modal-content {
  position: relative;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  animation: modalContent 0.4s ease-out 0.3s forwards;
}

@keyframes modalContent {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #333;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 1001;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: buttonFadeIn 0.3s ease-out 0.7s forwards;
}

@keyframes buttonFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.close-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.rotation-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 5;
  transition: opacity 0.3s ease-out;
}

.rotation-icon {
  margin-bottom: 1rem;
  animation: rotate 0.9s ease-in-out;
}

.rotation-hint p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

@keyframes rotate {
  0% { 
    transform: rotate(0deg);
    opacity: 1;
  }
  50% { 
    transform: rotate(180deg);
    opacity: 1;
  }
  100% { 
    transform: rotate(360deg);
    opacity: 0;
  }
}

.modal-image-container {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  opacity: 0;
  transform: scale(0.9);
}

.modal-image.image-loaded {
  animation: imageZoom 0.5s ease-out 0.7s forwards;
}

@keyframes imageZoom {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.modal-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-info span {
  color: #10b981;
  font-weight: 600;
}

/* Mobile Modal Adjustments */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    height: 95%;
  }

  .close-button {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  .rotation-hint p {
    font-size: 0.9rem;
  }
}

/* Landscape Mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .rotation-hint {
    display: none;
  }
  
  .modal-image-container {
    height: 85%;
  }
  
  .close-button {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }
}

/* Zoom Controls */
.zoom-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: controlsFadeIn 0.3s ease-out 0.9s forwards;
}

@keyframes controlsFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.zoom-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.zoom-btn:hover {
  background: #10b981;
  color: white;
}

/* Zoom Indicator */
.zoom-indicator {
  background: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
  opacity: 0;
  animation: indicatorFadeIn 0.3s ease-out 1s forwards;
}

@keyframes indicatorFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Usage Instructions */
.usage-instructions {
  text-align: center;
  margin-top: 1rem;
  padding: 0 2rem;
  opacity: 0;
  animation: instructionsFadeIn 0.3s ease-out 1.1s forwards;
}

@keyframes instructionsFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.usage-instructions p {
  margin: 0;
  font-size: 0.875rem;
  color: #ffffff;
  opacity: 0.9;
}

.usage-instructions.mobile {
  display: none;
}

@media (max-width: 768px) {
  .usage-instructions.mobile {
    display: block;
  }
}
</style> 