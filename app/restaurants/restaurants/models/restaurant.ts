import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Menu from '#menus/models/menu'
import type { UserId } from '#users/models/user'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#users/models/user'

export type RestaurantId = Opaque<'RestaurantId', string>

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  declare id: RestaurantId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare addressLine: string

  @column()
  declare locality: string

  @column()
  declare regionCode: string

  @column()
  declare postalCode: string

  @column()
  declare latitude: string | null

  @column()
  declare longitude: string | null

  @column()
  declare imageUrl: string | null

  @column()
  declare phone: string | null

  @column()
  declare storeCode: string

  @column()
  declare userId: UserId

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Menu)
  declare menus: HasMany<typeof Menu>
}
