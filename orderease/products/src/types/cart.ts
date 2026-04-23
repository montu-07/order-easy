export interface CartItem {
  id: string | number;
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface CartResponse {
  success: boolean;
  data: {
    items: CartItem[];
  };
}

export interface AddToCartRequest {
  foodId: string | number;
  quantity?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
}

export interface UpdateQuantityRequest {
  cartItemId: string | number;
  quantity: number;
}
