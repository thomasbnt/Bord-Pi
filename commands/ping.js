const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
  if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { 
    msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) 
  }
  if (!msg.member.hasPermission('MANAGE_MESSAGES')) return

  const m = await msg.channel.send("En attente..")
  const PingEmbed = new Discord.RichEmbed()
  m.edit(PingEmbed
    .setColor(bot.config.PrimaryColor)
    .setFooter(`Une connexion de ${m.createdTimestamp - msg.createdTimestamp} ms ! Et pour l'API elle est de ${Math.floor(bot.ping)}ms`, msg.author.avatarURL)
  )

  console.log(bot.ls.info, "ping " + " de " + msg.author.tag + " (" + msg.author.id + ")")
  WebhookPrivate.send("**" + bot.config.prefix + "ping** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``")
  const PingLogEmbed = new Discord.RichEmbed()
  WebhookPublic.send(PingLogEmbed
    .setColor(bot.config.PrimaryColor)
    .setDescription("**" + bot.config.prefix + "ping** - De " + msg.author + " (ID : " + msg.author.id + " )")
  )
}
