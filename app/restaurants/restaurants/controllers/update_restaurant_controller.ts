import { inject } from '@adonisjs/core'
import { RestaurantService } from '#restaurants/restaurants/services/restaurant_service'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import type { UpdateRestaurantDto } from '#restaurants/restaurants/dtos/update_restaurant_dto'
import NotFoundException from '#core/exceptions/not_found_exception'
import ForbiddenException from '#core/exceptions/forbidden_exception'
@inject()
export default class UpdateRestaurantController {
  constructor(private restaurantService: RestaurantService) {}
  static UpdateValidator = vine.compile(
    vine.object({
      description: vine.string().optional(),
      phone: vine.string().mobile().optional(),
    })
  )

  async render({ auth, inertia, params, response }: HttpContext) {
    const { id } = params
    const restaurant = await this.restaurantService.getById(id)
    if (!restaurant || restaurant.userId !== auth.user!.id) {
      return response.redirect().toPath('/')
    }
    return inertia.render('restaurants/update', { restaurant })
  }

  async execute({ auth, params, response, request }: HttpContext) {
    const { description, phone } = await request.validateUsing(
      UpdateRestaurantController.UpdateValidator
    )

    const { id } = params
    const restaurant = await this.restaurantService.getById(id)
    if (!restaurant || restaurant.userId !== auth.user!.id) {
      return response.redirect().toPath('/')
    }
    const dto: UpdateRestaurantDto = {
      description: description ?? '',
      phone: phone ?? '',
    }

    await this.restaurantService.update(restaurant, dto)

    return response.redirect().back()
  }

  async apiExecute({ auth, params, response, request }: HttpContext) {
    const { description, phone } = await request.validateUsing(
      UpdateRestaurantController.UpdateValidator
    )

    const { id } = params
    const restaurant = await this.restaurantService.getById(id)
    if (!restaurant) {
      throw new NotFoundException()
    }
    if (restaurant.userId !== auth.user!.id) {
      throw new ForbiddenException()
    }
    const dto: UpdateRestaurantDto = {
      description: description ?? '',
      phone: phone ?? '',
    }

    const updatedRestaurant = await this.restaurantService.update(restaurant, dto)

    return response.json(updatedRestaurant)
  }
}
