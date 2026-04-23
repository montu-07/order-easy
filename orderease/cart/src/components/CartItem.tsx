import React from 'react';
import { CartItem } from '../types/cart';
import { useAppDispatch } from 'host/hooks';
import { removeFromCart, updateQuantity } from 'host/cartSlice';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      dispatch(updateQuantity(item.id, newQuantity));
    }
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      handleUpdateQuantity(item.quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (item.quantity < 99) {
      handleUpdateQuantity(item.quantity + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image || 'https://picsum.photos/seed/product/100/100'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {item.description || 'No description available'}
            </p>
            <p className="text-lg font-bold text-blue-600">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
                  disabled={item.quantity <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-3 py-1 text-gray-900 font-medium min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
                  disabled={item.quantity >= 99}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemoveFromCart}
              className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Item Total */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-gray-600 mb-1">Subtotal</p>
          <p className="text-xl font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
