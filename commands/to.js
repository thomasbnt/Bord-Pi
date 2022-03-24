const {
  Constants: { ApplicationCommandOptionTypes }, MessageEmbed
  } = require('discord.js'),
  ms = require('ms'),
  config = require('../config.json')
const BordPiHelper = require('../modules/BordPiHelper')
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
  async execute(interaction, client) {
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
    let member = interaction.member.guild.members.cache.get(user.id)

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

    let roleMember = interaction.member.guild.roles.cache.get(
      member.roles.highest.id
    )
    let roleAuthor = interaction.member.guild.roles.cache.get(
      interaction.member.roles.highest.id
    )

    if (roleMember.rawPosition >= roleAuthor.rawPosition) {
      return interaction.reply({
        content: 'L\'utilisateur que vous souhaitez bannir est au dessus de vous !',
        ephemeral: true
      })
    } else {
      let reason = interaction.options.getString('raison')
      if (reason > 512) {
        const ErrCaractersEmbed = new MessageEmbed()
          .setColor(config.colors.DangerColor)
          .setTitle('Erreur')
          .setDescription('La raison ne peut pas dépasser 512 caractères !')
        return interaction.reply({
          embeds: [ErrCaractersEmbed],
          ephemeral: true
        })
      }
      let time = interaction.options.getString('temps')
      if (isNaN(ms(time)))
        return interaction.reply({
          content: 'Veuillez fournir un temps valide! (Unités valides: `s`, `m`, `h`, `d`)',
          ephemeral: true
        })

      if (member.communicationDisabledUntilTimestamp) {
        return interaction.reply({
          content: 'L\'utilisateur que vous souhaitez bannir est banni temporairement !',
          ephemeral: true
        })
      }

      member.timeout(
        ms(time),
        reason ? reason : `Aucune raison donnée | Par ${interaction.user.tag}`
      )
      BordPiHelper.Logs(user,`${interaction.user.tag} a banni ${user.tag} temporairement pendant **${convertMs(ms(time))}**.\n${reason ? `Raison : ${reason}` : ' '}`)
      return interaction.reply({
        content: `${user.tag} (${user}) a été banni temporairement pendant **${convertMs(ms(time))}**.\n${reason ? `Raison : ${reason}` : 'Aucune raison donnée'}`,
        ephemeral: true
      })
    }
  }
}

function convertMs(time) {
  const absoluteSeconds = Math.floor((time / 1000) % 60)
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
  const s = absoluteSeconds
    ? absoluteSeconds === 1
      ? '1 seconde'
      : `${absoluteSeconds} secondes `
    : null

  const absoluteTime = []
  if (d) absoluteTime.push(d)
  if (h) absoluteTime.push(h)
  if (m) absoluteTime.push(m)
  if (s) absoluteTime.push(s)

  return absoluteTime.join(', ')
}
