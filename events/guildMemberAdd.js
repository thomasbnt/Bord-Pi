const config = require('../config.json')
const BordPiHelper = require("../modules/BordPiHelper")
const Discord = require('discord.js')
module.exports = {
    name: 'guildMemberAdd',
    description: 'Guild Member Add',
    execute(client, member) {
        // TODO : Si erreur sur cannot read property 'channels' of undefined, ligne 11, alors catch that.
        /**
         *  Message personnalisé pour les nouveaux membres
         *  Possible de le désactiver simplement en ne mettant rien dans config.serverId
         */
        if (config.serverId) {
            const g = member.guilds.cache.get(config.serverId)
            console.log(`📥  — ${client.username} (${client.id}) a rejoint ${g.name}`)
            const ChannelGeneral = g.channels.cache.find(x => x.id === config.IDWelcomeChannel)

            // C'est ici que vous modifiez votre message de bienvenue.
            const WelcomeEmbed = new Discord.MessageEmbed()
                .setAuthor({
                    name: `${BordPiHelper.getRandomMotd()}`,
                    iconURL: client.avatarURL({format: 'webp', dynamic: true, size: 1024})
                })
                .setColor(BordPiHelper.getRandomColor())
                .setDescription(`Bienvenue parmi-nous <@${client.id}>, n'hésite pas à posséder des rôles sur le serveur avec les _Slash Commands_ depuis <@${member.user.id}>. Toutes les infos avec \`/bord\`.
                \n> Ne sois pas timide, discute librement, présente-toi au peuple, personne ne mord ! (enfin... je pense ?)`)
            ChannelGeneral.send({
                embeds: [WelcomeEmbed]
            }).then(msg => {
                msg.react('👋').then(r => r)
            }).catch(err => {
                console.log(err)
            })
                // TODO : Supp le message après un temps imparti.
                /*.then(
                    setTimeout(() => {
                        if (member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
                            //.catch(e => console.log("Optionnel : Le robot n'a pas la permission de supprimer son message de bienvenue"))
                        }
                    }, 6))*/
                .catch(err => console.error(`Vous avez sûrement mal configuré l'ID du serveur : ${err}`))
        } else {
            console.info(`Le message personnalisé pour les nouveaux membres n'a pas été envoyé car le serveur ID n'a pas été configuré.`)
        }
        BordPiHelper.LogsMemberInOutServer(client, `rejoint`, config.colors.SuccessColor)
    }
}
