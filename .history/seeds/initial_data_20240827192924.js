exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('properties').del()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert([
        { name: 'Downtown Apartment', address: '123 Main St', type: 'apartment', number_of_units: 10, rental_cost: 1200.00 },
        { name: 'Suburban House', address: '456 Oak Ave', type: 'house', number_of_units: 1, rental_cost: 2000.00 }
      ]);
    });
};
