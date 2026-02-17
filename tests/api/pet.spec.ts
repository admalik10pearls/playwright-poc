import { test, expect } from '@playwright/test';

import { createApiContext } from '../../shared/api/apiContext.ts';
import { PetstoreClient } from '../../shared/api/clients/petstore.client.ts';
import { Pet } from '../../shared/api/models/pet.model.ts';

test.describe('Petstore API tests', () => {
  let client: PetstoreClient;

  test.beforeEach(async () => {
    const apiContext = await createApiContext();
    client = new PetstoreClient(apiContext, process.env.PETSTORE_API_KEY);
  });

  test('find pets by status', { tag: '@smoke' }, async () => {
    const response = await client.findPetsByStatus('available');
    client.verifyStatusCode(response, 200);
    const pets: Pet[] = await response.json();
    expect(pets.length).toBeGreaterThan(0);
    console.log('Found pets:', pets.length);
  });

  test('get a single pet by ID (dynamic)', { tag: '@smoke' }, async () => {
    const listResponse = await client.findPetsByStatus('available');
    const pets: Pet[] = await listResponse.json();
    const petId = pets[1].id!;
    const response = await client.getPetById(petId);
    client.verifyStatusCode(response, 200);
    await client.verifyKeyInBody(response, 'id');

    const pet: Pet = await response.json();
    expect(pet.id).toBe(petId);
    expect(pet.name).toBeDefined();
    console.log('Retrieved pet details:', pet);
  });

  test('add a new pet', { tag: '@smoke' }, async () => {
    const newPet: Pet = {
      id: 100,
      name: 'TestPet',
      status: 'available',
      photoUrls: [],
    };
    const response = await client.addPet(newPet);
    client.verifyStatusCode(response, 200);
    const addedPet: Pet = await response.json();
    expect(addedPet.id).toBe(newPet.id);
    console.log('Added pet details:', addedPet);
    await client.verifyKeyValue(response, 'id', 100);
    await client.verifyBody(response, {
      name: 'TestPet',
      status: 'available',
    });
  });
  test('error 404: Get pet with non-existent ID', { tag: '@smoke' }, async () => {
    const nonExistentId = 999999999;
    const response = await client.getPetById(nonExistentId);
    await client.verifyErrorResponse(response, 404, 'Pet not found');
    await expect(response).not.toBeOK();
  });
});
