const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config.json')
module.exports = {
  data: {
    name: 'bord',
    description: 'Panel d\'aide qui vous donne toutes les commandes du robot.',
    options: []
  },
  execute(interaction, client) {
    const ButtonsBord = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Serveur Discord`)
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/9gcxwVY')
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Code source`)
          .setStyle(ButtonStyle.Link)
          .setURL(`${config.GitHubProjectURL}`)
      )
    const BordEmbed = new EmbedBuilder()
      .setColor(config.colors.PrimaryColor)
      .setTitle(`${client.user.username} — Panel d'aide`)
      .setThumbnail(client.user.avatarURL({ format: 'png', size: 1024 }))
      .setFooter({
        text: `Un robot Discord gérant et aidant les utilisateurs pour votre propre serveur.`,
        iconURL: client.user.avatarURL({ format: 'png', size: 1024 })
      })

    interaction.reply({
      embeds: [BordEmbed],
      components: [ButtonsBord],
      ephemeral: true
    })
  }
}
