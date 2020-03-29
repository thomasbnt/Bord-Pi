const Discord = require('discord.js')

exports.run = (bot, WebhookPublic, msg) => {
    
    if (msg.channel.recipient) return

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur.")) }
    const ThisIsFole = (msg.guild.roles.find(x => x.id === bot.config.IDRoleSupport))
    
    if (!msg.member.roles.has(ThisIsFole.id)) return

    msg.channel.send(new Discord.MessageEmbed()
            .setColor(bot.config.PrimaryColor)
            .setTitle("Message d'aide en provenance d'un membre du support.")
            .setDescription("Bienvenue dans le channel support de **Mr. Robøt**. Veuillez tout d'abord, et avant de poser votre question de **[lire la Foire Aux Questions](https://mrrobot.app/#faq)**. \n\nSi vous n'avez pas la solution, envoyez directement ici en incluant :\n\n```markdown\n+ Type de soucis\n+ Précisez ce que ça produit\n```\nUne description détaillée est requise sinon votre demande pourrait ne pas être prise en compte. Les membres du <@&416618144027639808> vous donnerons une réponse dans les plus brefs délais.")
            .setThumbnail(msg.author.displayAvatarURL)
            .addField(":black_small_square: " + bot.config.prefix + "bord", "Affichez les fonctionnalités que ce robot même offre sur ce serveur.", false)
            .addField(":black_small_square:  _website", "Obtenez rapidement le lien du site web de **Mr. Robøt**", false)
            .addField("Les liens utiles", "[Serveur Discord](https://discord.gg/9gcxwVY) • [Me soutenir](https://buymeacoffee.com/thomasbnt) • [Site web](https://thomasbnt.fr/?utm_source=link_embed_footer_bordpi?utm_medium=discordapp) • [Code Source de Bord Pi](https://github.com/thomasbnt/Bord-Pi)", false)
    )

    console.log(bot.ls.info, bot.config.prefix + "support " + " de " + msg.author.tag + " (" + msg.author.id + ")")
}
