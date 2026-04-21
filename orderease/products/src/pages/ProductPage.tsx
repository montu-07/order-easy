import React from 'react';
import ProductList from '../components/ProductList';

const ProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
        <p className="text-gray-600 mb-8">Browse our collection of products</p>
        
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
