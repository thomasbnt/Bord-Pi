const Discord = require('discord.js')

exports.run = async (bot, WebhookPublic, msg) => {

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    if (msg.member.roles.cache.has(bot.config.IDRoles.MrRobot)) {
        msg.member.roles.remove(bot.config.IDRoles.MrRobot).catch(bot.ls.error, console.error)
        msg.channel.send("Vous ne serrez plus notifié pour les mises à jour mineures de **Mr. Robøt**.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPublic.send(new Discord.MessageEmbed()
            .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).name}** supprimé pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).members).size-1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
        )

    } else {
        msg.member.roles.add(bot.config.IDRoles.MrRobot).catch(console.error)
        msg.channel.send(`Vous serrez désormais notifié pour les mises à jour mineures de **Mr. Robøt**.\nVous êtes ${(msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).members).size+1} membres qui possède ce rôle.`)
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPublic.send(new Discord.MessageEmbed()
            .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).name}** ajouté pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.MrRobot).members).size+1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
        )
    }
}