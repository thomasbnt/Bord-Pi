/*
* Émuler une sortie d'un membre
*/
const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (!msg.member.hasPermission("ADMINISTRATOR")) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    bot.emit("guildMemberRemove", msg.member)

    console.log(bot.ls.info, bot.config.prefix + "emmitr " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    const EmmitRemoveLogPrivateEmbed = new Discord.RichEmbed()
    WebhookPrivate.send(EmmitRemoveLogPrivateEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "emmitr ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
    const EmmitRemoveLogEmbed = new Discord.RichEmbed()
    WebhookPublic.send(EmmitRemoveLogEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "emmitr ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}