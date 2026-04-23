export interface CartItem {
  id: string | number;
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
}

export interface AddToCartRequest {
  productId: string | number;
  quantity: number;
}

export interface UpdateQuantityRequest {
  cartItemId: string | number;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  data: {
    items: CartItem[];
    total: number;
  };
  message?: string;
}
