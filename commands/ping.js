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
        const PingBeforeEmbed = new MessageEmbed()
            //.setColor(client.config.PrimaryColor)
            .setAuthor({
                name: `Chargement..`,
                iconURL: client.user.avatarURL(),
                url: `${client.config.GitHubProjectURL}`
            })
        const sent = await interaction.reply({embeds: [PingBeforeEmbed], fetchReply: true, ephemeral: true})
        const TotalPing = sent.createdTimestamp - interaction.createdTimestamp
        const PingEmbed = new MessageEmbed()
            //.setColor(client.config.PrimaryColor)
            .setAuthor({
                name: `Le ping de ${client.user.username} est de ${TotalPing}ms`,
                iconURL: client.user.avatarURL(),
                url: `${client.config.GitHubProjectURL}`
            })
            .setFooter({
                text: `Données affichés entre la commande et la réponse du robot.`,
            })
        TotalPing >= 100 ? PingEmbed.setColor(`${client.config.DangerColor}`) : PingEmbed.setColor(`${client.config.SuccessColor}`)
        await interaction.editReply({
            embeds: [PingEmbed],
            ephemeral: true
        })
    }
}
