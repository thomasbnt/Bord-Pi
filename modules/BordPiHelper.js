const Discord = require('discord.js')
const config = require('../config.json')
const w = new Discord.WebhookClient({
  id: config.WebhookLogs.id,
  token: config.WebhookLogs.token
})

class BordPiHelper {
  // Simplement pour les logs.
  Logs(member, action, color) {
    const LogEmbed = new Discord.MessageEmbed()
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
    w.send({ embeds: [LogEmbed] }).catch(console.error)
  }

  // Même chose ici, pour les logs, mais spécialement pour les arrivants et départs de membres.
  LogsMemberInOutServer(member, status, color_embed) {
    const LogsJoinEmbed = new Discord.MessageEmbed()
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
      .addField(
        'Création',
        `<t:${this.IsoStringToTimeStamp(member.user.createdTimestamp)}>`,
        true
      )
      .addField(`Identifiant`, `\`${member.id}\``, true)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp(new Date())
    w.send({ embeds: [LogsJoinEmbed] }).catch(console.error)
  }

  // Cela récupère value et la convertit en timestamp.
  IsoStringToTimeStamp(value) {
    const d = new Date(value)
    return Math.floor(d / 1000)
  }

  // Une couleur aléatoire pour vos embeds ? C'est ici.
  getRandomColor() {
    return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  }

  // Ce sont les phrases qui seront affichées au hasard dans guildMemberAdd pour le message de bienvenue.
  getRandomMotd() {
    const quotes = [
      'Bienvenue sur le serveur !',
      'Oh un arrivant !',
      'Bonjour à toi, jeune aventurier !',
      'Installe-toi !',
      'La cavalerie est arrivée !'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
}

module.exports = new BordPiHelper()
