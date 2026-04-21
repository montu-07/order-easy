// Product API service with real backend integration

export interface Product {
  id: string | number;
  title?: string;
  name?: string;
  price: number;
  description: string;
  image?: string;
}

interface ApiResponse<T> {
  data: T;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const productApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/menu`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: ${response.status} ${errorText}`);
      }
      const apiResponse: ApiResponse<Product[]> = await response.json();
      return apiResponse.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error instanceof Error) {
        throw new Error(`Unable to load products: ${error.message}`);
      }
      throw new Error('Network error while loading products');
    }
  },

  // Get single product
  getById: async (id: string | number): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/menu/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch product: ${response.status} ${errorText}`);
      }
      const apiResponse: ApiResponse<Product> = await response.json();
      return apiResponse.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error instanceof Error) {
        throw new Error(`Unable to load product: ${error.message}`);
      }
      throw new Error('Network error while loading product');
    }
  },

  // Add to cart
  addToCart: async (productId: string | number): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to cart: ${response.status} ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error instanceof Error) {
        throw new Error(`Unable to add to cart: ${error.message}`);
      }
      throw new Error('Network error while adding to cart');
    }
  },
};
