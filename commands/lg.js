const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) };
    if (msg.member.roles.has(bot.config.roles.id.LoupGarou)) {
        msg.member.removeRole(bot.config.roles.id.LoupGarou).catch(bot.ls.error, console.error)
        msg.channel.send("Vous avez quitté le village.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "lg " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        WebhookPrivate.send("**" + bot.config.prefix + "lg** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
        const LogLGIfEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogLGIfEmbed
            .setColor(bot.config.roles.color.LoupGarou)
            .setDescription("Rôle **" + bot.config.roles.name.LoupGarou + "** supprimé pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )

    } else {
        msg.member.addRole(bot.config.roles.id.LoupGarou).catch(console.error)
        msg.channel.send('Vous êtes devenus membre ~~de la meute~~ du village, soyez vigilants !')
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + "lg " + " de " + msg.author.tag + " (" + msg.author.id + ")")
        WebhookPrivate.send("**" + bot.config.prefix + "lg** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
        const LogLGElseEmbed = new Discord.RichEmbed()
        WebhookPublic.send(LogLGElseEmbed
            .setColor(bot.config.roles.color.LoupGarou)
            .setDescription("Rôle **" + bot.config.roles.name.LoupGarou + "** ajouté pour " + msg.author)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}