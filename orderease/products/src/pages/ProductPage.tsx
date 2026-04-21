import React from 'react';
import ProductList from '../components/ProductList';
import '../index.css';

const ProductPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Premium Products Collection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover our curated selection of high-quality products at unbeatable prices
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Free</div>
                <div className="text-blue-100">Fast Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              In Stock
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3-2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v-1a2 2 0 00-2-2H8a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-2z" />
              </svg>
              Best Prices
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 6l8 4m8-4v10m-8-4v10m-8-4l8 4m-8-4v6l8 4" />
              </svg>
              Fast Delivery
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V8m0 13l9-9m-9 9l-9-9m9 9H3m9 9a9 9 0 10-18 0 9 9 0 0118 0z" />
              </svg>
              Easy Returns
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-8">
        <ProductList />
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get exclusive offers and be the first to know about new products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-900 flex-1 max-w-md"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
