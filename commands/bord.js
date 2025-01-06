const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags
} = require('discord.js')
const config = require('../config.json')
module.exports = {
  data: {
    name: 'bord',
    description: "Panel d'aide qui vous donne toutes les commandes du robot.",
    options: []
  },
  execute (interaction, client) {
    const ButtonsBord = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Serveur Discord')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/9gcxwVY')
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel('Code source')
          .setStyle(ButtonStyle.Link)
          .setURL(`${config.GitHubProjectURL}`)
      )
    const BordEmbed = new EmbedBuilder()
      .setColor(config.colors.PrimaryColor)
      .setTitle(`${client.user.username} — Panel d'aide`)
      .setThumbnail(client.user.avatarURL({ format: 'png', size: 1024 }))
      .setDescription(
        `**${client.user.username}** est un robot Discord qui a été créé pour aider les serveurs Discord à gérer leurs membres, à avoir des logs, filtrer certains liens et avoir **son propre message de bienvenue**. Vous pouvez trouver le code source du robot sur [GitHub](${config.GitHubProjectURL}).`
      )
      .setImage(
        interaction.guild.features.includes('BANNER')
          ? interaction.guild.bannerURL({ format: 'png', size: 1024 })
          : null
      )
    interaction.reply({
      embeds: [BordEmbed],
      components: [ButtonsBord],
      flags: MessageFlags.Ephemeral,
    })
  }
}
