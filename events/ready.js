const Discord = require('discord.js')
const Twitch = require('./../modules/twitch')
const Embed = new Discord.RichEmbed()

module.exports = (bot, WebhookPrivate, WebhookPublic, msg, args) => {
  console.log(bot.ls.success,"Connecté en tant que " + bot.user.username)
  bot.updatePresence()

  let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎", "E Corpé"]
  let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]
  
  let twitch = new Twitch(bot, bot.config.TwitchChannelID)
  setInterval(() => {
    twitch.run()
  }, 60000)


  // WebhookPrivate.send(Embed
  //   .setColor(bot.config.SuccessColor)
  //   .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
  //   .setFooter(ThisIsMotd)
  //   .setTimestamp(new Date())
  // ).catch(e => console.error(e))


  // WebhookPublic.send(Embed
  //   .setColor(bot.config.SuccessColor)
  //   .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
  //   .setFooter(ThisIsMotd)
  //   .setTimestamp(new Date())
  // ).catch(e => console.error(e))
}
