<script setup lang="ts">
// Importation de ref depuis Vue et du type Product
import { ref } from 'vue';
import type { Product } from '@/types';

// Définition des propriétés (props) avec un produit de type Product
const props = defineProps<{
  product: Product;
}>();

// États pour gérer le survol et le chargement de l'image
const isHovered = ref(false);
const isLoaded = ref(false);

// Fonction appelée lorsque l'image est chargée
const handleImageLoad = () => {
  isLoaded.value = true;
};

// Fonction pour formater le prix en Francs CFA
const formatPriceCFA = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div
      class="product-card scale-in hover-lift"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <div class="product-image-container">
      <div v-if="!isLoaded" class="image-skeleton"></div>
      <img
          :src="product.image"
          :alt="product.name"
          class="product-image"
          :class="{ 'image-loaded': isLoaded }"
          @load="handleImageLoad"
      />
      <div class="product-overlay" :class="{ active: isHovered }">
        <button class="view-details-btn scale-in">
          Voir les détails
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-badge">{{ product.category }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-brand">{{ product.brand }}</p>
      <p class="product-price">{{ formatPriceCFA(product.price) }}</p>
      <p class="product-description">
        {{ product.description.length > 70 ? product.description.substring(0, 70) + '...' : product.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.product-image-container {
  position: relative;
  overflow: hidden;
  height: 240px;
  background-color: #f8f8f8;
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.product-image.image-loaded {
  opacity: 1;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all var(--transition-normal);
}

.product-overlay.active {
  opacity: 1;
}

.view-details-btn {
  background-color: white;
  color: var(--text-dark);
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transform: translateY(20px);
  transition: all var(--transition-normal);
}

.product-overlay.active .view-details-btn {
  transform: translateY(0);
}

.view-details-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.product-info {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--primary-light);
  color: var(--primary-color);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-dark);
}

.product-brand {
  font-size: 0.9rem;
  color: var(--primary-color);
  margin: 0 0 8px 0;
  font-weight: 500;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0 0 12px 0;
}

.product-description {
  font-size: 0.9rem;
  color: var(--text-medium);
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}
</style>
