import { APIRequestContext } from '@playwright/test';

import { Pet } from '../models/pet.model.ts';

/**
 * Simple client for the Swagger Petstore API used in tests.
 */
export class PetstoreClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly apiKey?: string,
  ) {}

  /**
   * Build request headers including API key when available.
   * @returns {object | undefined} Headers object or undefined if no API key is set.
   */
  private getHeaders(): { [key: string]: string } | undefined {
    if (!this.apiKey) return undefined;
    return { api_key: this.apiKey };
  }

  /**
   * Retrieve a pet by id.
   * @param id - pet id
   * @returns {Promise<Pet>} The pet data returned from the API.
   */
  async getPetById(id: number): Promise<Pet> {
    const response = await this.request.get(`pet/${id}`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  /**
   * Find pets by their status.
   * @param status - one of 'available' | 'pending' | 'sold'
   * @returns {Promise<Pet[]>} An array of pets matching the given status.
   */
  async findPetsByStatus(status: 'available' | 'pending' | 'sold'): Promise<Pet[]> {
    const response = await this.request.get(`pet/findByStatus`, {
      params: { status },
      headers: this.getHeaders(),
    });
    return response.json();
  }
}
