const config = require('../config.json')
const BordPiHelper = require('../modules/BordPiHelper')

module.exports = {
  name: 'guildMemberRemove',
  description: 'Guild Member Remove',
  execute(member, client) {
    const guild = client.guilds.cache.get(config.serverId)
    BordPiHelper.LogsMemberInOutServer(
      member,
      'quitté',
      config.colors.DangerColor
    )
    client.logger.info(`📥  — ${member.username} (${member.id}) a quitté ${guild.name}`)
  }
}
