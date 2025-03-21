import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('oauth_provider_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
