const { Constants: { ApplicationCommandOptionTypes } } = require('discord.js'),
  BordPiHelper = require('../modules/BordPiHelper')
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
  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
      return interaction.reply({
        content: 'Vous n\'avez pas les permissions requises pour faire cette commande !',
        ephemeral: true
      })
    if (!interaction.guild.me.permissions.has('MODERATE_MEMBERS'))
      return interaction.reply({
        content: 'Je n\'ai pas les permissions requises pour faire cette commande !',
        ephemeral: true
      })

    const user = interaction.options.getUser('utilisateur')
    const member = interaction.member.guild.members.cache.get(user.id)

    if (!member) {
      return interaction.reply({
        content: 'L\'utilisateur est introuvable !',
        ephemeral: true
      })
    }

    if (user.bot) {
      return interaction.reply({
        content: 'L\'utilisateur est un robot, vous ne pouvez pas dé-bannir les robots !',
        ephemeral: true
      })
    }

    member.timeout(null, `Par ${interaction.user.tag}`)
    BordPiHelper.Logs(user,`${interaction.user.tag} a dé-banni ${user.tag}`)
    interaction.reply({
      content: `${user.tag} a bien été dé-banni !`,
      ephemeral: true
    })
  }
}
