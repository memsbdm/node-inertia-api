import type { StoreUserDto } from '#users/dtos/store_user_dto'

import User from '#users/models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

export class UserRepository {
  store(user: StoreUserDto): Promise<User> {
    return User.create(user)
  }

  findByProviderID(id: string): Promise<User | null> {
    return User.findBy('oauth_provider_id', id)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return User.accessTokens.create(user)
  }
}
