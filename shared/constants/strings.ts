/**
 * Common string literals used across tests/pages.
 */
export const STRINGS = {
  loginErrorText: 'Epic sadface: Username and password do not match any user in this service',
} as const;

export type String = (typeof STRINGS)[keyof typeof STRINGS];
