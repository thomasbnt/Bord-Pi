const {Permissions, MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
    name: "messageCreate",
    execute(msg) {
        if (msg.author.bot) return
        if (msg.author.id === config.clientId) return
        if (msg.channel.recipient) return

        console.info(`msg -> ${msg}`)

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

        // -------------------- Filtre contre les liens Discord --------------------

        if (msg.content.includes('discord.gg/') || msg.content.includes('discordapp.com/invite') || msg.content.includes('discord.me/')) {
            // Vérifie si le robot lui-même a la permission de supprimer le message si nécessaire.
            if (!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
                return msg.channel.send(`Le robot n'a pas la permission de gérer les messages.`) && console.error(`Err: Le robot n'a pas la permission de gérer les messages.`)
            // Vérifie si l'auteur du message a la permission de supprimer le message ou s'il a le rôle IDRoleSupport.
            if (msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return
            if (msg.member.roles.cache.has(config.IDRoleSupport)) return
            // Vérifie si son message est dans le salon qui accepte ces types de liens.
            if (msg.channel.id === config.IDAdsChannel) return
            // Et dans un dernier temps avant de supprimer le message si les vérifications au-dessus sont false. Si c'est bien le cas, avertit l'auteur du message.
            const WarnLinkEmbed = new Discord.MessageEmbed()
                .setColor(config.PrimaryColor)
                .setDescription(`<@${msg.author.id}>, ce type de lien est interdit. Veuillez lire les **règles**.`)
            msg.delete(msg.author)
            msg.channel.send({embeds: [WarnLinkEmbed]}).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 10000)
            })
            console.log(`${msg.author.tag} (${msg.author.id}) a fait une publicité Discord dans le salon ${msg.channel.name} (${msg.channel.id}).\n> ${msg.content}`)
        }
        /* WebhookPublic.send(new Discord.MessageEmbed()
           .setColor(config.DangerColor)
           .setDescription(`<@${msg.author.id}> a fait une publicité Discord dans le salon <#${msg.channel.id}>.\n\n> ${msg.content}`)
           .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
         )*/
    }
}
