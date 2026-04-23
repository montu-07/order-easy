import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartList from '../components/CartList';
import { cartApi } from '../services/cartApi';
import { useAppDispatch, useAppSelector } from 'host/hooks';
import { clearCart } from 'host/cartSlice';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, isLoading, error, total } = useAppSelector((state: any) => state.cart);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication and load cart data
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const loadCart = async () => {
      try {
        setLocalLoading(true);
        setLocalError(null);
        await cartApi.getCart();
        // The cart items will be automatically loaded via Redux
      } catch (error) {
        setLocalError(error instanceof Error ? error.message : 'Failed to load cart');
      } finally {
        setLocalLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleClearCart = async () => {
    try {
      setLocalLoading(true);
      await cartApi.clearCart();
      dispatch(clearCart());
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'Failed to clear cart');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    alert('Checkout functionality coming soon!');
  };

  const isLoadingState = isLoading || localLoading;
  const errorState = error || localError;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartList items={items} isLoading={isLoadingState} error={errorState} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoadingState}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoadingState ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <button
                  onClick={handleClearCart}
                  disabled={items.length === 0 || isLoadingState}
                  className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Clear Cart
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
