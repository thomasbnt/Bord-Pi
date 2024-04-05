module.exports = {
  data: {
    name: 'emit',
    description: 'test event guildmemberadd',
    options: []
  },

  async execute (interaction, client) {
    await client.emit('guildMemberAdd', interaction.user)
    await interaction.reply({
      content: ':white_check_mark: Emitted event guildMemberAdd'
    })
  }
}
