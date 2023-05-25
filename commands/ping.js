const { EmbedBuilder } = require('discord.js')
module.exports = {
  data: {
    name: 'ping',
    description: 'Obtenir le ping du robot',
    options: []
  },
  async execute(interaction, client) {
    const PingBeforeEmbed = new EmbedBuilder().setAuthor({
      name: `En attente du retour de Ping...`,
      iconURL: client.user.avatarURL(),
      url: client.config.GitHubProjectURL
    })
    const sent = await interaction.reply({
      embeds: [PingBeforeEmbed],
      fetchReply: true,
      ephemeral: true
    })
    const TotalPing = sent.createdTimestamp - interaction.createdTimestamp
    const PingEmbed = new EmbedBuilder()
      //.setColor(client.config.PrimaryColor)
      .setAuthor({
        name: `Le ping de ${client.user.username}`,
        iconURL: client.user.avatarURL(),
        url: `${client.config.GitHubProjectURL}`
      })
      .addFields(
        {
          name: 'Total du ping',
          value: `${TotalPing}ms`,
          inline: true
        },
        {
          name: 'Websocket',
          value: `${client.ws.ping} ms`,
          inline: true
        }
      )
    TotalPing >= 200
      ? PingEmbed.setColor(client.config.colors.DangerColor)
      : PingEmbed.setColor(client.config.colors.SuccessColor)
    await interaction.editReply({
      embeds: [PingEmbed],
      ephemeral: true
    })
  }
}
