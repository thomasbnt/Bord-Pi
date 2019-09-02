const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    const BordEmbed = new Discord.RichEmbed()
    msg.channel.send(
        BordEmbed
            .setColor(bot.config.PrimaryColor)
            .setTitle("Bord Pi — Panel d'aide")
            .setDescription("Un robot gérant et aidant les utilisateurs pour le serveur **La Hype_**.\nIl est [Open Source](https://github.com/thomasbnt/Bord-Pi), toute personne peut participer au projet et l'améliorer. Suivez simplement le protocole afin de le modifier.")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField(":black_small_square: " + bot.config.prefix + "mrrobot", "Vous **serez notifié de chaque mise à jour** du projet <@308655472452304896>. ", false)
            //.addField(":black_small_square: " + bot.config.prefix + "kimiwa", "Vous aurez accès à la **catégorie du projet Kimiwa** et vous serez notifié de chaque mise à jour.", false)
            .addField(":black_small_square: " + bot.config.prefix + "jeu", "Vous serrez notifié à chaque événement et futures parties afin que vous puissez jouer avec nous le tout en __vocal__.", false)
            .addField("Autres commandes", bot.config.prefix + "sd, " + bot.config.prefix + "avatar, " + bot.config.prefix + "form, " + bot.config.prefix + "uptime, " + bot.config.prefix + "ping ")
            .addField("Formulaire de recrutement et des demandes de partenariat", "Vous voulez nous rejoindre en tant que membre de l'équipe **La Hype_** ? Ou bien devenir partenaire ? [Remplissez ce formulaire](https://www.thomasbnt.fr/form).", false)
            .addField("Les liens utiles", "[Serveur Discord](https://discord.gg/9gcxwVY) • [Me soutenir](https://www.patreon.com/thomasbnt) • [Site web](https://www.thomasbnt.fr/?utm_source=link_embed_footer_bordpi?utm_medium=discordapp) • [Code Source de Bord Pi](https://github.com/thomasbnt/Bord-Pi)", false)
    )

    console.log(bot.ls.info, bot.config.prefix + "bord " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    const BordLogPrivateEmbed = new Discord.RichEmbed()
    WebhookPrivate.send(BordLogPrivateEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "bord ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}
