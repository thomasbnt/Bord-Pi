/*
* Commande pour tester les Webhooks mais aussi les couleurs intégrés.
*/
const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (!msg.member.hasPermission("ADMINISTRATOR")) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    const PrimaryColorEmbed = new Discord.RichEmbed()
    WebhookPublic.send(PrimaryColorEmbed
            .setColor(bot.config.PrimaryColor)
            .setTitle("Primary Color")
    )

    const DangerColorEmbed = new Discord.RichEmbed()
    WebhookPublic.send(DangerColorEmbed
        .setColor(bot.config.DangerColor)
        .setTitle("Danger Color")
    )

    const SuccessColorEmbed = new Discord.RichEmbed()
    WebhookPublic.send(SuccessColorEmbed
        .setColor(bot.config.SuccessColor)
        .setTitle("Success Color")
    )
    
    const InfoColorEmbed = new Discord.RichEmbed()
    WebhookPublic.send(InfoColorEmbed
        .setColor(bot.config.InfoColor)
        .setTitle("Info Color")
    )


}
