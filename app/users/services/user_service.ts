import type { StoreUserDto } from '#users/dtos/store_user_dto'
import type User from '#users/models/user'
import { UserRepository } from '#users/repositories/user_repository'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import { inject } from '@adonisjs/core'

@inject()
export class UserService {
  constructor(private repository: UserRepository) {}

  register(user: StoreUserDto): Promise<User> {
    return this.repository.store(user)
  }

  findByProviderID(id: string): Promise<User | null> {
    return this.repository.findByProviderID(id)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.repository.generateAccessToken(user)
  }
}
