import type { StoreUserDto } from '#users/dtos/store_user_dto'
import type User from '#users/models/user'
import { UserService } from '#users/services/user_service'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(private userSvc: UserService) {}

  findByProviderID(id: string): Promise<User | null> {
    return this.userSvc.findByProviderID(id)
  }

  register(user: StoreUserDto): Promise<User> {
    return this.userSvc.register(user)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.userSvc.generateAccessToken(user)
  }
}
