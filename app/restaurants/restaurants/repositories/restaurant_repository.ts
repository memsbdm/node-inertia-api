import Restaurant, { type RestaurantId } from '#restaurants/restaurants/models/restaurant'
import type { StoreRestaurantDto } from '#restaurants/restaurants/dtos/store_restaurant_dto'
import type { UserId } from '#users/models/user'

export class RestaurantRepository {
  getById(restaurantId: RestaurantId) {
    return Restaurant.findOrFail(restaurantId)
  }

  getByUserId(userId: UserId) {
    return Restaurant.query().where('user_id', userId)
  }

  createMany(restaurants: StoreRestaurantDto[]) {
    return Restaurant.createMany(restaurants)
  }

  delete(restaurant: Restaurant) {
    return restaurant.delete()
  }
}
