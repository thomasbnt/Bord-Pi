const BordPiHelper = require('../modules/BordPiHelper')
const Discord = require('discord.js')
const config  = require('../config.json')
module.exports = {
  name: 'guildBanAdd',
  description: 'Guild Ban Add',
  execute(member, client) {
    BordPiHelper.Logs(member, `${member.username} a été banni du serveur.`, config.colors.DangerColor)

  }
}
