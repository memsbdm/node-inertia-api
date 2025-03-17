import { inject } from '@adonisjs/core'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EditRestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  async render({ auth, params, inertia }: HttpContext) {
    const { id } = params
    const restaurant = await this.restaurantService.getById(id, auth.user!.id)
    return inertia.render('restaurants/edit', { restaurant })
  }
}
