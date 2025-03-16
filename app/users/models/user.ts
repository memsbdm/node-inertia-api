import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export type UserID = Opaque<'UserID', string>

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: UserID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare oauthProviderID: string

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
