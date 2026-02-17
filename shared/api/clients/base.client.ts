import { APIResponse, expect } from '@playwright/test';

/**
 * BaseClient provides common functionality for API clients, such as status code verification and response validation.
 *  It can be extended by specific API clients to implement endpoint-specific methods while reusing shared logic.
 */
export class BaseClient {
  verifyStatusCode(response: APIResponse, expectedCode: number = 200) {
    expect(response.status()).toBe(expectedCode);
    console.log(`Verified Status Code: ${response.status()}`);
  }

  /**
   *
   * @param response The Playwright APIResponse object.
   * @param key The property name to check.
   */
  async verifyKeyInBody(response: APIResponse, key: string) {
    const body = await response.json();
    expect(body).toHaveProperty(key);
    console.log(`Verified key '${key}' exists in response.`);
  }

  /**
   * Verifies that a specific key exists and matches the expected value.
   * @param response The Playwright APIResponse object.
   * @param key The property name to check.
   * @param expectedValue The value you expect that property to have.
   */
  async verifyKeyValue(response: APIResponse, key: string, expectedValue: unknown) {
    const body = await response.json();

    // Check if key exists first for a better error message
    expect(body, `Key '${key}' not found in response body`).toHaveProperty(key);

    // Check the actual value
    expect(body[key], `Value for key '${key}' did not match`).toBe(expectedValue);

    console.log(`Verified key '${key}' has value: ${expectedValue}`);
  }

  /**
   * This method checks that the response body contains all the key-value pairs specified in expectedData.
   * @param response The Playwright APIResponse object.
   * @param expectedData  An object containing the expected key-value pairs to match in the response body.
   */
  async verifyBody(response: APIResponse, expectedData: Record<string, unknown>) {
    const body = await response.json();
    expect(body).toMatchObject(expectedData);
    console.log('Response body matches the expected schema.');
  }
}
