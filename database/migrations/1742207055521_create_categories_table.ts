import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('position').notNullable()
      table.integer('menu_id').references('menus.id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
