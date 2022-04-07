const { Constants: { ApplicationCommandOptionTypes }, MessageEmbed } = require('discord.js'),
  ms = require('ms'),
  config = require('../config.json'),
  BordPiHelper = require('../modules/BordPiHelper')

function convertMs(time) {
  const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60)
  const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24))

  const d = absoluteDays
    ? absoluteDays === 1
      ? '1 jour'
      : `${absoluteDays} jours `
    : null
  const h = absoluteHours
    ? absoluteHours === 1
      ? '1 heure'
      : `${absoluteHours} heures `
    : null
  const m = absoluteMinutes
    ? absoluteMinutes === 1
      ? '1 minute'
      : `${absoluteMinutes} minutes `
    : null

  const absoluteTime = []
  if (d) absoluteTime.push(d)
  if (h) absoluteTime.push(h)
  if (m) absoluteTime.push(m)

  return absoluteTime.join(', ')
}

module.exports = {
  data: {
    name: 'to',
    description: 'Bannir temporairement un utilisateur',
    options: [
      {
        type: ApplicationCommandOptionTypes.USER,
        name: 'utilisateur',
        description: 'Quel utilisateur voulez-vous bannir temporairement ?',
        required: true
      },
      {
        type: ApplicationCommandOptionTypes.STRING,
        name: 'temps',
        description: 'Pendant combien de temps ?',
        required: true
      },
      {
        type: ApplicationCommandOptionTypes.STRING,
        name: 'raison',
        description: 'Quelle est la raison du ban ?',
        required: false
      }
    ]
  },
  execute(interaction) {
    if (!interaction.member.permissions.has('MODERATE_MEMBERS'))
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
        content: 'L\'utilisateur est un robot, vous ne pouvez pas bannir les robots !',
        ephemeral: true
      })
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({
        content: 'Vous ne pouvez pas vous bannir !',
        ephemeral: true
      })
    }

    const roleMember = interaction.member.guild.roles.cache.get(member.roles.highest.id)
    const roleAuthor = interaction.member.guild.roles.cache.get(interaction.member.roles.highest.id)

    if (roleMember.rawPosition >= roleAuthor.rawPosition) {
      return interaction.reply({
        content: 'L\'utilisateur que vous souhaitez bannir est au dessus de vous !',
        ephemeral: true
      })
    }
    const reason = interaction.options.getString('raison')
    if (reason > 512) {
      const ErrCharactersEmbed = new MessageEmbed()
        .setColor(config.colors.DangerColor)
        .setTitle('Erreur')
        .setDescription('La raison ne peut pas dépasser 512 caractères !')
      return interaction.reply({
        embeds: [ErrCharactersEmbed],
        ephemeral: true
      })
    }
    const time = interaction.options.getString('temps')
    if (isNaN(ms(time)))
      return interaction.reply({
        content: 'Veuillez fournir un temps valide! (Unités valides: `m`, `h`, `d`)',
        ephemeral: true
      })

    if (member.communicationDisabledUntilTimestamp) {
      return interaction.reply({
        content: 'L\'utilisateur que vous souhaitez bannir est banni temporairement !',
        ephemeral: true
      })
    }

    member.timeout(ms(time), reason ? reason : `Aucune raison donnée | Par ${interaction.user.tag}`)
    BordPiHelper.Logs(user, `${interaction.user.tag} a banni ${user.tag} temporairement pendant **${convertMs(ms(time))}**.\n${reason ? `Raison : ${reason}` : ' '}`)
    return interaction.reply({
      content: `${user.tag} (${user}) a été banni temporairement pendant **${convertMs(ms(time))}**.\n${reason ? `Raison : ${reason}` : 'Aucune raison donnée'}`,
      ephemeral: true
    })
    
  }
}
