require('dotenv/config')

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: { directory: './src/_db/migrations' },
  seeds: { directory: './src/_db/seeds' },
}
