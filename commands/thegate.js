const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) };
    if (msg.member.roles.has(bot.config.roles.id.thegate)) {
        msg.member.removeRole(bot.config.roles.id.thegate).catch(bot.ls.error, console.error)
        msg.channel.send("Vous n'avez plus accès à la ** catégorie de The Gate **.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "thegate " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        const LogTheGateIfPrivateEmbed = new Discord.RichEmbed()
        WebhookPrivate.send(LogTheGateIfPrivateEmbed
            .setColor(bot.config.roles.color.thegate)
            .setDescription("Rôle **" + bot.config.roles.name.thegate + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        const LogTheGateIfEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogTheGateIfEmbed
            .setColor(bot.config.roles.color.thegate)
            .setDescription("Rôle **" + bot.config.roles.name.thegate + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        msg.member.addRole(bot.config.roles.id.thegate).catch(console.error)
        msg.channel.send('Vous avez accès à <#416001338929971201> ainsi que <#416001389605683200>, proposez vos suggestions pour améliorer le projet.')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "thegate " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        const LogTheGateElsePrivateEmbed = new Discord.RichEmbed()
        WebhookPrivate.send(LogTheGateElsePrivateEmbed
            .setColor(bot.config.roles.color.thegate)
            .setDescription("Rôle **" + bot.config.roles.name.thegate + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        const LogTheGateElseEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogTheGateElseEmbed
            .setColor(bot.config.roles.color.thegate)
            .setDescription("Rôle **" + bot.config.roles.name.thegate + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}