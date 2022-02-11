const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Obtenir le ping du robot'),
    async execute(interaction, client) {
        function IsoStringToTimeStamp(value) {
            const d = new Date(value)
            return Math.floor(d / 1000)
        }
        const PingEmbed = new MessageEmbed()
            //.setColor(client.config.PrimaryColor)
            .setAuthor({name: `Le ping de ${client.user.username} est de ${client.ws.ping}ms`, iconURL: client.user.avatarURL(), url: `${client.config.GitHubProjectURL}`})
        client.ws.ping >= 100 ? PingEmbed.setColor(`${client.config.DangerColor}`) : PingEmbed.setColor(`${client.config.SuccessColor}`)
        interaction.reply({
            embeds: [PingEmbed],
            ephemeral: true
        })
    }
}
