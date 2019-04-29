const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.channel.recipient) return
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return
    const UptimeEmbed = new Discord.RichEmbed()
    msg.channel.send(UptimeEmbed
        .setColor('#E74C3C')
        .setAuthor("🔌 Uptime", msg.author.displayAvatarURL, "https://github.com/thomasbnt/Bord-Pi")
        .setDescription((Math.round(bot.uptime / (1000 * 60 * 60))) + ' heure|s  ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + ' minute|s ' + (Math.round(bot.uptime / 1000) % 60) + " seconde|s")
    )

    console.log(bot.ls.info, bot.config.prefix + "uptime " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    WebhookPrivate.send("**" + bot.config.prefix + "uptime** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
    const UptimeLogEmbed = new Discord.RichEmbed()
    WebhookPublic.send(UptimeLogEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "uptime ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}