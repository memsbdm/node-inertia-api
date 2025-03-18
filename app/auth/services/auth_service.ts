import type { StoreRestaurantDto } from '#restaurants/restaurants/dtos/store_restaurant_dto'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'
import type { StoreUserDto } from '#users/dtos/store_user_dto'
import type User from '#users/models/user'
import { UserService } from '#users/services/user_service'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(
    private userSvc: UserService,
    private restaurantSvc: RestaurantService
  ) {}

  findByProviderId(id: string): Promise<User | null> {
    return this.userSvc.findByProviderId(id)
  }

  async register(user: StoreUserDto, _: string): Promise<User> {
    const createdUser = await this.userSvc.register(user)

    const businesses: StoreRestaurantDto[] = [
      {
        userId: createdUser.id,
        title: 'Mems Restaurant 1',
        addressLine: '123 Main St',
        locality: 'Anytown',
        regionCode: 'CA',
        postalCode: '12345',
        storeCode: Math.random().toString(36).substring(2, 15),
      },
      {
        userId: createdUser.id,
        title: 'Mems Restaurant 2',
        addressLine: '456 Main St',
        locality: 'Anytown',
        regionCode: 'CA',
        postalCode: '12347',
        storeCode: Math.random().toString(36).substring(2, 15),
      },
    ]
    // TODO: Uncomment this when we have a way to get the businesses
    // const businesses = await this.restaurantSvc.fetchGoogleBusinesses(
    //   googleAccessToken,
    //   createdUser.id
    // )
    await this.restaurantSvc.createMany(businesses)
    const createdUserWithBusinesses = await this.userSvc.findById(createdUser.id)

    return createdUserWithBusinesses!
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.userSvc.generateAccessToken(user)
  }
}
