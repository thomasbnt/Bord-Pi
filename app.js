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
const {Client, Collection, Intents, Options, MessageActionRow, MessageButton} = require('discord.js')
const config = require('./config.json')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    makeCache: Options.cacheWithLimits({
        MessageManager: 200,
        PresenceManager: 100,
    }),
})

client.config = config
client.d = new Date()

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await console.log(`${client.d} — /${interaction.commandName} — By ${interaction.user.username} (ID : ${interaction.user.id}) ${interaction.guild?.id ? `on ${interaction.guild.name}` : ''} ${interaction.guild?.memberCount ? `(${interaction.guild.memberCount} members)` : ''}`)
        await command.execute(interaction, client, config)
    } catch (error) {
        console.error(error)
        return interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
            fetchReply: true
        })
    }
})

client.login(config.token)
