module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     'localhost', //Host do banco
      database: 'med-clin', //Nome do banco
      user:     'root', //Nome do usuário
      password: 'password' //Senha do usuário
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }

};
