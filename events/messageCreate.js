const config = require('../config.json')
const FilterLinks = require('../modules/FilterLinks.js')
module.exports = {
  name: 'messageCreate',
  execute(msg, client) {
    if (msg.author.bot) return
    if (msg.author.id === config.clientId) return
    if (msg.channel.recipient) return
    FilterLinks(msg, client)
  }
}
