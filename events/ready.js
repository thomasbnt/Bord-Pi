const CronJob = require('cron').CronJob
const synchronizeSlashCommands = require('../modules/SyncCommands')

module.exports = {
  name: 'ready',
  description: 'Bot is ready',
  async execute(client) {
    console.log(`Connecté en tant que ${client.user.username}`)
    client.user.setActivity(`/bord`, { type: 'WATCHING' })

    // Discord nettoie l'activité sans raison. Le setInterval est seulement pour le mettre à jour.
    new CronJob('0 * */2 * * *', async () => {
        client.user.setActivity(`/bord`, {
          type: 'WATCHING'
        })
      }, null, true, 'Europe/Paris'
    )

    // Créer / Supprimer / Modifier les commandes sur Discord si un changement est détecté
    await synchronizeSlashCommands(client,
      client.commands.map((c) => c.data),
      {
        debug: true,
        guildId: client.config.serverId
      }
    )
  }
}
