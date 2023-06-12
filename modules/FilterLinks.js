// -------------------- Filtre contre les liens Discord --------------------
const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')
const BordPiHelper = require('./BordPiHelper.js')

module.exports = function FilterLinks(msg) {
  if (
    /*
     * Si vous souhaitez interdire d'autres liens, ajoutez leur lien dessous comme exemple :
     * msg.content.includes("https://monlien.local") ||
     */

    msg.content.includes('discord.gg/') ||
    msg.content.includes('discordapp.com/invite') ||
    msg.content.includes('discord.me/')
  ) {
    // TODO : Vérifie si le robot lui-même a la permission de supprimer le message si nécessaire.

    // Vérifie si l'auteur du message a la permission de supprimer le message ou s'il a le rôle IDRoleSupport.
    if (msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return
    if (config.IDAdsChannel != null) {
      // Vérifie si son message est dans le salon qui accepte ces types de liens.
      if (msg.channel.id === config.IDAdsChannel) return
    }
    // Et dans un dernier temps avant de supprimer le message si les vérifications au-dessus sont false. Si c'est bien le cas, avertit l'auteur du message.
    const WarnLinkEmbed = new EmbedBuilder()
      .setColor(config.colors.PrimaryColor || '#500303')
      .setDescription(`<@${msg.author.id}>, ce type de lien est interdit. Veuillez lire les **règles**.`)
    msg.delete(msg.author)
    msg.channel.send({ embeds: [WarnLinkEmbed] }).then((m) => {
      setTimeout(() => {
        m.delete()
      }, 10000)
    })
    console.log(
      `${msg.author.tag} (${msg.author.id}) a fait une publicité Discord dans le salon ${msg.channel.name} (${msg.channel.id}).\n> ${msg.content}`
    )
    BordPiHelper.WarnAds(msg, 'publicité', config.colors.DangerColor)
  }
}
