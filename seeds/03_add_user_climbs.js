
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_climbs').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_climbs').insert([
        {user_id: 19, climb_id: 19 },
        {user_id: 20, climb_id: 20},
        {user_id: 21, climb_id: 21 }
      ]);
    });
};
