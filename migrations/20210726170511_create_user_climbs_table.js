
exports.up = function(knex) {
  return knex.schema.createTable('user_climbs', t => {
      t.increments()
      t.integer('user_id').references('id').inTable('users')
      t.integer('climb_id').references('id').inTable('climbs')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_climbs')
};
