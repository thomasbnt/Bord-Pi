const {
  MessageEmbed,
  Constants: { ApplicationCommandOptionTypes }
} = require('discord.js')
const config = require('../config.json')

module.exports = {
  data: {
    name: 'jeuxgratuits',
    description: 'Obtenir le rôle pour être notifié des jeux gratuits',
    options: []
  },
  async execute(interaction, client) {
    // On vérifie si le rôle est bien dans la liste des rôles sur le serveur
    let r = client.guilds.cache
      .get(config.serverId)
      .roles.cache.find((r) => r.id === config.IDRoles.notif_jeux_gratuits)
    if (!r)
      return (
        interaction.reply({
          content: 'Le rôle n\'existe pas.',
          ephemeral: true
        }) && console.error('Vous devez créer/ajouter l\'identifiant du rôle.')
      )
    // On procède à l'ajout du rôle au membre si celui-ci ne le possède pas déjà
    if (!interaction.member.roles.cache.has(r.id)) {
      interaction.member.roles.add(r)
      interaction.reply({
        content: `Vous avez reçu le rôle **${r.name}**.`,
        ephemeral: true
      })
    } else {
      interaction.member.roles.remove(r)
      interaction.reply({
        content: `Vous ne possédez désormais plus le rôle **${r.name}**.`,
        ephemeral: true
      })
    }
  }
}
