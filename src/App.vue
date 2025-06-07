<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import FilterPanel from './components/Filtre.vue';
import SearchBar from './components/Recherche.vue';
import SortControls from './components/Controls.vue';
import ProductGrid from './components/Grid_produits.vue';

const isMobileFiltersOpen = ref(false);

onMounted(() => {
  // Animation d'entrée
  gsap.from('.en-tete', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
  });

  gsap.from('.contenu-principal', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });
});
</script>

<template>
  <div class="conteneur-app">
    <header class="en-tete">
      <h1>Essentiels Beauté</h1>
      <p>Découvrez nos produits cosmétiques premium</p>
    </header>
    
    <main class="contenu-principal">
      <!-- Bouton Filtres Mobile -->
      <div class="toggle-filtres-mobile">
        <button @click="isMobileFiltersOpen = !isMobileFiltersOpen" class="bouton-toggle-filtre">
          <span>{{ isMobileFiltersOpen ? 'Masquer Filtres' : 'Afficher Filtres' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
      
      <div class="disposition-contenu">
        <!-- Barre latérale des filtres -->
        <aside class="barre-laterale-filtres" :class="{ 'mobile-ouvert': isMobileFiltersOpen }">
          <div class="en-tete-mobile" v-if="isMobileFiltersOpen">
            <h2>Filtres</h2>
            <button @click="isMobileFiltersOpen = false" class="bouton-fermer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <FilterPanel />
        </aside>
        
        <!-- Contenu des produits -->
        <div class="contenu-produits">
          <SearchBar />
          <SortControls />
          <ProductGrid />
        </div>
      </div>
    </main>
    
    <!-- Fond mobile -->
    <div 
      v-if="isMobileFiltersOpen" 
      class="fond-mobile"
      @click="isMobileFiltersOpen = false"
    ></div>
  </div>
</template>

<style lang="scss">
/* Variables globales */
:root {
  --couleur-primaire: #FF85A2;
  --couleur-primaire-claire: #FFD0D0;
  --couleur-secondaire: #B9A2DB;
  --couleur-accent: #65C0BA;
  --texte-fonce: #333333;
  --texte-moyen: #666666;
  --texte-clair: #999999;
  --couleur-fond: #F8F9FA;
  --fond-carte: #FFFFFF;
  --couleur-bordure: #E0E0E0;
  --ombre-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
  --ombre-md: 0 6px 12px rgba(0, 0, 0, 0.08);
  --rayon-sm: 4px;
  --rayon-md: 8px;
  --transition-rapide: 0.2s ease;
  --transition-normale: 0.3s ease;
}

.conteneur-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.en-tete {
  background: linear-gradient(135deg, var(--couleur-primaire), var(--couleur-secondaire));
  color: white;
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--ombre-sm);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%);
    animation: pulse 3s infinite;
  }

  h1 {
    margin: 0 0 8px 0;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
  }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.5; }
}

.contenu-principal {
  flex: 1;
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.toggle-filtres-mobile {
  display: none;
  margin-bottom: 16px;
}

.bouton-toggle-filtre {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: white;
  border: 1px solid var(--couleur-bordure);
  border-radius: var(--rayon-md);
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--texte-moyen);
  cursor: pointer;
  transition: all var(--transition-rapide);
  width: 100%;

  &:hover {
    border-color: var(--couleur-primaire);
    color: var(--couleur-primaire);
  }
}

.disposition-contenu {
  display: flex;
  gap: 24px;
}

.barre-laterale-filtres {
  width: 280px;
  flex-shrink: 0;
}

.contenu-produits {
  flex: 1;
}

.en-tete-mobile {
  display: none;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--couleur-bordure);

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
}

.bouton-fermer {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--texte-moyen);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fond-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

@media (max-width: 768px) {
  .toggle-filtres-mobile {
    display: block;
  }
  
  .disposition-contenu {
    display: block;
  }
  
  .barre-laterale-filtres {
    display: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: white;
    z-index: 110;
    padding: 24px;
    box-sizing: border-box;
    overflow-y: auto;

    &.mobile-ouvert {
      display: block;
      animation: slideIn 0.3s ease;
    }
  }
  
  .en-tete-mobile {
    display: flex;
  }
  
  .fond-mobile {
    display: block;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>