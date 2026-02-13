/**
 * Common string literals used across tests/pages.
 */
export const STRINGS = {
  loginErrorText: 'Epic sadface: Username and password do not match any user in this service',
  loginErrorTextLockedOut: 'Epic sadface: Sorry, this user has been locked out.',
} as const;

export type String = (typeof STRINGS)[keyof typeof STRINGS];
