<script setup lang="ts">
import { ref, watch } from 'vue';
import { produitService } from '@/services/produitService.ts';

// Liaison avec la valeur de la requête de recherche dans le service produit
const searchInput = ref(produitService.filters.value.searchQuery);

// État de focus de la barre de recherche
const isSearchFocused = ref(false);

// Met à jour la recherche lorsqu'on modifie l'entrée
watch(searchInput, (newValue) => {
  produitService.updateSearchQuery(newValue);
});
</script>

<template>
  <div class="search-container slide-up">
    <div
        class="search-bar"
        :class="{ 'focused': isSearchFocused }"
    >
      <!-- Icône de recherche -->
      <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <!-- Champ de saisie de la recherche -->
      <input
          type="text"
          v-model="searchInput"
          placeholder="Rechercher des produits..."
          class="search-input"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
      />

      <!-- Bouton pour effacer le texte de recherche -->
      <button
          v-if="searchInput"
          @click="searchInput = ''"
          class="clear-button"
          aria-label="Effacer la recherche"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>


<style scoped>
/* Conteneur principal */
.search-container {
  width: 100%;
  margin-bottom: 24px;
}

/* Style de la barre de recherche */
.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 0 16px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  height: 56px;
  position: relative;
  border: 2px solid transparent;
}

/* Style lorsque la barre est en focus */
.search-bar.focused {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* Icône de la loupe */
.search-icon {
  color: var(--text-light);
  margin-right: 12px;
  transition: color var(--transition-fast);
}

/* Icône en focus */
.search-bar.focused .search-icon {
  color: var(--primary-color);
}

/* Champ de recherche */
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  background: transparent;
  color: var(--text-dark);
}

/* Placeholder du champ */
.search-input::placeholder {
  color: var(--text-light);
}

/* Bouton pour effacer la recherche */
.clear-button {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.clear-button:hover {
  background-color: var(--background-color);
  color: var(--text-dark);
  transform: none;
  box-shadow: none;
}
</style>