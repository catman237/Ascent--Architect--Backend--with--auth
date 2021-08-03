
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
      {username:'User0', password_digest: 'password0', name: 'user0', height: '6 foot 1 inches', location: 'Colorado', climb_id: 3 },
      {username:'User1', password_digest: 'password1', name: 'user1', height: '5 foot 7 inches', location: 'West Virginia', climb_id: '2' },
      {username:'User2', password_digest: 'password2', name: 'user2', height: '5 foot 11 inches', location: 'Utah', climb_id: '1' }
      ]);
    });
};
