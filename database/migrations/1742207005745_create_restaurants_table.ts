import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('address_line').notNullable()
      table.string('locality').notNullable()
      table.string('region_code').notNullable()
      table.string('postal_code').notNullable()
      table.string('image_url').nullable()
      table.string('phone').nullable()
      table.string('store_code').notNullable().unique()
      table.uuid('user_id').references('users.id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
