import { APIRequestContext, APIResponse } from '@playwright/test';

import { BaseClient } from './base.client.ts';
import { Pet } from '../models/pet.model.ts';

/**
 * This client is designed to interact with the Swagger Petstore API for testing purposes.
 */
export class PetstoreClient extends BaseClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly apiKey?: string,
  ) {
    super();
  }

  /**
   * Generates headers for API requests, including the API key if it is provided.
   * @returns An object containing the headers for the API request, or undefined if no API key is set.
   */
  private getHeaders(): { [key: string]: string } | undefined {
    return this.apiKey ? { api_key: this.apiKey } : undefined;
  }

  /**
   * Retrieves a pet by its ID.
   * @param id The ID of the pet to retrieve.
   * @returns A Promise that resolves to the APIResponse from the GET request to retrieve a pet by ID.
   */
  async getPetById(id: number): Promise<APIResponse> {
    return await this.request.get(`pet/${id}`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Finds pets by their status.
   * @param status The status of the pets to find (available, pending, sold).
   * @returns A Promise that resolves to the APIResponse from the GET request to find pets by status.
   */
  async findPetsByStatus(status: 'available' | 'pending' | 'sold'): Promise<APIResponse> {
    return await this.request.get(`pet/findByStatus`, {
      params: { status },
      headers: this.getHeaders(),
    });
  }

  /**
   * Adds a new pet to the store.
   * @param pet  The Pet object containing the details of the pet to add.
   * @returns A Promise that resolves to the APIResponse from the POST request to add a new pet.
   */
  async addPet(pet: Pet): Promise<APIResponse> {
    return await this.request.post(`pet`, {
      headers: this.getHeaders(),
      data: pet,
    });
  }
}
