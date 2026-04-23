declare module "host/cartSlice" {
  export const addToCart: (item: any) => any;
  export const removeFromCart: (id: any) => any;
  export const updateQuantity: (id: any, quantity: number) => any;
  export const clearCart: () => any;
  export const getCart: () => any;
}

declare module "host/hooks" {
  export const useAppDispatch: () => any;
  export const useAppSelector: (selector: any) => any;
}

declare module "host/store" {
  const store: any;
  export default store;
}
