/*
* Commande pour tester les Webhooks mais aussi les couleurs intégrés.
*/
const Discord = require('discord.js')

exports.run = (bot, WebhookPublic, msg) => {
  if (msg.channel.recipient) return
  if (!msg.member.hasPermission('ADMINISTRATOR')) return
  if (msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) {
    msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
  }

  WebhookPublic.send(new Discord.MessageEmbed()
    .setColor(bot.config.PrimaryColor)
    .setTitle('Primary Color')
  )

  WebhookPublic.send(new Discord.MessageEmbed()
    .setColor(bot.config.DangerColor)
    .setTitle('Danger Color')
  )

  WebhookPublic.send(new Discord.MessageEmbed()
    .setColor(bot.config.SuccessColor)
    .setTitle('Success Color')
  )

  WebhookPublic.send(new Discord.MessageEmbed()
    .setColor(bot.config.InfoColor)
    .setTitle('Info Color')
  )
}
