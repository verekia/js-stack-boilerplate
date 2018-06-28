module.exports = {
  up: async knex => {
    await knex.schema.createTable('User', t => {
      t.uuid('id').primary()
      t.timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.string('username').notNullable()
      t.string('passwordHash').notNullable()
    })
    await knex.schema.createTable('Note', t => {
      t.uuid('id').primary()
      t.timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.fn.now())
      t.uuid('userId')
        .references('User.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()
      t.string('title').notNullable()
      t.text('description')
    })
  },
  down: () => {},
}
