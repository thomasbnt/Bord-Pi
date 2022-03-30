const { Constants: { } } = require('discord.js')
module.exports = {
  data: {
    name: 'emit',
    description: 'test event guildmemberadd',
    options: []
  },

  async execute(interaction, client) {
    client.emit('guildMemberAdd', interaction.user)
    interaction.reply({ content: ':white_check_mark: Emitted event guildMemberAdd' })
  }
}
