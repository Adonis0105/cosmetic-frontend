<script setup lang="ts">
import { ref, computed } from 'vue';
import { produitService } from '@/services/produitService';

// États pour afficher ou masquer les sections
const afficherPrix = ref(true);
const afficherCategories = ref(true);
const afficherMarques = ref(true);

// Plage de prix disponible
const prixMinimum = computed(() => produitService.priceRange.value.min);
const prixMaximum = computed(() => produitService.priceRange.value.max);

// Valeurs actuelles sélectionnées par l'utilisateur
const prixMinActuel = ref(produitService.filters.value.priceRange.min);
const prixMaxActuel = ref(produitService.filters.value.priceRange.max);

// Mettre à jour la plage de prix
const mettreAJourPlagePrix = () => {
  produitService.updatePriceRange(prixMinActuel.value, prixMaxActuel.value);
};

// Réinitialiser tous les filtres
const reinitialiserFiltres = () => {
  produitService.resetFilters();
  prixMinActuel.value = prixMinimum.value;
  prixMaxActuel.value = prixMaximum.value;
};
</script>

<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h2>Filtres</h2>
      <button class="reset-btn" @click="reinitialiserFiltres">Réinitialiser</button>
    </div>

    <!-- Filtre par prix -->
    <div class="filter-section">
      <div class="section-header" @click="afficherPrix = !afficherPrix">
        <h3>Prix</h3>
        <span class="toggle-icon">{{ afficherPrix ? '−' : '+' }}</span>
      </div>
      <div class="section-content" v-if="afficherPrix">
        <div class="price-range-display">
          <span>{{ prixMinActuel.toFixed(2) }} F</span>
          <span>{{ prixMaxActuel.toFixed(2) }} F</span>
        </div>
        <div class="range-inputs">
          <input
              type="range"
              :min="prixMinimum"
              :max="prixMaximum"
              v-model.number="prixMinActuel"
              @change="mettreAJourPlagePrix"
              class="range-slider"
          />
          <input
              type="range"
              :min="prixMinimum"
              :max="prixMaximum"
              v-model.number="prixMaxActuel"
              @change="mettreAJourPlagePrix"
              class="range-slider"
          />
        </div>
      </div>
    </div>

    <!-- Filtre par catégories -->
    <div class="filter-section">
      <div class="section-header" @click="afficherCategories = !afficherCategories">
        <h3>Catégories</h3>
        <span class="toggle-icon">{{ afficherCategories ? '−' : '+' }}</span>
      </div>
      <div class="section-content" v-if="afficherCategories">
        <div
            v-for="categorie in produitService.categories.value"
            :key="categorie"
            class="filter-option"
        >
          <label class="checkbox-label">
            <input
                type="checkbox"
                :checked="produitService.filters.value.selectedCategories.includes(categorie)"
                @change="produitService.toggleCategory(categorie)"
            />
            <span class="custom-checkbox"></span>
            {{ categorie }}
          </label>
        </div>
      </div>
    </div>

    <!-- Filtre par marques -->
    <div class="filter-section">
      <div class="section-header" @click="afficherMarques = !afficherMarques">
        <h3>Marques</h3>
        <span class="toggle-icon">{{ afficherMarques ? '−' : '+' }}</span>
      </div>
      <div class="section-content" v-if="afficherMarques">
        <div
            v-for="marque in produitService.brands.value"
            :key="marque"
            class="filter-option"
        >
          <label class="checkbox-label">
            <input
                type="checkbox"
                :checked="produitService.filters.value.selectedBrands.includes(marque)"
                @change="produitService.toggleBrand(marque)"
            />
            <span class="custom-checkbox"></span>
            {{ marque }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-panel {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 100%;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.reset-btn {
  background: none;
  border: none;
  color: #FF85A2;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.filter-section {
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.toggle-icon {
  color: #666;
  font-size: 1.2rem;
  font-weight: 300;
}

.section-content {
  padding: 8px 0 16px;
  animation: fadeIn 0.3s ease;
}

.price-range-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
}

.range-inputs {
  position: relative;
  margin: 0 8px;
}

.range-slider {
  width: 100%;
  margin: 8px 0;
  -webkit-appearance: none;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  outline: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FF85A2;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.filter-option {
  margin-bottom: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox {
  position: relative;
  height: 18px;
  width: 18px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.checkbox-label:hover .custom-checkbox {
  background-color: #e0e0e0;
}

.checkbox-label input:checked ~ .custom-checkbox {
  background-color: #FF85A2;
}

.custom-checkbox:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label input:checked ~ .custom-checkbox:after {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>