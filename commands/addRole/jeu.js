const Discord = require('discord.js')
exports.run = async (bot, WebhookPublic, msg) => {
    
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) }
    
    if (msg.member.roles.has(bot.config.IDRoles.Joueur)) {
        msg.member.removeRole(bot.config.IDRoles.Joueur).catch(bot.ls.error, console.error)
        msg.channel.send("Vous ne serrez plus notifié lors des évenements et parties.")
            .then(m => { setTimeout(() => { m.delete() }, 20000) })
            
        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.get(bot.config.IDRoles.Joueur).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPublic.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.Joueur).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.Joueur).name}** supprimé pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.Joueur).members).size-1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    } else {
        msg.member.addRole(bot.config.IDRoles.Joueur).catch(console.error)
        msg.channel.send(`Vous serrez notifié lors des évenements et parties.\nVous êtes ${(msg.guild.roles.get(bot.config.IDRoles.Joueur).members).size+1} membres qui possède ce rôle.`)
            .then(m => { setTimeout(() => { m.delete() }, 20000) })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.get(bot.config.IDRoles.Joueur).name + " de " + msg.author.tag + " (" + msg.author.id + ")")

        WebhookPublic.send(new Discord.RichEmbed()
            .setColor(msg.guild.roles.get(bot.config.IDRoles.Joueur).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.get(bot.config.IDRoles.Joueur).name}** ajouté pour  ${msg.author}. Il y a désormais ${(msg.guild.roles.get(bot.config.IDRoles.Joueur).members).size+1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
        )
    }
}