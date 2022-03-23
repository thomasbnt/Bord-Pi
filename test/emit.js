const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../config.json')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('emit')
    .setDescription('test event guildmemberadd'),
  async execute(interaction, client) {
    client.emit('guildMemberAdd', interaction.user)
    interaction.reply({ content: ':white_check_mark: Emitted event guildMemberAdd' })
  }
}
