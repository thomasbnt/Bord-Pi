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
    .addField("Latence du robot", `${m.createdTimestamp - msg.createdTimestamp} ms`, true)
    .addField("Latence de l'API Discord", `${Math.floor(bot.ping)} ms`, true)
  )

  console.log(bot.ls.info, bot.config.prefix + "ping " + " de " + msg.author.tag + " (" + msg.author.id + ")")
  const PingLogPrivateEmbed = new Discord.RichEmbed()
  WebhookPrivate.send(PingLogPrivateEmbed
    .setColor(bot.config.PrimaryColor)
    .setDescription("** " + bot.config.prefix + "ping ** - De " + msg.author)
    .setFooter("ID : " + msg.author.id, msg.author.avatarURL)  )
  const PingLogEmbed = new Discord.RichEmbed()
  WebhookPublic.send(PingLogEmbed
    .setColor(bot.config.PrimaryColor)
    .setDescription("** " + bot.config.prefix + "ping ** - De " + msg.author)
    .setFooter("ID : " + msg.author.id, msg.author.avatarURL)  )
}
