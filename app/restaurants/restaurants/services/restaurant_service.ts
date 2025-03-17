import type { UserId } from '#users/models/user'
import { inject } from '@adonisjs/core'
import { RestaurantRepository } from '#restaurants/restaurants/repositories/restaurant_repository'
import type { StoreRestaurantDto } from '#restaurants/restaurants/dtos/store_restaurant_dto'
import type { RestaurantId } from '#restaurants/restaurants/models/restaurant'
@inject()
export class RestaurantService {
  constructor(private repository: RestaurantRepository) {}

  getByUserId(userId: UserId) {
    return this.repository.getByUserId(userId)
  }

  async getById(restaurantId: RestaurantId, userId: UserId) {
    const restaurant = await this.repository.getById(restaurantId)
    if (restaurant.userId !== userId) {
      // TODO: Handle this
    }
    return restaurant
  }

  createMany(restaurants: StoreRestaurantDto[]) {
    return this.repository.createMany(restaurants)
  }

  async delete(restaurantId: RestaurantId, userId: UserId) {
    const restaurant = await this.repository.getById(restaurantId)
    if (restaurant.userId !== userId) {
      // TODO: Handle this
    }
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
