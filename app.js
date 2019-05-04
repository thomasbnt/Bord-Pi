/*

    @document   : app.js
    @author     : Thomas Bnt <thomasbnt@protonmail.com>
    @version    : 2.0.0
    @copyright  : 2019, Thomas Bnt
    @license    : GNU General Public License v3.0
    @repository : https://github.com/thomasbnt/Bord-Pi
    @description: Un robot Discord gérant et aidant les utilisateurs pour le serveur La Hype_

*/ 
const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

const config = require('./config.json')

const bot = new Discord.Client({
  autoReconnect: true
});

// -------------------- Webhooks --------------------

const WebhookPrivate = new Discord.WebhookClient(config.WebhookPrivate.id, config.WebhookPrivate.token)
const WebhookPublic = new Discord.WebhookClient(config.WebhookPublic.id, config.WebhookPublic.token)

// -------------------- Config --------------------

bot.config = config
bot.commands = new Enmap()
bot.ls = require('log-symbols')
bot.updatePresence = function updatePresence() {
  bot.user.setActivity(bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " utilisateurs — " + bot.config.prefix + "bord", { type: "WATCHING" })
}

// -------------------- My C0re --------------------

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    bot.on(eventName, event.bind(null, bot, WebhookPrivate, WebhookPublic))
  })
})

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let props = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    bot.commands.set(commandName, props)
  })
})

bot.login(config.token)
