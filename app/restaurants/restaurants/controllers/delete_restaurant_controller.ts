import { inject } from '@adonisjs/core'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'
import type { HttpContext } from '@adonisjs/core/http'
import ForbiddenException from '#core/exceptions/forbidden_exception'
import NotFoundException from '#core/exceptions/not_found_exception'

@inject()
export default class DeleteRestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  async execute({ auth, params, response }: HttpContext) {
    const { id } = params
    const restaurant = await this.restaurantService.getById(id)
    if (!restaurant || restaurant.userId !== auth.user!.id) {
      return response.redirect().toPath('/')
    }
    await this.restaurantService.delete(restaurant)

    return response.redirect().back()
  }

  async apiExecute({ auth, params, response }: HttpContext) {
    const { id } = params
    const restaurant = await this.restaurantService.getById(id)
    if (!restaurant) {
      throw new NotFoundException()
    }
    if (restaurant.userId !== auth.user!.id) {
      throw new ForbiddenException()
    }
    await this.restaurantService.delete(restaurant)

    return response.status(204)
  }
}
