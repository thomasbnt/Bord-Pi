const BordPiHelper = require('../modules/BordPiHelper')
const config = require('../config.json')
module.exports = {
  name: 'guildBanRemove',
  description: 'Guild Ban Remove',
  execute (member) {
    BordPiHelper.Logs(
      member.user,
      `${member.user.username} a été dé-banni du serveur.`,
      config.colors.SuccessColor
    )
  }
}
