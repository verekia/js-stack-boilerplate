require('dotenv/config')
const { DATABASE_URL } = require('read-env').default(null, false)

module.exports = {
  client: 'pg',
  connection: DATABASE_URL,
  migrations: { directory: './src/_db/migrations' },
}
