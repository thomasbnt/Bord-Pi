const cron = require('node-cron')
const synchronizeSlashCommands = require('../modules/SyncCommands')
const { ActivityType } = require('discord.js')

const UnsplashModule = require('../modules/EditBannerServer.js')
module.exports = {
  name: 'ready',
  description: 'Bot is ready',
  async execute(client) {
    client.logger.info(`Connecté en tant que ${client.user.username}`)
    client.logger.info(`Identifiant : ${client.user.id}`)
    client.logger.info(`Serveur : ${client.config.serverId ? client.config.serverId : 'Aucun'}`)
    client.logger.info(`Version de Bord-Pi : ${process.env.npm_package_version}`)
    client.logger.info(`Version de Node.js : ${process.version}`)
    client.logger.sponsor("Merci à ceux qui ont sponsorisé le projet Bord-Pi ")
    client.logger.sponsor("Ainsi qu'à ceux qui ont contribué au projet.")

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
