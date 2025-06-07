<script setup lang="ts">
import { computed } from 'vue';
import { produitService } from '@/services/produitService.ts';

// Récupère la direction du tri depuis le service
const sortDirection = computed(() => produitService.filters.value.sortDirection);

// Fonction pour modifier la direction du tri
const setSortDirection = (direction: 'asc' | 'desc' | null) => {
  produitService.setSortDirection(direction);
};
</script>


<template>
  <div class="sort-controls">
    <div class="sort-label">Trier par&nbsp;:</div>
    <div class="sort-buttons">
      <button
          class="sort-button"
          :class="{ active: sortDirection === 'asc' }"
          @click="setSortDirection('asc')"
      >
        Prix : du moins cher au plus cher
      </button>
      <button
          class="sort-button"
          :class="{ active: sortDirection === 'desc' }"
          @click="setSortDirection('desc')"
      >
        Prix : du plus cher au moins cher
      </button>
      <button
          v-if="sortDirection !== null"
          class="sort-button clear"
          @click="setSortDirection(null)"
      >
        Réinitialiser
      </button>
    </div>
  </div>
</template>

<style scoped>
.sort-controls {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.sort-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  margin-right: 16px;
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.sort-button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-button:hover {
  background-color: #f9f9f9;
  border-color: #ccc;
}

.sort-button.active {
  background-color: #FF85A2;
  color: white;
  border-color: #FF85A2;
}

.sort-button.clear {
  background-color: transparent;
  color: #666;
}

.sort-button.clear:hover {
  color: #FF85A2;
  background-color: transparent;
  border-color: #FF85A2;
}

@media (max-width: 600px) {
  .sort-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-label {
    margin-bottom: 8px;
  }

  .sort-buttons {
    width: 100%;
  }

  .sort-button {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    padding: 8px;
    font-size: 0.8rem;
  }
}
</style>
