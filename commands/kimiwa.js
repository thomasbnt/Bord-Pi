const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) };
    if (msg.member.roles.has(bot.config.roles.id.Kimiwa)) {
        msg.member.removeRole(bot.config.roles.id.Kimiwa).catch(bot.ls.error, console.error)
        msg.channel.send("Vous n'avez plus accès à la ** catégorie de Kimiwa **.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "Kimiwa " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        const LogKimiwaIfPrivateEmbed = new Discord.RichEmbed()
        WebhookPrivate.send(LogKimiwaIfPrivateEmbed
            .setColor(bot.config.roles.color.Kimiwa)
            .setDescription("Rôle **" + bot.config.roles.name.Kimiwa + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        const LogKimiwaIfEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogKimiwaIfEmbed
            .setColor(bot.config.roles.color.Kimiwa)
            .setDescription("Rôle **" + bot.config.roles.name.Kimiwa + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        msg.member.addRole(bot.config.roles.id.Kimiwa).catch(console.error)
        msg.channel.send('Vous avez accès à <#576787632604839973> ainsi que <#576787560882503680>, proposez vos suggestions pour améliorer le projet.')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "Kimiwa " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        const LogKimiwaElsePrivateEmbed = new Discord.RichEmbed()
        WebhookPrivate.send(LogKimiwaElsePrivateEmbed
            .setColor(bot.config.roles.color.Kimiwa)
            .setDescription("Rôle **" + bot.config.roles.name.Kimiwa + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        const LogKimiwaElseEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogKimiwaElseEmbed
            .setColor(bot.config.roles.color.Kimiwa)
            .setDescription("Rôle **" + bot.config.roles.name.Kimiwa + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}