exports.up = function (knex) {
    return knex.schema.createTable('payments', (table) => {
      table.increments('id').primary();
      table.integer('tenant_id').references('id').inTable('tenants').onDelete('CASCADE');
      table.decimal('amount', 14, 2).notNullable();
      table.date('date_paid').notNullable();
      table.boolean('settled').defaultTo(false);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('payments');
  };
  