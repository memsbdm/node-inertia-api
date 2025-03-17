import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Article from '#articles/models/article'
import Menu, { type MenuId } from '#menus/models/menu'
import { Opaque } from '@adonisjs/core/types/helpers'
export type CategoryId = Opaque<'CategoryId', number>

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: CategoryId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare position: number

  @column()
  declare menuId: MenuId

  @belongsTo(() => Menu)
  declare menu: BelongsTo<typeof Menu>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>
}
