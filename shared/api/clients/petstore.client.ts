import { APIRequestContext } from '@playwright/test';
import { Pet } from '../models/pet.model.ts';

/**
 * Simple client for the Swagger Petstore API used in tests.
 */
export class PetstoreClient {
  constructor(
    private request: APIRequestContext,
    private apiKey?: string,
  ) {}

  /**
   * Build request headers including API key when available.
   */
  private getHeaders(): { [key: string]: string } | undefined {
    if (!this.apiKey) return undefined;
    return { api_key: this.apiKey };
  }

  /**
   * Retrieve a pet by id.
   * @param id - pet id
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
   */
  async findPetsByStatus(status: 'available' | 'pending' | 'sold'): Promise<Pet[]> {
    const response = await this.request.get(`pet/findByStatus`, {
      params: { status },
      headers: this.getHeaders(),
    });
    return response.json();
  }
}
