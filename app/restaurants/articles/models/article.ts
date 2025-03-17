import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Category, { type CategoryId } from '#categories/models/category'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { Opaque } from '@adonisjs/core/types/helpers'

export type ArticleId = Opaque<'ArticleId', number>

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: ArticleId

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare imageUrl: string | null

  @column()
  declare categoryId: CategoryId

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
