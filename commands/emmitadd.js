const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return

    bot.emit("guildMemberAdd", msg.member);

    console.log(bot.ls.info, bot.config.prefix + "emmitadd " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    WebhookPrivate.send("**" + bot.config.prefix + "emmitadd** - De ``" + msg.author.username + "#" + msg.author.discriminator + "``, ID : ``" + msg.author.id + "``")
    const EmmitAddLogEmbed = new Discord.RichEmbed()
    WebhookPublic.send(EmmitAddLogEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "emmitadd ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}