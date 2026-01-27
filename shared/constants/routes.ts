export const ROUTES = {
  inventory: '/inventory.html',
  cart: '/cart.html',
} as const;
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
