const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) };
    if (msg.member.roles.has(bot.config.roles.id.mrrobot)) {
        msg.member.removeRole(bot.config.roles.id.mrrobot).catch(bot.ls.error, console.error)
        msg.channel.send('Vous ne serrez plus notifié pour les mises à jour mineures de **Mr. Robøt**.')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })
       
        console.log(bot.ls.info, bot.config.prefix + "mrrobot " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        WebhookPrivate.send("**" + bot.config.prefix + "mrrobot** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
        const LogMrrobotIfEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogMrrobotIfEmbed
            .setColor(bot.config.roles.color.mrrobot)
            .setDescription("Rôle **" + bot.config.roles.name.mrrobot + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        msg.member.addRole(bot.config.roles.id.mrrobot).catch(console.error)
        msg.channel.send('Vous serrez désormais notifié pour les mises à jour mineures de **Mr. Robøt**.')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "mrrobot " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        WebhookPrivate.send("**" + bot.config.prefix + "mrrobot** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
        const LogMrrobotIfEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogMrrobotIfEmbed
            .setColor(bot.config.roles.color.mrrobot)
            .setDescription("Rôle **" + bot.config.roles.name.mrrobot + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}