import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Restaurant from '#restaurants/restaurants/models/restaurant'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export type UserId = Opaque<'UserId', string>

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare oauthProviderId: string

  @hasMany(() => Restaurant)
  declare restaurants: HasMany<typeof Restaurant>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
