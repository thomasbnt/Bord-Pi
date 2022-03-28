const BordPiHelper = require('../modules/BordPiHelper')
const Discord = require('discord.js')
const config  = require('../config.json')
module.exports = {
  name: 'guildBanRemove',
  description: 'Guild Ban Remove',
  execute(member, client) {
    BordPiHelper.Logs(member, `${member.username} a été dé-banni du serveur.`, config.colors.SuccessColor)

  }
}
