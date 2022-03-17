const config = require('../config.json')
const BordPiHelper = require("../modules/BordPiHelper")

module.exports = {
    name: 'guildMemberAdd',
    description: 'Guild Member Add',
    execute(client, member) {
        const g = member.guilds.cache.get(config.serverId)
        const ChannelGeneral = g.channels.cache.find(x => x.id === config.IDWelcomeChannel)
        ChannelGeneral.send(`Bienvenue ${client.username} sur le serveur ${g.name}`)
        BordPiHelper.logsinoutserver(client, `rejoint`, config.colors.SuccessColor)
        console.log(`📥  — ${client.username} (${client.id}) a rejoint ${g.name}`)
    }
}
