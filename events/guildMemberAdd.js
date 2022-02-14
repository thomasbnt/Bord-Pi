const Discord = require('discord.js')
const moment = require('moment')
moment.locale('FR')
const config = require('../config.json')

module.exports = {
    name: 'guildMemberAdd',
    description: 'Guild Member Add',
    execute(member) {
        const guild = member.guild
        /*const ChannelGeneral = member.guild.channels.cache.find(x => x.id === config.IDWelcomeChannel).catch(e => console.log(e))

        ChannelGeneral.send(new Discord.MessageEmbed()
            .setColor(config.PrimaryColor)
            .addField(
                "🍃 Bienvenue à " + member.user.username + " — Fiche d'aide",
                "On vous souhaite la bienvenue sur **" + guild.name + "** ! Lisez les <#399600870804684803> avant tout.",
                true)
            .setFooter({text: "Ce message va s'autodétruire dans une minute"})
        ).then((msg) => {
            setTimeout(() => {
                if (msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
                    msg.delete(msg.author).catch(e => console.log("Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
                }
            }, 60000)
        })*/

        console.log(`📥  — ${member.user.tag} (${member.user.id}) a rejoint ${guild.name}`)

        /*WebhookPublic.send(new Discord.MessageEmbed()
            .setColor(bot.config.BlackColor)
            .setAuthor(`📥 — ${member.user.username} nous a rejoint`, member.user.avatarURL())
            .addField("Création", moment(member.user.createdTimestamp).format('ll'), true)
            .addField("Jour(s)", checkDays(member.user.createdAt), true)
            .setDescription(`Concernant ${member.user}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(`ID : ${member.user.id}`)
            .setTimestamp(new Date())
        ).catch(e => console.error(e))*/
    }
}
