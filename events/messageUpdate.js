const FilterLinks = require('../modules/FilterLinks.js')
module.exports = {
  name: 'messageUpdate',
  execute(msg) {
    let OldMessage = msg
    let ActualMessage = msg.reactions.message

    if (OldMessage.content === ActualMessage.content) return
    if (OldMessage.author.bot) return
    if (OldMessage.channel.type === 'dm') return

    /* Système filtrant les liens. */
    FilterLinks(ActualMessage)
  }
}
