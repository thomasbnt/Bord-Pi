const {
  Constants: { ApplicationCommandOptionTypes }
} = require('discord.js'),
config = require('../config.json')
module.exports = {
  data: {
    name: 'unto',
    description: 'Dé-bannir un utilisateur',
    options: [
      {
        type: ApplicationCommandOptionTypes.USER,
        name: 'utilisateur',
        description: 'Quel utilisateur voulez-vous dé-bannir ?',
        required: true
      }
    ]
  },
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
      return interaction.reply({
        content: 'Vous n\'avez pas les permissions requises pour faire cette commande !'
      })
    if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES'))
      return interaction.reply({
        content: 'Je n\'ai pas les permissions requises pour faire cette commande !'
      })

    const user = interaction.options.getUser('utilisateur')
    let member = interaction.member.guild.members.cache.get(user.id)

    if (!member) {
      return interaction.reply({
        content: 'L\'utilisateur est introuvable !',
        ephemeral: true
      })
    }

    if (user.bot) {
      return interaction.reply({
        content: 'L\'utilisateur est un bot, vous ne pouvez pas dé-bannir les bots !'
      })
    }

    member.timeout(null, `Par ${interaction.user.tag}`)
    return interaction.reply({
      content: `${user.tag} a bien été dé-banni !`
    })
  }
}
