exports.up = function (knex) {
    return knex.schema.createTable('properties', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('type').notNullable(); // e.g., apartment, house
      table.integer('number_of_units');
      table.decimal('rental_cost', 14, 2);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('properties');
  };
  