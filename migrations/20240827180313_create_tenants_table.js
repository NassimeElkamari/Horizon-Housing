exports.up = function (knex) {
    return knex.schema.createTable('tenants', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('contact_details').notNullable();
      table.integer('property_id').references('id').inTable('properties').onDelete('CASCADE');
      table.string('section');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tenants');
  };
  