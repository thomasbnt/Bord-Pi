/**
 @document   : app.js
 @author     : Thomas Bnt <contact@thomasbnt.fr>
 @version    : 3.0.0
 @copyright  : 2022, Thomas Bnt
 @license    : GNU General Public License v3.0
 @repository : https://github.com/thomasbnt/Bord-Pi
 @description: Un robot Discord gérant et aidant les utilisateurs pour un serveur.
 */
const fs = require('fs')
const { Client, Collection, GatewayIntentBits, Options } = require('discord.js')
const config = require('./config.json')
const Logger = require('@ptkdev/logger')
const LoggerOptions = {
  language: 'fr',
}
const logger = new Logger(LoggerOptions)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  makeCache: Options.cacheWithLimits({
    MessageManager: 200,
    PresenceManager: 100,
  }),
})

if (!config.serverId) {
  return console.error(
    'Vous devez configurer le serverId dans votre fichier config.json pour que le robot fonctionne.',
  )
}

if (!config.GitHubProjectURL) {
  return console.error(
    "S'il vous plait, laissez les crédits à leur place.\n" +
      "Veuillez lire la licence pour plus d'informations.",
  )
}

client.config = config
client.d = new Date()
client.bph = require('./modules/BordPiHelper')
client.logger = logger

client.commands = new Collection()
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client))
  } else {
    client.on(event.name, (...args) => event.execute(...args, client))
  }
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  if (!command) return

  try {
    await console.log(
      `${client.d} — /${interaction.commandName} — Par ${interaction.user.username} (ID : ${interaction.user.id})`,
    )
    await command.execute(interaction, client)
  } catch (error) {
    console.error(error)
    return interaction.reply({
      content:
        "Une erreur s'est produite lors de l'exécution de cette commande !",
      ephemeral: true,
      fetchReply: true,
    })
  }
})

client.login(config.token)
