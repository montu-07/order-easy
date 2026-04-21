declare module "host/authSlice" {
  export const loginUser: (credentials: { email: string; password: string }) => any;
  export const clearError: () => any;
  export const clearSuccess: () => any;
}

declare module "host/hooks" {
  export const useAppDispatch: () => any;
  export const useAppSelector: (selector: any) => any;
}

declare module "host/store" {
  export const store: any;
}