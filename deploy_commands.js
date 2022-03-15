const fs = require('fs')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
const {clientId, serverId, token} = require('./config.json')

if (!clientId) {
    return console.error('clientId doit être inséré dans le fichier config.json')
}
if (!serverId) {
  return console.error('serverId doit être inséré dans le fichier config.json')
}

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '9'}).setToken(token)

rest.put(
    Routes.applicationGuildCommands(clientId, serverId),
    {body: commands}
).then(() => console.log('Successfully registered application commands.')).catch(console.error)
