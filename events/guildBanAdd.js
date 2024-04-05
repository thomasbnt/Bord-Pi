const BordPiHelper = require('../modules/BordPiHelper')
const config = require('../config.json')
module.exports = {
  name: 'guildBanAdd',
  description: 'Guild Ban Add',
  execute (member) {
    BordPiHelper.Logs(
      member.user,
      `${member.user.username} a été banni du serveur.`,
      config.colors.DangerColor
    )
  }
}
