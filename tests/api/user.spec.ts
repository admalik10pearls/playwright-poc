import { test, expect } from '@playwright/test';

import { createApiContext } from '../../shared/api/apiContext.ts';
import { UserClient } from '../../shared/api/clients/user.client.ts';

test.describe('User API tests', () => {
  let client: UserClient;

  test.beforeEach(async () => {
    const apiContext = await createApiContext();
    client = new UserClient(apiContext, process.env.PETSTORE_API_KEY);
  });
  test('error 404: Get user with non-existent username', { tag: '@smoke' }, async () => {
    const nonExistentUsername = 'abc';
    const response = await client.getUserByUsername(nonExistentUsername.toString());
    const body = await response.json();
    console.log('Response Body:', JSON.stringify(body, null, 2));
    await client.verifyErrorResponse(response, 404, 'User not found');
    await expect(response).not.toBeOK();
  });
  test('create user', { tag: '@smoke' }, async () => {
    const newUser = {
      id: 123,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: process.env.APP_PASS!,
      phone: '+124567890',
      userStatus: 0,
    };
    const createResponse = await client.createUser(newUser);
    await expect(createResponse).toBeOK();
    const createdUser = await createResponse.json();
    console.log('Created User:', JSON.stringify(createdUser, null, 2));
    await client.verifyBody(createResponse, {
      code: 200,
      message: '123',
      type: 'unknown',
    });
  });
  test('get user by username', { tag: '@smoke' }, async () => {
    const username = 'testuser';
    const response = await client.getUserByUsername(username);
    await expect(response).toBeOK();
    const user = await response.json();
    console.log('Retrieved User:', JSON.stringify(user, null, 2));
    await client.verifyKeyInBody(response, 'id');
    await client.verifyBody(response, {
      username: 'testuser',
      userStatus: 0,
    });
  });
  test('delete a user', { tag: '@smoke' }, async () => {
    const newUser = {
      id: 1234,
      username: 'testusertodelete',
      firstName: 'Testt',
      lastName: 'Userr',
      email: 'testt@test.com',
      password: process.env.APP_PASS!,
      phone: '+124567890',
      userStatus: 0,
    };
    const createResponse = await client.createUser(newUser);
    await expect(createResponse).toBeOK();
    const username = 'testusertodelete';
    const response = await client.deleteUserByUsername(username);
    await expect(response).toBeOK();
    const deleteBody = await response.json();
    console.log('Delete Response:', JSON.stringify(deleteBody, null, 2));
    await client.verifyBody(response, {
      code: 200,
      message: username,
      type: 'unknown',
    });
    // Verify that the user has been deleted
    const getResponse = await client.getUserByUsername(username);
    const getBody = await getResponse.json();
    console.log('Get Response:', JSON.stringify(getBody, null, 2));
    await expect(getResponse).not.toBeOK();
  });
});
