
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('climbs').del()
    .then(function () {
      // Inserts seed entries
      return knex('climbs').insert([
        {name: 'climb', 
        grade: '5.12d', 
        isBoulder: false, 
        height: '50 feet', 
        terrain: 'steep', 
        description: 'this is a short sport climb', 
        sessions: 0, 
        sent: false,
        user_id: 1
        },
        
        {name: 'climb', 
        grade: '5.13', 
        isBoulder: false, 
        height: '80 feet', 
        terrain: 'steep', 
        description: 'this is a sport climb', 
        sessions: 0, 
        sent: false,
        user_id: 1
        },

        {name: 'climb', 
        grade: '5.14', 
        isBoulder: false, 
        height: '70 feet', 
        terrain: 'steep', 
        description: 'this is a hard sport climb', 
        sessions: 0, 
        sent: false,
        user_id: 2
      }
      ]);
    });
};
