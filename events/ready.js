const cron = require('node-cron')
const synchronizeSlashCommands = require('../modules/SyncCommands')
const { ActivityType } = require('discord.js')

const UnsplashModule = require('../modules/EditBannerServer.js')
module.exports = {
  name: 'ready',
  description: 'Bot is ready',
  async execute(client) {
    console.log(`Connecté en tant que ${client.user.username}`)
    client.user.setActivity('/bord', { type: ActivityType.Watching })

    // Discord nettoie l'activité sans raison. Le setInterval est seulement pour le mettre à jour.
    cron.schedule('0 */6 * * *', () => {
      client.user.setActivity('/bord', {
        type: ActivityType.Watching
      })
    })

    // Ceci est optionnel et réglable dans le fichier config.json
    // parti optionalModules.activateUnsplashModule.
    // Changement de la bannière du serveur Discord tous les jours à 2h du matin
    cron.schedule('0 2 * * *', () => {
      UnsplashModule(client)
    })

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
