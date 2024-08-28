exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable(); // hashed password
      table.string('email').unique(); // optional email field
      table.timestamps(true, true); // created_at and updated_at timestamps
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  