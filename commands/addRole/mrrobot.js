const Discord = require('discord.js')

exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    if (msg.member.roles.has(bot.config.IDRoles.MrRobot)) {
        msg.member.removeRole(bot.config.IDRoles.MrRobot).catch(bot.ls.error, console.error)
        msg.channel.send("Vous ne serrez plus notifié pour les mises à jour mineures de **Mr. Robøt**.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.get(bot.config.IDRoles.MrRobot).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPrivate.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.MrRobot).name}** supprimé pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.MrRobot).members).size} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        WebhookPublic.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.MrRobot).name}** supprimé pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.MrRobot).members).size} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        msg.member.addRole(bot.config.IDRoles.MrRobot).catch(console.error)
        msg.channel.send(`Vous serrez désormais notifié pour les mises à jour mineures de **Mr. Robøt**.  Vous êtes ${(msg.guild.roles.get(bot.config.IDRoles.MrRobot).members).size} membres qui possède ce rôle.`)
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.get(bot.config.IDRoles.MrRobot).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPrivate.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.MrRobot).name}** ajouté pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.MrRobot).members).size} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
        WebhookPublic.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.MrRobot).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.MrRobot).name}** ajouté pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.MrRobot).members).size} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}