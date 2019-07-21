const Discord = require('discord.js')
const Twitch = require('./../modules/twitch')

module.exports = (bot, WebhookPrivate, WebhookPublic, msg, args) => {
  console.log(bot.ls.success,"Connecté en tant que " + bot.user.username)
  bot.updatePresence()

  let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎"]
  let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]
  
  let twitch = new Twitch(bot, bot.config.TwitchChannelID)
  setInterval(() => {
    twitch.run()
  }, 6000)

  const ReadyToPrivateEmbed = new Discord.RichEmbed()
  WebhookPrivate.send(ReadyToPrivateEmbed
    .setColor(bot.config.SuccessColor)
    .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
    .setFooter(ThisIsMotd)
    .setTimestamp(new Date())
  ).catch(e => console.error(e))
  const ReadyToEmbed = new Discord.RichEmbed()
  WebhookPublic.send(ReadyToEmbed
    .setColor(bot.config.SuccessColor)
    .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
    .setFooter(ThisIsMotd)
    .setTimestamp(new Date())
  ).catch(e => console.error(e))
}
