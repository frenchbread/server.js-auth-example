const server = require('server')

const { get } = server.router
const { json } = server.reply

const pckg = require('../package.json')

module.exports = [
  get('/', ctx => json({ name: pckg.name, version: pckg.version }))
]
