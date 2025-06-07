<script setup lang="ts">
import { computed } from 'vue';
import { produitService } from '@/services/produitService.ts';
import ProductCard from './Carte_produits.vue';

// Liste des produits filtrés (réactive)
const filteredProducts = computed(() => produitService.filteredProducts.value);

// Vérifie si des filtres sont activés
const hasFilters = computed(() => {
  const filters = produitService.filters.value;
  return filters.searchQuery ||
      filters.selectedCategories.length > 0 ||
      filters.selectedBrands.length > 0 ||
      filters.priceRange.min > produitService.priceRange.value.min ||
      filters.priceRange.max < produitService.priceRange.value.max ||
      filters.sortDirection !== null;
});
</script>

<template>
  <div>
    <!-- Affiche les produits si la liste filtrée n'est pas vide -->
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>

    <!-- Message d'absence de produits si aucun produit trouvé -->
    <div v-else class="no-products">
      <div class="no-products-content">
        <!-- Icône de recherche -->
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11" stroke-width="1.5"></line>
        </svg>
        <h3>Aucun produit trouvé</h3>
        <p v-if="hasFilters">Essayez de modifier vos filtres ou vos critères de recherche</p>
        <!-- Bouton pour réinitialiser les filtres -->
        <button
            v-if="hasFilters"
            @click="produitService.resetFilters()"
            class="reset-filters-btn"
        >
          Réinitialiser tous les filtres
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Grille d'affichage des produits */
.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

/* Ajustements responsives */
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Bloc en cas d'absence de produits */
.no-products {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.no-products-content {
  text-align: center;
  padding: 32px;
}

.no-products-content svg {
  color: #ddd;
  margin-bottom: 16px;
}

.no-products-content h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 8px 0;
}

.no-products-content p {
  color: #666;
  margin: 0 0 16px 0;
}

/* Bouton de réinitialisation des filtres */
.reset-filters-btn {
  background-color: #FF85A2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-filters-btn:hover {
  background-color: #ff6b8e;
}
</style>
