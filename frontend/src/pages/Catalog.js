import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, brands, loading, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    
    if (category) setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
    
    fetchProducts(category, brand);
  }, [searchParams, fetchProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(''); // Reset brand when category changes
    updateFilters({ category, brand: '' });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    updateFilters({ category: selectedCategory, brand });
  };

  const updateFilters = (filters) => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.brand) params.set('brand', filters.brand);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchParams({});
    fetchProducts();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getAvailableBrands = () => {
    if (!selectedCategory) return brands;
    const categoryProducts = products.filter(p => p.category === selectedCategory);
    const availableBrands = [...new Set(categoryProducts.map(p => p.brand))];
    return brands.filter(brand => availableBrands.includes(brand.value));
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-light mb-4">
            Catalogo Prodotti
          </h1>
          <p className="text-lg text-muted-foreground">
            Scopri la nostra selezione di prodotti di lusso
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 btn-secondary w-full"
            data-testid="mobile-filter-toggle"
          >
            <Filter className="w-4 h-4" />
            Filtri
          </button>

          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
            <div className="bg-white p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-medium">Filtri</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="clear-filters"
                >
                  Cancella tutto
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="category-filter"
                >
                  <option value="">Tutte le categorie</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  disabled={!selectedCategory}
                  className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="brand-filter"
                >
                  <option value="">Tutte le marche</option>
                  {getAvailableBrands().map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
                {!selectedCategory && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Seleziona prima una categoria
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cerca prodotti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="search-input"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-md border transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-muted-foreground border-border hover:text-foreground'
                  }`}
                  data-testid="grid-view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-md border transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-muted-foreground border-border hover:text-foreground'
                  }`}
                  data-testid="list-view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {loading ? 'Caricamento...' : `${filteredProducts.length} prodotti trovati`}
              </p>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nessun prodotto trovato</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Cancella filtri
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                      <div className="aspect-w-16 aspect-h-12">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="product-image"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">
                            {product.brand.replace('_', ' ')}
                          </span>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-medium mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-light">€{product.price.toFixed(2)}</span>
                          <Link 
                            to={`/product/${product.id}`}
                            className="btn-primary text-sm px-4 py-2"
                            data-testid={`product-${product.id}-details`}
                          >
                            Dettagli
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="sm:w-48 h-48">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">
                            {product.brand.replace('_', ' ')}
                          </span>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-medium mb-2">{product.name}</h3>
                        <p className="text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-light">€{product.price.toFixed(2)}</span>
                          <Link 
                            to={`/product/${product.id}`}
                            className="btn-primary text-sm px-6 py-2"
                          >
                            Dettagli
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
