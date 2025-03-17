import { inject } from '@adonisjs/core'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DeleteRestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  async execute({ auth, params, response }: HttpContext) {
    const { id } = params
    await this.restaurantService.delete(id, auth.user!.id)
    return response.redirect().back()
  }
}
