import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.decimal('price', 2).notNullable()
      table.string('image_url').nullable()
      table.integer('category_id').references('categories.id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
