export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortDirection: 'asc' | 'desc' | null;
}