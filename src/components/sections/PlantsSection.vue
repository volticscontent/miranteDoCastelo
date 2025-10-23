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
                  @click="togglePlantViewer(plant.id)" 
                  @mousedown.stop
                  @touchstart.stop
                  class="btn-secondary"
                  :class="{ 'active': showPlantViewer && selectedPlant?.id === plant.id }"
                >
                  {{ showPlantViewer && selectedPlant?.id === plant.id ? 'Fechar Planta' : 'Ver Planta Detalhada' }}
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

    <!-- Visualizador de Planta Integrado -->
    <div v-if="showPlantViewer" class="plant-viewer-container" ref="plantViewerContainer">
      <div class="plant-viewer-content">
        <!-- Cabeçalho do Visualizador -->
        <div class="viewer-header">
          <div class="viewer-header-info">
            <h3 class="viewer-title">{{ selectedPlant?.title }}</h3>
            <p class="viewer-subtitle">{{ selectedPlant?.type }}</p>
          </div>
          <button @click="closePlantViewer" class="close-viewer-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Estado de Carregamento -->
        <div v-if="plantLoading" class="plant-loading">
          <div class="loading-spinner"></div>
          <p>Carregando planta detalhada...</p>
        </div>

        <!-- Controles de Zoom -->
        <div v-if="!plantLoading" class="zoom-controls">
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
        <div class="zoom-indicator" v-if="zoomLevel !== 1 && !plantLoading">
          {{ Math.round(zoomLevel * 100) }}%
        </div>

        <!-- Aviso de Rotação (apenas mobile) -->
        <div v-if="isMobile && isPortrait && showRotationHint && !plantLoading" class="rotation-hint">
          <div class="rotation-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.2.45 4.53 1.24"/>
              <path d="M17 3l4 4-4 4"/>
            </svg>
          </div>
          <p>Gire o celular para melhor visualização</p>
        </div>

        <!-- Container da Imagem -->
        <div 
          v-if="!plantLoading"
          class="plant-image-container" 
          :class="{ 'fullscreen': isFullscreen }"
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
            class="plant-image"
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

        <!-- Instruções de Uso -->
        <div class="usage-instructions" v-if="!plantLoading && !isMobile">
          <p>🖱️ Scroll para zoom • 🖐️ Arraste para mover • 👆 Clique para zoom rápido</p>
        </div>
        <div class="usage-instructions mobile" v-else-if="!plantLoading">
          <p>📱 Pinça para zoom • 👆 Arraste para mover • 🔄 Gire para melhor visualização</p>
        </div>

        <!-- Botão WhatsApp -->
        <div class="viewer-actions" v-if="!plantLoading">
          <button @click="requestPlantInfo(selectedPlant?.id)" 
                  @mousedown.stop
                  @touchstart.stop class="whatsapp-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Solicitar Informações no WhatsApp
          </button>
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
      trackPlantasView,
      trackPlantClick,
      trackPlantDetailView,
      trackPlantImageZoom,
      trackContatoFormStart
    } = useFacebookTracking()
    
    const currentIndex = ref(0)
    const cardWidth = ref(400)
    const showPlantViewer = ref(false)
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
    const plantLoading = ref(false)
    const isFullscreen = ref(false)
    
    const plants = ref([
      {
        id: 'planta-2q-49m',
        type: '2 Quartos - 2 Banheiros',
        title: 'Apartamento 49,5m²',
        area: '2 Quartos',
        description: 'Apartamento com 2 quartos, sala de estar/jantar, cozinha, área de serviço e 2 banheiros. Paredes internas em Drywall.',
        image: '/plantas/planta_tipo_1.png',
        features: [
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
        type: '1 Quarto - 1 Suite - 2 Banheiros',
        title: 'Apartamento 51,76m²',
        area: '2 Quartos',
        description: 'Apartamento com 2 quartos, sala de estar/jantar, cozinha, área de serviço e 2 banheiros. Layout linear otimizado. Paredes internas em Drywall.',
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
        
        // Track plant click com novo padrão
        const plant = plants.value[index]
        if (plant) {
          trackPlantClick(plant.id)
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
      // Track form start com novo padrão
      trackContatoFormStart()
      
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
    
    const togglePlantViewer = (plantId) => {
      const plant = plants.value.find(p => p.id === plantId)
      if (plant && selectedPlant.value?.id === plantId && showPlantViewer.value) {
        // Se já está aberto para esta planta, fechar
        closePlantViewer()
        return
      }
      
      if (plant) {
        // Track plant detail view com novo padrão
        trackPlantDetailView(plantId)
        
        // Reset states
        imageLoaded.value = false
        plantLoading.value = true
        zoomLevel.value = 1
        panX.value = 0
        panY.value = 0
        
        selectedPlant.value = plant
        showPlantViewer.value = true
        showRotationHint.value = true
        
        // Scroll suave até o visualizador após um pequeno delay
        setTimeout(() => {
          const viewerContainer = document.querySelector('.plant-viewer-container')
          if (viewerContainer) {
            viewerContainer.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
        
        // Simula carregamento da planta
        setTimeout(() => {
          plantLoading.value = false
        }, 800)
        
        // Esconde o aviso de rotação após 3 segundos
        setTimeout(() => {
          showRotationHint.value = false
        }, 3000)
      }
    }

    const closePlantViewer = () => {
      showPlantViewer.value = false
      selectedPlant.value = null
      plantLoading.value = false
      zoomLevel.value = 1
      panX.value = 0
      panY.value = 0
      isFullscreen.value = false
      
      // Scroll de volta para os cards de plantas
      setTimeout(() => {
        const carouselContainer = document.querySelector('.carousel-container')
        if (carouselContainer) {
          carouselContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 100)
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape' && showPlantViewer.value) {
        closePlantViewer()
      }
    }
    
    const zoomIn = () => {
      const newZoom = Math.min(3, zoomLevel.value + 0.2)
      zoomLevel.value = newZoom
      if (newZoom === 1) {
        panX.value = 0
        panY.value = 0
      }
      
      // Track image zoom com novo padrão
      if (selectedPlant.value) {
        trackPlantImageZoom(selectedPlant.value.id)
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
        
        // Track image zoom com novo padrão
        if (selectedPlant.value) {
          trackPlantImageZoom(selectedPlant.value.id)
        }
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
    
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
      if (isFullscreen.value) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
    
    // Track initial plant view on mount
    onMounted(() => {
      updateCardWidth()
      checkOrientation()
      window.addEventListener('resize', updateCardWidth)
      window.addEventListener('resize', checkOrientation)
      window.addEventListener('orientationchange', checkOrientation)
      document.addEventListener('keydown', handleKeydown)
      
      // Track plantas section view com novo padrão
      trackPlantasView()
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
      showPlantViewer,
      selectedPlant,
      isMobile,
      isPortrait,
      nextSlide,
      previousSlide,
      goToSlide,
      requestPlantInfo,
      togglePlantViewer,
      closePlantViewer,
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
      onImageLoad,
      plantLoading,
      isFullscreen,
      toggleFullscreen
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

/* Visualizador de Planta Integrado */
.plant-viewer-container {
  width: 100%;
  max-width: 1400px;
  margin: 3rem auto 0;
  padding: 0 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: containerSlideIn 0.6s ease-out;
}

@keyframes containerSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
    max-height: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
  }
}

.plant-viewer-content {
  position: relative;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.viewer-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.viewer-header-info {
  flex: 1;
  text-align: left;
}

.viewer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.viewer-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #10b981;
}

.close-viewer-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.close-viewer-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: scale(1.05);
}

.plant-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #4a5568;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.plant-loading p {
  font-size: 1rem;
  margin: 0;
}

.zoom-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
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
  border-color: #10b981;
  transform: scale(1.05);
}

.zoom-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.rotation-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #4a5568;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 15;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

.rotation-icon {
  margin-bottom: 1rem;
  color: #10b981;
}

.rotation-hint p {
  font-size: 1rem;
  margin: 0;
  color: #4a5568;
}

.plant-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;
  margin-bottom: 1.5rem;
}

.plant-image-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  border: none;
  background: #000;
}

.plant-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  user-select: none;
}

.plant-image.image-loaded {
  animation: imageZoomIn 0.5s ease-out;
}

@keyframes imageZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.usage-instructions {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

.usage-instructions p {
  margin: 0;
  font-size: 0.875rem;
  color: #0369a1;
  font-weight: 500;
}

.usage-instructions.mobile {
  display: none;
}

.viewer-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.whatsapp-btn {
  background: #25d366;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn:hover {
  background: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
}

/* Responsividade do Visualizador */
@media (max-width: 768px) {
  .plant-viewer-container {
    margin: 2rem auto 0;
    padding: 0 1rem;
    border-radius: 16px;
  }

  .plant-viewer-content {
    padding: 1.5rem;
  }

  .viewer-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .viewer-header-info {
    text-align: center;
    width: 100%;
  }

  .viewer-title {
    font-size: 1.25rem;
  }

  .close-viewer-btn {
    align-self: flex-end;
    width: 45px;
    height: 45px;
  }

  .plant-image-container {
    height: 400px;
  }

  .zoom-controls {
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .zoom-btn {
    width: 40px;
    height: 40px;
  }

  .usage-instructions.mobile {
    display: block;
  }

  .usage-instructions:not(.mobile) {
    display: none;
  }

  .whatsapp-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .plant-image-container {
    height: 300px;
  }

  .viewer-header {
    margin-bottom: 1rem;
  }

  .zoom-controls {
    margin-bottom: 1rem;
  }
}
</style> 