import React from 'react';
import { Product } from '../services/productApi';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const displayName = product.title || product.name || 'Unknown Product';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-transparent hover:border-blue-200">
      <div className="relative overflow-hidden rounded-t-lg mb-4">
        <img 
          src={product.image || 'https://picsum.photos/200'} 
          alt={product.name || product.title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{displayName}</h3>
      <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      <button 
        onClick={() => onAddToCart(product.id)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg active:scale-95 font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
