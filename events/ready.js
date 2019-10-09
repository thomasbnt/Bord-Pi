const Discord = require('discord.js')
const Twitch = require('./../modules/twitch')

module.exports = (bot, WebhookPrivate, WebhookPublic, WebhookRedditRSS, msg, args) => {
  const Watcher  = require('feed-watcher'),
      feed = `https://reddit.com/r/${bot.config.NameOfSubreddit}.rss`,
      interval = 15
  const watcher = new Watcher(feed, interval)

  console.log(bot.ls.success,"Connecté en tant que " + bot.user.username)

  bot.updatePresence()

  let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎", "E Corpé", "Mee1 premier du nom", "Raspi, se sentir utile !", "💡 Je suis né(e) sur un Raspberry Pi !", "Dernière génération en route...", "Lorem Ipsum", "Loogé et coffré.", "Est-tu un 0 ou un 1?", "Le violet c'est beau", "🌧 > 🌞"]
  let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]
  
  let twitch = new Twitch(bot, bot.config.TwitchChannelID)
    setInterval(() => {
      twitch.run()
  }, 60000)

  watcher.start()
    .then(function(entries) {})
    .catch(function(error) { console.log(bot.ls.error, error)})
  watcher.on('new entries', function(entries) {
    entries.forEach(function(entry) {           
        WebhookRedditRSSc.send(`[${entry.title}](${entry.link}) — Posté par ${entry.author}`)
        console.log(bot.ls.info,'Nouvelle entrée Flux RSS Reddit\nTitre : ' + entry.title + 
        "\nURL : " + (entry.url || entry.link) + "\n\n")
    })
  })

  WebhookPrivate.send(new Discord.RichEmbed()
    .setColor(bot.config.SuccessColor)
    .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
    .setFooter(ThisIsMotd)
    .setTimestamp(new Date())
  ).catch(e => console.error(e))

  WebhookPublic.send(new Discord.RichEmbed()
    .setColor(bot.config.SuccessColor)
    .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL)
    .setFooter(ThisIsMotd)
    .setTimestamp(new Date())
  ).catch(e => console.error(e))
}
