import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('restaurant_id').references('restaurants.id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
