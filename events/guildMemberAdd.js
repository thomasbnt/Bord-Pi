const Discord = require('discord.js')
const moment = require('moment')
const Embed = new Discord.RichEmbed()

module.exports = (bot, WebhookPrivate, WebhookPublic, member) => {

    bot.updatePresence()
    function checkDays(date) {
        let now = new Date()
        let diff = now.getTime() - date.getTime()
        let days = Math.floor(diff / 86400000)
        return days + (days == 1 ? " jour" : " jours")
    }
    const guild = member.guild
    const ChannelGeneral = member.guild.channels.find(x => x.id === bot.config.IDWelcomeChannel)

    ChannelGeneral.send(Embed
        .setColor(bot.config.PrimaryColor)
        .addField("🍃 Bienvenue à " + member.user.username + " — Fiche d'aide", "On vous souhaite la bienvenue sur **" + guild.name + "** ! Lisez les <#399600870804684803> avant tout.\n\nPour avoir de l'aide à propos de **Mr. Robøt**, veuillez [revoir la FAQ](https://mrrobot.thomasbnt.fr/?utm_source=Discord&utm_term=discord%2Cbordpi_bvn&utm_content=Bordpi_bvn#faq) si ce n'est pas encore fait, elle se trouve sur le site web. Si vous ne trouvez pas la solution, demandez de l'aide dans <#432552194630352916> en suivant le protocole dans les messages épinglés. Si vous voulez être notifié de chaque mise à jour, faites `" + bot.config.prefix + "mrrobot`.\n\nVous avez la possibilité d'avoir des rôles d'accès, pour plus d'information, la commande `" + bot.config.prefix + "bord` est disponible.", true)
        .setFooter("Ce message va s'autodétruire dans une minute")
        ).then((msg) => {
        setTimeout(() => {
            if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
                msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) 
            }
        }, 60000)
        return
    })

    if (member.user.avatarURL == member.user.defaultAvatarURL) {

        ChannelGeneral.send(Embed
            .setColor(bot.config.InfoColor)
            .setAuthor(member.user.username + " pensez à mettre une image de profil !", bot.user.displayAvatarURL, "https://support.discordapp.com/hc/fr/articles/204156688-Comment-modifier-mon-avatar-")
            .setFooter("Cliquez au dessus pour voir comment faire.")
        ).then((msg) => {
            setTimeout(() => {
                if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
                    msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
                }
            }, 60000)
        })
    }

    console.log(bot.ls.info, `📥  — ${member.user.tag} (${member.user.id}) a rejoint ${guild.name}`)

    WebhookPrivate.send(Embed
        .setColor(bot.config.InfoColor)
        .setAuthor("📥 — Nouveau membre", bot.user.displayAvatarURL)
        .setThumbnail(member.user.avatarURL)
        .setFooter("Bord Piesque")
        .setTimestamp(new Date())
        .addField("Nom", member.user.tag, true)
        .addField("Identitifation (ID)", "<@" + member.user.id + "> ", true)
        .addField("Nbt. de jours du compte", checkDays(member.user.createdAt), true)
        .addField("Compte créé le", moment(member.user.createdTimestamp).format('DD.MM.YYYY'), true)
    ).catch(e => console.error(e))

    WebhookPublic.send(Embed
        .setColor(bot.config.InfoColor)
        .setAuthor("📥 — Nouveau membre", bot.user.displayAvatarURL)
        .setThumbnail(member.user.avatarURL)
        .setFooter("Bord Piesque")
        .setTimestamp(new Date())
        .addField("Nom", member.user.tag, true)
        .addField("Identitifation (ID)", "<@" + member.user.id + "> ", true)
        .addField("Nbt. de jours du compte", checkDays(member.user.createdAt), true)
        .addField("Compte créé le", moment(member.user.createdTimestamp).format('DD.MM.YYYY'), true)
    ).catch(e => console.error(e))

}