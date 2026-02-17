import { APIRequestContext } from '@playwright/test';

import { BaseClient } from './base.client.ts';
import { User } from '../models/user.model.ts';

/**
 *
 */
export class UserClient extends BaseClient {
  constructor(
    private readonly request: APIRequestContext,
    apiKey?: string,
  ) {
    super(apiKey);
  }

  /**
   * Retrieves a user by their username.
   * @param username The username of the user to retrieve.
   * @returns A Promise that resolves to the APIResponse from the GET request to retrieve a user by username.
   */
  async getUserByUsername(username: string) {
    return await this.request.get(`user/${username}`, {
      headers: this.getHeaders(),
    });
  }
  /**
   *  Creates a new user in the system.
   * @param user An object representing the user to be created, containing properties such as id, username, firstName, lastName, email, password, phone, and userStatus.
   * @returns A Promise that resolves to the APIResponse from the POST request to create a new user.
   */
  async createUser(user: User) {
    return await this.request.post('user', {
      headers: this.getHeaders(),
      data: user,
    });
  }
  /**
   *  Deletes a user by their username.
   * @param username  The username of the user to be deleted.
   * @returns  A Promise that resolves to the APIResponse from the DELETE request to delete a user by username.
   */
  async deleteUserByUsername(username: string) {
    return await this.request.delete(`user/${username}`, {
      headers: this.getHeaders(),
    });
  }
}
