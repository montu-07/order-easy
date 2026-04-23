import { CartItem, CartResponse, AddToCartRequest, UpdateQuantityRequest } from '../types/cart';
import { getAuthHeaders } from '../utils/auth';

const API_BASE_URL = 'http://localhost:3001/api';

export const cartApi = {
  // Get cart items
  getCart: async (): Promise<CartItem[]> => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data: CartResponse = await response.json();
      return data.data.items;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (request: AddToCartRequest): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          foodId: request.productId,
          quantity: request.quantity || 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: async (request: UpdateQuantityRequest): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/cart/${request.cartItemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          quantity: request.quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (cartItemId: string | number): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (): Promise<void> => {
    try {
      const headers = getAuthHeaders();
      
      if (!headers.Authorization) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};
