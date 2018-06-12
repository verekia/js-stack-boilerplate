require('dotenv/config')
const { databaseUrl } = require('read-env').default()

module.exports = {
  client: 'pg',
  connection: databaseUrl,
  migrations: { directory: './src/_db/migrations' },
}
