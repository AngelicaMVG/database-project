const devConfig = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port: '8889',
    user : 'root',
    password : 'root',
    database : 'projectMuktek'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  }
}


module.exports = {
  development: devConfig,
  production: {}
}
