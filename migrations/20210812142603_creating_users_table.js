exports.up = function(knex) {
    return knex.schema.createTable('climbs', t => {
        t.increments()
        t.string('name')
        t.string('grade')
        t.boolean('isBoulder')
        t.string('height')
        t.string('terrain')
        t.text('description')
        t.integer('sessions')
        t.boolean('sent')
        t.integer('user_id').references('id').inTable('users')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('climbs')
  };
