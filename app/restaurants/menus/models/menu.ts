import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#categories/models/category'
import Restaurant from '#restaurants/restaurants/models/restaurant'
import type { RestaurantId } from '#restaurants/restaurants/models/restaurant'
import { Opaque } from '@adonisjs/core/types/helpers'

export type MenuId = Opaque<'MenuId', number>

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: MenuId

  @column()
  declare restaurantId: RestaurantId

  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>

  @hasMany(() => Category)
  declare categories: HasMany<typeof Category>
}
