const Discord = require('discord.js')

exports.run = (bot, WebhookPublic, msg) => {
    
    if (msg.channel.recipient) return

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) }
    const ThisIsFole = (msg.guild.roles.cache.find(x => x.id === bot.config.IDRoleSupport))
    
    if (!msg.member.roles.cache.has(ThisIsFole.id)) return

    msg.channel.send(new Discord.MessageEmbed()
            .setColor(bot.config.PrimaryColor)
            .setTitle("Message d'aide en provenance d'un membre du support.")
            .setDescription("Bienvenue dans le channel support de la communauté **La Hype_**. Veuillez décrire votre type de soucis et ce que vous voudriez.")
            .setThumbnail(msg.author.displayAvatarURL())
            .addField(":black_small_square: " + bot.config.prefix + "bord", "Affichez les fonctionnalités que ce robot même offre sur ce serveur.", false)
            .addField("Les liens utiles", "[Serveur Discord](https://discord.gg/9gcxwVY) • [Code Source de Bord Pi](https://github.com/lahype/Bord-Pi)", false)
    )

    console.log(bot.ls.info, bot.config.prefix + "support " + " de " + msg.author.tag + " (" + msg.author.id + ")")
}
