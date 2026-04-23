// Order API service for cart functionality
const API_BASE_URL = 'http://localhost:3001/api';

export const orderApi = {
  // Add item to cart (create order)
  addToCart: async (productData: {
    productId: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
  }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productData.productId,
          quantity: productData.quantity,
          // Add any other required fields based on backend schema
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
};
