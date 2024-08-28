/** @type {import('knex').Knex.Config} */
const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },
  // Add other environments if needed
};

module.exports = config;
