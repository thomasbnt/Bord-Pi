const Discord = require('discord.js')

module.exports = (bot, WebhookPublic, msg, args) => {
  console.log(bot.ls.success,"Connecté en tant que " + bot.user.username)

  bot.user.setActivity(`${bot.config.prefix}bord`, {
    type: "WATCHING"
  })
  // Discord claim Activity for no reasons. The setInterval is only for update the Activity.
  function Activity() {
    bot.user.setActivity(`${bot.config.prefix}bord`, {
      type: "WATCHING"
    })
  }
  setInterval(Activity, 1200000)

  let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎", "E Corpé", "Mee1 premier du nom", "Raspi, se sentir utile !", "💡 Je suis né(e) sur un Raspberry Pi !", "Dernière génération en route...", "Lorem Ipsum", "Loogé et coffré.", "Est-tu un 0 ou un 1?", "Le violet c'est beau", "🌧 > 🌞"]
  let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]

  WebhookPublic.send(new Discord.MessageEmbed()
    .setColor(bot.config.SuccessColor)
    .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL())
    .setFooter(ThisIsMotd)
    .setTimestamp(new Date())
  ).catch(e => console.error(e))
}
