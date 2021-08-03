
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
      t.increments()
      t.string('username')
      t.string('password_digest')
      t.string('name')
      t.string('height')
      t.string('location')
      t.integer('climb_id').references('id').inTable('climbs')
  })
};

exports.down = function(knex) {
  return knex.schema.DropTableIfExists('users')
};
