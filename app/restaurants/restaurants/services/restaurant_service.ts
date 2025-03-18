import type { UserId } from '#users/models/user'
import { inject } from '@adonisjs/core'
import { RestaurantRepository } from '#restaurants/restaurants/repositories/restaurant_repository'
import type { StoreRestaurantDto } from '#restaurants/restaurants/dtos/store_restaurant_dto'
import type { RestaurantId } from '#restaurants/restaurants/models/restaurant'
import type { UpdateRestaurantDto } from '#restaurants/restaurants/dtos/update_restaurant_dto'
import type Restaurant from '#restaurants/restaurants/models/restaurant'

@inject()
export class RestaurantService {
  constructor(private repository: RestaurantRepository) {}

  getByUserId(userId: UserId) {
    return this.repository.getByUserId(userId)
  }

  async getById(restaurantId: RestaurantId): Promise<Restaurant | null> {
    return this.repository.getById(restaurantId)
  }

  createMany(restaurants: StoreRestaurantDto[]): Promise<Restaurant[]> {
    return this.repository.createMany(restaurants)
  }

  update(restaurant: Restaurant, dto: UpdateRestaurantDto): Promise<Restaurant> {
    return this.repository.update(restaurant, dto)
  }

  delete(restaurant: Restaurant): Promise<void> {
    return this.repository.delete(restaurant)
  }

  async fetchGoogleBusinesses(
    googleAccessToken: string,
    userId: UserId
  ): Promise<StoreRestaurantDto[]> {
    type GoogleBusinessLocation = {
      title: string
      storeCode: string
      storefrontAddress: {
        addressLines: string[]
        locality: string
        regionCode: string
        postalCode: string
      }
    }

    const response = await fetch(
      'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/me/locations?readMask=title,storeCode,storefrontAddress,latlng',
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    )

    const data = (await response.json()) as { locations: GoogleBusinessLocation[] }
    return data.locations.map((location) => ({
      userId: userId,
      title: location.title,
      addressLine: location.storefrontAddress.addressLines[0],
      locality: location.storefrontAddress.locality,
      regionCode: location.storefrontAddress.regionCode,
      postalCode: location.storefrontAddress.postalCode,
      storeCode: location.storeCode,
    })) as StoreRestaurantDto[]
  }
}
