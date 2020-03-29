const Discord = require('discord.js')

exports.run = (bot, WebhookPublic, msg) => {

    if (msg.channel.recipient) return

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }

    msg.channel.send(new Discord.MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("Vous voulez nous rejoindre en tant que membre de l'équipe **La Hype_** ? Ou tout simplement devenir Partenaire ? Remplissez [ce formulaire](https://docs.google.com/forms/d/e/1FAIpQLScHhR0wv9ck3IgzL3AXeNrxWymdHEpxDyFi-o_9QHZFDmEXeA/viewform) et on vous répondra dès que possible !")
    )

    console.log(bot.ls.info, bot.config.prefix + "form " + " de " + msg.author.tag + " (" + msg.author.id + ")")
}
