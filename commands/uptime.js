const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return
    const UptimeEmbed = new Discord.RichEmbed()
    msg.channel.send(UptimeEmbed
        .setColor(bot.config.PrimaryColor)
        .setAuthor("🔌 Uptime", msg.author.displayAvatarURL, "https://github.com/thomasbnt/Bord-Pi")
        .setDescription((Math.round(bot.uptime / (1000 * 60 * 60))) + ' heure|s  ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + ' minute|s ' + (Math.round(bot.uptime / 1000) % 60) + " seconde|s")
    )

    console.log(bot.ls.info, bot.config.prefix + "uptime " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    const UptimeLogPrivateEmbed = new Discord.RichEmbed()
    WebhookPrivate.send(UptimeLogPrivateEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "uptime ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}