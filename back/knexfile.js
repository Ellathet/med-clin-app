// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'med-clin',
      user:     'root',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  }

};
