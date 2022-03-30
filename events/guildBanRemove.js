const BordPiHelper = require('../modules/BordPiHelper'),
  config  = require('../config.json')
module.exports = {
  name: 'guildBanRemove',
  description: 'Guild Ban Remove',
  execute(member) {
    BordPiHelper.Logs(member, `${member.username} a été dé-banni du serveur.`, config.colors.SuccessColor)

  }
}
