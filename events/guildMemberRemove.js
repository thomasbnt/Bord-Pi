const Discord = require('discord.js')
const Embed = new Discord.RichEmbed()
module.exports = (bot, WebhookPrivate, WebhookPublic, member) => {
    bot.updatePresence()
    const guild = member.guild

    console.log(bot.ls.info, `📤  — ${member.user.tag} (${member.user.id}) a quitté ${guild.name}`)

    WebhookPrivate.send(Embed
        .setColor(bot.config.InfoColor)
        .setAuthor("📤 — Membre ayant quitté", bot.user.displayAvatarURL)
        .setThumbnail(member.user.avatarURL)
        .addField("Nom", member.user.tag, true)
        .addField("Identitifation (ID)", "<@" + member.user.id + "> ", true)
        .setFooter("Bord Piesque")
        .setTimestamp(new Date())
    ).catch(e => console.error(e))

    WebhookPublic.send(Embed
        .setColor(bot.config.InfoColor)
        .setAuthor("📤 — Membre ayant quitté", bot.user.displayAvatarURL)
        .setThumbnail(member.user.avatarURL)
        .addField("Nom", member.user.tag, true)
        .addField("Identitifation (ID)", "<@" + member.user.id + "> ", true)
        .setFooter("Bord Piesque")
        .setTimestamp(new Date())
    ).catch(e => console.error(e))
}
