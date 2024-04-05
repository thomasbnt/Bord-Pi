// https://github.com/Androz2091/discord-sync-commands/
const Discord = require('discord.js')
module.exports = async (
  client,
  commands,
  options = { debug: false, guildId: null }
) => {
  const ready = client.readyAt
    ? await Promise.resolve()
    : new Promise((resolve) => client.once('ready', resolve))
  await ready
  const currentCommands = await client.application.commands.fetch(
    options.guildId && { guildId: options.guildId }
  )

  client.logger.debug('Synchronizing commands...')
  client.logger.debug(`Currently ${currentCommands.size} commands.`)

  const newCommands = commands.filter(
    (command) => !currentCommands.some((c) => c.name === command.name)
  )
  for (const newCommand of newCommands) {
    await client.application.commands.create(newCommand, options.guildId)
  }

  client.logger.debug(`Created ${newCommands.length} commands!`)

  const deletedCommands = currentCommands
    .filter((command) => !commands.some((c) => c.name === command.name))
    .toJSON()
  for (const deletedCommand of deletedCommands) {
    await deletedCommand.delete()
  }

  client.logger.debug(`Deleted ${deletedCommands.length} commands!`)

  const updatedCommands = commands.filter((command) =>
    currentCommands.some((c) => c.name === command.name)
  )
  let updatedCommandCount = 0
  for (const updatedCommand of updatedCommands) {
    const newCommand = updatedCommand
    const previousCommand = currentCommands.find(
      (c) => c.name === updatedCommand.name
    )
    let modified = false
    if (previousCommand.description !== newCommand.description) modified = true
    if (
      !Discord.ApplicationCommand.optionsEqual(
        previousCommand.options ?? [],
        newCommand.options ?? []
      )
    ) {
      modified = true
    }
    if (modified) {
      await previousCommand.edit(newCommand)
      updatedCommandCount++
    }
  }

  client.logger.debug(`Updated ${updatedCommandCount} commands!`)

  client.logger.debug('Commands synchronized!')

  return {
    currentCommandCount: currentCommands.size,
    newCommandCount: newCommands.length,
    deletedCommandCount: deletedCommands.length,
    updatedCommandCount
  }
}
