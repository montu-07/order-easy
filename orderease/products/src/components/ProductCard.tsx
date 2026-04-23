import React from 'react';
import { Product } from '../services/productApi';
import { useAppDispatch } from 'host/hooks';
import { addToCart } from 'host/cartSlice';
import { cartApi } from '../services/cartApi';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const dispatch = useAppDispatch();
  const displayName = product.title || product.name || 'Unknown Product';
  const rating = 4.2; // Default rating - can be updated from API
  const category = 'Electronics'; // Default category - can be updated from API

  const handleAddToCart = async () => {
    try {
      // Show loading state
      const loadingMessage = document.createElement('div');
      loadingMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      loadingMessage.textContent = 'Adding to cart...';
      document.body.appendChild(loadingMessage);

      // Call backend API
      await cartApi.addToCart({
        foodId: product.id,
        name: displayName,
        price: product.price,
        quantity: 1,
        image: product.image,
        description: product.description,
      });

      // Update Redux store only after successful API call
      const cartItem = {
        productId: product.id,
        name: displayName,
        price: product.price,
        image: product.image,
        description: product.description,
      };
      
      dispatch(addToCart(cartItem));

      // Show success feedback only after API success
      if (document.body.contains(loadingMessage)) {
        document.body.removeChild(loadingMessage);
      }
      
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
      successMessage.textContent = 'Added to cart!';
      document.body.appendChild(successMessage);
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);

    } catch (error) {
      // Remove loading message
      const loadingMessage = document.querySelector('.fixed.top-4.right-4');
      if (loadingMessage && document.body.contains(loadingMessage)) {
        document.body.removeChild(loadingMessage);
      }

      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMessage.textContent = error instanceof Error ? error.message : 'Failed to add to cart';
      document.body.appendChild(errorMessage);
      setTimeout(() => {
        if (document.body.contains(errorMessage)) {
          document.body.removeChild(errorMessage);
        }
      }, 3000);
    }
  };
  
  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.118 1.54l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.118 1.54l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            <path d="M10 12.5l-2.8 2.034c-.784.57-1.838.197-1.118 1.54l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.118 1.54l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" opacity="0.5"/>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.118 1.54l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 border border-gray-200 hover:border-blue-300 overflow-hidden group">
      {/* Product Image Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <img 
          src={product.image || 'https://picsum.photos/400/300'} 
          alt={displayName}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Discount Badge (if applicable) */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
            20% OFF
          </span>
        </div>
      </div>
      
      {/* Product Info Section */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {displayName}
        </h3>
        
        {/* Rating */}
        <div className="mb-3">
          {renderStars(rating)}
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 line-through">
              ${(product.price * 1.25).toFixed(2)}
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.331 2.293l.576.577a1 1 0 001.415 0l3.85-3.85a1 1 0 000-1.414l-3.85-3.85a1 1 0 00-1.415 0l-.576.577M21 3a1 1 0 011 1v7a1 1 0 01-1 1H9a1 1 0 01-1-1V4a1 1 0 011-1h7z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
