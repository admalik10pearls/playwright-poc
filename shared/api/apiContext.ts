import { request, APIRequestContext } from '@playwright/test';

/**
 * Create a Playwright API request context configured for the Petstore API.
 * If `PETSTORE_API_KEY` is present in the environment it will be included as a header.
 */
export async function createApiContext(): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: 'https://petstore.swagger.io/v2/',
    extraHTTPHeaders: process.env.PETSTORE_API_KEY
      ? { api_key: process.env.PETSTORE_API_KEY }
      : undefined,
  });
}
