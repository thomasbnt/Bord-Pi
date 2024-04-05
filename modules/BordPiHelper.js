const { EmbedBuilder, WebhookClient } = require('discord.js')
const config = require('../config.json')
const webhook = new WebhookClient({
  id: config.WebhookLogs.id,
  token: config.WebhookLogs.token
})

class BordPiHelper {
  // Simplement pour les logs.
  Logs (member, action, color) {
    const LogEmbed = new EmbedBuilder()
      .setColor(color || config.colors.InfoColor)
      .setAuthor({
        name: member.username,
        iconURL: member.avatarURL({
          dynamic: true,
          size: 1024
        }),
        url: `https://whois.mrrobot.app/${member.id}`
      })
      .setDescription(`${action}`)
    if (config.WebhookLogs.id && config.WebhookLogs.token) {
      webhook.send({ embeds: [LogEmbed] }).catch(console.error)
    }
  }

  // Même chose ici, pour les logs, mais spécialement pour les arrivants et départs de membres.
  LogsMemberInOutServer (member, status, color_embed) {
    const LogsJoinEmbed = new EmbedBuilder()
      .setColor(color_embed)
      .setAuthor({
        name: `${member.user.username} nous a ${status}`,
        iconURL: member.avatarURL({
          format: 'webp',
          dynamic: true,
          size: 1024
        }),
        url: `https://whois.mrrobot.app/${member.id}`
      })
      .addFields([
        {
          name: 'Création',
          value: `<t:${this.IsoStringToTimeStamp(member.user.createdTimestamp)}>`,
          inline: true
        },
        {
          name: 'Identifiant',
          value: `\`${member.id}\``,
          inline: true
        }
      ])
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp(new Date())
    if (config.WebhookLogs.id && config.WebhookLogs.token) {
      webhook.send({ embeds: [LogsJoinEmbed] }).catch(console.error)
    }
  }

  WarnAds (msg, status, color_embed) {
    const WarnAdsEmbed = new EmbedBuilder()
      .setColor(color_embed)
      .setAuthor({
        name: `${msg.member.user.username} a fait une publicité`,
        iconURL: msg.member.avatarURL({
          format: 'webp',
          dynamic: true,
          size: 1024
        }),
        url: `https://whois.mrrobot.app/${msg.member.id}`
      })
      .setDescription(
        `<@${msg.author.id}> a fait une publicité Discord dans le salon <#${msg.channel.id}>.\n\n> ${msg.content}`
      )
      .setThumbnail(msg.member.user.displayAvatarURL())
      .setTimestamp(new Date())
    if (config.WebhookLogs.id && config.WebhookLogs.token) {
      webhook.send({ embeds: [WarnAdsEmbed] }).catch(console.error)
    }
  }

  // Cela récupère value et la convertit en timestamp.
  IsoStringToTimeStamp (value) {
    const date = new Date(value)
    return Math.floor(date / 1000)
  }

  // Une couleur aléatoire pour vos embeds ? C'est ici.
  getRandomColor () {
    return `#${((Math.random() * 0xffffff) << 0).toString(16)}`
  }

  // Ce sont les phrases qui seront affichées au hasard dans guildMemberAdd pour le message de bienvenue.
  getRandomMotd () {
    const quotes = [
      'Bienvenue sur le serveur !',
      'Oh un arrivant !',
      'Bonjour à toi, jeune aventurier !',
      'Installe-toi !',
      'La cavalerie est arrivée !',
      'Bienvenue à toi !',
      'Me voilà !',
      '*pouf* MAGIE !'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
}

module.exports = new BordPiHelper()
