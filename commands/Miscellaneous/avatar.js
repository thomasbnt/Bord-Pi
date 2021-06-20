const {MessageEmbed} = require('discord.js')

exports.run = (bot, WebhookPublic, msg) => {

    if (msg.channel.recipient) return;
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."));
    }

    msg.channel.send(new MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription(`Voici ton image de profil.\nPour la voir, clique simplement dessus.\nTu as la possibilité de l'ouvrir dans une \nnouvelle page en cliquant sur [ce lien](${msg.author.displayAvatarURL()}).`)
        .setThumbnail(msg.author.displayAvatarURL({format: "PNG", dynamic: true}))
    )

    console.log(bot.ls.info, bot.config.prefix + "avatar " + " de " + msg.author.tag + " (" + msg.author.id + ")");
}
