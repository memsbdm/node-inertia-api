import Restaurant, { type RestaurantId } from '#restaurants/restaurants/models/restaurant'
import type { StoreRestaurantDto } from '#restaurants/restaurants/dtos/store_restaurant_dto'
import type { UserId } from '#users/models/user'
import { UpdateRestaurantDto } from '../dtos/update_restaurant_dto.js'

export class RestaurantRepository {
  getById(restaurantId: RestaurantId | null) {
    return Restaurant.find(restaurantId)
  }

  getByUserId(userId: UserId) {
    return Restaurant.query().where('user_id', userId)
  }

  createMany(restaurants: StoreRestaurantDto[]) {
    return Restaurant.createMany(restaurants)
  }

  update(restaurant: Restaurant, dto: UpdateRestaurantDto) {
    return restaurant.merge(dto).save()
  }

  delete(restaurant: Restaurant) {
    return restaurant.delete()
  }
}
