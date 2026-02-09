import { test, expect } from '@playwright/test';

import { createApiContext } from '../../shared/api/apiContext.ts';
import { PetstoreClient } from '../../shared/api/clients/petstore.client.ts';

test.describe('Petstore API GET tests', () => {
  let client: PetstoreClient;

  test.beforeAll(async () => {
    const apiContext = await createApiContext();
    client = new PetstoreClient(apiContext, process.env.PETSTORE_API_KEY);
  });

  test('find pets by status', async () => {
    const pets = await client.findPetsByStatus('available');
    expect(pets.length).toBeGreaterThan(0);
    console.log('Found pets:', pets.length);
  });

  test('get a single pet by ID (dynamic)', async () => {
    const pets = await client.findPetsByStatus('available');
    const petId = pets[0].id;

    const pet = await client.getPetById(petId);
    expect(pet.id).toBe(petId);
    expect(pet.name).toBeDefined();

    console.log('Pet details:', pet);
  });
});
