const config = require('../config.json')
const BordPiHelper = require('../modules/BordPiHelper')

module.exports = {
  name: 'guildMemberRemove',
  description: 'Guild Member Remove',
  execute(member, client) {
    const g = client.guilds.cache.get(config.serverId)
    BordPiHelper.LogsMemberInOutServer(
      member,
      `quitté`,
      config.colors.DangerColor
    )
    console.log(`📥  — ${member.username} (${member.id}) a rejoint ${g.name}`)
  }
}
