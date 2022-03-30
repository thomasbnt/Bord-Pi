const BordPiHelper = require('../modules/BordPiHelper'),
  config  = require('../config.json')
module.exports = {
  name: 'guildBanAdd',
  description: 'Guild Ban Add',
  execute(member) {
    BordPiHelper.Logs(member, `${member.username} a été banni du serveur.`, config.colors.DangerColor)

  }
}
