const config = require('../config.json')
const BordPiHelper = require("../modules/BordPiHelper")

module.exports = {
    name: 'guildMemberRemove',
    description: 'Guild Member Remove',
    execute(client, member) {
        const g = member.guilds.cache.get(config.serverId)
        BordPiHelper.logsinoutserver(client, `quitté`, config.colors.DangerColor)
        console.log(`📥  — ${client.username} (${client.id}) a rejoint ${g.name}`)
    }
}
