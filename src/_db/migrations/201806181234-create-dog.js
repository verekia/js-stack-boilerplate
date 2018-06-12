module.exports = {
  up: knex =>
    knex.schema.createTable('Dog', t => {
      t.uuid('id').primary()
      t.timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.string('name').notNullable()
    }),
  down: () => {},
}
