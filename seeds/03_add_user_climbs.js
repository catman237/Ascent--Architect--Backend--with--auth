
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_climbs').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_climbs').insert([
        {user_id: 1, climb_id: 3 },
        {user_id: 2, climb_id: 2},
        {user_id: 3, climb_id: 1 }
      ]);
    });
};
