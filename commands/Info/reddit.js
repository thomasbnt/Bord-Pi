const Discord = require("discord.js")
const Embed = new Discord.RichEmbed()

exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
  if (msg.channel.recipient)
    return

  if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
    msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
  }
  msg.channel.send(Embed.setColor(bot.config.PrimaryColor)
    .setDescription("Nous avons un **Subreddit** à notre disposition ! Partagez ce que vous voulez, de la musique, des films/séries, de la tech/dev, de l'histoire, des articles en tout genre... tout ce que vous voulez !\n\n[Cliquez ici pour voir le Reddit](https://www.reddit.com/r/LaHype)")
  )

  console.log(bot.ls.info, bot.config.prefix + "reddit " + " de " + msg.author.tag + " (" + msg.author.id + ")")
  WebhookPrivate.send(Embed.setColor(bot.config.PrimaryColor).setDescription("** " + bot.config.prefix + "reddit ** - De " + msg.author).setFooter("ID : " + msg.author.id, msg.author.avatarURL))
}