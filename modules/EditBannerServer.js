/*
* Module permettant de modifier la bannière du serveur toutes les 24h avec une image en provenance de Unsplash.
* https://unsplash.com
*
* Pour utiliser ce module, vous devez créer un compte sur Unsplash et créer une application.
* https://unsplash.com/oauth/applications
* Puis récupérer votre Access Key et la mettre dans le fichier config.json à la ligne "UnsplashAccessKey" qui se trouve dans optionalModules.
*
*/

const config = require('../config.json')
const fetch = require('node-fetch')

// Partie API Unsplash
const UnsplashAccessKey = config.optionalModules.unsplash.UnsplashAccessKey
const { createApi } = require('unsplash-js')
const unsplash = createApi({
  accessKey: UnsplashAccessKey,
  fetch
})

// function permettant de récupérer aléatoirement une image unsplash
async function getRandomImage(client, query, username, collectionsId) {
  // Si la/les collection(s) est/sont définie(s), on ignore la query et le username
  if (collectionsId && collectionsId.length > 0) {
    query = null
    username = null
  }
  // Si dans le cas contraire, il n'y a pas de collection définie, et qu'on a un username, on ignore la query
  if (username) {
    query = null
    collectionsId = null
  }
  try {
    const resultRequestUnsplash = await unsplash.photos.getRandom({
      query: query ? query : 'nature clouds',
      count: 1,
      contentFilter: 'high',
      username: username ? username : null,
      collectionIds: collectionsId ? collectionsId : null
    })
    if (resultRequestUnsplash.errors) {
      return client.logger.error(`[Module Unsplash] ${resultRequestUnsplash.errors[0]}`)
    } else {
      // return only image url regular and author name
      return {
        url: resultRequestUnsplash.response[0].urls.regular,
        unsplashUrl: resultRequestUnsplash.response[0].links.html,
        author: resultRequestUnsplash.response[0].user.name ? resultRequestUnsplash.response[0].user.name : resultRequestUnsplash.response[0].user.username,
        authorUrl: `https://unsplash.com/@${resultRequestUnsplash.response[0].user.username}`
      }
    }
  } catch (error) {
    client.logger.error('[Module Unsplash] Erreur rencontrée : ', error)
  }
}

module.exports = function EditBannerCRON(client) {
  if (client.config.optionalModules.unsplash.activate) {
    if (!UnsplashAccessKey) return console.log('Le module EditBannerServer n\'est pas correctement configuré, il ne sera donc pas activé.')

    // on récupère le serveur
    const guild = client.guilds.cache.get(client.config.serverId)

    // TODO: Vérifier si le robot a la permission de modifier la bannière du serveur.
    // INFO: Souci sur la récupération des permissions du robot, qui n'est pas possible.


    // On vérifie si le serveur peut avoir une bannière personnalisée
    if (guild.features.includes('BANNER')) {
      getRandomImage(
        client,
        client.config.optionalModules.unsplash.optionalQuery,
        client.config.optionalModules.unsplash.optionalUsername,
        client.config.optionalModules.unsplash.optionalCollectionsID
      ).then((img) => {
        if (img === undefined) return client.logger.error('[Module Unsplash] Aucune image n\'a été récupérée.')
        const imageUrl = img.url
        client.logger.info(`Changement de la bannière du serveur ${guild.name} ...`)
        guild.setBanner(imageUrl).then(() => {
          client.logger.info(`Bannière du serveur ${guild.name} modifiée avec succès.`)
          client.logger.info(`Image par ${img.author} (${img.authorUrl}) - ${img.unsplashUrl}`)
        }).catch(e => {
          client.logger.error('Le robot n\'a pas la permission de modifier la bannière du serveur. Veuillez lui donner la permission de modifier la bannière du serveur.')
          client.logger.error(e.rawError)
        })
      })
    }
  }
}