const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'),
  config = require('../config.json')
module.exports = {
  data: {
    name: 'bord',
    description: 'Panel d\'aide qui vous donne toutes les commandes du robot.',
    options: []
  },
  async execute(interaction, client) {
    const ButtonsBord = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel(`Serveur Discord`)
          .setStyle('LINK')
          .setURL('https://discord.gg/9gcxwVY')
      )
      .addComponents(
        new MessageButton()
          .setLabel(`Code source`)
          .setStyle('LINK')
          .setURL(`${config.GitHubProjectURL}`)
      )
    const BordEmbed = new MessageEmbed()
      .setColor(config.colors.PrimaryColor)
      .setTitle(`${client.user.username} — Panel d'aide`)
      .setThumbnail(client.user.avatarURL({ format: 'png', size: 1024 }))
      .setDescription(
        `Avec ${client.user.username} vous pouvez vous octroyez des rôles.
        \nPour plus d'informations sur les différents rôles, utilisez les _Slash Commands_ de ce robot.`
      )
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
