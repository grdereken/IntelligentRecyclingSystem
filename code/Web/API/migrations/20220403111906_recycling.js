exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments()
      table.text('username')
        .notNullable()
        .unique()
      table.text('password')
        .notNullable()
      table.integer('points')
        .notNullable()
        .defaultTo(0)
    })
  
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
  