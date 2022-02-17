const config = require('../config.json')
const FilterLinks = require('../modules/FilterLinks.js')
module.exports = {
    name: "messageCreate",
    execute(msg) {
        if (msg.author.bot) return
        if (msg.author.id === config.clientId) return
        if (msg.channel.recipient) return


        // -------------------- Notification auprès du @Support --------------------

        /*if (msg.content.includes("<@&" + client.config.IDRoleSupport + ">")) {

          if (msg.member.hasPermission('MANAGE_MESSAGES')) return
          const ThisIsFessage = (msg.guild.channels.cache.find(x => x.id === client.config.IDChannelSupport))
          if (ThisIsFessage) {
            msg.channel.send(new Discord.MessageEmbed()
              .setColor(client.config.PrimaryColor)
              .setDescription("Bonjour, un membre du support va vous répondre d'ici peu dans <#432552194630352916>")
            )

            console.log("Nouveau message pour le Support en provenance de " + msg.author.tag + " (" + msg.author.id + ")")

            WebhookPublic.send(new Discord.MessageEmbed()
              .setColor(client.config.PrimaryColor)
              .setDescription("Nouveau message pour le Support en provenance de " + msg.author)
              .setFooter({text:"ID : " + msg.author.id, iconURL: msg.author.avatarURL()})
            ).catch(e => console.error(e))
          } else {
            console.log("Pour que cette fonctionnalité de notification @Support soit 100% opérationnelle, veuillez modifier le .find(x => x.id === \"Ici l'ID du channel\") ")
          }
        }*/
        FilterLinks(msg)
    }
}
