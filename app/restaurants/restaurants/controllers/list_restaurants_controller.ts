import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'

@inject()
export default class ListRestaurantsController {
  constructor(private restaurantService: RestaurantService) {}

  async render({ auth, inertia }: HttpContext) {
    const restaurants = await this.restaurantService.getByUserId(auth.user!.id)
    return inertia.render('restaurants/restaurant-list', { restaurants })
  }
}
