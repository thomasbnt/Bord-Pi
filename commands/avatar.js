const Discord = require('discord.js')
exports.run = (bot, WebhookPrivate, WebhookPublic, msg) => {

    const AvatarEmbed = new Discord.RichEmbed()
    msg.channel.send(AvatarEmbed
        .setColor(bot.config.PrimaryColor) 
        .setDescription(`Voici ton image de profil.\nPour la voir, clique simplement dessus.\nTu as la possibilité de l'ouvrir dans une \nnouvelle page en cliquant sur [ce lien](${msg.author.displayAvatarURL}).`)
        .setThumbnail(msg.author.displayAvatarURL)
    )

    console.log(bot.ls.info, bot.config.prefix + "avatar " + " de " + msg.author.tag + " (" + msg.author.id + ")")
    const AvatarLogPrivateEmbed = new Discord.RichEmbed()
    WebhookPrivate.send(AvatarLogPrivateEmbed
        .setColor(bot.config.PrimaryColor)
        .setDescription("** " + bot.config.prefix + "avatar ** - De " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL)
    )
}
