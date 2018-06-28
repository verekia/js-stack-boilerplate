module.exports = {
  up: knex =>
    knex.schema.createTable('Note', t => {
      t.uuid('id').primary()
      t.timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.string('title').notNullable()
      t.text('description')
    }),
  down: () => {},
}
