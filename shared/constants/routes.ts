export const ROUTES = {
  inventory: '/inventory.html',
} as const;
export type Route = (typeof ROUTES)[keyof typeof ROUTES];
