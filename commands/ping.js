const {
  MessageEmbed,
  Constants: { ApplicationCommandOptionTypes }
} = require('discord.js')

module.exports = {
  data: {
    name: 'ping',
    description: 'Obtenir le ping du robot',
    options: []
  },
  async execute(interaction, client) {
    const PingBeforeEmbed = new MessageEmbed().setAuthor({
      name: `L'oiseau va revenir avec le ping du robot...`,
      iconURL: client.user.avatarURL(),
      url: client.config.GitHubProjectURL
    })
    const sent = await interaction.reply({
      embeds: [PingBeforeEmbed],
      fetchReply: true,
      ephemeral: true
    })
    const TotalPing = sent.createdTimestamp - interaction.createdTimestamp
    const PingEmbed = new MessageEmbed()
      //.setColor(client.config.PrimaryColor)
      .setAuthor({
        name: `Le ping de ${client.user.username}`,
        iconURL: client.user.avatarURL(),
        url: `${client.config.GitHubProjectURL}`
      })
      .addField('Total du ping', `${TotalPing} ms`, true)
      .addField('Websocket', `${client.ws.ping} ms`, true)
    TotalPing >= 200
      ? PingEmbed.setColor(client.config.colors.DangerColor)
      : PingEmbed.setColor(client.config.colors.SuccessColor)
    await interaction.editReply({
      embeds: [PingEmbed],
      ephemeral: true
    })
  }
}
