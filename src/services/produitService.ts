import { ref, computed } from 'vue';
import type { Product, FilterState } from '@/types';
import { produits } from '@/data/Produits.ts';

// Create reactive references
const products = ref<Product[]>(produits);
const filters = ref<FilterState>({
  searchQuery: '',
  selectedCategories: [],
  selectedBrands: [],
  priceRange: {
    min: 0,
    max: 100000,
  },
  sortDirection: null,
});

// Get unique categories from products
const categories = computed(() => {
  const categoriesSet = new Set<string>();
  products.value.forEach(product => categoriesSet.add(product.category));
  return Array.from(categoriesSet);
});

// Get unique brands from products
const brands = computed(() => {
  const brandsSet = new Set<string>();
  products.value.forEach(product => brandsSet.add(product.brand));
  return Array.from(brandsSet);
});

// Get price range (min and max) from products
const priceRange = computed(() => {
  let min = Number.MAX_VALUE;
  let max = 0;
  
  products.value.forEach(product => {
    min = Math.min(min, product.price);
    max = Math.max(max, product.price);
  });
  
  return { min, max };
});

// Filter products based on current filters
const filteredProducts = computed(() => {
  return products.value
    .filter(product => {
      // Filter by search query
      if (filters.value.searchQuery && !product.name.toLowerCase().includes(filters.value.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (filters.value.selectedCategories.length > 0 && !filters.value.selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Filter by brand
      if (filters.value.selectedBrands.length > 0 && !filters.value.selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Filter by price range
      if (product.price < filters.value.priceRange.min || product.price > filters.value.priceRange.max) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by price
      if (filters.value.sortDirection === 'asc') {
        return a.price - b.price;
      } else if (filters.value.sortDirection === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
});

// Update search query
const updateSearchQuery = (query: string) => {
  filters.value.searchQuery = query;
};

// Toggle category selection
const toggleCategory = (category: string) => {
  const index = filters.value.selectedCategories.indexOf(category);
  if (index === -1) {
    filters.value.selectedCategories.push(category);
  } else {
    filters.value.selectedCategories.splice(index, 1);
  }
};

// Toggle brand selection
const toggleBrand = (brand: string) => {
  const index = filters.value.selectedBrands.indexOf(brand);
  if (index === -1) {
    filters.value.selectedBrands.push(brand);
  } else {
    filters.value.selectedBrands.splice(index, 1);
  }
};

// Update price range
const updatePriceRange = (min: number, max: number) => {
  filters.value.priceRange.min = min;
  filters.value.priceRange.max = max;
};

// Set sort direction
const setSortDirection = (direction: 'asc' | 'desc' | null) => {
  filters.value.sortDirection = direction;
};

// Reset all filters
const resetFilters = () => {
  filters.value = {
    searchQuery: '',
    selectedCategories: [],
    selectedBrands: [],
    priceRange: {
      min: priceRange.value.min,
      max: priceRange.value.max,
    },
    sortDirection: null,
  };
};

export const produitService = {
  products,
  filters,
  categories,
  brands,
  priceRange,
  filteredProducts,
  updateSearchQuery,
  toggleCategory,
  toggleBrand,
  updatePriceRange,
  setSortDirection,
  resetFilters,
};