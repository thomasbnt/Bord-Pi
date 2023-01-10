const config = require('../config.json')
const BordPiHelper = require('../modules/BordPiHelper')
const { EmbedBuilder, escapeMarkdown } = require('discord.js')
module.exports = {
  name: 'guildMemberAdd',
  description: 'Guild Member Add',
  execute(member, client) {
    if (config.serverId) {
      const guild = client.guilds.cache.get(config.serverId)
      if (guild && guild.available) {
        console.log(
          `📥  — ${member.user.username} (${member.id}) a rejoint ${guild.name}`
        )
        const ChannelGeneral = guild.channels.cache.find(
          (x) => x.id === config.IDWelcomeChannel
        )

        // C'est ici que vous modifiez votre message de bienvenue.
        const WelcomeEmbed = new EmbedBuilder()
          .setAuthor({
            name: `${BordPiHelper.getRandomMotd()}`,
            iconURL: member.user.avatarURL({
              format: 'webp',
              dynamic: true,
              size: 1024
            })
          })
          .setFooter({
            text: `${member.id}`
          })
          .setColor(BordPiHelper.getRandomColor())
          .setDescription(`> Bienvenue parmi-nous ${escapeMarkdown(member.user.username)}, ne sois pas timide, discute librement, présente-toi au peuple, personne ne mord !\nN'hésites pas à t'attribuer des rôles dans <id:customize> !`)
        ChannelGeneral.send({
          content: `<@${member.id}> par ici ! `,
          embeds: [WelcomeEmbed]
        })
          .then((msg) => {
            msg.react('👋').then((r) => r)
          })
          .catch((err) => {
            console.log(err)
          })
          // TODO : Supp le message après un temps imparti.
          /*.then(
                    setTimeout(() => {
                        if (client.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
                            //.catch(e => console.log("Optionnel : Le robot n'a pas la permission de supprimer son message de bienvenue"))
                        }
                    }, 6))*/
          .catch((err) =>
            console.error(
              `Vous avez sûrement mal configuré l'ID du serveur : ${err}`
            )
          )
      } else {
        console.info(
          `Le serveur configuré est introuvable ! Le message personnalisé n'a donc pas été envoyer.`
        )
      }
    } else {
      console.info(
        `Le message personnalisé pour les nouveaux membres n'a pas été envoyé car le serveur ID n'a pas été configuré.`
      )
    }
    BordPiHelper.LogsMemberInOutServer(
      member,
      `rejoint`,
      config.colors.SuccessColor
    )
  }
}
