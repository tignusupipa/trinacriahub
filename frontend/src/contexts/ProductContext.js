import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchProducts = async (category = null, brand = null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (brand) params.append('brand', brand);
      
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products?${params}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        productData
      );
      setProducts(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to create product' 
      };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
        productData
      );
      setProducts(prev => 
        prev.map(p => p.id === id ? response.data : p)
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to update product' 
      };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to delete product' 
      };
    }
  };

  const fetchFilters = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/filters/categories`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/filters/brands`)
      ]);
      
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const value = {
    products,
    categories,
    brands,
    loading,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
