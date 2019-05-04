/*
* Émuler une entrée d'un membre
*/
const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (!msg.member.hasPermission("ADMINISTRATOR")) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    bot.emit("guildMemberAdd", msg.member)

    console.log(bot.ls.info, bot.config.prefix + "emmita " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    const EmmitAddLogPrivateEmbed = new Discord.RichEmbed()
    WebhookPrivate.send(EmmitAddLogPrivateEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "emmita ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
    const EmmitAddLogEmbed = new Discord.RichEmbed()
    WebhookPublic.send(EmmitAddLogEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "emmita ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}