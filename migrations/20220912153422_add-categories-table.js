/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', (table) => {
        table.increments('id').primary()
        table.string('description').notNullable()
        table.enu('type', ['I', 'O']).notNullable().comment('I - Income | O - Outcome')
        table.integer('author_id').notNullable().references('id').inTable('users')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.integer('modifier_id').nullable().references('id').inTable('users')
        table.timestamp('updated_at').nullable()
        table.boolean('default').defaultTo(false)
        table.boolean('deleted').defaultTo(false)
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories')
};
